import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Students = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  //Set state for dialog
  const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
  const [errorDialogMessage, setErrorDialogMessage] = React.useState("");

  //Dialog handle open when there's error create student, eg: same ID with existed ID in the database.
  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
  };
  //Set state for modal student student.
  const [open, setOpen] = React.useState(false);
  
  const [students, setStudents] = useState([]);

  //Set data state for modal create student.
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedDateOfBirth, setSelectedDateOfBirth] = useState(null);
  const [idCard, setIdCard] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [studentUsername, setStudentUsername] = useState("");
  const [specialization, setSpecialization] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3456/admin/getAllStudents",
          {
            role: "Admin", // Include the role data in the request body
          },
          {
            headers: {
              Authorization: token, // Send the token in the request headers
            }
          }
        );

        setStudents(response.data);
        console.log(response.data); // Set the fetched students in the state
      } catch (error) {
        console.error("Error fetching students:", error);
        // Handle error as needed
      }
    }; // Fetch students when the component mounts
    fetchStudents();
  }, [token]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3456/admin/addStudent",
        {
          role: "Admin",
          id: id, // Use the entered ID
          Fullname: name,
          Gender: selectedGender,
          DateOfBirth: selectedDateOfBirth,
          IDCard: idCard,
          Address: address,
          Phone: phone,
          Email: email,
          StudentUsername: studentUsername,
          Specialization: specialization,
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

    } catch (error) {
      console.error("Error creating student:", error);
      // Handle error as needed, e.g., display an error message
      // You can also use a dialog to show the error message.
      // Example using a dialog from @mui/material:
      if (error.response && error.response.status === 400 && error.response.data.message === 'Student with the same ID already exists') {
        // Duplicate student ID error
        setOpenErrorDialog(true);
        setErrorDialogMessage("Error: Student with the same ID already exists");
      } else {
        // Other errors
        const errorMessage = "Error creating student. Please try again later.";
        setOpenErrorDialog(true);
        setErrorDialogMessage(errorMessage);
      }
    }
  };

  const columns = [
    { field: "id", headerName: "Roll Number", flex: 0.5 },
    {
      field: "Fullname",
      headerName: "Full Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Gender",
      headerName: "Gender",
      flex: 0.5,
    },
    {
      field: "IDCard",
      headerName: "ID Card",
      flex: 1,
    },
    {
      field: "Phone",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "Email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "Specialization",
      headerName: "Specialization",
      flex: 0.5,
    },
  ];

  return (
    <Box m="20px">
      <Stack direction="row">
        <Header title="STUDENTS" subtitle="List of students" />
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
              color: "white",
            },
          }}
        >
          Add Student
        </Button>
      </Stack>

      {/* This is the start of the modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form action="POST">
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
                  : "white", // Adjust the color here
              color:
                theme.palette.mode === "dark" ? colors.primary[100] : "black", // Adjust the text color here
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
              CREATE NEW STUDENT
            </Typography>

            <Stack direction="column">
              <TextField
                label="ID"
                variant="outlined"
                sx={{ mt: 3, width: 300 }}
                onChange={(e) => {
                  setId(e.target.value);
                }}
                value={id}
              />
              <Stack direction="row">
                <TextField
                  label="Full name"
                  variant="outlined"
                  sx={{ mt: 3, mb: 2, width: 300 }}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
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
                                color: "silver",
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
                                color: "silver",
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Date of Birth"
                      value={selectedDateOfBirth}
                      onChange={(date) => setSelectedDateOfBirth(date)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="ID Card"
                  variant="outlined"
                  sx={{ ml: 3, mt: 1, width: 600 }}
                  value={idCard}
                  onChange={(e) => setIdCard(e.target.value)}
                />
              </Stack>

              <TextField
                id="outlined-basic"
                label="Address"
                variant="outlined"
                sx={{ mt: 3, width: 830 }}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <Stack direction="row">
                <TextField
                  type="number"
                  label="Phone"
                  variant="outlined"
                  sx={{ mt: 3, width: 420 }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <TextField
                  type="email"
                  label="Email"
                  variant="outlined"
                  sx={{ mt: 3, ml: 3, width: 420 }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Stack>
              <Stack direction="row">
                <TextField
                  label="Student Username"
                  variant="outlined"
                  sx={{ mt: 3, width: 250 }}
                  value={studentUsername}
                  onChange={(e) => setStudentUsername(e.target.value)}
                />
                <FormControl sx={{ mt: 3, ml: 3, width: 150 }}>
                  <InputLabel id="demo-simple-select-label">
                    Specialization
                  </InputLabel>
                  <Select
                    label="Specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                  >
                    <MenuItem value="SE">SE</MenuItem>
                    <MenuItem value="IA">IA</MenuItem>
                    <MenuItem value="GD">GD</MenuItem>
                    <MenuItem value="AI">AI</MenuItem>
                    <MenuItem value="IB">IB</MenuItem>
                    <MenuItem value="IS">IS</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              {/* Tam thoi khong can Full name vi ta co the lay Last name + Middle name + First name la se ra Full name */}
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
                    theme.palette.mode === "dark" ? colors.grey[400] : "white",
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
                    theme.palette.mode === "dark" ? colors.grey[400] : "white",
                  color:
                    theme.palette.mode === "dark"
                      ? colors.primary[100]
                      : "black",
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </form>
      </Modal>
      {/* This is the end of the modal */}

      {/* This is the start of the table view student list */}
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
          //getRowId={(row) => row.id}
          rows={students}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onRowClick={(params) => {
            const studentId = params.row.id; // use studentId instead of id
            console.log(studentId);
            navigate(`/students/${studentId}`);
          }}
        />
      </Box>
      {/* This is the end of the table view student list */}
    </Box>
  );
};

export default Students;
