/**
  Aplicación principal
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, LogBox } from 'react-native';
import { UserProvider } from './src/contexts/UserContext';
import MainNavigator from './src/navigation/MainNavigator';

LogBox.ignoreLogs([
  "Warning: Cannot update a component (`HomeScreen`) while rendering a different component (`FallDetectedModal`)."
]);

const App: React.FC = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <StatusBar 
          barStyle="light-content" 
          backgroundColor="#4CAF50" 
          translucent={false} 
        />
        <MainNavigator />
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;