import { createStackNavigator } from 'react-navigation';
import { commonNavigationOptions } from './NavigationOptions';
import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';

import MainTabNavigator, { MainTabNavigationOptions } from './MainTabNavigator';

import Profile from '../screens/main/Profile';
import SearchUser from '../screens/main/SearchUser';
import Chat from '../screens/main/Chat';

// MainTab을 포함하는 네비게이터 
const routeConfig = {
    MainTab: { screen: MainTabNavigator, navigationOptions: MainTabNavigationOptions },
    SearchUser: { screen: SearchUser },
    Chat: { screen: Chat },
};
const NavigatorConfig = {
    initialRouteName: 'MainTab',
    gesturesEnabled: true,      // IOS에서 화면 해제관련인데 정확히는 모르겠다 화면 해제된다고 한다 
    navigationOptions: commonNavigationOptions,
    transitionConfig: () => ({ screenInterpolator: StackViewStyleInterpolator.forFadeFromBottomAndroid }),
}
const MainStackNavigator = createStackNavigator(routeConfig, NavigatorConfig);

// 기본 RootStack을 지정하는 네비게이터 
const rootRouteConfig = {
    MainRoot: { screen: MainStackNavigator },
    Profile: { screen: Profile }
}
const rootNavigatorConfig = {
    mode: 'card',       // default screen transitions.
    navigationOptions: {
        header: null
    }
}
const RootNavigator = createStackNavigator(rootRouteConfig, rootNavigatorConfig);

export default RootNavigator;

