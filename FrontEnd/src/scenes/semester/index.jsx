import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Header from "../../components/Header";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
  Stack
} from "@mui/material";
// import { useAuth0 } from '@auth0/auth0-react';
// import { cl } from "@fullcalendar/core/internal-common";

const Semester = () => {
  const role = localStorage.getItem("role");

  const [semesterData, setSemesterData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSemester, setNewSemester] = useState({
    SemesterID: "",
    Name: "",
    StartDate: "",
    EndDate: "",
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleAddSemester = async (e) => {
    e.preventDefault();
    console.log(newSemester);
    // Send a POST request to your backend API to add the new semester
    fetch('http://localhost:3456/semester', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSemester),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the semesterData with the newly added semester
        setSemesterData([...semesterData, data]);
        // setIsModalOpen(false); // Close the modal
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('/json/Semester.json');
        const response = await fetch('http://localhost:3456/semester');
        // Use the relative path to the JSON file
        if (response.ok) {
          const data = await response.json();
          setSemesterData(data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log(semesterData);

  const columns = [
    { field: "SemesterID", headerName: "ID", flex: 0.5 },
    {
      field: "Name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Link style={{ textDecoration: "none", color: "#a4a9fc" }} to={`/semester/${params.row.SemesterID}`}>{params.row.Name}</Link>
      ),
    },
    {
      field: "StartDate",
      headerName: "Start Date",
      type: "date",
      valueGetter: (params) => {
        // Transform your end date value into a Date object
        return new Date(params.row.StartDate);
      },
      headerAlign: "left",
      align: "left",
    },
    {
      field: "EndDate",
      headerName: "End Date",
      type: "date",
      valueGetter: (params) => {
        // Transform your end date value into a Date object
        return new Date(params.row.EndDate);
      },
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
<<<<<<< HEAD
      <Stack direction="row"><Header title="TEAM" subtitle="Managing the Semester"/>
      <Button variant="contained" onClick={handleOpenModal} sx={{ 
       borderRadius: "5px",
       ml: { lg: "920px", xs: "304px" },
       backgroundColor:
         theme.palette.mode === "dark" ? "#ff8000" : "#a4a9fc",
       color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
       ":hover": {
         bgcolor: theme.palette.mode === "dark" ? "#db8e40" : "#a4a9fc", // theme.palette.primary.main
         color: "white",
       },}}>
        Add Semester
      </Button></Stack>
      
=======
      <Stack direction="row"><Header title="SEMESTER" subtitle="Managing the Semester" />
        {role === "Admin" && (<Button variant="contained" onClick={handleOpenModal} sx={{
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
          Add Semester
        </Button>)}</Stack>

>>>>>>> vawnhuy
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="add-semester-modal"
        aria-describedby="add-semester-form"
      >
        <form onSubmit={handleAddSemester}>
          <Box sx={style}>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseModal}
              sx={{ marginLeft: "90%" }}
            >
              <CloseIcon />
            </IconButton>

            <TextField
              label="Semester Name"
              variant="outlined"
              margin="normal"
              fullWidth
              value={newSemester.Name}
              onChange={(e) => {
                const newName = e.target.value;
                setNewSemester({
                  ...newSemester,
                  Name: newName,
                  SemesterID: newName.replace(/\s/g, ""),
                });
              }}

            />
            <div style={rowStyle}>
              <TextField
                label="Start Date"
                variant="outlined"
                type="date"
                margin="normal"
                style={{ flex: 1, marginRight: '8px' }}
                value={newSemester.StartDate}
                InputLabelProps={{
                  shrink: true, // Keeps the label in the "floating" position
                }}
                onChange={(e) => setNewSemester({ ...newSemester, StartDate: e.target.value })}
              />
              <TextField
                label="End Date"
                variant="outlined"
                type="date"
                margin="normal"
                style={{ flex: 1 }}
                value={newSemester.EndDate}
                InputLabelProps={{
                  shrink: true, // Keeps the label in the "floating" position
                }}
                onChange={(e) => setNewSemester({ ...newSemester, EndDate: e.target.value })}
              />
            </div>
            <TextField
              label="SemesterID"
              disabled
              variant="outlined"
              margin="normal"
              fullWidth
              value={newSemester.Name.replace(/\s/g, "")}
              onChange={(e) => setNewSemester({ ...newSemester, SemesterID: e.target.value })}

            />
            {console.log(newSemester)}

            <div style={{ textAlign: 'center' }}>
              <Button variant="contained" color="primary" type="submit" style={{ marginTop: '10px', padding: '10px' }}>
                Add the semester
              </Button>
            </div>
          </Box>
        </form>
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
          }, "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid sx={{ marginTop: "10px"}} getRowId={(row) => row.SemesterID} rows={semesterData} columns={columns} components={{ Toolbar: GridToolbar }} />
      </Box>

    </Box>
  );
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between', // To space the elements evenly in a row
};
export default Semester;
