import React from 'react'
import { View, StyleSheet } from "react-native";
import { FadeLoading } from 'react-native-fade-loading';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const CodeSnippetLoading = () => {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <FadeLoading style={styles.titleId} primaryColor="gray" secondaryColor="lightgray" duration={2000} />
                <FadeLoading style={styles.title} primaryColor="gray" secondaryColor="lightgray" duration={2000} />
            </View>
            <View style={styles.descriptionContainer}>
                <FadeLoading style={styles.description} primaryColor="gray" secondaryColor="lightgray" duration={2000} />
            </View>
            <View style={styles.codeContainer}>
                <FadeLoading style={styles.code} primaryColor="gray" secondaryColor="lightgray" duration={2000} />
                <FadeLoading style={styles.code} primaryColor="gray" secondaryColor="lightgray" duration={2000} />
                <FadeLoading style={styles.code} primaryColor="gray" secondaryColor="lightgray" duration={2000} />
                <FadeLoading style={styles.code} primaryColor="gray" secondaryColor="lightgray" duration={2000} />
                <FadeLoading style={styles.code} primaryColor="gray" secondaryColor="lightgray" duration={2000} />
                <FadeLoading style={styles.code} primaryColor="gray" secondaryColor="lightgray" duration={2000} />
                <FadeLoading style={styles.code} primaryColor="gray" secondaryColor="lightgray" duration={2000} />
                <FadeLoading style={styles.code} primaryColor="gray" secondaryColor="lightgray" duration={2000} />
                <FadeLoading style={styles.code} primaryColor="gray" secondaryColor="lightgray" duration={2000} />
                <FadeLoading style={styles.code} primaryColor="gray" secondaryColor="lightgray" duration={2000} />
                <FadeLoading style={styles.code} primaryColor="gray" secondaryColor="lightgray" duration={2000} />
                <FadeLoading style={styles.code} primaryColor="gray" secondaryColor="lightgray" duration={2000} />
                <FadeLoading style={styles.code} primaryColor="gray" secondaryColor="lightgray" duration={2000} />
                <FadeLoading style={styles.code} primaryColor="gray" secondaryColor="lightgray" duration={2000} />

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
        backgroundColor: '#111111',
        borderRadius: 20,
        width: 350
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10,
        height: 20
    },
    titleId: {
        color: 'white',
        fontStyle: 'italic',
        flex: 1,
        marginRight: 5,
        height: 15
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'BeVietnamProBold',
        fontWeight: '300',
        flex: 10,
        height: 20
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
        marginTop: 40,
        backgroundColor: 'rgb(47,47,47)',
        borderRadius: 10
    },
    code: {
        marginBottom: 2,
        height: 1
    }


});


export default CodeSnippetLoading;