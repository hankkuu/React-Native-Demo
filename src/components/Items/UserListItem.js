import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from "react-native";

import { IC_MASK } from '../../utils/Icons';
import { colors } from '../../utils/Styles';

class UserListItem extends Component {
    // // 이렇게도 할수는 있다... 
    // static defaultProps = {
    //     style: styles.wrapper,
    //   };
    // // 사용할때는 아래와 같이 
    //   <View style={this.props.style}>

    constructor(props) {
        super(props);
        this.state = {
            name: props.item.displayName,
        }
    }

    componentDidUpdate() {
        console.log("componentDidUpdate - user List");
        //console.log(this.state.name);
    }

    render() {
        //console.log(this.state.name);
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
        height: 80 ,
        borderBottomWidth: 1,
        borderColor: 'rgb(247,248,251)',

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    img: {
        marginHorizontal: 20 ,
        width: 40 ,
        height: 40 ,
    },
    txt: {
        width: 100 ,
        fontSize: 14 ,
        color: colors.dusk,
    },
    txtRight: {
        position: 'absolute',
        right: 20 ,
        fontSize: 12 ,
        color: colors.dusk,
        maxWidth: 134.2 ,
        borderWidth: 1,
        borderColor: colors.paleGray,
        paddingHorizontal: 8 ,
        paddingVertical: 4 ,
    },
});