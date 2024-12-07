import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Avatar, Link } from '@mui/material';
import { github_pygrams_contributors } from 'Pages/constants';

const BackersProfiles = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch contributors from GitHub API
    fetch(github_pygrams_contributors)
      .then(response => response.json())
      .then(data => {
        setContributors(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching contributors:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Box>
        <h3>Our Backers</h3>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {contributors.map((contributor) => (
            <Box
              key={contributor.id}
              sx={{
                margin: 2,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Link href={contributor.html_url} target="_blank" rel="noopener noreferrer">
                <Avatar
                  src={contributor.avatar_url}
                  alt={contributor.login}
                  sx={{
                    width: 80,
                    height: 80,
                    border: '2px solid white',
                    boxShadow: 3,
                  }}
                />
              </Link>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default BackersProfiles;
