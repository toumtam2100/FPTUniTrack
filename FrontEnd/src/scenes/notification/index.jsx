import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Stack, TextField, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import React, { useEffect, useState } from 'react';


import Header from "../../components/Header";
import axios from "axios";
import { useNavigate } from "react-router";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';

const Notification = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const role = localStorage.getItem("role");
  const roleParams = role.toLowerCase();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [notificationId, setNotificationId] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectDateTime, setSelectDateTime] = useState(dayjs());
  const [open, setOpen] = React.useState(false);
  


  const handleNotificationDetail = (params) => {
    const notificationId = params.row.id;
    navigate(`/notification/${notificationId}`);
  }

  //fetch data
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
  
        const response = await axios.get(
          `http://localhost:3456/${roleParams}/getAllNotifications`,
          {
            headers: {
              Authorization: token, // Send the token in the request headers
            }
          }
        );
  
        setNotifications(response.data);
        console.log(response.data); // Set the fetched notifications in the state
      } catch (error) {
        console.error("Error fetching notifications:", error);
        // Handle error as needed
      }
    }; // Fetch notifications when the component mounts
    fetchNotifications();
  }, [roleParams, token]);

  //add function
  const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
  const [errorDialogMessage, setErrorDialogMessage] = React.useState("");
  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
  };
  const submit = async (e) => {
    const fetchNotifications = async () => {
      try {
  
        const response = await axios.get(
          `http://localhost:3456/${roleParams}/getAllNotifications`,
          {
            headers: {
              Authorization: token, // Send the token in the request headers
            }
          }
        );
  
        setNotifications(response.data);
        console.log(response.data); // Set the fetched notifications in the state
      } catch (error) {
        console.error("Error fetching notifications:", error);
        // Handle error as needed
      }
    }; // Fetch notifications when the component mounts
    fetchNotifications();
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3456/admin/addNotification",
        {
          role: "Admin",
          id: id, // Use the entered ID
          Title: title,
          Content: content,
          DateTime: selectDateTime,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Request successful:", response.data);
      handleClose();
      fetchNotifications();
      //Reset input
      setId("");
      setTitle("");
      setContent("");
      setFullname("");
      setSelectDateTime(null);
    } catch (error) {
      console.error("Error creating notification:", error);
      if (error.response && error.response.status === 400 && error.response.data.message === 'Student with the same ID already exists') {
        // Duplicate notification ID error
        setopenErrorDialog(true);
        setErrorDialogMessage("Error: Student with the same ID already exists");
      } else {
        // Other errors
        const errorMessage = "Error creating notification. Please try again later.";
        setOpenErrorDialog(true);
        setErrorDialogMessage(errorMessage);
      }
    }
  };

  //delete function
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const handleDeleteButtonClick = (id) => {
    setNotificationId(id); // Set the notificationId in the state
    setIsDeleteConfirmationOpen(true); // Open the delete confirmation modal
  };
  const cancelDeleteNotification = () => {
    setIsDeleteConfirmationOpen(false)
  }

  
  

  const handleDeleteConfirmed = async () => {
    const fetchNotifications = async () => {
      try {
  
        const response = await axios.get(
          `http://localhost:3456/${roleParams}/getAllNotifications`,
          {
            headers: {
              Authorization: token, // Send the token in the request headers
            }
          }
        );
  
        setNotifications(response.data);
        console.log(response.data); // Set the fetched notifications in the state
      } catch (error) {
        console.error("Error fetching notifications:", error);
        // Handle error as needed
      }
    }; // Fetch notifications when the component mounts
    fetchNotifications();
    try {
  
      // Call the backend API to delete the noti
      await axios.delete(`http://localhost:3456/admin/deleteNotification/${notificationId}`, {
        headers: {
          Authorization: token,
        },
        data: {
          role: "Admin",
        },
      });
  
      // Close the delete confirmation dialog
      setIsDeleteConfirmationOpen(false);
      //fetch data table
      fetchNotifications();
  
      // Redirect to the list of noti after deletion
      navigate(`/notification`);
    } catch (error) {
      console.error("Error deleting noti:", error);
      // Handle error as needed
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.1 },
    {
      field: "Title",
      headerName: "Title",
      flex: 0.4,
    },
    {
      field: "Content",
      headerName: "Content",
      type: "string",
      headerAlign: "left",
      align: "left",
      flex: 1.2
    },
    {
      field: "DateTime",
      headerName: "Date Time",
      flex: 0.3,
    },
    {
      field: "delete",
      headerName: "Actions",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDeleteButtonClick(params.row.id)}
          >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Stack direction="row">
        <Header title="NOTIFICATION" subtitle="Managing the Notification" />
        <Button
          onClick={handleOpen}
          variant="contained"
          sx={{
            borderRadius: "5px",
            ml: { lg: "920px", xs: "304px" },
            backgroundColor:
              theme.palette.mode === "dark" ? "#3e4396" : "#a4a9fc",
            color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
            ":hover": {
              bgcolor: "#a4a9fc",
              color: "white",
            },
          }}
        >
          Add Notification
        </Button>
      </Stack>
      {/* Modal create noti */}
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { lg: 900, xs: 700 },
              bgcolor:
                theme.palette.mode === "dark"
                  ? colors.blueAccent[900]
                  : "white",
              color:
                theme.palette.mode === "dark" ? colors.primary[100] : "black",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
            style={{ maxHeight: 700, overflow: "auto" }}
          >
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              sx={{ fontWeight: 700 }}
            >
              CREATE NEW NOTIFICATION
            </Typography>

            <Stack direction="column">
              <Stack direction="row">
                <TextField
                  label="ID"
                  variant="outlined"
                  sx={{ mt: 3, width: 400 }}
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                />
                
                
              </Stack>
              <Stack direction="row">
                <TextField
                    label="Title"
                    variant="outlined"
                    sx={{ mt: 3, width: 1000 }}
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                  }}
                />
              </Stack>
              <Stack direction="row">
              <TextField
                  multiline={true}
                  rows={4}
                  label="Content"
                  variant="outlined"
                  sx={{ mt: 3, width: 1000 }}
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                />
              </Stack>
              <Stack direction="row">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ mt: 3, width: 280 }}
                    label="Date at"
                    value={selectDateTime}
                    onChange={(date) => setSelectDateTime(date)}
                  />
                </LocalizationProvider>
              </Stack>
              <Stack direction="row">
                <Dialog
                  open={openErrorDialog}
                  onClose={handleCloseErrorDialog}
                  aria-labelledby="error-dialog-title"
                  aria-describedby="error-dialog-description"
                >
                  <DialogTitle id="error-dialog-title">Error</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="error-dialog-description">
                      {errorDialogMessage}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseErrorDialog} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
                <Stack direction="row" sx={{ mt: 5, ml: 80 }}>
                  <Button
                    type="submit"
                    variant="outlined"
                    onClick={submit}
                    sx={{
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? colors.grey[400]
                          : "white",
                      color:
                        theme.palette.mode === "dark"
                          ? colors.primary[100]
                          : "black",
                      mr: 3,
                    }}
                  >
                    Create
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleClose}
                    sx={{
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? colors.grey[400]
                          : "white",
                      color:
                        theme.palette.mode === "dark"
                          ? colors.primary[100]
                          : "black",
                    }}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Modal>
      {/*Modal delete confirmation */}
      <Modal
          open={isDeleteConfirmationOpen}
          onClose={cancelDeleteNotification}
          aria-labelledby="delete-confirmation-modal-title"
          aria-describedby="delete-confirmation-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { lg: 400, xs: 300 },
              bgcolor: theme.palette.mode === "dark" ? "#333" : "white",
              color: theme.palette.mode === "dark" ? "#FFFFFF" : "black",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              id="delete-confirmation-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontWeight: 700 }}
            >
              Delete Confirmation
            </Typography>
            <Typography
              id="delete-confirmation-modal-description"
              sx={{ mt: 2 }}
            >
              {`Do you want to delete notification with id ${
                notificationId
              } ?`}
            </Typography>
            <Stack direction="row" sx={{ mt: 5, ml: 20 }}>
              <Button
                variant="outlined"
                onClick={handleDeleteConfirmed}
                sx={{
                  bgcolor:
                    theme.palette.mode === "dark" ? colors.grey[400] : "white",
                  color:
                    theme.palette.mode === "dark"
                      ? colors.primary[100]
                      : "black",
                  mr: 3,
                }}
              >
                Yes
              </Button>
              <Button
                variant="outlined"
                onClick={cancelDeleteNotification}
                sx={{
                  bgcolor:
                    theme.palette.mode === "dark" ? colors.grey[400] : "white",
                  color:
                    theme.palette.mode === "dark"
                      ? colors.primary[100]
                      : "black",
                }}
              >
                No
              </Button>
            </Stack>
          </Box>
        </Modal>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid
          onCellClick={(params) => {
            if (params.field === "id") {
              handleNotificationDetail(params);
            }
          }}
          rows={notifications} 
          components={{ Toolbar: GridToolbar}}
          columns={columns} />
      </Box>
    </Box>
  );
};

export default Notification; 