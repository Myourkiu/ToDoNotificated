import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const InitializeNotifications = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    console.warn('Permissão para notificações não concedida!');
    return;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  Notifications.setNotificationHandler({
    //@ts-ignore
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
};