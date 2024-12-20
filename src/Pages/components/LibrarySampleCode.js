import React, { useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
} from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CheckIcon from '@mui/icons-material/Check';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CloseIcon from '@mui/icons-material/Close';

const LibrarySampleCode = () => {
    const [copyStatus, setCopyStatus] = useState("Copy Code");
    const [open, setOpen] = useState(false);

    const codeWithOutput = `
from pygrams.pygrams import *

# Generate the first 10 Fibonacci numbers
fibonacci_list = fibonacci(10)
print(fibonacci_list)  
# Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`;

    const handleCopy = () => {
        navigator.clipboard.writeText(codeWithOutput)
            .then(() => {
                setCopyStatus("Copied");
                setTimeout(() => setCopyStatus("Copy Code"), 2000); // Reset the status after 2 seconds
            })
            .catch((err) => console.error("Failed to copy text: ", err));
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            {/* Button to open dialog */}
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    View Sample
                </Button>
            </Box>

            {/* Close Icon outside the dialog */}
            {open && (
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "fixed",
                        top: 64,
                        right: 64,
                        zIndex: 9999, // Ensure it's on top of everything
                        color: "red",
                        backgroundColor: "white",
                        // color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            )}

            {/* Dialog box */}
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                sx={{ marginBottom: 4 }} // Add margin below dialog box
            >
                {/* <DialogTitle>
                    Sample Code
                </DialogTitle> */}
                <DialogContent>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "30px", // Adjust the top position if needed
                            // left: "8px", // Adjust the left position for placement
                            backgroundColor: "#424242", // Dark background
                            color: "#ffffff", // White text for contrast
                            padding: "2px 8px", // Padding to make it look like a label
                            borderRadius: "3px", // Rounded corners
                            fontSize: "0.75rem", // Smaller font size for the label
                            fontWeight: "bold", // Bold text
                            zIndex: 999, // Ensure it's above other elements
                        }}
                    >
                        sample.py
                    </Box>
                    <Box sx={{ position: "relative", marginBottom: 0 }}>
                        {/* Label-like structure for #sample.py */}


                        {/* SyntaxHighlighter with the code snippet */}
                        <SyntaxHighlighter
                            language="python"
                            style={darcula}
                            customStyle={{
                                borderRadius: "5px",
                                padding: "10px",
                                fontSize: "1rem", // Default font size
                                backgroundColor: "#2B2B2B", // Dark background
                            }}
                        >
                            {codeWithOutput}
                        </SyntaxHighlighter>

                        {/* IconButton for copying */}
                        <IconButton
                            onClick={handleCopy}
                            size="small"
                            sx={{
                                position: "absolute", // Position the button in the top-right corner of the code box
                                top: "8px",
                                right: "8px",
                                padding: 0.3,
                                backgroundColor: "#FFEB3B",
                                height: "24px",
                                width: "24px",
                                "&:hover": {
                                    backgroundColor: "#FDD835",
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

                </DialogContent>
            </Dialog>
        </>
    );
};

export default LibrarySampleCode;
