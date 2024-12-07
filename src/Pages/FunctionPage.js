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
    const fetchFiles = async () => {
      try {
        const folderUrl = github_pygrams_dir; // github url
        const response = await fetch(folderUrl);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();

        const filePromises = data.map((file) =>
          fetch(file.download_url)
            .then((res) => {
              if (!res.ok) {
                throw new Error(`Error fetching file: ${res.statusText}`);
              }
              return res.text();
            })
            .then((content) => ({
              name: file.name,
              content,
            }))
        );

        const filesWithContent = await Promise.all(filePromises);

        let code = "";
        filesWithContent.forEach((file) => {
          const functionStartRegex = new RegExp(`def\\s+${functionName}\\s*\\(`); // Regex to match the specific function
          const functionRegex = /def\s+/; // Regex to match any function definition
        
          const match = file.content.match(functionStartRegex);
          if (match) {
            let lines = file.content.split("\n");
            let functionLines = [];
            let inFunction = false;
        
            // Variable to track indentation level of current function
            let functionIndentationLevel = null;
        
            lines.forEach((line) => {
              // Check if this is the specific function we're looking for
              if (line.match(functionStartRegex) && !inFunction && !line.startsWith(" ") && !line.startsWith("\t")) {
                inFunction = true;
                functionIndentationLevel = line.search(/\S/); // Get the indentation level
                functionLines.push(line);
              } 
              // If we are inside the function and it's not another function, collect lines
              else if (inFunction && !line.match(functionRegex)) {
                if (!line.trim().startsWith("#")) {
                  functionLines.push(line); // Add non-comment lines
                }
              }
              // If another top-level function is encountered, stop collecting
              else if (inFunction && line.match(functionRegex) && !line.startsWith(" ") && !line.startsWith("\t")) {
                inFunction = false; // Stop collecting for the current function
              }
              // If we encounter nested functions, collect them within the current function
              else if (inFunction && line.match(functionRegex) && (line.startsWith(" ") || line.startsWith("\t"))) {
                functionLines.push(line); // Collect nested functions within the current function
              }
            });
        
            code = functionLines.join("\n"); // Join all lines collected for the current function
          }
        });
        

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

    fetchFiles();
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
