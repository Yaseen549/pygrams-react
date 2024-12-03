import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Banner = () => (
    <Box sx={{ textAlign: 'center', mb: 4 }}>
        {/* Title Section */}
        <Typography variant="h4" component="h4" sx={{ display: 'inline-block', fontWeight: 'bold' }}>
        <span className="py">Py</span>
          <span className="grams">Grams(</span>
          <span className="py">)</span>
        </Typography>

        {/* Description */}
        <Typography variant="h6" sx={{ mt: 2 }}>
            The Python Package to get all your hustling Programs in one{" "}
            <Link 
            className='boldLinks'
                href="https://github.com/Yaseen549/pygrams" 
                target="_blank" 
                rel="noopener noreferrer" 
                sx={{ fontWeight: 'bold', textDecoration: 'none' }}
            >
                CodeBase{" "}
                <sup>
                    <i className="fas fa-external-link-alt" aria-hidden="true"></i>
                </sup>
            </Link>
        </Typography>

        {/* Tutorials Link */}
        <Typography variant="body1" sx={{ mt: 2 }}>
            <span className="bold">
                Watch Tutorials on{" "}
                <Link
                    href="https://youtu.be/VGSCx4Ih2Qg"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ fontWeight: 'bold', color: 'red', textDecoration: 'none' }}
                >
                    YouTube{" "}
                    <sup>
                        <i className="fas fa-external-link-alt" aria-hidden="true"></i>
                    </sup>
                </Link>
            </span>
        </Typography>
    </Box>
);

export default Banner;
