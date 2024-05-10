import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import { Link } from 'react-router-dom';

import "./Class.css";

const AllClass = () => {
  const token = localStorage.getItem("token");
  const [classData, setClassData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [uniqueClassIDs, setUniqueClassIDs] = useState([]);
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3456/lecturer/allClassIds', {
          headers: {
            Authorization: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setClassData(data);
          const uniqueIDs = [...new Set(data.map(item => item.ClassID))];
          setUniqueClassIDs(uniqueIDs);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);
  console.log(classData)
  console.log(uniqueClassIDs);
  return (
    <div className="all-class-container">
      <Header />
      <div className="class-list">
        <h2>Class List</h2>
        <ul>
          {uniqueClassIDs.map((item, index) => (
            <li key={index}>
              {/* <Link to={`/class/${item}`} onClick={() => handleItemClick(item)}>
                {item}
              </Link> */}
              <Link to={`/AllSubject/${item}`} onClick={() => handleItemClick(item)}>
                {item}
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

export default AllClass;
