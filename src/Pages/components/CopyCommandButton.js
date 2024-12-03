import React, { useState } from 'react';
import { Button, Tooltip, IconButton, Typography, Box } from '@mui/material';
import { FileCopy as FileCopyIcon, Check as CheckIcon } from '@mui/icons-material';

const CopyCommandButton = () => {
    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopy = () => {
        const textToCopy = "pip install pygrams";
        navigator.clipboard.writeText(textToCopy);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    };

    return (
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            marginBottom: '20px' // Adds space at the bottom
        }}>
            <Button
                variant="contained"
                onClick={handleCopy}
                sx={{ display: 'flex', alignItems: 'center' }} // Ensures button text and icon are aligned
            >
                <Typography variant="body1" sx={{ marginRight: '8px' }}>
                    {copySuccess ? "Copied!" : "pip install pygrams"}
                </Typography>

                <Tooltip title={copySuccess ? "Copied!" : "Copy to clipboard"} arrow>
                    {copySuccess ? (
                        <IconButton sx={{ color: 'white', fontSize: 'small' }}>
                            <CheckIcon />
                        </IconButton>
                    ) : (
                        <IconButton sx={{ color: 'white', fontSize: 'small' }}>
                            <FileCopyIcon />
                        </IconButton>
                    )}
                </Tooltip>
            </Button>
        </Box>
    );
};

export default CopyCommandButton;
