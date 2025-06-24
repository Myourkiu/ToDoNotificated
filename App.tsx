import { NavigationContainer } from '@react-navigation/native';
import './global.css';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '~/pages/home';
import {Feather} from '@expo/vector-icons'
const Tab = createBottomTabNavigator();
export default function App() {
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
            tabBarIcon: ({ color }) => <Feather name='home' color={color} size={20} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
