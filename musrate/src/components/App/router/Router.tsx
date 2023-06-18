import {NavigationContainer} from '@react-navigation/native';
import Home from '../../../screens/Home';
import React from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../../../screens/Login';

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen name={'Home'} component={Home} />
        <Stack.Screen name={'Login'} component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
