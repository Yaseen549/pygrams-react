import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Link,
  IconButton,
  Button,
} from "@mui/material";
import { YouTube, GitHub, Favorite } from "@mui/icons-material";
import pyLogo from "../imgs/icon.png";
import DonationDialog from "./donation/DonationDialog";
import { youtube_tutorial_url } from "Pages/constants";
import { 
  github_repo_url, 
  pypi_pygrams_pkg_url, 
  pypi_pygrams_pkg_details 
} from "Pages/constants";
import { version_number } from "Pages/constants";

function Header() {
  const [packageVersion, setPackageVersion] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const loadPackageDetails = async () => {
      try {
        const res = await fetch(pypi_pygrams_pkg_details);
        const packageDetails = await res.json();
        setPackageVersion(packageDetails.info.version);
      } catch (err) {
        console.error(err);
      }
    };

    loadPackageDetails();
  }, []);

  return (
    <Box
      component="header"
      sx={{
        width: "100%",
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        padding: "8px 16px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Typography
        variant="body1"
        sx={{ fontWeight: "bold", marginRight: "24px", color: "gray" }}
      >
        v{version_number? version_number : packageVersion}
        {/* v{packageVersion} */}
        {/* v{`${version_number}`} */}
      </Typography>

      {/* Links */}
      <Link
        href={youtube_tutorial_url}
        target="_blank"
        sx={{
          display: "flex",
          alignItems: "center",
          marginRight: "24px",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        <IconButton size="small">
          <YouTube color="error" />
        </IconButton>
        <Typography variant="body2" sx={{ fontWeight: "bold", marginLeft: "4px" }}>
          v0.0.12
        </Typography>
      </Link>

      <Link
        href={pypi_pygrams_pkg_url}
        target="_blank"
        sx={{
          display: "flex",
          alignItems: "center",
          marginRight: "24px",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        <img src={pyLogo} alt="PyPi" style={{ width: 19, marginRight: 5 }} />
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          PyPi
        </Typography>
      </Link>

      <Link
        href={github_repo_url}
        target="_blank"
        sx={{
          display: "flex",
          alignItems: "center",
          color: "inherit",
          textDecoration: "none",
          marginRight: "24px",
        }}
      >
        <IconButton size="small">
          <GitHub />
        </IconButton>
        <Typography variant="body2" sx={{ fontWeight: "bold", marginLeft: "4px" }}>
          GitHub
        </Typography>
      </Link>

      {/* Donate Button */}
      {/* <Button
        onClick={() => setDialogOpen(true)}
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#F37254",
          color: "white",
          textTransform: "none",
          "&:hover": { backgroundColor: "#D35400" },
        }}
      >
        <Favorite sx={{ marginRight: "8px" }} />
        Donate
      </Button> */}

      {/* Donation Dialog */}
      {/* <DonationDialog isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} /> */}
    </Box>
  );
}

export default Header;
