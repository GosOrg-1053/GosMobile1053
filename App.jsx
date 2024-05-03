import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Intro from './Components/pages/Intro';
import LogIn from './Components/pages/LogIn';
import Main from './Components/pages/Main';
const Stack = createStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }}/>
        <Stack.Screen name="LogIn" component={LogIn} options={{ title: 'Авторизация' }}/>
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false, gestureEnabled: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
