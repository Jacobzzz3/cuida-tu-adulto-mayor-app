import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import { notificationService } from './src/services/NotificationService'; 


notificationService.createChannels();


messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Mensaje capturado en segundo plano:', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);