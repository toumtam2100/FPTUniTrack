import React, { useState, useEffect } from 'react';

function SubjectSelection({ studentId }) {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch subject data when the component mounts
    fetch('/api/subjects') // Replace with your actual API endpoint for fetching subjects
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        console.error('Error fetching subjects:', error);
      });
  }, []);

  const handleSubjectChange = (event) => {
    const subjectId = event.target.value;
    setSelectedSubject(subjectId);

    // Make a request to fetch data based on the selected subject
    fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ studentId, subjectId }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Handle the response data and update the UI
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div>
      <label htmlFor="subjectSelect">Select a Subject:</label>
      <select id="subjectSelect" value={selectedSubject} onChange={handleSubjectChange}>
        <option value="">-- Select a Subject --</option>
        {data.map((subject) => (
          <option key={subject.subjectId} value={subject.subjectId}>
            {subject.subjectName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SubjectSelection;
