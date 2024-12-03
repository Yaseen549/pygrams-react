import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "Partials/Header";
import Footer from "Partials/Footer";

const Contribute = () => {
    const navigate = useNavigate();

    const handleContributeClick = () => {
        window.open("https://github.com/Yaseen549/pygrams", "_blank");
    };

    return (
        <>
            {/* <Header /> */}
            <Container sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Contribution Guide (Become a Backer)
                </Typography>

                <Box sx={{ padding: 2, backgroundColor: "#f9f9f9", borderRadius: 2, boxShadow: 1 }}>
                    <Typography variant="body1" gutterBottom>
                        If you are willing to contribute, here are the steps:
                    </Typography>
                    <ol>
                        <li>
                            Fork the Repo.
                        </li>
                        <li>
                            Clone the Repo: <code>git clone REPO</code>
                        </li>
                        <li>
                            Create a new remote for the upstream repository: <code>git remote add upstream REPO</code>
                        </li>
                        <li>
                            Create a new branch: <code>git checkout -b your-branch-name</code>
                        </li>
                        <li>
                            Add Codes: <code>git add .</code>
                        </li>
                        <li>
                            Commit your changes: <code>{`git commit -m "Adding an awesome feature to your-branch-name"`}</code>
                        </li>
                        <li>
                            Push the changes to your repository: <code>git push -u origin your-branch-name</code>
                        </li>
                        <li>
                            Create a pull request. We will review it ASAP.
                        </li>
                    </ol>
                </Box>

                <Box sx={{ marginTop: 4, textAlign: "center" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleContributeClick}
                    >
                        Contribute on GitHub
                    </Button>
                </Box>
            </Container>
            {/* <Footer /> */}
        </>
    );
};

export default Contribute;