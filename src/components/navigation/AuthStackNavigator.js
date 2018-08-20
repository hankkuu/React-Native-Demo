import { createStackNavigator } from 'react-navigation';
//import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';
import { commonNavigationOptions } from './NavigationOptions';

import LoginScreen from '../screens/Auth/LoginScreen';
import SignipScreen from '../screens/Auth/SignupScreen';
import FindPwScreen from '../screens/Auth/FindPwScreen';
import NotFoundScreen from '../screens/NotFoundScreen';

const StackNavigator = createStackNavigator({
    Login: { screen: LoginScreen },
    Signup: { screen: SignipScreen },
    FindPw: { screen: FindPwScreen },
    NotFound: { screen: NotFoundScreen }
}, {
    initialRouteName: 'Login',
    navigationOptions: commonNavigationOptions,
    //transitionConfig: () => ({ screenInterpolator: StackViewStyleInterpolator.forHorizontal }),
})

export default StackNavigator;