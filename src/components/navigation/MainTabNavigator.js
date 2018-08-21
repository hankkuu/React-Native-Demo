import { Platform, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import React from 'react';

import Friend from '../screens/Tab/Friend';
import Message from '../screens/Tab/Message';
import Settings from '../screens/Tab/Settings';

import { IC_MASK, IC_ADD } from '../../utils/Icons';
import { colors, statusBarHeight } from '../../utils/Styles';

function dummy() {
    let dummyData = [
        { uid: 0, img: '', displayName: '임형관', statusMsg: 'hello' },
        { uid: 1, img: '', displayName: '정동민', statusMsg: 'hello' },
        { uid: 2, img: '', displayName: '강한규', statusMsg: 'hello' },
        { uid: 3, img: '', displayName: '김성기', statusMsg: 'hello' },
        { uid: 4, img: '', displayName: '김윤희', statusMsg: 'hello' },
        { uid: 5, img: '', displayName: '이원지', statusMsg: 'hello' },
    ]    
   return dummyData.length;
};

function currnetUser() {
    let me = {uid: 2, img: require('../../../assets/img/kanghangyu.png'), displayName: '강한규', statusMsg: 'hello' }
    return me;
}

const Navigator = createMaterialTopTabNavigator({
    Friend: { screen: Friend },
    Message: { screen: Message },
    Settings: { screen: Settings }
}, {
        navigationOptions: ({ navigation, screenProps }) => ({
            tabBarVisible: true,
            tabBarLabel: ({ focused }) => {
                const { routeName } = navigation.state;
                //console.log(dummy());
                switch (routeName) {
                    case 'Friend':
                        return <Text style={[styles.txt, { opacity: focused ? 1 : 0.8 }]}>
                            {('FRIEND')}  <Text style={styles.txtSub}>{dummy()}</Text>
                        </Text>;
                    case 'Message':
                        return <Text style={[styles.txt, { opacity: focused ? 1 : 0.8 }]}>
                            {('MESSAGE')}  <Text style={styles.txtSub}>0</Text>
                        </Text>;
                    case 'Settings':
                        return <Text style={[styles.txt, { opacity: focused ? 1 : 0.8 }]}>
                            {'Settings'}
                        </Text>;
                }
                return null;
            },
        }),
        animationEnabled: true,
        swipeEnabled: Platform.select({ android: true, ios: false }),
        tabBarOptions: {
            indicatorStyle: {
                backgroundColor: 'white',
            },
            style: {
                height: 40,
                justifyContent: 'center',
                backgroundColor: colors.dodgerBlue,
                borderTopColor: 'transparent', borderTopWidth: 0, elevation: 0,
            },
        },
    })
export default Navigator;

export const MainTabNavigationOptions = ({navigation}) => ({
    title: 'ROA Love Talk',
    headerLeft: 
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate('Profile', { user: currnetUser() })}
      >
        <Image style={styles.imgHeaderLeft} source={currnetUser().img}/>
      </TouchableOpacity>,
    headerRight:
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate('SearchUser')}
      >
        <Image style={styles.imgHeaderRight} source={IC_ADD}/>
      </TouchableOpacity>,
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: statusBarHeight, // false to get height of android too.
    },
    imgHeaderLeft: {
      marginLeft: 20,
      width: 28,
      height: 28,
      borderRadius: 14,
      borderColor: 'white',
      borderWidth: 1,
    },
    imgHeaderRight: {
      width: 24,
      height: 24,
      right: 12,
      tintColor: 'white',
    },
    txt: {
      color: 'white',
      fontSize: 15,
    },
    txtSub: {
      color: 'white',
      fontSize: 15,
      fontWeight: '700', 
    },
  });