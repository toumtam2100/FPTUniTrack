import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import { Link } from 'react-router-dom';
import "./Class.css";
import { useUser } from '../../UserContext';
const AllSubjectStu = () => {
  const token = localStorage.getItem("token");
  const { username1 } = useUser();
  const [subjectData, setSubjectData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const studentId = username1;
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  console.log(`Context:${username1}`)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3456/student/getSubjectByStudentId', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({
            studentId: studentId,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setSubjectData(data);

        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);
  console.log(subjectData)
  return (
    <div className="all-class-container">
      <Header />
      <div className="class-list">
        <h2>{`Subjects Learned By Student: ${studentId}`}</h2>
        <ul>
          {subjectData.map((item, index) => (
            <li key={index}>
              <Link to={`/grade/${studentId}&${item.subjectId}&${item.subjectCode}`} onClick={() => handleItemClick(item)}>
                {item.syllabusName} - {item.subjectCode}
              </Link>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default AllSubjectStu;
