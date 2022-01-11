import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

const SearchBar = ({ searchFilter }) => {

    const [searchContent, setSearchContent] = useState('');
    const onChangeText = (text) => {
        setSearchContent(text);
        searchFilter(text);
    }

    return (
        <View style={styles.container}>
            <View
                style={styles.searchBar}
            >
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
    },
    searchBar: {
        padding: 10,
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        marginBottom: "auto",
        alignItems: "center",
    }
});

export default SearchBar

