import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Button
} from "react-native";

// 보통 Splash Screen으로 로그인화면이 나오기전 애니메이션이나 회사로고나 이런 목적으로 나오는 화면이다 
// 특별히 지금은 꾸미지 않는다 
export default class LoadingScreen extends Component {
    constructor(props) {
        super(props)

        // 아래 부분은 임시 처리 
        //auth( (user) => {
        //    if(!user) {
                props.navigation.navigate('Auth');
        //    } else {
        //        this.props.navigation.navigate('Main');
        //    }
        //});

        // 여기도 임시처리이다. 강제로 로그인 시킨다 원래는 서버에서 인증이 맞다 
        const param = props.navigation.state.params;
        //console.log(param);
        if(param !== undefined ){
            if(param.isLogin){
                props.navigation.navigate('Main');
            }           
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>loading....</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        flexDirection: 'column',
    }
});