import React from 'react';
import { Platform, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { createMaterialTopTabNavigator } from 'react-navigation';

import Friend from '../screens/Tab/Friend';
import Message from '../screens/Tab/Message';
import Settings from '../screens/Tab/Settings';

import { IC_ADD } from '../../utils/Icons';
import { colors, statusBarHeight } from '../../utils/Styles';

function fake() {
    // 이 부분은 서버에서 친구수를 알아오고 나서 저장된 데이터를 불러와야 겠다 
    let count = 0;
    for (let u of global.users) {
        if (u.isFriend === true) {
            count++;
        }
    }
    return count;
};
function currnetUser() {
    for (let u of global.users) {
        if (u.isMe === true) {
            return u
        }
    }
}
// 일단 위의 매서드는 임시로 만들었다......... 정확히하려면 푸시나 전달받아야 한다 

const Navigator = createMaterialTopTabNavigator({
    Friend: { screen: Friend },
    Message: { screen: Message },
    Settings: { screen: Settings }
}, {
        navigationOptions: ({ navigation }) => ({
            tabBarVisible: true,
            tabBarLabel: ({ focused }) => {
                const { routeName } = navigation.state;
                //console.log(dummy());
                switch (routeName) {
                    case 'Friend':
                        return <Text style={[styles.txt, { opacity: focused ? 1 : 0.5 }]}>
                            {('FRIEND')}  <Text style={styles.txtSub}>{fake()}</Text>
                        </Text>;
                    case 'Message':
                        return <Text style={[styles.txt, { opacity: focused ? 1 : 0.5 }]}>
                            {('MESSAGE')}  <Text style={styles.txtSub}>0</Text>
                        </Text>;
                    case 'Settings':
                        return <Text style={[styles.txt, { opacity: focused ? 1 : 0.5 }]}>
                            {'Settings'}
                        </Text>;
                }
                return null;
            },
        }),
        animationEnabled: true,
        swipeEnabled: Platform.select({ android: true, ios: false }),   // 화면 옆으로 당기면 탭이동
        tabBarOptions: {
            indicatorStyle: {
                backgroundColor: 'red',
            },
            style: {
                height: 50,
                justifyContent: 'center',
                backgroundColor: colors.dodgerBlue,
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
      paddingTop: statusBarHeight, 
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
      marginLeft: 20,
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