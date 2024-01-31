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
import supabase from "../supabase";

export const Home = () => {
  const [scanResult, setScanResult] = useState("Hold QR Steady");
  const [qrStatus, setQrStatus] = useState(false);
  const [graphData, setGraphData] = useState(null);
  const [userMail, setUserMail] = useState("");
  const [username, setUserName] = useState("");
  const [urlValidity, setUrlValidity] = useState("");

  const { result, error } = useMsalAuthentication(InteractionType.Redirect, {
    scopes: ["user.read"],
  });

  const handleScan = (result) => {
    if (result) {
      setScanResult(result);

      console.log(result.text);
      const token = getTokenFromUrl(result.text);

      setQrStatus(true);
      checkTokenValidity(token);
    }
  };

  const checkTokenValidity = async (token) => {
    try {
      const response = await fetch(
        `https://sixc1f0487-145f-4e33-8897-641d33f1d0e6.onrender.com/check_status/${token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.status);

        if (data.status === "valid") {
          // console.log('yes mom');
          startLogin();
        } else if (data.status === "invalid") {
          console.log("invalid URL couldnt proceed further");
          setQrStatus(false);
        }
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error("Error during token validity check:", error);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const startLogin = async () => {
    if (!!error) {
      console.log(error);
      return;
    }

    if (result) {
      console.log("yes");

      const { accessToken } = result;
      fetchData("https://graph.microsoft.com/v1.0/me", accessToken)
        .then((response) => {
          setGraphData(response);

          console.log(response.mail);
          console.log(response.displayName);

          setUserMail(response.mail);
          setUserName(response.displayName);

          const mail = response.mail;
          const name = response.displayName;

          feedData(mail, name);
        })
        .catch((error) => console.log(error));
    }
  };

  const feedData = async (mail, name) => {
    try {
      let { data: prevData, err } = await supabase
        .from("attendance")
        .select("*");
      
      if (prevData) {
        console.log(prevData.length);
      }

      const { data, error } = await supabase
        .from("attendance")
        .insert([{ id: prevData.length + 1, mail: mail, displayname: name }])
        .select();

      if (data) {
        console.log(data);
      }

      if (error) {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getTokenFromUrl = (url) => {
    // Split the URL by '?' and take the second part which contains token
    const queryString = url.split("?")[1];
    if (queryString) {
      // Split the query string by '&' to get key-value pairs
      const queryParams = queryString.split("&");
      // Iterate through key-value pairs to find the token
      for (const param of queryParams) {
        const [key, value] = param.split("=");
        if (key === "token") {
          // Return the value of the token
          return value;
        }
      }
    }
    // Return null if token is not found
    return null;
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
