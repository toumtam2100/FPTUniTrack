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
  IconButton
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";

const Subject = () => {
  //Get user role & token to fetch data
  const role = localStorage.getItem("role");
  // Check if the user has the 'admin' role
  const isAdmin = role === 'Admin';
  const token = localStorage.getItem("token");
  //URL require lowercase text for user role
  //example: localhost:3456/admin/... not localhost:3456/Admin/...
  //so we need to transfer the role variable to lowercase text!
  const roleParams = role.toLowerCase();

  const [subjects, setSubjects] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Set state for dialog
  const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
  const [errorDialogMessage, setErrorDialogMessage] = React.useState("");

  //Dialog handle open when there's error create student, eg: same ID with existed ID in the database.
  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
  };
  //Set state for modal student student.
  const [open, setOpen] = React.useState(false);
  const [gradeCategories, setGradeCategories] = useState([""]);

  //Set data state for modal create student.
  const [SubjectId, setSubjectId] = useState("");
  const [SubjectCode, setSubjectCode] = useState("");
  const [SyllabusName, setSyllabusName] = useState("");
  const [scoreCategories, setScoreCategories] = useState([{ scoreName: "", percentage: "" }]);
  const [Prequisite, setPrequisite] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addScoreCategory = () => {
    setScoreCategories([...scoreCategories, { scoreName: "", percentage: "" }]);
  };

  const removeScoreCategory = (index) => {
    if (scoreCategories.length > 1) {
      const updatedCategories = [...scoreCategories];
      updatedCategories.splice(index, 1);
      setScoreCategories(updatedCategories);
    } else {
      alert("A subject needs at least 1 score category!");
    }
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3456/${roleParams}/getAllSubjects`,
          {
            headers: {
              Authorization: token, // Send the token in the request headers
            }
          }
        );

        setSubjects(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
        // Handle error as needed
      }
    };
    fetchSubjects();
  }, [token, roleParams]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3456/admin/subject/create",
        {
          role: "Admin",
          SubjectID: SubjectId,
          SubjectCode: SubjectCode,
          SyllabusName: SyllabusName,
          PREQUISITE: Prequisite,
          Score: scoreCategories,
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
      console.error("Error creating subject:", error);
      // Handle error as needed, e.g., display an error message
      // You can also use a dialog to show the error message.
      // Example using a dialog from @mui/material:
      if (error.response && error.response.status === 400 && error.response.data.message === 'Subject with the same ID already exists') {
        // Duplicate student ID error
        setOpenErrorDialog(true);
        setErrorDialogMessage("Error: Subject with the same ID already exists");
      } else {
        // Other errors
        const errorMessage = "Error creating subject. Please try again later.";
        setOpenErrorDialog(true);
        setErrorDialogMessage(errorMessage);
      }
    }
  };

  const columns = [
    {
      field: "SubjectID",
      headerName: "Subject ID",
      flex: 0.3,
      renderCell: (params) => (
        <Link style={{ textDecoration: "none", color: "#a4a9fc" }} to={`/subject/${params.row.SubjectID}`}>{params.row.SubjectID}</Link>
      )
    },
    {
      field: "SubjectCode",
      headerName: "Subject Code",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "SyllabusName",
      headerName: "Syllabus Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "PREQUISITE",
      headerName: "Prerequisite",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "IsActive",
      headerName: "Is Active",
      flex: 0.3,
      cellClassName: "name-column--cell",
    },
  ];

  return (
    <Box m="20px">
      <Stack direction="row">
        <Header title="SUBJECTS" />
        {isAdmin && (
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
            }}>
            Add Subject
          </Button>
        )}
      </Stack>

      <Modal
        open={open}
        onClose={handleClose}>
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
            style={{ maxHeight: 700, overflow: "auto" }}>
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              sx={{ fontWeight: 700 }}>
              CREATE NEW SUBJECT
            </Typography>

            <Stack direction="column">
              <Stack direction='row'>
                <TextField
                  label="SubjectID"
                  variant="outlined"
                  type="number"
                  sx={{ mt: 3, width: 300 }}
                  onChange={(e) => {
                    setSubjectId(e.target.value);
                  }}
                  value={SubjectId}
                />
                <TextField
                  label="Prequisite"
                  variant="outlined"
                  type="text"
                  sx={{ mt: 3, width: 300, ml: 5 }}
                  onChange={(e) => {
                    setPrequisite(e.target.value);
                  }}
                  value={Prequisite}
                />
              </Stack>

              <Stack direction="row">
                <TextField
                  label="Subject Code"
                  type="text"
                  variant="outlined"
                  sx={{ mt: 3, mb: 2, width: 300 }}
                  onChange={(e) => {
                    setSubjectCode(e.target.value);
                  }}
                  value={SubjectCode} />
                <TextField
                  label="Syllabus Name"
                  variant="outlined"
                  type="text"
                  sx={{ mt: 3, width: 300, ml: 5 }}
                  value={SyllabusName}
                  onChange={(e) => setSyllabusName(e.target.value)} />
              </Stack>
            </Stack>
            {/* Grade Categories */}
            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Grade Categories:
            </Typography>
            {scoreCategories.map((score, index) => (
              <Stack direction="row" alignItems="center" key={index}>
                <TextField
                  label={`Score Category ${index + 1}`}
                  variant="outlined"
                  type="text"
                  sx={{ mt: 1, mb: 2, width: 300 }}
                  value={score.scoreName}
                  onChange={(e) => {
                    const updatedCategories = [...scoreCategories];
                    updatedCategories[index].scoreName = e.target.value;
                    setScoreCategories(updatedCategories);
                  }}
                />
                <TextField
                  label="Percentage"
                  variant="outlined"
                  type="text"
                  sx={{ mt: 1, mb: 2, width: 300, ml: 2 }}
                  value={score.percentage}
                  onChange={(e) => {
                    const updatedCategories = [...scoreCategories];
                    updatedCategories[index].percentage = e.target.value;
                    setScoreCategories(updatedCategories);
                  }}
                />
                <IconButton onClick={() => removeScoreCategory(index)} color="error">
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={addScoreCategory}>
                  <AddCircleIcon color="primary" />
                </IconButton>
              </Stack>
            ))}
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
                }}>
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
          getRowId={(row) => row.SubjectID}
          rows={subjects}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        // onRowClick={(params) => {
        //   const subjectId = params.row.SubjectID;
        //   console.log(subjectId);
        //   navigate(`/subject/${subjectId}`);
        // }}
        />
      </Box>
    </Box>
  );
};

export default Subject;
