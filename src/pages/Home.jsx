import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import QrReader from "react-qr-scanner";

export const Home = () => {
  const [scanResult, setScanResult] = useState("Hold QR Steady");

  const handleScan = (result) => {
    if (result) {
      setScanResult(result);
      console.log(result);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <>
      <AuthenticatedTemplate>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6">
            You are signed-in. Select profile to call Microsoft Graph.
          </Typography>
        </div>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6">
            Please sign-in to see your profile information.
          </Typography>
          <QrReader
            delay={100}
            style={{ width: "100%" }}
            onError={handleError}
            onScan={handleScan}
          />
        </div>
      </UnauthenticatedTemplate>
    </>
  );
};
