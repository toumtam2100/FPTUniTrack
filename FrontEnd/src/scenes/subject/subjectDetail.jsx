import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useTheme,
  Typography,
  Paper,
  Grid,
  Box,
  TextField,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";

const SubjectDetail = () => {
  //Get user role & token to fetch data
  const role = localStorage.getItem("role");
  // Check if the user has the 'admin' role
  const isAdmin = role === 'Admin';
  const token = localStorage.getItem("token");
  //URL require lowercase text for user role
  //example: localhost:3456/admin/... not localhost:3456/Admin/...
  //so we need to transfer the role variable to lowercase text!
  const roleParams = role.toLowerCase();
  console.log(roleParams);
  const [subject, setSubject] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { subjectId } = useParams();
  const maxScoreNameWidth = Math.max(
    ...(subject && subject[0] && subject[0].Score
      ? subject[0].Score.map((score) => score.scoreName.length)
      : [0])
  );

  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjectDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3456/${roleParams}/subjectDetail/${subjectId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setSubject(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching subject:", error);
        // Handle error as needed
      }
    };

    fetchSubjectDetail();
  }, [roleParams, subjectId, token]);

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirmed = async () => {
    try {
      // Call the backend API to delete the student
      await axios.delete(`http://localhost:3456/admin/subject/${subjectId}/delete`, {
        headers: {
          Authorization: token,
        },
        data: {
          role: "Admin",
        },
      });

      // Close the delete confirmation dialog
      setDeleteDialogOpen(false);

      // Redirect to the list of students after deletion
      navigate(`/subject`);
    } catch (error) {
      console.error("Error deleting subject:", error);
      // Handle error as needed
    }
  };

  return (
    <Box sx={{ ml: 5 }}>
      <Header title="SUBJECT DETAIL" />
      {subject ? (
        <Box sx={{ mt: 5 }}>
          <Stack direction="row" alignItems="center">
            <Stack direction="row" alignItems="center">
              <Typography variant="h5" fontWeight='750'>Subject ID:</Typography>
              <TextField
                defaultValue={subject[0].SubjectID}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ ml: 6.7 }}
                size="small"
              />
            </Stack>
            <Stack direction="row" alignItems="center" sx={{ ml: 5 }}>
              <Typography variant="h5" fontWeight='750'>PREQUISITE:</Typography>
              <TextField
                defaultValue={subject[0].PREQUISITE || "None"}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ ml: 3 }}
                size="small"
              />
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Stack direction="row" alignItems="center" sx={{ mt: 3 }}>
              <Typography variant="h5" fontWeight='750'>Subject Code:</Typography>
              <TextField
                defaultValue={subject[0].SubjectCode}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ ml: 3.8 }}
                size="small"
              />
            </Stack>
            <Stack direction="row" alignItems="center" sx={{ mt: 3, ml: 5 }}>
              <Typography variant="h5" fontWeight='750'>Is Active:</Typography>
              <TextField
                defaultValue={subject[0].IsActive}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ ml: 6.9 }}
                size="small"
              />
            </Stack>
          </Stack>

          <Stack direction="row" alignItems="center" sx={{ mt: 3 }}>
            <Typography variant="h5" fontWeight='750'>Syllabus Name:</Typography>
            <TextField
              defaultValue={subject[0].SyllabusName}
              InputProps={{
                readOnly: true,
              }}
              sx={{ ml: 2.4 }}
              size="small"
            />
          </Stack>
          <Stack direction="row" alignItems="center" sx={{ mt: 3 }}>
            <Typography variant="h5" fontWeight='750'>Subject Score & Percentage:</Typography>
          </Stack>
          {subject[0]?.Score.map((score, index) => (
            <Stack key={index} direction="row" alignItems="center" sx={{ mt: 3, ml: 2 }}>
              <Typography variant="h5" sx={{ width: `${maxScoreNameWidth}ch` }}>{score.scoreName}</Typography>
              <TextField
                key={index}
                defaultValue={score.percentage}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ ml: 3, width: 60 }}
                size="small"
              />
            </Stack>
          ))}
          <Box sx={{ mt: 5 }}>
            {isAdmin && (
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  navigate(`/subject/${subjectId}/edit`);
                }}
                sx={{
                  borderRadius: "20px",
                  backgroundColor:
                  theme.palette.mode === "dark" ? "#ff8000" : "#a4a9fc",
                color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
                ":hover": {
                  bgcolor: theme.palette.mode === "dark" ? "#db8e40" : "#a4a9fc", // theme.palette.primary.main
                  color: "white"
                  },
                }}>
                Edit subject
              </Button>
            )}
            <Button
              variant="contained"
              size="large"
              sx={{
                ml: 3,
                borderRadius: "20px",
                backgroundColor:
              theme.palette.mode === "dark" ? "#ff8000" : "#a4a9fc",
            color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
            ":hover": {
              bgcolor: theme.palette.mode === "dark" ? "#db8e40" : "#a4a9fc", // theme.palette.primary.main
              color: "white"
              },
              }}
              onClick={() => {
                navigate(`/subject`);
              }}
            >
              Cancel/Go back
            </Button>
            {isAdmin && (
              <Button
                variant="contained"
                size="large"
                sx={{
                  ml: 3,
                  borderRadius: "20px",
                  backgroundColor:
                  theme.palette.mode === "dark" ? "#ff8000" : "#a4a9fc",
                color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
                ":hover": {
                  bgcolor: theme.palette.mode === "dark" ? "#db8e40" : "#a4a9fc", // theme.palette.primary.main
                  color: "white"
                  },
                }}
                onClick={handleDeleteDialogOpen}>
                Delete
              </Button>
            )}
          </Box>
          {/* Delete Confirmation Dialog */}
          <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete this subject?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteDialogClose}>Cancel</Button>
              <Button onClick={handleDeleteConfirmed} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      ) : (
        <Typography variant="body1">Subject not found</Typography>
      )}
    </Box>
  )
}

export default SubjectDetail;