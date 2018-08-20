import { createSwitchNavigator } from 'react-navigation';

import LoadingScreen from '../screens/LoadingScreen';
import AuthStackNavigator from '../navigation/AuthStackNavigator';
import MainStackNavigator from '../navigation/MainStackNavigator';

export default createSwitchNavigator({
    Loading: { screen: LoadingScreen },
    Auth: { screen: AuthStackNavigator },
    Main: { screen: MainStackNavigator }    
}, {
    initialRouteName: 'Loading'
});