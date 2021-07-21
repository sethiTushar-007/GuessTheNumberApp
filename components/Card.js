import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card = props => {
    return <View style={{...styles.card, ...props.style}}>{props.children}</View>
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        paddingVertical: 20,
        borderRadius: 10,
        // shadow properties only work in IOS
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        // to use shadow in android, use default Material Design 'elevation'
        elevation: 8,
    }
});

export default Card;