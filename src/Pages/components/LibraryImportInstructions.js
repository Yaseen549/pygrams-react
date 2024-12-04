import React, { useState } from 'react';
import { Typography, Box, Paper, IconButton } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CheckIcon from '@mui/icons-material/Check';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const LibraryImportInstructions = () => {
    const [copyStatus, setCopyStatus] = useState("Copy Code");

    const codeSnippet = `from pygrams.pygrams import *`;

    const handleCopy = () => {
        navigator.clipboard.writeText(codeSnippet)
            .then(() => {
                setCopyStatus("Copied");
                setTimeout(() => setCopyStatus("Copy Code"), 2000); // Reset the status after 2 seconds
            })
            .catch((err) => console.error("Failed to copy text: ", err));
    };

    return (
        <>
            <Typography variant="body1" gutterBottom sx={{ display: "flex", justifyContent: "center" }}>
                {`To import this library, use the following command:`}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
                <Paper
                    elevation={3}
                    sx={{
                        paddingRight: 2,
                        paddingLeft: 2,
                        backgroundColor: "#2B2B2B",
                        display: "inline-block", // Make the Paper wrap around its content
                        maxWidth: "80%", // Optional: set max width for the Paper
                    }}
                >
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        {/* SyntaxHighlighter with the code snippet */}
                        <SyntaxHighlighter
                            language="python"
                            style={darcula}
                            customStyle={{
                                borderRadius: "5px",
                                padding: "10px",
                                fontSize: "1rem",
                                flexGrow: 1, // Allow the code block to grow
                                marginRight: "8px", // Space between the code and the button
                            }}
                            // showLineNumbers={true} // Enables line numbers
                        >
                            {/* {`# import pygrams\n${codeSnippet}`} */}
                            {codeSnippet}
                        </SyntaxHighlighter>

                        {/* IconButton for copying */}
                        <IconButton
                            onClick={handleCopy}
                            size="small"
                            sx={{
                                padding: 0.3, // Further reduce padding for compact size
                                backgroundColor: "#FFEB3B",
                                height: "24px", // Explicit height for better alignment
                                width: "24px", // Explicit width for better alignment
                                "&:hover": {
                                    backgroundColor: "#FDD835", // Slightly darker yellow on hover
                                },
                            }}
                        >
                            {copyStatus === "Copied" ? (
                                <CheckIcon sx={{ fontSize: "0.9rem" }} />
                            ) : (
                                <FileCopyIcon sx={{ fontSize: "0.9rem" }} />
                            )}
                        </IconButton>
                    </Box>
                </Paper>
            </Box>
        </>
    );
};

export default LibraryImportInstructions;
