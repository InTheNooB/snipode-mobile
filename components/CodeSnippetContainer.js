import React from 'react'
import { useEffect, useState } from 'react';
import CodeSnippetList from './CodeSnippetList';
import SearchBar from './SearchBar';

const CodeSnippetContainer = ({ serverIP, port }) => {

    const [codeSnippets, setCodeSnippets] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    const loadCodeSnippets = () => {
        setRefreshing(true);
        if (serverIP && port) {
            fetch(`http://${serverIP}:${port}/api/getCodeSnippets`)
                .then(response => response.json())
                .then(json => {
                    if (json.result === 'OK' && json.codeSnippets) {
                        setCodeSnippets(json.codeSnippets);
                    } else {
                        console.log('error');
                    }
                    setRefreshing(false);
                });
        }
    };

    // Load the list of snippets 
    useEffect(() => {
        loadCodeSnippets();
    }, []);

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

    return (
        <>
            <SearchBar searchFilter={searchFilter} />
            <CodeSnippetList codeSnippets={codeSnippets} reloadCodeSnippets={loadCodeSnippets} refreshing={refreshing} />
        </>
    )
}

export default CodeSnippetContainer
