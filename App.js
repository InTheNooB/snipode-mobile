import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import About from './components/screens/About';
import Home from './components/screens/Home';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { StyleSheet } from "react-native";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Code Snippets"
        screenOptions={{
          tabBarStyle: { borderTopWidth: 0 },
          headerStyle: {
            backgroundColor: '#111111',
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
        drawerContent={props => {
          return (
            <DrawerContentScrollView {...props} style={styles.drawerContent}>
              <DrawerItemList {...props} />
              <DrawerItem label="Logout" onPress={() => props.navigation.navigate("About")} style={styles.tab} />
            </DrawerContentScrollView>
          )
        }}
      >
        <Drawer.Screen name="Code Snippet" component={Home} />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    height: '100%'
  },
  tab: {
    backgroundColor: 'red',
    height: 200
  }
});
