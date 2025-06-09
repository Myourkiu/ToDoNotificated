import { NavigationContainer } from '@react-navigation/native';
import './global.css';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '~/pages/home';
const Tab = createBottomTabNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name='Home' component={Home} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
