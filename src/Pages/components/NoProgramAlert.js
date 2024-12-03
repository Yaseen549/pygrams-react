// src/components/NoProgramAlert.js
import React from 'react';
import { Typography, Link, Box } from '@mui/material';

const NoProgramAlert = () => (
    <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="body2" color="textSecondary">
            If Program not found, please{" "}
            <Link className='boldLinks' href="https://github.com/Yaseen549/pygrams/issues/new" target="_blank" rel="noopener noreferrer">
                Raise an Issue{" "}
                <sup><i className="fas fa-external-link-alt" aria-hidden="true"></i></sup>
            </Link>
        </Typography>
    </Box>
);

export default NoProgramAlert;
