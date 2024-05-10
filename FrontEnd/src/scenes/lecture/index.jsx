<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
>>>>>>> vawnhuy
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import {
  useTheme,
  Button,
  Stack,
  Modal,
  Typography,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";


// import Context from "../store/Context";
import axios from "axios";

const Lecture = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [lecturers, setLecturers] = useState([]);
  const [lecturerId, setLecturerId] = useState(null);
  
  //show error when add lecturer
  const [open, setOpen] = React.useState(false);
  const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
  const [errorDialogMessage, setErrorDialogMessage] = React.useState("");
  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
  };

  //define field when add lecturer
  const [id, setId] = useState("");
  const [IdCard, setIdCard] = useState(null);
  const [lecturerUserName, setLecturerUserName] = useState("");
  const [fullname, setFullname] = useState("");
  const [selectedDateOfBirth, setSelectedDateOfBirth] = useState(null);
  const [selectedGender, setSelectedGender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  //fetch lecturer list
  useEffect(() => {
    const fetchLecturers = async () => {
      try {
  
        const response = await axios.post(
          "http://localhost:3456/admin/getAllLecturers",
          {
            role: "Admin", // Include the role data in the request body
          },
          {
            headers: {
              Authorization: token, // Send the token in the request headers
            }
          }
        );
  
        setLecturers(response.data);
        console.log(response.data); // Set the fetched lecturers in the state
      } catch (error) {
        console.error("Error fetching lecturers:", error);
        // Handle error as needed
      }
    }; // Fetch lecturers when the component mounts
    fetchLecturers();
  }, [token]);

  const handleLectureDetail = (params) => {
    const lecturerId = params.row.id;
    navigate(`/lecturer/${lecturerId}`);
  };

  const submit = async (e) => {
    const fetchLecturers = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3456/admin/getAllLecturers",
          {
            role: "Admin",
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
  
        setLecturers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching lecturers:", error);
      }
    };
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3456/admin/addLecturer",
        {
          role: "Admin",
          id: id, // Use the entered ID
          IDCard: IdCard,
          LectureUserName: lecturerUserName,
          Fullname: fullname,
          Gender: selectedGender,
          DateOfBirth: selectedDateOfBirth,
          Address: address,
          Phone: phone,
          Email: email,
          IsActive: true,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Request successful:", response.data);
      handleClose();
      fetchLecturers();
      //Reset input
      setId("");
      setIdCard(null);
      setLecturerUserName("");
      setFullname("");
      setSelectedDateOfBirth(null);
      setSelectedGender("");
      setAddress("");
      setPhone("");
      setEmail("");
    } catch (error) {
      console.error("Error creating lecturer:", error);
      if (error.response && error.response.status === 400 && error.response.data.message === 'Student with the same ID already exists') {
        // Duplicate lecturer ID error
        setOpenErrorDialog(true);
        setErrorDialogMessage("Error: Student with the same ID already exists");
      } else {
        // Other errors
        const errorMessage = "Error creating lecturer. Please try again later.";
        setOpenErrorDialog(true);
        setErrorDialogMessage(errorMessage);
      }
    }
  };
  //delete function

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const handleDeleteButtonClick = (id) => {
    setLecturerId(id); // Set the lecturerId in the state
    setIsDeleteConfirmationOpen(true); // Open the delete confirmation modal
  };
  const cancelDeleteLecture = () => {
    setIsDeleteConfirmationOpen(false);
  }
  const handleDeleteConfirmed = async () => {
    const fetchLecturers = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3456/admin/getAllLecturers",
          {
            role: "Admin",
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
  
        setLecturers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching lecturers:", error);
      }
    };
    try {
  
      // Call the backend API to delete the lecturer
      await axios.delete(`http://localhost:3456/admin/deleteLecturer/${lecturerId}`, {
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
      fetchLecturers();
  
      // Redirect to the list of lecturers after deletion
      navigate(`/lecturer`);
    } catch (error) {
      console.error("Error deleting lecturer:", error);
      // Handle error as needed
    }
  };
  
  

  //define column
  const columns = [
    {
      field: "id",
      headerName: "Roll Number",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "LectureUserName",
      headerName: "Username",
      type: "string",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "Fullname",
      headerName: "Full Name",
      flex: 1,
    },
    {
      field: "Email",
      headerName: "Email",
      flex: 1.5,
    },
    {
      field: "Phone",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "Gender",
      headerName: "Gender",
      flex: 1,
    },
    {
      field: "IsActive",
      headerName: "IsActive",
      flex: 1,
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
    // <Context.Provider>
      <Box m="20px">
        <Stack direction="row">
          <Header title="LECTURERS" subtitle="List of lecturers" />
          <Button
            onClick={handleOpen}
            variant="contained"
            sx={{
              borderRadius: "5px",
              ml: { lg: "920px", xs: "304px" },
              backgroundColor:
              theme.palette.mode === "dark" ? "#ff8000" : "#a4a9fc",
            color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
            ":hover": {
              bgcolor: theme.palette.mode === "dark" ? "#db8e40" : "#a4a9fc", // theme.palette.primary.main
              color: "white"
              },
            }}
          >
            Add Lecturer
          </Button>
        </Stack>

        {/* Create lecturer modal*/ }
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
              CREATE NEW LECTURER
            </Typography>

            <Stack direction="column">
              <Stack direction="row">
                <TextField
                  id="outlined-basic"
                  label="Roll Number"
                  variant="outlined"
                  sx={{ mt: 3, width: 250 }}
                  name="rollNumber"
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  sx={{ mt: 3, ml: 3, width: 250 }}
                  value={lecturerUserName}
                  onChange={(e) => {
                    setLecturerUserName(e.target.value);
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Id Card"
                  variant="outlined"
                  sx={{ mt: 3, ml: 3, width: 250 }}
                  value={IdCard}
                  onChange={(e) => {
                    setIdCard(e.target.value);
                  }}
                />
              </Stack>
              <Stack direction="row">
                <TextField
                  id="outlined-basic"
                  label="Full name"
                  variant="outlined"
                  sx={{ mt: 3, width: 550 }}
                  value={fullname}
                  onChange={(e) => {
                    setFullname(e.target.value);
                  }}
                />
                <FormControl sx={{ ml: 3, mt: 3.5 }}>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    sx={{ ml: 3 }}
                    value={selectedGender} // Controlled component: value is set to the selected gender
                    onChange={(e) =>
                      setSelectedGender(e.target.value === "true")
                    } // Update the selectedGender state
                  >
                    <Stack direction="row">
                      <FormControlLabel
                        value="false"
                        control={
                          <Radio
                            sx={{
                              "&, &.Mui-checked": {
                                color: "black",
                              },
                            }}
                          />
                        }
                        label="Female"
                      />
                      <FormControlLabel
                        value="true"
                        control={
                          <Radio
                            sx={{
                              "&, &.Mui-checked": {
                                color: "black",
                              },
                            }}
                          />
                        }
                        label="Male"
                      />
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </Stack>
              <Stack direction="row">
                <TextField
                  id="outlined-basic"
                  label="Address"
                  variant="outlined"
                  sx={{ mt: 3, width: 830 }}
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </Stack>
              <Stack direction="row">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ mt: 3, width: 280 }}
                    label="Date of Birth"
                    name="DateOfBirth"
                    value={selectedDateOfBirth}
                    onChange={(date) => setSelectedDateOfBirth(date)}
                  />
                </LocalizationProvider>
                <TextField
                  label="Mobile phone"
                  variant="outlined"
                  sx={{ ml: 3, mt: 3, width: 280 }}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </Stack>
              <Stack direction="row">
              <TextField
                  type="email"
                  label="Email"
                  variant="outlined"
                  sx={{ mt: 3, width: 585 }}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Stack>
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
          </Box>
        </Modal>
        
        {/*This is cofirm delete modal*/}
        <Modal
          open={isDeleteConfirmationOpen}
          onClose={cancelDeleteLecture}
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
              {`Do you want to delete lecturer with id ${
                lecturerId
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
                onClick={cancelDeleteLecture}
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

        {/* This is the start of the table view lecturers list */}
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
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <DataGrid
            // onRowClick={handleLectureDetail}
            onCellClick={(params) => {
              if (params.field === "id") {
                handleLectureDetail(params);
              }
            }}  
            rows={lecturers}
            components={{ Toolbar: GridToolbar }}
            columns={columns}
            components={{ Toolbar: GridToolbar }} 
          />
        </Box>
      </Box>
    // </Context.Provider>
  );
};

export default Lecture;