import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import "./Class.css";

const AllSubject = () => {
  const token = localStorage.getItem("token");
  const [subjectData, setSubjectData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  const classId = useParams().classId;
  console.log(classId)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3456/lecturer/allSubjectsByClassId', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          },
          body: JSON.stringify({
            classId: classId,
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
  // console.log(uniqueClassIDs);
  return (
    <div className="all-class-container">
      <Header />
      <div className="class-list">
        <h2>Subjects for Class {classId}</h2>
        <ul>
          {subjectData.map((item, index) => (
            <li key={index}>
              <Link to={`/gradeClass/${item.SubjectID}&${classId}`} onClick={() => handleItemClick(item)}>
                {item.SyllabusName} - {item.SubjectCode}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {selectedItem && (
        <p>Selected item: {selectedItem}</p>
      )}
    </div>
  );
};

export default AllSubject;
