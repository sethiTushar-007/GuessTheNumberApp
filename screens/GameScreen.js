import React, {useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { ScreenOrientation } from 'expo-screen-orientation';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

const renderListItem = (value, numOfRound) => (
    <View key={value} style={styles.listItem}>
        <Text style={DefaultStyles.bodyText}>#{numOfRound}</Text>
        <Text style={DefaultStyles.bodyText}>{value}</Text>
    </View>
);

const GameScreen = props => {
    //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    const {userChoice, onGameOver} = props;

    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

    const initialGuess = generateRandomBetween(1, 99, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

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

    useEffect(() => {
        if (currentGuess == userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert(
                "Dont't lie!", 
                "You know that this is wrong...", 
                [{text: 'Sorry!', style: 'cancel'}]
            );
            return;
        }
        if (direction ==='lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses([nextNumber.toString(), ...pastGuesses]);
    }

    let gameControls = (
        <>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={{
                ...styles.buttonContainer,
                marginTop: availableDeviceHeight > 600 ? 20 : 10,
            }}>
                <MainButton onPress={() => nextGuessHandler('lower')}>
                    <Ionicons name="md-remove" size={24} color="white"/>
                </MainButton>
                <MainButton onPress={() => nextGuessHandler('greater')}>
                    <Ionicons name="md-add" size={24} color="white"/>
                </MainButton>
            </Card>
        </>
    );

    if (availableDeviceHeight < 500) {
        gameControls = (
            <View style={styles.controls}>
                <MainButton onPress={() => nextGuessHandler('lower')}>
                    <Ionicons name="md-remove" size={24} color="white"/>
                </MainButton>
                <NumberContainer>{currentGuess}</NumberContainer>
                <MainButton onPress={() => nextGuessHandler('greater')}>
                    <Ionicons name="md-add" size={24} color="white"/>
                </MainButton>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.titleText}>Opponent's Guess</Text>
            {gameControls}
            <View style={{
                ...styles.listContainer,
                width: availableDeviceWidth > 350 ? '60%' : '80%',
            }}>
                <FlatList
                    contentContainerStyle={styles.list}
                    keyExtractor={(item) => item}
                    data={pastGuesses}
                    renderItem={(itemData) => renderListItem(itemData.item, pastGuesses.length - itemData.index)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 400,
        maxWidth: '90%',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    },
    listContainer: {
        flex: 1,
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    listItem: {
        flexDirection: 'row',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        width: '100%'
    }
});

export default GameScreen;