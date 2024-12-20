import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Typography, Box, CircularProgress, Button } from '@mui/material';
import Header from "Partials/Header";
import Footer from "Partials/Footer";
import Banner from "./components/Banner";
import SearchBox from "./components/SearchBox";
import CopyCommandButton from "./components/CopyCommandButton";
import BackersProfiles from "./components/BackersProfiles";
import Tips from "./components/Tips";
import Masonry from 'react-masonry-css'; // Import Masonry for grid layout
import LibraryImportInstructions from "./components/LibraryImportInstructions";
import { github_pygrams_dir } from "./constants";
import LibrarySampleCode from "./components/LibrarySampleCode";

const Main = () => {
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [filteredFiles, setFilteredFiles] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

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
    
        const fetchAllFiles = async () => {
            try {
                setLoading(true);
                const files = await fetchFiles(github_pygrams_dir);
                const parsedFiles = files.map((file) => {
                    // Extract top-level function definitions
                    const functionNames = Array.from(
                        file.content.matchAll(/^def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/gm)
                    ).map((match) => match[1]);
    
                    return { ...file, functionNames };
                });
    
                // Prioritize 'pygrams.py' if it exists
                const sortedFiles = parsedFiles.sort((a, b) => {
                    if (a.name === "pygrams.py") return -1;
                    if (b.name === "pygrams.py") return 1;
                    return 0;
                });
    
                setFiles(sortedFiles);
                setFilteredFiles(sortedFiles);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchAllFiles();
    }, []);
    
    

    // useEffect(() => {
    //     // const folderUrl = "../../PYTHON/pythonprograms";
    //     const folderUrl = github_pygrams_dir; // github url
    
    //     fetch(folderUrl)
    //         .then((response) => {
    //             // const existingLimit = response.headers.get('X-RateLimit-Limit');
    //             const remaining = response.headers.get('X-RateLimit-Remaining');
    //             const reset = response.headers.get('X-RateLimit-Reset');
    //             // console.log(existingLimit, remaining, typeof remaining, reset, Date(reset*1000));

    //             if (remaining === "0") {
    //                 const resetTime = new Date(reset * 1000).toLocaleTimeString();
    //                 throw new Error(`Rate limit exceeded. Come back after ${resetTime}.`);
    //             }
                
    //             if (!response.ok) {
    //                 throw new Error(`Error: ${response.status} ${response.statusText}`);
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             const filePromises = data.map((file) => {
    //                 return fetch(file.download_url)
    //                     .then((res) => {
    //                         if (!res.ok) {
    //                             throw new Error(`Error fetching file: ${res.statusText}`);
    //                         }
    //                         return res.text();
    //                     })
    //                     .then((content) => ({
    //                         name: file.name,
    //                         content,
    //                     }));
    //             });
    
    //             return Promise.all(filePromises);
    //         })
    //         .then((filesWithContent) => {
    //             const parsedFiles = filesWithContent.map((file) => {
    //                 // Match all function definitions ('def') that are not indented
    //                 const functionNames = Array.from(
    //                     file.content.matchAll(/^def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/gm) // Regex for top-level functions only
    //                 ).map((match) => match[1]);
    
    //                 return { ...file, functionNames };
    //             });
    
    //             // Prioritize 'pygrams.py' by placing it first if it exists
    //             const sortedFiles = parsedFiles.sort((a, b) => {
    //                 if (a.name === 'pygrams.py') return -1;
    //                 if (b.name === 'pygrams.py') return 1;
    //                 return 0;
    //             });
    
    //             setFiles(sortedFiles);
    //             setFilteredFiles(sortedFiles);
    //             setLoading(false);
    //         })
    //         .catch((err) => {
    //             setError(err.message);
    //             setLoading(false);
    //         });
    // }, []);
    

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value === "") {
            setFilteredFiles(files);
        } else {
            const filtered = files.map((file) => ({
                ...file,
                functionNames: file.functionNames.filter(fn =>
                    fn.toLowerCase().includes(value.toLowerCase())
                ),
            })).filter(file => file.functionNames.length > 0);
            setFilteredFiles(filtered);
        }
    };

    return (
        <>
            <Header />
            <Container sx={{ padding: 2 }}>
                {/* Banner */}
                <Banner />

                {/* Button to copy pip install command with a note icon */}
                <CopyCommandButton />

                {/* Library Import Instructions */}
                <LibraryImportInstructions />

                <LibrarySampleCode />
                
                {/* Search Box */}
                <SearchBox searchTerm={searchTerm} handleSearch={handleSearch} />


                {error && <Typography color="error" display={"flex"} justifyContent={"center"}>{error}</Typography>}
                {loading && <CircularProgress />}

                {/* Masonry layout for filtered files */}
                <Masonry
                    breakpointCols={{ "default": 3, "1100": 2, "700": 1 }}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {filteredFiles.map((file, index) => (
                        <Box key={index} sx={{ border: '1px solid #ddd', padding: 2, borderRadius: 1 }}>
                            <Typography variant="h6" fontWeight={"bold"}>{file.name.replace('.py', '').toUpperCase()}</Typography>
                            <ul>
                                {file.functionNames.map((fn, idx) => (
                                    <li key={idx}>
                                        <Link to={`/function/${encodeURIComponent(fn)}`} style={{ fontWeight:"bold" }}>
                                            {fn}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Box>
                    ))}
                </Masonry>

                {/* Backers Profiles */}
                <BackersProfiles />

                 {/* Contribute Button */}
                 <Box textAlign="center" mt={4}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => navigate('/contribute')} // Adjust this as needed
                    >
                        Become a Backer
                    </Button>
                </Box>

                {/* Tips */}
                <Tips />

            </Container>
            <Footer />
        </>
    );
};

export default Main;
