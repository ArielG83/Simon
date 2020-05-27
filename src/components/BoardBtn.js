import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

export default BoardBtn = ({color, onClick, btnOpacity}) => {
    return (
        <TouchableWithoutFeedback 
            style={{flex: 1}}
            underlayColor={color}
            onPress={() => onClick(color,true)}>
            <View style={{flex: 1, height:'100%', backgroundColor: color, opacity: btnOpacity ? 0.3 : 1}} />
        </TouchableWithoutFeedback >
    );
}