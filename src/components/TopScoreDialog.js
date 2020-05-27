import React from 'react';
import { View } from 'react-native';
import Dialog from "react-native-dialog";

export default TopScoreDialog = ({dialogVisible, handleSubmit, updateName }) => {
    return (
        <View>
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>You reached the Top 10!!!</Dialog.Title>
                <Dialog.Input
                    label="Enter your name"
                    style={{borderBottomColor: '#464646', borderBottomWidth: 1}}
                    onChangeText={text => updateName(text)}
                 />
                <Dialog.Button label="OK" onPress={handleSubmit} />
            </Dialog.Container>
      </View>
    );
}