import React from 'react'
import { ScrollView, RefreshControl, StyleSheet } from 'react-native';
import CodeSnippet from './CodeSnippet';
import CodeSnippetLoading from './CodeSnippetLoading';

const CodeSnippetList = ({ codeSnippets, reloadCodeSnippets, refreshing }) => {

    const onRefresh = React.useCallback(() => {
        reloadCodeSnippets();
    }, []);

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    colors={['white']}
                    tintColor={'white'}
                    onRefresh={onRefresh}
                />
            }>
            {codeSnippets.length != 0
                ? codeSnippets.map(codeSnippet =>
                    !codeSnippet.hidden && <CodeSnippet key={codeSnippet.id} codeSnippet={codeSnippet} />
                )
                : <>
                    <CodeSnippetLoading />
                </>
            }
        </ScrollView>
    )
}

export default CodeSnippetList
