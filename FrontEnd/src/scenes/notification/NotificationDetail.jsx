import {
    useTheme,
    Button,
    Stack,
    Typography,
    Box,
    TextField,
  } from "@mui/material";
  import { tokens } from "../../theme";
  import {  useNavigate, useParams } from "react-router-dom";
  import React, { useEffect, useState } from "react";
  import Header from "../../components/Header";
  import axios from "axios";
  
const NotificationDetail = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const roleParams = role.toLowerCase();
  
    const token = localStorage.getItem("token");
    const { notificationId } = useParams();
    const [notification, setNotification] = useState({});
  
    useEffect(() => {
      const fetchNotificationDetail = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3456/${roleParams}/notificationDetail/${notificationId}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
  
          setNotification(response.data);
          console.log(response.data)
        } catch (error) {
          console.error("Error fetching notification details:", error);
          // Handle error as needed
        }
      };
      fetchNotificationDetail();
    }, [notificationId, roleParams, token]);
  
    return (
      <Box sx={{ ml: 5 }}>
        <Header title="NOTIFICATION DETAILS" />
        {notification && notification.length > 0 ? (
          <Stack direction="column">
            <Stack direction="row" alignItems="center">
              <Typography sx={{ width: 100 }} variant="h5">
                ID:{" "}
              </Typography>
              <TextField
                value={notification[0].id}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ ml: 1, width: 500 }}
                size="small"
              />
            </Stack>
            <Stack sx={{ mt: 1 }} direction="row" alignItems="center">
                <Typography sx={{ width: 100 }} variant="h5">
                Title:{" "}
                </Typography>
                <TextField
                value={notification[0].Title}
                InputProps={{
                    readOnly: true,
                }}
                sx={{ ml: 1, width: 500 }}
                size="small"
                />
              </Stack>
            <Stack sx={{ mt: 1 }} direction="row" alignItems="center">
              <Typography sx={{ width: 100 }} variant="h5">
                Content:{" "}
              </Typography>
              <TextField
                multiline={true}
                rows={3}
                value={notification[0].Content}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ ml: 1, width: 700 }}
                size="small"
              />
            </Stack>
            <Stack sx={{ mt: 1 }} direction="row" alignItems="center">
              <Typography sx={{ width: 100 }} variant="h5">
                Date of Birth:{" "}
              </Typography>
              <TextField
                value={notification[0].DateTime}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ ml: 1 }}
                size="small"
                >
                {new Date(notification[0].DateTime).toLocaleDateString()}
              </TextField>
            </Stack>
            <Stack direction="row" sx={{ mt: 5, ml: 80 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  navigate(`/notification/${notificationId}/edit`);
                }}
                sx={{
                  borderRadius: "20px",
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#3e4396" : "#a4a9fc",
                  color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
                  ":hover": {
                    bgcolor: "#a4a9fc", 
                    color: "white",
                  },
                  mr: 2
                }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  navigate('/notification')
                }}
                sx={{
                  borderRadius: "20px",
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#3e4396" : "#a4a9fc",
                  color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
                  ":hover": {
                    bgcolor: "#a4a9fc", 
                    color: "white",
                  },
                }}
              >
                Back
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Typography>Notification is emty</Typography>
        )}
      </Box>
    );
  };
  
  export default NotificationDetail;
  