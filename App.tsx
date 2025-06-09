import { NavigationContainer } from '@react-navigation/native';
import './global.css';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '~/pages/home';
import { HomeIcon } from 'lucide-react-native';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { Platform } from 'react-native';
const Tab = createBottomTabNavigator();


export default function App() {
  Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,  
  }),
});

  useEffect(() => {
  (async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão para notificações negada!');
    }
  })();
}, []);
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#1f1f1f',
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: '#6a2ec9',
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
