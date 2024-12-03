// src/components/SearchBox.js
import React from 'react';
import { Box, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import NoProgramAlert from './NoProgramAlert';

const SearchBox = ({ searchTerm, handleSearch }) => (
    <>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
            <TextField
                fullWidth
                id="searchBar"
                label="Search for a function"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
                sx={{ maxWidth: 400 }}
            />
        </Box>


        {/* No Program Alert */}
        <NoProgramAlert />
    </>
);

// Add prop validation
SearchBox.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    handleSearch: PropTypes.func.isRequired,
};


export default SearchBox;
