import * as React from 'react';
import { Button, View, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
 

function HelloScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6ED4C8',
      }}>
      <Button
        title="Go to main screen"
        onPress={() => navigation.navigate('Main')}
      />
    </View>
  );
}

const Tab = createBottomTabNavigator()


function MainScreen() {
  return (
          <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'map') {
              iconName = focused ? 'ios-map' : 'ios-map-outline';
            } else if (route.name === 'list') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
      <Tab.Screen name="list" component={ListTab} />
      <Tab.Screen name="map" component={MapTab} />
    </Tab.Navigator>
  );
}

function ListTab() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    </View>
  );
}


function MapTab() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
const Stack = createStackNavigator();

export default class App extends React.Component {

state = {
  location: {},
}

componentWillMount(){
  this._getLocation();
}


_getLocation = async () => {
  const {status} = await Permissions.askAsync(Permissions.LOCATION);

  if (status !== 'granted') {
     console.log("location permission denied")
      alert("Location permission denied. Some services may not work");
  }

const location = await Location.getCurrentPositionAsync();

this.setState ({
  location,
});
}

render () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Hello">
        <Stack.Screen name="Hello" component={HelloScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
}