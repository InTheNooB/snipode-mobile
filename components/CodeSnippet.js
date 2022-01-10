import React from 'react'
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useState } from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { SvgUri } from 'react-native-svg';

const CodeSnippet = ({ codeSnippet }) => {

    let [fontsLoaded] = useFonts({
        'BeVietnamProBold': require('../assets/fonts/BeVietnamPro-Bold.ttf'),
        'BeVietnamProLight': require('../assets/fonts/BeVietnamPro-Light.ttf'),
        'Courrier': require('../assets/fonts/Courrier.ttf'),
    });

    const [deviconSvgUrl, setDeviconSvgUrl] = useState(null);

    // Check if the image exists before calling the react-native-svg SvgUri component
    fetch(`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${codeSnippet.language}/${codeSnippet.language}-plain.svg`)
        .then((response => {
            if (response.headers.get("Content-Type") === 'image/svg+xml') {
                setDeviconSvgUrl(`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${codeSnippet.language}/${codeSnippet.language}-plain.svg`);
            }
        }));

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleId}>{`#${codeSnippet.id}`}</Text>
                    <Text style={{ ...styles.title, color: codeSnippet.color }}>{codeSnippet.title}</Text>
                    {deviconSvgUrl != null
                        ? <SvgUri
                            style={styles.titleImage}
                            width="32"
                            height="32"
                            uri={deviconSvgUrl}
                        />
                        :
                        <ActivityIndicator size="small" color="#fff" />}
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>{codeSnippet.description}</Text>
                </View>
                <View style={styles.codeContainer}>
                    <SyntaxHighlighter
                        language={codeSnippet.language}
                        style={materialDark}
                        highlighter={"prism" || "hljs"}
                    >
                        {codeSnippet.code}
                    </SyntaxHighlighter>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginVertical: 15,
        marginHorizontal: 5,
        shadowColor: 'rgba(255,255,255,0.12)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        backgroundColor: '#111111',
        borderRadius: 20
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10
    },
    titleId: {
        color: 'white',
        fontStyle: 'italic',
        flex: 1
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'BeVietnamProBold',
        fontWeight: '300',
        flex: 10
    },
    titleImage: {
        marginLeft: 'auto',
        flex: 5
    },
    descriptionContainer: {

    },
    description: {
        color: '#7e7e7e',
        fontFamily: 'BeVietnamProBold',
    },
    codeContainer: {
        marginTop: 20,
        backgroundColor: 'rgb(47,47,47)',
        borderRadius: 10
    }

});

export default CodeSnippet
