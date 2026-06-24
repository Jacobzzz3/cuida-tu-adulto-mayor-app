import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import messaging from '@react-native-firebase/messaging';
import HomeScreen from '../screens/main/HomeScreen';
import MonitoringScreen from '../screens/main/MonitoringScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import { notificationService } from '../services/NotificationService';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  
  useEffect(() => {
    notificationService.createChannels();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage.notification) {
        notificationService.sendLocalNotification(
          remoteMessage.notification.title || 'Alerta',
          remoteMessage.notification.body || 'Nueva alerta recibida'
        );
      }
    });

    return unsubscribe;
  }, []); 

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
            if (route.name === 'Inicio') {iconName = 'home';} 
            else if (route.name === 'Monitoreo') {iconName = 'favorite';} 
            else if (route.name === 'Configuración') {iconName = 'settings';}
            return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#4CAF50', 
        },
        headerTintColor: '#fff', 
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Monitoreo" component={MonitoringScreen} />
      <Tab.Screen name="Configuración" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default AppTabs;