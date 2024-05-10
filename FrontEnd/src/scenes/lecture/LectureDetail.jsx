import {
  useTheme,
  Button,
  Stack,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";

const LectureDetail = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const { lecturerId } = useParams();
  const [lecturer, setLecturer] = useState({});

  useEffect(() => {
    const fetchLectureDetail = async () => {
      try {
        const response = await axios.post(
          `http://localhost:3456/admin/lecturer/profile/${lecturerId}`,
          {
            role: "Admin",
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setLecturer(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching lecturer details:", error);
        // Handle error as needed
      }
    };
    fetchLectureDetail();
  }, [lecturerId, token]);

  return (
    <Box sx={{ ml: 5 }}>
      <Header title="LECTURER DETAILS" />
      {lecturer && lecturer.length > 0 ? (
        <Stack direction="column">
          <Stack direction="row" alignItems="center">
            <Typography sx={{ width: 100 }} variant="h5">
              Lecturer ID:{" "}
            </Typography>
            <TextField
              value={lecturer[0].id}
              InputProps={{
                readOnly: true,
              }}
              sx={{ ml: 1 }}
              size="small"
            />
            <Typography sx={{ width: 60, ml: 3 }} variant="h5">
              ID Card:{" "}
            </Typography>
            <TextField
              value={lecturer[0].IDCard}
              InputProps={{
                readOnly: true,
              }}
              sx={{ ml: 1 }}
              size="small"
            />
          </Stack>
          <Stack sx={{ mt: 1 }} direction="row" alignItems="center">
            <Typography sx={{ width: 100 }} variant="h5">
              Username:{" "}
            </Typography>
            <TextField
              value={lecturer[0].LectureUserName}
              InputProps={{
                readOnly: true,
              }}
              sx={{ ml: 1 }}
              size="small"
            />
          </Stack>
          <Stack sx={{ mt: 1 }} direction="row" alignItems="center">
            <Typography sx={{ width: 100 }} variant="h5">
              Full Name:{" "}
            </Typography>
            <TextField
              value={lecturer[0].Fullname}
              InputProps={{
                readOnly: true,
              }}
              sx={{ ml: 1 }}
              size="small"
            />
          </Stack>
          <Stack sx={{ mt: 1 }} direction="row" alignItems="center">
            <Typography sx={{ width: 100 }} variant="h5">
              Date of Birth:{" "}
            </Typography>
            <TextField
              value={lecturer[0].DateOfBirth}
              InputProps={{
                readOnly: true,
              }}
              sx={{ ml: 1 }}
              size="small"
            >
              {new Date(lecturer[0].DateOfBirth).toLocaleDateString()}
            </TextField>
            <Typography sx={{ width: 60, ml: 3 }} variant="h5"> Gender: </Typography>
            <TextField
              value={lecturer[0].Gender ? "Male" : "Female"}
              InputProps={{
                readOnly: true,
              }}
              sx={{ ml: 1 }}
              size="small"
            />
          </Stack>
          <Stack sx={{ mt: 1 }} direction="row" alignItems="center">
            <Typography sx={{ width: 100 }} variant="h5">
              Address:{" "}
            </Typography>
            <TextField
              value={lecturer[0].Address}
              InputProps={{
                readOnly: true,
              }}
              sx={{ ml: 1 }}
              size="small"
            />
          </Stack>
          <Stack sx={{ mt: 1 }} direction="row" alignItems="center">
            <Typography sx={{ width: 100 }} variant="h5">
              Phone:{" "}
            </Typography>
            <TextField
              value={lecturer[0].Phone}
              InputProps={{
                readOnly: true,
              }}
              sx={{ ml: 1 }}
              size="small"
            />
          </Stack>
          <Stack sx={{ mt: 1 }} direction="row" alignItems="center">
            <Typography sx={{ width: 100 }} variant="h5">
              Email:{" "}
            </Typography>
            <TextField
              value={lecturer[0].Email}
              InputProps={{
                readOnly: true,
              }}
              sx={{ ml: 1 }}
              size="small"
            />
          </Stack>
          <Stack sx={{ mt: 1 }} direction="row" alignItems="center">
            <Typography sx={{ width: 100 }} variant="h5"> Active: </Typography>
                <TextField
                  value={lecturer[0].IsActive ? "Yes" : "No"}
                InputProps={{
                    readOnly: true,
                }}
                sx={{ ml: 1 }}
                size="small"
                />
          </Stack>
          <Stack direction="row" sx={{ mt: 5, ml: 80 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                navigate(`/lecturer/${lecturerId}/edit`);
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
                navigate('/lecturer')
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
        <Typography>Lecturer is emty</Typography>
      )}
    </Box>
  );
};

export default LectureDetail;
