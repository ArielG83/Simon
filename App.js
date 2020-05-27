import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'
import GameScreen from './src/components/GameScreen'
import ScoreBoard from './src/components/ScoreBoard'
import store from './src/store'

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="GameScreen" >
            <Stack.Screen 
              name="GameScreen" 
              component={GameScreen} 
              options={{ 
                title: 'Simon', 
                headerStyle: {
                  backgroundColor: '#34aeeb',
                },
                headerTitleStyle: { 
                  alignSelf: 'center',
                  fontSize: 24,
                  textTransform: 'uppercase'
                },
              }} />
            <Stack.Screen 
              name="ScoreBoard" 
              component={ScoreBoard} 
              options={{ 
                title: 'Top 10',
                headerStyle: {
                  backgroundColor: '#34aeeb',
                },
                headerTitleStyle: { 
                  alignSelf: 'center'
                },
              }}
            />
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;