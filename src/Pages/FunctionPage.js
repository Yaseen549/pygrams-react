import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Box, Typography, CircularProgress, Button, Paper, IconButton } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { github_pygrams_dir } from "./constants";

// Utility function to format function name
const formatFunctionName = (name) => {
  return name
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and uppercase letters
    .replace(/([a-zA-Z])([0-9])/g, '$1 $2') // Add space between letters and numbers
    .replace(/_/g, ' ') // Replace underscores with space
    .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize the first letter of each word
};



function FunctionPage() {
  const { functionName } = useParams();
  const [functionCode, setFunctionCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copyStatus, setCopyStatus] = useState("Copy");
  const [nameCopyStatus, setNameCopyStatus] = useState("Copy");

  const assembledFunctionName = formatFunctionName(functionName);

  useEffect(() => {
    const fetchFiles = async (url) => {
        const response = await fetch(url);
        const remaining = response.headers.get("X-RateLimit-Remaining");
        const reset = response.headers.get("X-RateLimit-Reset");

        if (remaining === "0") {
            const resetTime = new Date(reset * 1000).toLocaleTimeString();
            throw new Error(`Rate limit exceeded. Come back after ${resetTime}.`);
        }

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const filePromises = data.map(async (file) => {
            if (file.type === "dir") {
                // Recursive call for nested folders
                return await fetchFiles(file.url);
            } else if (file.type === "file" && file.download_url) {
                const fileResponse = await fetch(file.download_url);
                if (!fileResponse.ok) {
                    throw new Error(`Error fetching file: ${fileResponse.statusText}`);
                }
                const content = await fileResponse.text();
                return { name: file.name, content };
            }
            return null;
        });

        const files = (await Promise.all(filePromises)).flat().filter(Boolean);
        return files;
    };

    const fetchFunctionCode = async () => {
        try {
            setLoading(true);

            const files = await fetchFiles(github_pygrams_dir); // Fetch all files, including subfolders
            let code = "";

            // Iterate through each file's content
            files.forEach((file) => {
                // Create a regex to match the specific function's definition
                const functionStartRegex = new RegExp(`def\\s+${functionName}\\s*\\(`);
                const functionRegex = /def\s+/; // General regex for any function definition

                // Check if the function is found in the content
                const match = file.content.match(functionStartRegex);
                if (match) {
                    let lines = file.content.split("\n");
                    let functionLines = [];
                    let inFunction = false;

                    // Variable to track indentation level of the function
                    let functionIndentationLevel = null;

                    lines.forEach((line) => {
                        // Start of the function - only capture top-level functions
                        if (line.match(functionStartRegex) && !inFunction && !line.startsWith(" ") && !line.startsWith("\t")) {
                            inFunction = true;
                            functionIndentationLevel = line.search(/\S/); // Get the indentation level
                            functionLines.push(line);
                        } 
                        // Collect function lines while inside the function
                        else if (inFunction && !line.match(functionRegex)) {
                            if (!line.trim().startsWith("#")) {
                                functionLines.push(line); // Add non-comment lines
                            }
                        }
                        // Stop collecting when another top-level function is found
                        else if (inFunction && line.match(functionRegex) && !line.startsWith(" ") && !line.startsWith("\t")) {
                            inFunction = false; // End of function
                        }
                        // Collect nested function lines within the current function
                        else if (inFunction && line.match(functionRegex) && (line.startsWith(" ") || line.startsWith("\t"))) {
                            functionLines.push(line); // Collect nested functions
                        }
                    });

                    code = functionLines.join("\n"); // Combine all collected lines for the function
                }
            });

            // If a function is found, set the function code, else show an error message
            if (code) {
                setFunctionCode(code);
            } else {
                setError("Function not found.");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchFunctionCode();
}, [functionName]);


  // Function to copy code and function name to clipboard
  const copyToClipboard = () => {
    const combinedText = `${functionName}()\n\n${functionCode}`;
    navigator.clipboard.writeText(combinedText);
    setCopyStatus("Copied");
    setTimeout(() => setCopyStatus("Copy"), 2000); // Reset after 2 seconds
  };

  const copyFunctionName = () => {
    navigator.clipboard.writeText(functionName + "()");
    setNameCopyStatus("Copied");
    setTimeout(() => setNameCopyStatus("Copy"), 2000); // Reset after 2 seconds
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 1200, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, textAlign: "center" }}>
        {assembledFunctionName}
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            // fontWeight: "bold",
            textAlign: "center",
            display: "flex", // Ensure it behaves like a flex container
            alignItems: "center", // Align content within Typography
            mb: 0, // Remove any bottom margin
          }}
        >
          Function: {functionName}{"()"}
        </Typography>
        <IconButton
          onClick={copyFunctionName}
          size="small"
          sx={{
            ml: 1,
            padding: 0.3, // Further reduce padding for compact size
            backgroundColor: "#FFEB3B",
            height: "24px", // Explicit height for better alignment
            width: "24px", // Explicit width for better alignment
            "&:hover": {
              backgroundColor: "#FDD835", // Slightly darker yellow on hover
            },
          }}
        >
          {nameCopyStatus === "Copied" ? (
            <CheckIcon sx={{ fontSize: "0.9rem" }} />
          ) : (
            <FileCopyIcon sx={{ fontSize: "0.9rem" }} />
          )}
        </IconButton>
      </Box>



      {loading && (
        <Box display="flex" justifyContent="center" mb={4}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Typography variant="body1" color="error" sx={{ textAlign: "center", mb: 4 }}>
          {error}
        </Typography>
      )}
      {functionCode && (
        <Paper elevation={3} sx={{ padding: 1, backgroundColor: "#2B2B2B" }}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              onClick={copyToClipboard}
              variant="contained"
              sx={{
                color: "#000",
                backgroundColor: "#FFEB3B", // Yellow color
                padding: "6px 12px",
                textTransform: "none",
                borderRadius: "4px",
              }}
              startIcon={copyStatus === "Copied" ? <CheckIcon /> : <FileCopyIcon />}
            >
              {copyStatus}
            </Button>
          </Box>

          <SyntaxHighlighter
            language="python"
            style={darcula}
            customStyle={{
              // fontFamily: '"Fira Code", "JetBrains Mono", "Consolas", "Courier New", monospace',
              fontSize: "1rem",
              // lineHeight: "1.5", // Optional for better readability
              paddingTop:0,
            }}
            showLineNumbers={true} // Enables line numbers
          >
            {/* {functionCode} */}
            {`# ${assembledFunctionName}\n${functionCode.trim()}`}
          </SyntaxHighlighter>
        </Paper>
      )}
    </Box>
  );
}

export default FunctionPage;
