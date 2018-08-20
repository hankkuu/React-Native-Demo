import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

// Entry Point를 바로 Main.js로 잡는다 package.json 파일에서 설정만 하면 된다 (최신버전 기준) 구동에 사용되는 source 파일은 src 폴더에 둔다 
class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>App</Text>
            </View>
        );
    }
}
export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});