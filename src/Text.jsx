import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

function CodeBlock(props) {
    return (
        <SyntaxHighlighter language={props.language} style={solarizedlight}>
            {props.value}
        </SyntaxHighlighter>
    );
}

export default CodeBlock;
