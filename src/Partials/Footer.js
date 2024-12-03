/**
 * Footer.js - A polished, professional footer component.
 */

import React from "react";
import { Box, Container, Typography, Link, Stack, IconButton } from "@mui/material";
import { YouTube } from "@mui/icons-material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "16px 0",
        borderTop: "1px solid #ddd",
      }}
    >
      <Container>
        {/* Flex container for alignment */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          {/* Left Section */}
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontWeight: "bold" }}
          >
            © Yaseen549 / PyGrams
          </Typography>

          {/* Center Section (Optional Links, commented out for now) */}
          {/* <Stack direction="row" spacing={2}>
            <Link href="/views/terms" color="text.secondary" underline="hover">
              Terms of Use
            </Link>
            <Link href="/views/privacy" color="text.secondary" underline="hover">
              Privacy Policy
            </Link>
          </Stack> */}

          {/* Right Section */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton
              href="https://www.youtube.com/channel/UCsALeSluL0sDczILKeHvFJA"
              target="_blank"
              sx={{ color: "#FF0000" }}
              aria-label="YouTube"
            >
              <YouTube />
            </IconButton>
            {/* <Typography variant="body2" sx={{ fontWeight: "bold", color: "text.primary" }}>
              RaynCode
            </Typography> */}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;