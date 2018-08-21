import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from "react-native";

import { IC_MASK } from '../../utils/Icons';
import { ratio, colors, screenWidth } from '../../utils/Styles';

class UserListItem extends Component {
    // // 이렇게도 할수는 있다... 
    // static defaultProps = {
    //     style: styles.wrapper,
    //   };
    // // 사용할때는 아래와 같이 
    //   <View style={this.props.style}>

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this.props.onPress}
                    onLongPress={this.props.onLongPress}
                >
                    <View style={styles.wrapper}>
                        <Image style={styles.img} source={this.props.item.img ? this.props.item.img : IC_MASK} />
                        <Text style={styles.txt}>{this.props.item.displayName}</Text>
                        {
                            this.props.item.statusMsg
                                ? <Text style={styles.txtRight}>{this.props.item.statusMsg}</Text>
                                : null
                        }
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
export default UserListItem;

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    wrapper: {
        backgroundColor: 'white',
        height: 80 * ratio,
        borderBottomWidth: 1,
        borderColor: 'rgb(247,248,251)',

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    img: {
        marginHorizontal: 20 * ratio,
        width: 40 * ratio,
        height: 40 * ratio,
    },
    txt: {
        width: 100 * ratio,
        fontSize: 14 * ratio,
        color: colors.dusk,
    },
    txtRight: {
        position: 'absolute',
        right: 20 * ratio,
        fontSize: 12 * ratio,
        color: colors.dusk,
        maxWidth: 134.2 * ratio,
        borderWidth: 1,
        borderColor: colors.paleGray,
        paddingHorizontal: 8 * ratio,
        paddingVertical: 4 * ratio,
    },
});