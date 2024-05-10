import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Header from "../../components/Header";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
  Stack
} from "@mui/material";

const Curriculum = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [curriculumData, setCurriculumData] = useState([]);
  console.log(curriculumData);
  const role = localStorage.getItem("role");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/json/Curriculum.json');

        // Use the relative path to the JSON file
        if (response.ok) {
          const data = await response.json();
          setCurriculumData(data);

        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);


  const columns = [
    { field: "Id", headerName: "ID", flex: 0.1 },
    {
      field: "Code",
      headerName: "CODE",
      flex: 0.5,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Link style={{ textDecoration: "none", color: "#a4a9fc" }} to={`/curriculum/${params.row.Id}`}>{params.row.Code}</Link>
      ),
    },
    {
      field: "Name",
      headerName: "Name",
      type: "string",
      headerAlign: "left",
      align: "left",
      flex: 0.8,
      cellClassName: "name-column--cell",

    },
    {
      field: "Description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "DescriptionNo",
      headerName: "DescriptionNo",
      flex: 1,
    },
    {
      field: "TotalCredit",
      headerName: "Total Credit",
      flex: 0.4,
    },

  ];

  return (
    <Box m="20px">
<<<<<<< HEAD
      <Stack direction="row"><Header title="TEAM" subtitle="Managing the Curriculum" />
      <Button variant="contained" onClick={handleOpenModal} sx={{
         borderRadius: "5px",
         ml: { lg: "905px", xs: "304px" },
        backgroundColor:
              theme.palette.mode === "dark" ? "#ff8000" : "#a4a9fc",
            color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
            ":hover": {
              bgcolor: theme.palette.mode === "dark" ? "#db8e40" : "#a4a9fc", // theme.palette.primary.main
              color: "white"
            }}}>
        Add Curriculum
      </Button></Stack>
      
=======
      <Stack direction="row"><Header title="CURRICULUM" subtitle="Managing the Curriculum" />
        {role === "Admin" && (<Button variant="contained" onClick={handleOpenModal} sx={{
          borderRadius: "5px",
          ml: { lg: "905px", xs: "304px" },
          backgroundColor:
            theme.palette.mode === "dark" ? "#ff8000" : "#a4a9fc",
          color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
          ":hover": {
            bgcolor: theme.palette.mode === "dark" ? "#db8e40" : "#a4a9fc", // theme.palette.primary.main
            color: "white"
          }
        }}>
          Add Curriculum
        </Button>)}</Stack>

>>>>>>> vawnhuy
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="add-semester-modal"
        aria-describedby="add-semester-form"
      >
        <form>
          <Box sx={style}
            display="grid"
            gap="10px"
            gridTemplateColumns="1fr 1fr"
          >
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseModal}
              sx={{ marginLeft: "330%" }}

            >
              <CloseIcon />
            </IconButton>
            <TextField
              label="Name"
              variant="outlined"
              margin="normal"
              fullWidth
              sx={{ gridColumn: "span 4" }}
            />

            <TextField
              fullWidth
              label="Code"
              variant="outlined"
              margin="normal"
              style={{ flex: 1, marginRight: '8px' }}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              label="Total Credits"
              variant="outlined"
              margin="normal"
              style={{ flex: 1 }}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              multiline
              label="Description"
              variant="outlined"
              rows={6}
              margin="normal"
              style={{ flex: 1 }}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              label="DescriptionNo"
              variant="outlined"
              margin="normal"
              style={{ flex: 1 }}
              sx={{ gridColumn: "span 4" }}
            />


            <div style={{ marginLeft: "120%" }}>
              <Button variant="contained" color="primary" onClick={""} type="submit" style={{ marginTop: '10px', padding: '5px 40px' }}>
                Add the curriculum
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
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid getRowId={(row) => row.Id} rows={curriculumData} columns={columns} components={{ Toolbar: GridToolbar }} />
      </Box>
    </Box>
  );
};
const style = {

  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


export default Curriculum;
