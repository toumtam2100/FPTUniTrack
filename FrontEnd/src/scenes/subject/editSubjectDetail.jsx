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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";

const EditSubjectDetail = () => {
  //Get user role & token to fetch data
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  //URL require lowercase text for user role
  //example: localhost:3456/admin/... not localhost:3456/Admin/...
  //so we need to transfer the role variable to lowercase text!
  const roleParams = role.toLowerCase();
  console.log(roleParams);
  const [subject, setSubject] = useState("");
  const { subjectId } = useParams();
  const maxScoreNameWidth = Math.max(
    ...((subject && subject[0] && subject[0].Score) || []).map(
      (score) => score.scoreName.length
    )
  );

  const handleScoreChange = (e, index) => {
    const newScore = [...Score];
    newScore[index].percentage = e.target.value;
    setScore(newScore);
  };

  //useState for subject detail...
  const [SubjectId, setSubjectId] = useState("");
  const [SubjectCode, setSubjectCode] = useState("");
  const [SyllabusName, setSyllabusName] = useState("");
  const [Score, setScore] = useState([]);
  const [Prequisite, setPrequisite] = useState("");
  const [IsActive, setIsActive] = useState("");

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

        const receivedData = response.data;

        //Set subject data to handleSave function
        setSubjectId(receivedData[0].SubjectID);
        setSubjectCode(receivedData[0].SubjectCode);
        setSyllabusName(receivedData[0].SyllabusName);
        setScore(receivedData[0].Score);
        setIsActive(receivedData[0].IsActive);
        setPrequisite(receivedData[0].PREQUISITE);
      } catch (error) {
        console.error("Error fetching subject:", error);
        // Handle error as needed
      }
    };

    fetchSubjectDetail();
  }, [roleParams, subjectId, token ]);

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3456/admin/subjectDetail/${subjectId}/edit`,
        {
          role: "Admin", // Add other required fields
          SubjectID: SubjectId,
          SubjectCode: SubjectCode,
          SyllabusName: SyllabusName,
          Score: Score,
          PREQUISITE: Prequisite,
          IsActive: IsActive,
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
      navigate(`/subject/${subjectId}`);
    } catch (error) {
      console.error("Error updating subject detail:", error);
      // Handle error as needed
    }
  };

  return (
    <Box sx={{ ml: 5 }}>
      <Header title="SUBJECT DETAIL EDIT" />
      {subject ? (
        <Box sx={{ mt: 5 }}>
          <Stack direction="row" alignItems="center">
            <Stack direction="row" alignItems="center">
              <Typography variant="h5" fontWeight='750'>Subject ID:</Typography>
              <TextField
                value={SubjectId}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ ml: 6.7 }}
                size="small"
              />
            </Stack>
            <Stack direction="row" alignItems="center" sx={{ml: 5}}>
              <Typography variant="h5" fontWeight='750'>PREQUISITE:</Typography>
              <TextField
                value={Prequisite}
                sx={{ ml: 3 }}
                size="small"
                onChange={(e) => {
                  setPrequisite(e.target.value);
                }}
              />
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Stack direction="row" alignItems="center" sx={{ mt: 3 }}>
              <Typography variant="h5" fontWeight='750'>Subject Code:</Typography>
                <TextField
                  value={SubjectCode}
                  sx={{ ml: 3.8 }}
                  size="small"
                  onChange={(e) => {
                    setSubjectCode(e.target.value);
                  }}
                />
            </Stack>
            <Stack direction="row" alignItems="center" sx={{ mt: 3, ml: 5 }}>
              <Typography variant="h5" fontWeight='750'>Is Active:</Typography>
              <FormControl sx={{ ml: 9.2 }}>
                <Stack direction="row">
                  <RadioGroup
                    value={IsActive ? "true" : "false"}
                    name="radio-buttons-group"
                    sx={{ ml: 3 }}
                    onChange={(e) =>
                      setIsActive(e.target.value === "true")
                    }
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
                        label="No"
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
                        label="Yes"
                      />
                    </Stack>
                  </RadioGroup>
                </Stack>
              </FormControl>
            </Stack>
          </Stack>
          
          <Stack direction="row" alignItems="center" sx={{mt: 3}}>
            <Typography variant="h5" fontWeight='750'>Syllabus Name:</Typography>
            <TextField
              value={SyllabusName}
              sx={{ ml: 2.4 }}
              size="small"
              onChange={(e) => {
                setSyllabusName(e.target.value);
              }}
            />
          </Stack>
          <Stack direction="row" alignItems="center" sx={{mt: 3}}>
            <Typography variant="h5" fontWeight='750'>Subject Score & Percentage:</Typography>
          </Stack>
          {Score.map((score, index) => (
            <Stack key={index} direction="row" alignItems="center" sx={{ mt: 3 , ml: 2}}>
              <Typography variant="h5" sx={{width: `${maxScoreNameWidth}ch`}}>
                {score.scoreName}
              </Typography>
              <TextField
                key={index}
                value={score.percentage}
                sx={{ ml: 3, width: 60 }}
                size="small"
                onChange={(e) => handleScoreChange(e, index)}
              />
            </Stack>
          ))}
          <Box sx={{ mt: 5 }}>
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
                  bgcolor: "#a4a9fc", // theme.palette.primary.main
                  color: "white",
                },
              }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              size="large"
              sx={{
                ml: 3,
                borderRadius: "20px",
                backgroundColor:
                  theme.palette.mode === "dark" ? "#3e4396" : "#a4a9fc",
                color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
                ":hover": {
                  bgcolor: "#a4a9fc", // theme.palette.primary.main
                  color: "white",
                },
              }}
              onClick={() => {
                navigate(`/subject/${subjectId}`);
              }}
            >
              Cancel/Go back
            </Button>
          </Box>
        </Box>
      ) : (
        <Typography variant="body1">Subject not found</Typography>
      )}
    </Box>
  )
}

export default EditSubjectDetail;