import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCALSTORAGE_KEYS = {
    CODE_SNIPPETS: 'codeSnippets',
    SVG_PREFIX: 'svg-'

}

// Get data from the AsyncStorage
const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
}

// Store data from the AsyncStorage
const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        // saving error
    }
}

const getSvgXML = async (svgName) => {
    return await getData(LOCALSTORAGE_KEYS.SVG_PREFIX + svgName);
}

const storeSvgXML = async (svgName, data) => {
    await storeData(LOCALSTORAGE_KEYS.SVG_PREFIX + svgName, data);
}

const storeCodeSnippets = async (data) => {
    await storeData(LOCALSTORAGE_KEYS.CODE_SNIPPETS, data);
}

const getCodeSnippets = async () => {
    return await getData(LOCALSTORAGE_KEYS.CODE_SNIPPETS);
}

export default {
    getCodeSnippets,
    storeCodeSnippets,
    getSvgXML,
    storeSvgXML
}
