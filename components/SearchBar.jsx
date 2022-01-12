import React, { useState } from "react";
import { StyleSheet, TextInput, View, TouchableHighlight, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';

const SearchBar = ({ searchFilter, addCodeSnippetCall }) => {

    const [searchContent, setSearchContent] = useState('');
    const onChangeText = (text) => {
        setSearchContent(text);
        searchFilter(text);
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <Feather
                    name="search"
                    size={20}
                    color="black"
                    style={{ marginLeft: 1 }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={searchContent}
                    onChangeText={onChangeText}
                />
            </View>
            <TouchableHighlight
                style={styles.buttonView}
                onPress={addCodeSnippetCall}>
                <AntDesign color='white' size={32} name='plus' style={styles.button} />
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 15,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: "90%"
    },
    searchBar: {
        padding: 10,
        flexDirection: "row",
        flex: 5,
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        marginBottom: "auto",
        alignItems: "center",
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
    },
    buttonView: {
        flex: 1
    },
    button: {
        textAlign: 'right'
    }
});

export default SearchBar

