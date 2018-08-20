import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Button
} from "react-native";

import { IC_MASK } from '../../utils/Icons';
import { ratio, colors } from '../../utils/Styles';

export default class LoadingScreen extends Component {
    constructor(props) {
        super(props)

        // 아래 부분은 임시 처리 
        //auth( (user) => {
        //    if(!user) {
        this.props.navigation.navigate('Auth');
        //    } else {
        //        this.props.navigation.navigate('Main');
        //    }
        //});

        const param = this.props.navigation.state.params;
        console.log(param);
        if(param !== undefined ){
            if(param.isLogin){
                this.props.navigation.navigate('Main');
            }           
        }

    }
    render() {
        return (
            <View style={styles.container}>
                {/* <Animated.Image
                    source={IC_MASK}
                    style={{
                        width: 60 * ratio,
                        height: 60 * ratio,
                        marginBottom: 16 * ratio,
                        transform: [{ rotate: this.spin }]
                    }}
                /> */}
                <Animated.Text
                    animation='fadeIn'
                    iterationcount={'infinite'}
                    //direction='alternate'
                    style={{
                        color: colors.dorgerBlue,
                        fontSize: 16 * ratio
                    }}
                >
                    loading....
                </Animated.Text>
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