import React from 'react'
import { ScrollView, RefreshControl } from 'react-native';
import CodeSnippet from './CodeSnippet';
import CodeSnippetLoading from './CodeSnippetLoading';

const CodeSnippetList = ({ codeSnippets, reloadCodeSnippets, refreshing }) => {

    const onRefresh = React.useCallback(() => {
        reloadCodeSnippets();
    }, []);

    return (
        <ScrollView
            style={{ width: '100%' }}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    colors={['white']}
                    tintColor={'white'}
                    onRefresh={onRefresh}
                />
            }>
            {
                codeSnippets && codeSnippets.length != 0
                    ? codeSnippets.map(codeSnippet =>
                        !codeSnippet.hidden && <CodeSnippet key={codeSnippet.id} codeSnippet={codeSnippet} />
                    )
                    : <>
                        <CodeSnippetLoading />
                        <CodeSnippetLoading />
                    </>
            }
        </ScrollView>
    )
}

export default CodeSnippetList
