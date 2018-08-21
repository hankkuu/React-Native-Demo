import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

import { ratio, colors } from '../../utils/Styles';

class EmptyListItem extends Component {

    render() {
        return (
            <View
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'stretch',
            }}
          >
            <Text
              style={[
                {
                  fontSize: 14 * ratio,
                  color: 'rgb(155,155,155)',
                  alignSelf: 'center',
                },
              ]}
            >{this.props.children}</Text>
          </View>
        );
    }
}
export default EmptyListItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});