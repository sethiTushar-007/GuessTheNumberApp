import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';

const StartGameScreen = props => {
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const updateLayout = () => {
        setButtonWidth(Dimensions.get('window').width / 4);
    }

    useEffect(() => {
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    }, []);

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber<=0 || chosenNumber>99){
            Alert.alert(
                'Invalid number!', 
                'Number has to be a number between 1 and 99.', 
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
            );
            return;
        }
        setConfirmed(true);
        setSelectedNumber(parseInt(enteredValue));
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = 
        <Card style={styles.summaryContainer}>
            <Text style={DefaultStyles.bodyText}>You selected</Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton onPress={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
        </Card>
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.screen}>
                        <Text style={{...DefaultStyles.titleText, ...styles.title}}>Start a New Game!</Text>
                        <Card style={styles.inputContainer}>
                            <Text style={DefaultStyles.bodyText}>Select a Number</Text>
                            <Input
                                value={enteredValue}
                                style={styles.input} 
                                blurOnSubmit 
                                autoCapitalize='none' 
                                autoCorrect={false} 
                                keyboardType='numeric' 
                                maxLength={2}
                                onChangeText = {numberInputHandler}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{width: buttonWidth}}>
                                    <Button title="Reset" color={Colors.accent} onPress={resetInputHandler}/>
                                </View>
                                <View style={{width: buttonWidth}}>
                                    <Button title="Confirm" color={Colors.primary} onPress={confirmInputHandler}/>
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center',
    },
    input: {
        width: 50,
        textAlign: 'center',
        marginVertical: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center',
        paddingHorizontal: 20
    },
});

export default StartGameScreen;