import 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import CodeSnippetContainer from '../CodeSnippetContainer'
import { useState, useEffect, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { ErrorsProvider } from '../../utils/ErrorsContext';
import { SERVER, ERRORS, STYLE } from '../../api/ConstantsAPI';

const Home = ({ route, navigation }) => {


    // Route params
    const { showAddedCodeSnippetToast } = route.params ?? false;

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
                <CodeSnippetContainer onDataIsLoaded={() => setAppIsReady(true)} SERVER={SERVER} navigation={navigation} showAddedCodeSnippetToast={showAddedCodeSnippetToast} />
            </View>
        </ErrorsProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: STYLE.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
    }
});



export default Home