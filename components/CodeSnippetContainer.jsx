import React, { useEffect, useState, useContext } from 'react';
import CodeSnippetList from './CodeSnippetList';
import SearchBar from './SearchBar';
import ErrorsContext from '../utils/ErrorsContext';
import Storage from '../api/StorageAPI';
import io from 'socket.io-client';
import * as Notifications from 'expo-notifications';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-root-toast';


const askNotificationPermissions = async () => {
    // We need to ask for Notification permissions for ios devices
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted')
        console.log('Notification permissions granted.');
};

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false
    })
});

const CodeSnippetContainer = ({ onDataIsLoaded, SERVER, navigation, showAddedCodeSnippetToast }) => {

    // Define variables using hooks
    const [codeSnippets, setCodeSnippets] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    // Show toast
    if (showAddedCodeSnippetToast) {
        Toast.show('Code Snippet added to the list !', {
            duration: Toast.durations.SHORT,
            position: 75,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });
    }

    // Notifications
    useEffect(() => {
        // Ask for notifications permission
        askNotificationPermissions();

        // This listener is fired whenever a notification is received while the app is foregrounded.
        const notificationListener = Notifications.addNotificationReceivedListener(notification => {
            console.log("Notification received !");
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is
        // foregrounded, backgrounded, or killed). This listener is especially useful for routing users to a
        // particular screen after they tap on a particular notification.
        const interactWithNotificationListener = Notifications.addNotificationResponseReceivedListener(response => {
            // User taps on the notification
            if (response.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER) {
                navigation.navigate('Code Snippets');
            }
        });

        // Removes this listener on destruction
        return () => { notificationListener.remove(), interactWithNotificationListener.remove() };
    }, [])

    // Socket.IO
    useEffect(() => {
        // Connect to the socket.io server
        const socket = io(`http://${SERVER.IP}:${SERVER.SOCKETIO_PORT}`);

        // Event triggered whenever a new code snippet is received by the server
        socket.on('newCodeSnippet', (codeSnippets) => {

            // Receives the new code snippet and adds it to the list
            setCodeSnippets(codeSnippets);

            // Also updates the local storage
            Storage.storeCodeSnippets(codeSnippets);

            // Also send a notification to warn the user
            Notifications.scheduleNotificationAsync(
                {
                    content: {
                        title: 'New code snippet !',
                        body: 'A new code snippet has been added',
                        sound: true,
                        priority: Notifications.AndroidNotificationPriority.HIGH,
                        color: "blue"
                    },
                    trigger: {
                        seconds: 1,
                    }
                }
            );
        });

        // Disconnect from the server on destruction
        return () => socket.disconnect();
    }, [SERVER])

    // Retrieve context (containing a list of possible errors) using a hook
    const errorsContext = useContext(ErrorsContext);

    // Function that gets the list of code snippet by fetching data from the server
    // or grabbing data from the local storage
    const getCodeSnippets = () => {
        return new Promise((resolveMain, rejectMain) => {
            setRefreshing(true);
            new Promise((resolveSub, rejectSub) => {
                if (SERVER) {
                    fetch(`http://${SERVER.IP}:${SERVER.PORT}/api/getCodeSnippets`)
                        .then(response => response.json())
                        .then(json => {
                            if (json.result === 'OK' && json.codeSnippets) {
                                resolveSub(json.codeSnippets);
                            } else {
                                rejectSub(errorsContext.API_CALL_ERROR);
                            }
                        })
                        .catch(error => rejectSub(errorsContext.API_CALL_ERROR))
                } else {
                    rejectSub(errorsContext.MISSING_SERVER_INFO);
                }
            }).then(codeSnippets => {
                resolveMain(codeSnippets);
            }).catch(async (error) => {
                console.warn(error);
                // Something went wrong, try to get the list of codeSnippets 
                // from the local storage
                let codeSnippets = await Storage.getCodeSnippets();
                if (codeSnippets) {
                    resolveMain(codeSnippets);
                }
            });
        })
    };



    // Loads the list of snippets on first component load
    useEffect(() => {
        loadCodeSnippets();
    }, []);

    // Gets the list of component, updates it locally to be renderer
    // and stores it in the local storage for further use in case the 
    // server is not responding
    const loadCodeSnippets = () => {
        getCodeSnippets()
            .then(
                codeSnippets => {
                    setCodeSnippets(codeSnippets);
                    Storage.storeCodeSnippets(codeSnippets);
                    onDataIsLoaded();
                    setRefreshing(false)
                },
            );
    };

    // Function that loops through the list of code snippet
    // and set the attribut "hidden" to true to the ones that
    // doesn't contain any of the words from "text".
    const searchFilter = (text) => {
        let words = text.split(' ');
        setCodeSnippets(codeSnippets.map((codeSnippet) => {
            let containsAtLeastOneDifferent = false;
            words.forEach(word => {
                containsAtLeastOneDifferent = containsAtLeastOneDifferent
                    || (!codeSnippet.title.toLowerCase().includes(word.toLowerCase())
                        && !codeSnippet.description.toLowerCase().includes(word.toLowerCase())
                        && !codeSnippet.language.toLowerCase().includes(word.toLowerCase())
                        && !String(codeSnippet.id).toLowerCase().includes(word.toLowerCase()));
            });

            return {
                ...codeSnippet,
                hidden: containsAtLeastOneDifferent
            };
        }));
    };

    // Redirects user to the "Add Code Snippet" page
    const addCodeSnippetCall = () => {
        navigation.navigate('Add Code Snippet');
    };

    // Copies code to the clipboard
    const copyToClipboard = (code) => {
        Clipboard.setString(code);
        Toast.show('Code copied to clipboard !', {
            duration: Toast.durations.SHORT,
            position: 75,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });
    }

    return (
        <>
            <SearchBar searchFilter={searchFilter} addCodeSnippetCall={addCodeSnippetCall} />
            <CodeSnippetList codeSnippets={codeSnippets} reloadCodeSnippets={loadCodeSnippets} refreshing={refreshing} copyToClipboard={copyToClipboard} />
        </>
    )
}

export default CodeSnippetContainer
