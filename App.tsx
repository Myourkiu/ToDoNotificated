import { NavigationContainer } from '@react-navigation/native';
import './global.css';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '~/pages/home';
import { HomeIcon } from 'lucide-react-native';
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#202020',
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
