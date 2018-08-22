import { createStackNavigator } from 'react-navigation';
import { commonNavigationOptions } from './NavigationOptions';
// 화면전환시 에니메이션 효과이다... 이런 디테일은 일단 뭐.. 옵션은 아래서 설정 
import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';

import LoginScreen from '../screens/Auth/LoginScreen';
import SignipScreen from '../screens/Auth/SignupScreen';
import FindPwScreen from '../screens/Auth/FindPwScreen';

const StackNavigator = createStackNavigator({
    Login: { screen: LoginScreen },
    Signup: { screen: SignipScreen },
    FindPw: { screen: FindPwScreen }
}, {
    initialRouteName: 'Login',
    navigationOptions: commonNavigationOptions,
    transitionConfig: () => ({ screenInterpolator: StackViewStyleInterpolator.forFade }),
})

export default StackNavigator;