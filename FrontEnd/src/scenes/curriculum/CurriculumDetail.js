import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const CurrriculumDetail = () => {
  const [curriculumData, setCurriculumData] = useState([]);
  const [curriculum, setCurriculum] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/json/curriculum.json');

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
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const params = useParams().curriculumId;

  //database lookup using id
  console.log(params);
  console.log("1");

  useEffect(() => {
    // Database lookup using id
    const c = curriculumData.find((curriculum) => curriculum.Id === parseInt(params)) || [];

    if (Object.keys(c).length > 0) {
      // Once curriculum is available, set the state variables
      setName(c.Name);
      setDescriptionNo(c.DescriptionNo);
      setCode(c.Code);
      setTotalCredit(c.TotalCredit);
      setCurriculum(c);
      setDescription(c.Description);
    }
  }, [params, curriculumData]);

  console.log(curriculumData);
  console.log(curriculum);

  const [Name, setName] = useState(curriculum.Name);
  const [DescriptionNo, setDescriptionNo] = useState(curriculum.DescriptionNo);
  const [Description, setDescription] = useState(curriculum.Description);
  const [Code, setCode] = useState(curriculum.Code);
  const [TotalCredit, setTotalCredit] = useState(curriculum.TotalCredit);
  console.log("DSD" + Description);
  const role = localStorage.getItem("role");
  return (
    <Box m="20px">
      <Header title="CURRICULUM DETAIL" subtitle="FPTUniTrackcurrriculum" />

      <Formik
        onSubmit={handleFormSubmit}

      >
        {({
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>

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
                value={params}
                name="Id"

                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={"Code"}
                onBlur={handleBlur}
                onChange={(e) => setCode(e.target.value)}
                value={Code}
                name="Code"
                InputLabelProps={{
                  shrink: true, // Keeps the label in the "floating" position
                }}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={"Name"}
                onBlur={handleBlur}
                onChange={(e) => setName(e.target.value)}
                value={Name}
                name="Name"
                InputLabelProps={{
                  shrink: true, // Keeps the label in the "floating" position
                }}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                multiline
                rows={6}
                label={"Description"}
                onBlur={handleBlur}
                onChange={(e) => setDescription(e.target.value)}
                value={Description}
                name="Description"
                InputLabelProps={{
                  shrink: true, // Keeps the label in the "floating" position
                }}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth

                variant="filled"
                type="text"
                label={"DescriptionNo"}
                onBlur={handleBlur}
                onChange={(e) => setDescriptionNo(e.target.value)}
                value={DescriptionNo}
                name="DescriptionNo"
                InputLabelProps={{
                  shrink: true, // Keeps the label in the "floating" position
                }}
                sx={{ gridColumn: "span 2" }} />
              <TextField
                fullWidth

                variant="filled"
                type="text"
                label={"Credit"}
                onBlur={handleBlur}
                onChange={(e) => setTotalCredit(e.target.value)}
                value={TotalCredit}
                name="TotalCredit"
                InputLabelProps={{
                  shrink: true, // Keeps the label in the "floating" position
                }}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px" gap="10px">
              {(role === "Admin") && (<><Button type="submit" color="secondary" variant="contained">
                Update currriculum
              </Button><Button type="" color="redAccent" variant="contained">
                  Delete currriculum
                </Button></>)}
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CurrriculumDetail;


