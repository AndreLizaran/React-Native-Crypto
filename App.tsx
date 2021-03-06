// Modules
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { LogBox } from 'react-native';

// Colors
import { backgroundColor } from './utils/colors';

// Screens
import Home from './screens/Home';

// States
import GeneralState from './states/GeneralState';
import Favorites from './screens/Favorites';
import User from './screens/User';

LogBox.ignoreAllLogs();

const Tab = createBottomTabNavigator();

const myTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: backgroundColor,
    background: backgroundColor,
    card: backgroundColor,
    border: backgroundColor,
    notification: backgroundColor,
    text: 'white',
  },
};

function App() {
  return (
    <NavigationContainer theme={myTheme}>
      <GeneralState>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
              let iconName = 'home';
              if (route.name === 'Home') iconName = 'home';
              else if (route.name === 'Favorites') iconName = 'star';
              else iconName = 'user';
              // @ts-ignore
              return <AntDesign name={iconName} size={24} color={color} />;
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { height: 70, paddingBottom: 10, paddingTop: 5 },
          })}
        >
          <Tab.Screen name='Home' component={Home} />
          <Tab.Screen name='Favorites' component={Favorites} />
          <Tab.Screen name='User' component={User} />
        </Tab.Navigator>
      </GeneralState>
    </NavigationContainer>
  );
}

export default App;
