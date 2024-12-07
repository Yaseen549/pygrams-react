// src/components/Tips.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Tips = () => (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body2">
            Tip:{" "}
            <span style={{ color: 'grey' }}>
                {`Use 'getSourceCode()' to get the source code of a function from a Python program`}
            </span>
            <br />
            Example: getSourceCode(isEven)
        </Typography>
    </Box>
);

export default Tips;
