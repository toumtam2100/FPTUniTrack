import React, { useEffect, useState } from "react";
import {
  useTheme,
  Button,
  Stack,
  Typography,
  Box,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate, useParams } from "react-router-dom";
import { lecturersData } from "../../data/lectureData";
import Header from "../../components/Header";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";

const LectureEditProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { lecturerId } = useParams();
  const [lecturer, setLecturer] = useState({});
  
  //useState for lecturer's information...
  const [id, setId] = useState("");
  const [IdCard, setIdCard] = useState(null);
  const [lecturerUserName, setLecturerUserName] = useState("");
  const [fullname, setFullname] = useState("");
  const [selectedDateOfBirth, setSelectedDateOfBirth] = useState(null);
  const [selectedGender, setSelectedGender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isActive, setIsActive] = useState("");

  useEffect(() => {
    const fetchLectureProfile = async () => {
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
        console.log(response.data);
        const receiveData = response.data;
        
        //Set lecturer data to handleSave function
        setId(receiveData[0].id);
        setFullname(receiveData[0].Fullname);
        setIdCard(receiveData[0].IDCard);
        setSelectedGender(receiveData[0].Gender);
        setSelectedDateOfBirth(receiveData[0].DateOfBirth);
        setPhone(receiveData[0].Phone);
        setAddress(receiveData[0].Address);
        setEmail(receiveData[0].Email);
        setLecturerUserName(receiveData[0].LectureUserName);
        setIsActive(receiveData[0].IsActive);
      } catch (error) {
        console.error("Error fetching lecturer details:", error);
        // Handle error as needed
      }
    };
    fetchLectureProfile();
  }, [lecturerId, token]);

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3456/admin/updateLecturer/${lecturerId}/profile`,
        {
          role: "Admin", // Add other required fields
          DateOfBirth: dayjs(selectedDateOfBirth).toISOString(),
          Gender: selectedGender,
          IDCard: IdCard,
          Address: address,
          Phone: phone,
          Email: email,
          LectureUserName: lecturerUserName,
          IsActive: isActive,
          Fullname: fullname,
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
      navigate(`/lecturer/${lecturerId}`);
    } catch (error) {
      console.error("Error updating lecturer profile:", error);
      // Handle error as needed
    }
  };

  return (
    <Box sx={{ ml: 5 }}>
      <Header title="EDIT LECTURER PROFILE" />
      {lecturer ? (
        <Stack direction="column">
          <Stack direction="row" alignItems="center">
            <Typography sx={{ width: 100 }} variant="h5">
              Lecturer ID:{" "}
            </Typography>
            <TextField
              disabled
              value={id}
              sx={{ ml: 1 }}
              size="small"
            />
            <Typography sx={{ width: 60, ml: 3 }} variant="h5">
              ID Card:{" "}
            </Typography>
            <TextField
              disabled
              value={IdCard}
              sx={{ ml: 1 }}
              size="small"
            />
          </Stack>
          <Stack sx={{ mt: 1 }} direction="row" alignItems="center">
            <Typography sx={{ width: 100 }} variant="h5">
              Username:{" "}
            </Typography>
            <TextField
              value={lecturerUserName}
              sx={{ ml: 1 }}
              size="small"
              onChange={(e) => {
                setLecturerUserName(e.target.value);
              }}
            />
          </Stack>
          <Stack sx={{ mt: 1 }} direction="row" alignItems="center">
            <Typography sx={{ width: 100 }} variant="h5">
              Full name:{" "}
            </Typography>
            <TextField
              value={fullname}
              sx={{ ml: 1 }}
              size="small"
              onChange={(e) => {
                setFullname(e.target.value);
              }}
            />
          </Stack>
          <Stack sx={{ mt: 1 }} direction="row" alignItems="center">
            <Typography  variant="h5">
              Date of Birth:{" "}
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ ml: 2, width: 200, height: 55 }}
                value={dayjs(selectedDateOfBirth)}
                onChange={(date) => setSelectedDateOfBirth(date)}
                renderInput={(params) => (
                  <TextField {...params}  size="small" />
                )}
              />
            </LocalizationProvider>
            <Typography sx={{ width: 60, ml: 3 }} variant="h5">
              {" "}
              Gender:{" "}
            </Typography>
            <FormControl sx={{ ml: 1 }}>
                <Stack direction="row">
                  <RadioGroup
                    value={selectedGender ? "true" : "false"}
                    name="radio-buttons-group"
                    sx={{ ml: 1 }}
                    onChange={(e) =>
                      setSelectedGender(e.target.value === "true")
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
                </Stack>
              </FormControl>
          </Stack>
          <Stack sx={{ mt: 1 }} direction="row" alignItems="center">
            <Typography sx={{ width: 100 }} variant="h5">
              Address:{" "}
            </Typography>
            <TextField
              value={address}
              sx={{ ml: 1 }}
              size="small"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </Stack>
          <Stack sx={{ mt: 1 }} direction="row" alignItems="center">
            <Typography sx={{ width: 100 }} variant="h5">
              Phone:{" "}
            </Typography>
            <TextField
              type="number"
              value={phone}
              sx={{ ml: 1 }}
              size="small"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </Stack>
          <Stack sx={{ mt: 1 }} direction="row" alignItems="center">
            <Typography sx={{ width: 100 }} variant="h5">
              Email:{" "}
            </Typography>
            <TextField
              value={email}
              sx={{ ml: 1 }}
              size="small"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Stack>
          <Stack sx={{ mt: 1 }} direction="row" alignItems="center">
            <Typography sx={{ width: 100 }} variant="h5">
              {" "}
              Active:{" "}
            </Typography>
            <FormControl sx={{ ml: 1 }}>
                <Stack direction="row">
                  <RadioGroup
                    value={isActive ? "true" : "false"}
                    name="radio-buttons-group"
                    sx={{ ml: 1 }}
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
                mr: 2,
              }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                navigate(`/lecturer/${lecturerId}`);
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
              Cancel
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Typography>Lecturer is emty</Typography>
      )}
    </Box>
  );
};

export default LectureEditProfile;
