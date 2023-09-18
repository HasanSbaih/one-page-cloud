import React, { useState } from 'react';
import { Button, TextareaAutosize, Box, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';

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
        <ReactMarkdown>
          {text.data}
        </ReactMarkdown>
      </Box>
    </Box>
  );
}

export default MarkdownTextarea;
