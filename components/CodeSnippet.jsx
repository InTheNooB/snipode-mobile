import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { SvgUri, SvgXml } from 'react-native-svg';
import Storage from '../api/StorageAPI';
import { STYLE } from '../api/ConstantsAPI';

const CodeSnippet = ({ codeSnippet, copyToClipboard }) => {

    async function fetchText(uri) {
        try {
            const response = await fetch(uri);
            return response.headers.get("Content-Type") === 'image/svg+xml' ? await response.text() : null;
        } catch (err) {
            console.warn(err);
        }
    }

    // Define variables
    const [deviconSvgXML, setDeviconSvgXML] = useState(null);
    const [deviconSvgUrl, setDeviconSvgUrl] = useState(null);


    // Check if the image exists before calling the react-native-svg SvgUri component
    // isMounted prevents from calling useState hook on an unmounted component
    useEffect(() => {
        let isMounted = true;
        new Promise((resolve, reject) => {
            // First check if the svg is in the local storage
            Storage.getSvgXML(codeSnippet.language).then((storageSvg) => {
                if (storageSvg && storageSvg !== '') {
                    resolve(storageSvg);
                } else {
                    // If it wasn't found in the local storage, search online
                    fetchText(`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${codeSnippet.language}/${codeSnippet.language}-plain.svg`)
                        .then((webSvg) => {
                            if (isMounted && webSvg) {
                                Storage.storeSvgXML(codeSnippet.language, webSvg);
                                resolve(webSvg);
                            }
                        }).catch(err => console.warn(err))
                }
            });
        }).then(svg => {
            if (isMounted) setDeviconSvgXML(svg);
        })
        return () => {
            isMounted = false;
        }
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.titleContainer}
                onPress={() => copyToClipboard(codeSnippet.code)}
            >
                <Text style={styles.titleId}>{`#${codeSnippet.id}`}</Text>
                <Text style={{ ...styles.title, color: codeSnippet.color }}>{codeSnippet.title}</Text>
                {deviconSvgUrl != null
                    ?
                    <SvgUri
                        style={styles.titleImage}
                        width="32"
                        height="32"
                        uri={deviconSvgUrl}
                    />
                    : deviconSvgXML != null
                        ? <SvgXml xml={deviconSvgXML} width="32" height="32" />
                        : <ActivityIndicator size="small" color="#fff" />}
            </TouchableOpacity>
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


const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginVertical: 15,
        marginHorizontal: 5,
        shadowColor: 'rgba(255,255,255,0.12)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 7, // Android
        backgroundColor: STYLE.backgroundColor,
        borderRadius: 20,
        fontFamily: 'Courrier'
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
