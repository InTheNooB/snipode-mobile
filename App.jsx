import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AboutScreen from './components/screens/AboutScreen';
import HomeScreen from './components/screens/HomeScreen';
import AddCodeSnippetScreen from './components/screens/AddCodeSnippetScreen';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { StyleSheet, Text, Button } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { RootSiblingParent } from 'react-native-root-siblings';
import { STYLE } from './api/ConstantsAPI'; import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';


const Drawer = createDrawerNavigator();

export default function App() {

  // Loads fonts
  let [fontsLoaded] = useFonts({
    'BeVietnamProBold': require('./assets/fonts/BeVietnamPro-Bold.ttf'),
    'BeVietnamProLight': require('./assets/fonts/BeVietnamPro-Light.ttf'),
    'Courrier': require('./assets/fonts/Courrier.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <RootSiblingParent>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Code Snippets"
            screenOptions={{
              tabBarStyle: { borderTopWidth: 0 },
              headerStyle: {
                backgroundColor: STYLE.backgroundColor,
                borderTopWidth: 0,
                // REMOVE WHITE LINE
                elevation: 0, // remove shadow on Android
                shadowOpacity: 0, // remove shadow on iOS
                borderBottomWidth: 0 // Just in case.
              },
              headerTitleStyle: {
                color: 'white',
              },
              headerTintColor: '#fff'
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
          >
            <Drawer.Screen name="Code Snippets" component={HomeScreen} />
            <Drawer.Screen name="Add Code Snippet" component={AddCodeSnippetScreen} />
            <Drawer.Screen name="About" component={AboutScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </RootSiblingParent>
    );
  }
}


function CustomDrawerContent(props) {
  const routeIndex = props.state.index;
  const routes = props.state.routes;
  return (
    <>
      <DrawerContentScrollView {...props} style={styles.drawerContent}>
        {/* <DrawerItemList {...props} /> */}
        <DrawerItem
          label={({ focused, color }) => <Text style={{ color }}>Code Snippets</Text>}
          onPress={() => props.navigation.navigate("Code Snippets")}
          focused={routeIndex === routes.findIndex(e => e.name === "Code Snippets")}
          style={{ ...styles.tabView, marginLeft: routeIndex === routes.findIndex(e => e.name === "Code Snippets") ? 20 : undefined }}
          icon={({ focused, color, size }) => <FontAwesome color={color} size={size} name='code' />}
          labelStyle={styles.tabText}
          activeTintColor={'black'}
          inactiveTintColor={'white'}
          inactiveBackgroundColor={'#333333'}
          activeBackgroundColor={'white'}
        />
        <DrawerItem
          label={({ focused, color }) => <Text style={{ color }}>Add Code Snippet</Text>}
          onPress={() => props.navigation.navigate("Add Code Snippet")}
          focused={routeIndex === routes.findIndex(e => e.name === "Add Code Snippet")}
          style={{ ...styles.tabView, marginLeft: routeIndex === routes.findIndex(e => e.name === "Add Code Snippet") ? 20 : undefined }}
          icon={({ focused, color, size }) => <AntDesign color={color} size={size} name='plus' />}
          labelStyle={styles.tabText}
          activeTintColor={'black'}
          inactiveTintColor={'white'}
          inactiveBackgroundColor={'#333333'}
          activeBackgroundColor={'white'}
        />
        <DrawerItem
          label={({ focused, color }) => <Text style={{ color }}>About</Text>}
          onPress={() => props.navigation.navigate("About")}
          focused={routeIndex === routes.findIndex(e => e.name === "About")}
          style={{ ...styles.tabView, marginLeft: routeIndex === routes.findIndex(e => e.name === "About") ? 20 : undefined }}
          icon={({ focused, color, size }) => <AntDesign color={color} size={size} name='question' />}
          labelStyle={styles.tabText}
          activeTintColor={'black'}
          inactiveTintColor={'white'}
          inactiveBackgroundColor={'#333333'}
          activeBackgroundColor={'white'}
        />
        <Button
          title="Go somewhere"
          style={{ marginTop: 200 }}
          onPress={() => {
            // Navigate using the `navigation` prop that you received
            Linking.openURL('https://support-informatique.ch');
          }}
        />

      </DrawerContentScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    height: '100%',
    backgroundColor: '#333333',
    color: '#fff',
    paddingTop: 20,
  },
  tabView: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    overflow: 'visible'
  },
  tabText: {
    color: 'white',
    fontSize: 200
  }
});

