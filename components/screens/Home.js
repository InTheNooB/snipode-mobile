import 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import CodeSnippetContainer from '../CodeSnippetContainer'
import { useState, useEffect, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { ErrorsProvider } from '../../utils/ErrorsContext';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const SERVER = {
    IP: "10.7.26.193",
    PORT: "3001",
    SOCKETIO_PORT: "3002"
}

const ERRORS = {
    MISSING_SERVER_INFO: 'Error : Missing server info',
    API_CALL_ERROR: 'Error : Unexpected or no API answer',
    UNREACHABLE_SERVER: 'Error : Unreachable server',
    UNPARSABLE_JSON: 'Error : Unparsable json'
}


const Drawer = createDrawerNavigator();

export default function Home() {

    // Define variable
    const [appIsReady, setAppIsReady] = useState(false);


    // Prevent splash screen from automatically hiding
    useEffect(() => {
        SplashScreen.preventAutoHideAsync();
    }, []);

    // Hook that hides the splash screen if the app is ready
    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    return (
        <ErrorsProvider value={ERRORS}>
            <View style={styles.container} onLayout={onLayoutRootView}>
                <CodeSnippetContainer serverIP={SERVER.IP} port={SERVER.PORT} onDataIsLoaded={() => setAppIsReady(true)} SERVER={SERVER} />
            </View>
        </ErrorsProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111111',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
