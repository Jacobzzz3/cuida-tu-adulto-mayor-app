import PushNotification, { ReceivedNotification } from 'react-native-push-notification';
import { Platform } from 'react-native';

class NotificationService {
  constructor() {
    this.configure();
  }

  configure() {
    PushNotification.configure({
      onRegister: function (token) {},
      onNotification: function (notification: Omit<ReceivedNotification, 'userInfo'>) {},
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });
  }

  createChannels() {
    PushNotification.createChannel(
      {
        channelId: 'fall-detection-channel',
        channelName: 'Alertas de Caída',
        channelDescription: 'Notificaciones críticas para caídas detectadas',
        soundName: 'default',
        importance: 4, 
        vibrate: true,
      },
      (created: boolean) => {}
    );
  }

  sendLocalNotification(title: string, message: string) {
    this.createChannels();
    PushNotification.localNotification({
      channelId: 'fall-detection-channel',
      autoCancel: true,
      title: title,
      message: message,
      vibrate: true,
      vibration: 500, 
      playSound: true,
      soundName: 'default',
    });
  }
}

export const notificationService = new NotificationService();