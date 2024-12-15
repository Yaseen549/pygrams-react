// src/components/Tips.js
import React, { useState } from 'react';
import { Typography, Tooltip, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

const Tips = () => {
    const [copySuccess, setCopySuccess] = useState(false);

    const exampleText = "get_source_code(is_even)";

    const handleCopy = () => {
        navigator.clipboard.writeText(exampleText).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
        });
    };

    return (
        <>
            <Typography 
                variant="body1" 
                sx={{ 
                    color: 'text.secondary', 
                    textAlign: 'center', 
                    lineHeight: 1.8, 
                    mt: 2 
                }}
            >
                💡 Tip: Use <code style={{ color: '#d32f2f', fontWeight: 'bold' }}>get_source_code()</code> to retrieve the source code of a function from a Python program.
            </Typography>
            <Typography 
                variant="body2" 
                sx={{ 
                    color: 'text.secondary', 
                    fontSize: 18,
                    textAlign: 'center', 
                    mt: 1, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                }}
            >
                <strong>Example:{' '}</strong> <code>{exampleText}</code>
                <Tooltip title={copySuccess ? "Copied!" : "Copy to clipboard"}>
                    <IconButton 
                        onClick={handleCopy} 
                        sx={{ ml: 1 }}
                        aria-label="Copy example text"
                    >
                        {copySuccess ? <CheckIcon color="success" /> : <ContentCopyIcon />}
                    </IconButton>
                </Tooltip>
            </Typography>
        </>
    );
};

export default Tips;
