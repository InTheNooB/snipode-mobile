import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';

const About = ({ navigation }) => {

    const [progress, setProgress] = useState(0)



    setTimeout(() => {
        if (progress < 1) {
            setProgress(progress + 0.1);
        }
    }, 1000);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Progress.Bar progress={progress} width={200} />
            <Text>Code Snippet - By Lionel Ding</Text>
        </View>
    )
}
export default About