import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';

const GameOverScreen = props => {
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

    const updateLayout = () => {
        setAvailableDeviceWidth(Dimensions.get('window').width);
        setAvailableDeviceHeight(Dimensions.get('window').height);
    }

    useEffect(() => {
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    }, []);


    return (
        <ScrollView>
            <View style={styles.screen}>
                <Text style={DefaultStyles.titleText}>The Game is Over!</Text>
                <View style={{
                    ...styles.imageContainer,
                    width: availableDeviceWidth * 0.7,
                    height: availableDeviceWidth * 0.7,
                    borderRadius: availableDeviceWidth * 0.7 / 2,
                    marginVertical: availableDeviceHeight / 30
                }}>
                    <Image
                        source={require('../assets/success.png')} 
                        //source={{uri: 'https://tgr.scdn2.secure.raxcdn.com/images/wysiwyg/_article/istockphoto-485966046-612x612.jpg'}}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
                <View style={{
                    ...styles.resultContainer,
                    marginVertical: availableDeviceHeight / 60
                }}>
                    <Text style={{
                        ...DefaultStyles.bodyText, 
                        ...styles.resultText,
                        fontSize: availableDeviceHeight < 400 ? 16 : 20
                    }}>
                        Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
                    </Text>
                </View>
                <MainButton onPress={props.onNewGame}>
                    NEW GAME
                </MainButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    },
    imageContainer: {
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        marginHorizontal: 30,
    },
    resultText: {
        textAlign: 'center',
        marginVertical: 20,
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
    }
});

export default GameOverScreen;