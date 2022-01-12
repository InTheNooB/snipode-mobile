import React, { useState, useEffect, useRef } from 'react'
import {
    TextInput,
    Text,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    Platform
} from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { SERVER, ERRORS, STYLE } from '../../api/ConstantsAPI';
import * as Clipboard from 'expo-clipboard';

const AddCodeSnippet = ({ navigation }) => {

    const [newCodeSnippetTitle, setNewCodeSnippetTitle] = useState(null)
    const [newCodeSnippetDescription, setNewCodeSnippetDescription] = useState(null)
    const [newCodeSnippetLanguage, setNewCodeSnippetLanguage] = useState(null)
    const [languagesList, setLanguagesList] = useState([]);
    const [disableAddButton, setDisableAddButton] = useState(false)
    const [showTitleIsRequired, setShowTitleIsRequired] = useState(false)
    const [showLanguageIsRequired, setShowLanguageIsRequired] = useState(false)
    const [showCodeIsRequired, setShowCodeIsRequired] = useState(false)

    const addNewCodeSnippet = async () => {
        setDisableAddButton(true);
        let newCodeSnippetCode = await Clipboard.getStringAsync();
        if (newCodeSnippetTitle && newCodeSnippetLanguage && newCodeSnippetTitle != '' && newCodeSnippetLanguage != '' && newCodeSnippetCode != '') {
            fetch(`http://${SERVER.IP}:${SERVER.PORT}/api/addCodeSnippet`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: newCodeSnippetTitle,
                    description: newCodeSnippetDescription,
                    language: newCodeSnippetLanguage,
                    code: newCodeSnippetCode
                })
            }).then(res => res.json())
                .then(res => {
                    if (res.result === 'OK') {
                        navigation.navigate('Code Snippets', { showAddedCodeSnippetToast: true })

                        setShowTitleIsRequired(false)
                        setShowLanguageIsRequired(false)
                        setShowCodeIsRequired(false)

                        setNewCodeSnippetTitle(null);
                        setNewCodeSnippetDescription(null);
                        setNewCodeSnippetLanguage(null);
                    } else {
                        console.warn(ERRORS.API_CALL_ERROR);
                    }

                    setDisableAddButton(false)
                });
        } else {
            setDisableAddButton(false)
            setShowTitleIsRequired(1 && !newCodeSnippetTitle)
            setShowLanguageIsRequired(1 && !newCodeSnippetLanguage)
            setShowCodeIsRequired(1 && !newCodeSnippetCode)
        }
    };

    useEffect(() => {
        fetch(`http://${SERVER.IP}:${SERVER.PORT}/api/getLanguagesList`)
            .then(res => res.json())
            .then((data) => {
                if (data.result === 'OK') {
                    setLanguagesList(data.languagesList);
                } else {
                    console.warn(ERRORS.API_CALL_ERROR);
                }
            });
    }, [])

    const styles = StyleSheet.create({
        container: {
            backgroundColor: STYLE.backgroundColor,
            flex: 1,
            paddingTop: 30
        },
        label: {
            color: 'white',
            textAlign: 'center',
            fontFamily: 'BeVietnamProBold',
            fontSize: 20,
            marginBottom: 10,
        },
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            backgroundColor: 'white',
            borderRadius: 20,
            fontFamily: 'BeVietnamProBold',
            marginBottom: 30,
        },
        picker: {
            marginBottom: 30,
            backgroundColor: Platform.OS === 'ios' ? STYLE.backgroundColor : 'white'
        },
        addButton: {
            shadowColor: 'rgba(255,255,255,0.6)',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.5,
            shadowRadius: 3,
            elevation: 7, // Android
            backgroundColor: disableAddButton ? 'gray' : STYLE.backgroundColor,
            borderRadius: 20,
            padding: 15,
            width: '75%',
            alignSelf: 'center',
            marginTop: 30,
            marginBottom: 20

        },
        addButtonText: {
            color: 'white',
            fontFamily: 'BeVietnamProBold',
            fontSize: 20,
            alignSelf: 'center'
        },
        requiredLabel: {
            color: 'red'
        }
    });

    return (
        <ScrollView
            style={styles.container}>
            <Text style={[styles.label, showTitleIsRequired ? styles.requiredLabel : undefined]}>Titre</Text>
            <TextInput
                placeholder='Amazing code !'
                style={styles.input}
                value={newCodeSnippetTitle}
                onChangeText={setNewCodeSnippetTitle}
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
                placeholder='Absolutely not from StackOverflow'
                style={styles.input}
                value={newCodeSnippetDescription}
                onChangeText={setNewCodeSnippetDescription}
            />
            <Text style={[styles.label, showLanguageIsRequired ? styles.requiredLabel : undefined]}>Language</Text>
            <Picker
                style={styles.picker}
                selectedValue={newCodeSnippetLanguage}
                onValueChange={itemValue => setNewCodeSnippetLanguage(itemValue)}
            >
                {
                    languagesList.map(language => <Picker.Item
                        color={Platform.OS === 'ios' ? 'white' : 'black'}
                        key={language.value}
                        label={language.displayName}
                        value={language.value}
                    />)
                }
            </Picker>
            <Text style={[styles.label, showCodeIsRequired ? styles.requiredLabel : undefined]}>{!showCodeIsRequired ? 'My code is in the clipboard ?' : 'Nothing was found in the clipboard...'}</Text>
            <TouchableHighlight
                style={styles.addButton}
                onPress={addNewCodeSnippet}
            >
                <Text style={styles.addButtonText}>Add new snippet !</Text>
            </TouchableHighlight>
        </ScrollView >
    )


}



export default AddCodeSnippet


