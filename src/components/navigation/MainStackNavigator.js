import { createStackNavigator } from 'react-navigation';
import { commonNavigationOptions } from './NavigationOptions';



import MainTabNavigator, { MainTabNavigationOptions } from './MainTabNavigator';

import Profile from '../screens/Main/Profile';
import SearchUser from '../screens/Main/SearchUser';
import Chat from '../screens/Main/Chat';
import NotFound from '../screens/NotFoundScreen';

const routeConfig = {
    MainTab: { screen: MainTabNavigator, navigationOptions: MainTabNavigationOptions },
    SearchUser: { screen: SearchUser },
    Chat: { screen: Chat },
    NotFound: { screen: NotFound }
};

const NavigatorConfig = {
    initialRouteName: 'MainTab',
    gesturesEnabled: true,
    navigationOptions: commonNavigationOptions
}

const MainStackNavigator = createStackNavigator(routeConfig, NavigatorConfig);

const rootRouteConfig = {
    MainRoot: { screen: MainStackNavigator },
    Profile: { screen: Profile }
}

const rootNavigatorConfig = {
    mode: 'modal',
    navigationOptions: {
        header: null
    }
}

const RootNavigator = createStackNavigator(rootRouteConfig, rootNavigatorConfig);

export default RootNavigator;

