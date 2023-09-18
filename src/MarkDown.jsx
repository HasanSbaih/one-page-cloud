import React, { useState } from 'react';
import { Button, TextareaAutosize, Box, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

function CodeBlock(props) {
  return (
      <SyntaxHighlighter language={props.language} style={solarizedlight}>
          {props.value}
      </SyntaxHighlighter>
  );
}

function MarkdownTextarea({text}) {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Text copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleCopyToClipboard}>
        Copy to Clipboard
      </Button>
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Markdown Preview:
        </Typography>
        <div style={{ height: '300px', overflowY: 'auto' , border:'1px solid', borderRadius: 8, textAlign:'left', padding:16 }}>
          <ReactMarkdown 
          
          >
            {text.data}
          </ReactMarkdown>
        </div>
      </Box>
    </Box>
  );
}

export default MarkdownTextarea;
