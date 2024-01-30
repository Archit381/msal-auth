import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsalAuthentication,
} from "@azure/msal-react";
import QrReader from "react-qr-scanner";
import { Profile } from "./Profile";
import { InteractionType } from "@azure/msal-browser";
import { fetchData } from "../fetch";

export const Home = () => {
  const [scanResult, setScanResult] = useState("Hold QR Steady");
  const [qrStatus,setQrStatus]=useState(false);
  const [graphData, setGraphData] = useState(null);
  const { result, error } = useMsalAuthentication(InteractionType.Redirect, {
    scopes: ["user.read"],
  });

  const handleScan = (result) => {
    if (result) {
      setScanResult(result);
      console.log(result);

      setQrStatus(true);

      // startLogin();
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const startLogin = async () => {
    if (!!graphData) {
      return;
    }

    if (!!error) {
      console.log(error);
      return;
    }

    if (result) {
      const { accessToken } = result;
      fetchData("https://graph.microsoft.com/v1.0/me", accessToken)
        .then((response) => setGraphData(response))
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <AuthenticatedTemplate>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6">
            You are signed-in. Please Scan the QR Code
          </Typography>

          {qrStatus ? (
            <div>QR Scanned</div>
          ) : (
            <QrReader
              delay={100}
              style={{ width: "100%" }}
              onError={handleError}
              onScan={handleScan}
            />
          )}
        </div>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6">
            Please sign-in to see your profile information.
          </Typography>
        </div>
      </UnauthenticatedTemplate>
    </>
  );
};
