import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from "react-native";
import moment from 'moment';
import { IC_MASK } from '../../utils/Icons';
import { colors } from '../../utils/Styles';

class ChatroomListItem extends Component {

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this.props.onPress}
                >
                    <View style={styles.wrapper}>
                        <Image style={styles.img} source={this.props.item.img ? this.props.item.img : IC_MASK} />
                        <View style={styles.viewContent}>
                            <View style={styles.viewTop}>
                                <Text style={styles.txtDisplayName}>{this.props.item.displayName}</Text>
                                {this.renderCount()}
                            </View>
                            <View style={styles.viewBottom}>
                                <Text style={styles.txtMsg}>{this.props.item.msg}</Text>
                                <Text style={styles.txtDate}>{moment(this.props.item.date).fromNow()}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    
    renderCount = () => {
        if (this.props.item.count) {
            return (
                <View style={styles.viewCount}>
                    <Text style={styles.txtCount}>{this.props.item.count}</Text>
                </View>
            );
        }
        return null;
    }
}
export default ChatroomListItem;

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
    viewContent: {
        flexDirection: 'column',
        flex: 1,
        paddingRight: 20 ,
    },
    viewTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    txtDisplayName: {
        fontSize: 14 ,
        color: colors.dusk,
    },
    viewCount: {
        width: 16 ,
        height: 16 ,
        borderRadius: 8 ,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(80,227,194)',
    },
    txtCount: {
        fontSize: 10 ,
        color: 'white',
    },
    viewBottom: {
        marginTop: 8 ,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    txtMsg: {
        fontSize: 12 ,
        color: colors.dusk,
        maxWidth: 150 ,
    },
    txtDate: {
        fontSize: 12 ,
        color: colors.blueyGray,
        textAlign: 'right',
    },
});