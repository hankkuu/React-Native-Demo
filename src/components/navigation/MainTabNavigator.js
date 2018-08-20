import { Platform, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import React from 'react';

import Friend from '../screens/Tab/Friend';
import Message from '../screens/Tab/Message';
import Settings from '../screens/Tab/Settings';

import { IC_MASK, IC_ADD } from '../../utils/Icons';
import { colors, statusBarHeight } from '../../utils/Styles';

const Navigator = createMaterialTopTabNavigator({
    Friend: { screen: Friend },
    Message: { screen: Message },
    Settings: { screen: Settings }
}, {
        navigationOptions: ({ navigation, screenProps }) => ({
            tabBarVisible: true,
            tabBarLabel: ({ focused }) => {
                const { routeName } = navigation.state;
                switch (routeName) {
                    case 'Friend':
                        return <Text style={[styles.txt, { opacity: focused ? 1 : 0.8 }]}>
                            {('FRIEND')}  <Text style={styles.txtSub}>24</Text>
                        </Text>;
                    case 'Message':
                        return <Text style={[styles.txt, { opacity: focused ? 1 : 0.8 }]}>
                            {('MESSAGE')}  <Text style={styles.txtSub}>8</Text>
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
    title: 'Talk Talk',
    headerLeft: 
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate('Profile', { user: firebase.auth().currentUser })}
      >
        <Image style={styles.imgHeaderLeft} source={IC_MASK}/>
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