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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
  
const NotificationEditDetail = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const roleParams = role.toLowerCase();
  
    const token = localStorage.getItem("token");
    const { notificationId } = useParams();
    const [notification, setNotification] = useState({});
    
    //define this shit
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectDateTime, setSelectDateTime] = useState(null);
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
            console.log(response.data);
            const receiveData = response.data;
            
            //Set noti data to handleSave function
            setId(receiveData[0].id);
            setTitle(receiveData[0].Title);
            setContent(receiveData[0].Content);
            setSelectDateTime(receiveData[0].DateTime);
          } catch (error) {
            console.error("Error fetching notification details:", error);
            // Handle error as needed
          }
        };
        fetchNotificationDetail();
    }, [notificationId, roleParams ,token]);
    
    const handleSave = async () => {
        try {
          const response = await axios.put(
            `http://localhost:3456/admin/updateNotification/${notificationId}/detail`,
            {
                role: "Admin", // Add other required fields
                Title: title,
                Content: content,
                DateTime: dayjs(selectDateTime).toISOString(),
            },
            {
              headers: {
                Authorization: token,
              },
            }
            // Add headers as needed
          );
    
          console.log(response.data); // Handle success response
    
          // Optionally, you can navigate to a different page after a successful update
          navigate(`/notification/${notificationId}`);
        } catch (error) {
          console.error("Error updating notification profile:", error);
          // Handle error as needed
        }
    };

    
    return (
      <Box sx={{ ml: 5 }}>
        <Header title="EDIT NOTIFICATION DETAILS" />
        {notification ? (
          <Stack direction="column">
            <Stack direction="row" alignItems="center">
              <Typography sx={{ width: 100 }} variant="h5">
                ID:{" "}
              </Typography>
              <TextField
                disabled
                value={id}
                sx={{ ml: 1, width: 500 }}
                size="small"
              />
            </Stack>
            <Stack sx={{ mt: 1 }} direction="row" alignItems="center">
                <Typography sx={{ width: 100 }} variant="h5">
                Title:{" "}
                </Typography>
                <TextField
                value={title}
                sx={{ ml: 1, width: 500 }}
                size="small"
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
                />
              </Stack>
            <Stack sx={{ mt: 1 }} direction="row" alignItems="center">
              <Typography sx={{ width: 100 }} variant="h5">
                Content:{" "}
              </Typography>
              <TextField
                multiline={true}
                rows={5}
                value={content}
                sx={{ ml: 1, width: 700 }}
                size="small"
                onChange={(e) => {
                    setContent(e.target.value);
                }}
              />
            </Stack>
            <Stack sx={{ mt: 1 }} direction="row" alignItems="center">
                <Typography sx={{ width: 100 }} variant="h5">
                    Date at:{" "}
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    sx={{ ml: 1, width: 200, height: 55 }}
                    value={dayjs(selectDateTime)}
                    onChange={(date) => setSelectDateTime(date)}
                    renderInput={(params) => (
                    <TextField {...params}  size="small" />
                    )}
                />
                </LocalizationProvider>
            </Stack>
            <Stack direction="row" sx={{ mt: 5, ml: 80 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleSave}
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
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  navigate(`/notification/${notificationId}`)
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
  
  export default NotificationEditDetail;
