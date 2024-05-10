import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const SemesterDetail = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [semester, setSemester] = useState([]);
  const [idValue, setIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  const params = useParams().semesterId;
  console.log(params)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3456/semester/${params}`);
        if (response.ok) {
          const data = await response.json();
          setSemester(data);
          setIdValue(params);
          setNameValue(data.Name);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedSemester = {
        Name: nameValue, // Get the updated name from the state
        SemesterID: idValue// Include other fields you want to update here
      };

      const response = await fetch(`http://localhost:3456/semester/${params}`, {
        method: 'PUT', // Use PUT method to update the semester
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSemester), // Send the updated data
      });

      if (response.status === 200) {
        // Update the state or perform any other actions upon a successful update
        console.log('Semester updated successfully');
        navigate(`/semester`);
      } else {
        console.error('Failed to update semester');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleDeleteSemester = async (e) => {

    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3456/semester/${params}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {

        // Handle the successful deletion, e.g., navigate to a different page
        console.log('Semester deleted successfully');
      } else {
        navigate(`/semester`);
        console.error('Failed to delete semester');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleNameChange = (event) => {
    const name = event.target.value;
    const id = name.replace(/\s/g, '');
    setNameValue(name); // Update the Name field
    setIdValue(id);
  };
  const role = localStorage.getItem("role");
  console.log(semester);
  console.log(params);
  return (
    <Box m="20px">
      <Header title="SEMESTER DETAIL" subtitle="FPTUniTrackSemester" />

      <Formik
        onSubmit={handleFormSubmit}

      >
        {({
          handleBlur,
          // handleChange,

        }) => (
          <form onSubmit={handleFormSubmit}>
            <Box
              m="40px 0 0 0"
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={"ID"}
                onBlur={handleBlur}
                value={idValue}
                name="semesterId"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={"Name"}
                onBlur={handleBlur}
                onChange={handleNameChange}
                value={nameValue} // Use the state variable for Name field
                name="Name"
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                disabled
                fullWidth
                variant="filled"
                type="date"
                label={"StartDate"}
                onBlur={handleBlur}
                // onChange={handleChange}
                InputLabelProps={{
                  shrink: true, // Keeps the label in the "floating" position
                }}
                name="StartDate"

                value={dayjs(semester.StartDate).format("YYYY-MM-DD")}

                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                disabled
                fullWidth
                variant="filled"
                type="date"
                label={"EndDate"}
                onBlur={handleBlur}
                // onChange={handleChange}
                value={dayjs(semester.EndDate).format("YYYY-MM-DD")}
                name="EndDate"
                InputLabelProps={{
                  shrink: true, // Keeps the label in the "floating" position
                }}
                sx={{ gridColumn: "span 4" }}
              />

            </Box>
            <Box display="flex" justifyContent="end" mt="20px" gap="10px">
              {role === "Admin" && (<><Button type="submit" color="secondary" variant="contained">
                Update Semester
              </Button><Button onClick={handleDeleteSemester} type="" color="redAccent" variant="contained">
                  Delete Semester
                </Button></>)}

            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default SemesterDetail;

