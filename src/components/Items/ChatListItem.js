import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import moment from 'moment';
import { LinearGradient } from 'expo';
import { colors } from '../../utils/Styles';
import { IC_MASK } from '../../utils/Icons';

class ChatListItem extends Component {

    render() {
        return (
            this.props.item.isPeer
                ? <View style={styles.wrapperPeer}>
                    <Image style={styles.imgPeer} source={IC_MASK} />
                    <Text style={styles.txtPeerMsg}>{this.props.item.message}</Text>
                    <Text style={styles.txtPeerDate}>
                        {`${moment(this.props.item.date).hour() + 9} : ${moment(this.props.item.date).minutes()}`}
                    </Text>
                </View>
                : <View style={styles.wrapperSelf}>
                    <Text style={styles.txtMyDate}>
                        {`${moment(this.props.item.date).hour() + 9} : ${moment(this.props.item.date).minutes()}`}
                    </Text>
                    <LinearGradient
                        colors={['rgb(100,199,255)', colors.dodgerBlue]} 
                        style={styles.myGradient}>
                        <Text style={styles.txtMyMsg}>
                            {this.props.item.message}
                        </Text>
                    </LinearGradient>
                </View>
        );
    }
}
export default ChatListItem;

const styles = StyleSheet.create({
    wrapperPeer: {
        minHeight: 48 ,
        width: '100%',
        marginTop: 20 ,

        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    imgPeer: {
        width: 32 ,
        height: 32 ,
        marginLeft: 20 ,
        marginRight: 8 ,
    },
    txtPeerMsg: {
        fontSize: 14 ,
        color: colors.dusk,
        marginRight: 8 ,
        backgroundColor: 'white',
        borderRadius: 3 ,
        borderWidth: 1,
        borderColor: colors.paleGray,
        padding: 12 ,
        shadowColor: colors.paleGray,
        shadowOffset: {
            width: 0,
            height: 2 ,
        },
    },
    txtPeerDate: {
        fontSize: 12 ,
        color: colors.cloudyBlue,
        marginRight: 20 ,
    },
    wrapperSelf: {
        minHeight: 48 ,
        width: '100%',
        marginTop: 20 ,

        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    txtMyDate: {
        fontSize: 12 ,
        color: colors.cloudyBlue,
        marginLeft: 20 ,
    },
    myGradient: {
        marginRight: 20 ,
        marginLeft: 8 ,
        borderRadius: 3 ,
    },
    txtMyMsg: {
        fontSize: 14 ,
        color: 'white',
        padding: 12 ,
    },
});