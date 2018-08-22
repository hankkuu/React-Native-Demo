import { createSwitchNavigator } from 'react-navigation';

import LoadingScreen from '../screens/LoadingScreen';
import AuthStackNavigator from '../navigation/AuthStackNavigator';
import MainStackNavigator from '../navigation/MainStackNavigator';

// 네비게이션에서 시작할 첫화면은 Switch navi로 한다 
// Stack navi로도 구현이 되지만 이전 화면을 기억해서 보안정보가 노출된다 
// 위의 단점을 해소못하는 것은 아니지만 매서드를 바꾸거나 dispatch() 를 사용해 reset 같은 처리를 해줘야 한다 
// 여기에 로그인 화면에 대한 방법이 나와 있다. -> https://reactnavigation.org/docs/en/auth-flow.html 
export default createSwitchNavigator({
    Loading: { screen: LoadingScreen },
    Auth: { screen: AuthStackNavigator },
    Main: { screen: MainStackNavigator }    
}, {
    initialRouteName: 'Loading'
});