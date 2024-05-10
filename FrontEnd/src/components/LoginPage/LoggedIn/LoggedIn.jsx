import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoggedIn.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { ColorModeContext, useMode } from "../../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from "../../../scenes/global/Sidebar";
import Topbar from "../../../scenes/global/Topbar";
import Dashboard from "../../../scenes/dashboard";
import Team from "../../../scenes/team";
import Contacts from "../../../scenes/contacts";;
import Calendar from "../../../scenes/calendar";
import Students from "../../../scenes/students";
import StudentDetail from "../../../scenes/students/studentDetail";
import StudentEditProfile from "../../../scenes/students/studentEditProfile";

//Components for subject
import Subject from "../../../scenes/subject/index";
import SubjectDetail from "../../../scenes/subject/subjectDetail";
import EditSubjectDetail from "../../../scenes/subject/editSubjectDetail";

import Curriculum from "../../../scenes/curriculum";
import Semester from "../../../scenes/semester";

// import SemesterDetail from "../../../scenes/SemesterDetail";
import SemesterDetail from "../../../scenes/semester/SemesterDetail";
import CurriculumDetail from "../../../scenes/curriculum/CurriculumDetail";

import Lecture from "../../../scenes/lecture";
import Notification from "../../../scenes/notification";
import LectureDetail from "../../../scenes/lecture/LectureDetail";
import LectureEditProfile from "../../../scenes/lecture/LectureEditProfile";

import Grade from "../../../scenes/gradeForStudent";
import AllSubjectStu from "../../../scenes/gradeForStudent/AllSubjectStu";
import GradeClass from "../../../scenes/gradeForLecturer";

import AllClass from "../../../scenes/gradeForLecturer/AllClass";
import AllSubject from "../../../scenes/gradeForLecturer/AllSubject";
import CalendarLec from "../../../scenes/calendarForLecturer";
import NotificationDetail from "../../../scenes/notification/NotificationDetail";
import NotificationEditDetail from "../../../scenes/notification/NotificationEditDetail";
const LoggedIn = ({ logout }) => {
  const [theme, colorMode] = useMode();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar logout={handleLogout} />
            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route path="/students" element={<Students />} />
              <Route path="/students/:studentId" element={<StudentDetail />} />
              <Route
                path="/students/:studentId/edit"
                element={<StudentEditProfile />}
              />

              {/* All routes of subject */}
              <Route path="/subject" element={<Subject />} />
              <Route path="/subject/:subjectId" element={<SubjectDetail />} />
              <Route
                path="/subject/:subjectId/edit"
                element={<EditSubjectDetail />}
              />

              <Route path="/curriculum" element={<Curriculum />} />
              <Route path="/semester" element={<Semester />} />
              <Route path="/calendar" element={<Calendar />} />

              <Route
                path="/semester/:semesterId"
                element={<SemesterDetail />}
              />
              <Route
                path="/curriculum/:curriculumId"
                element={<CurriculumDetail />}
              />

              <Route path="/lecturer" element={<Lecture />} />
              <Route path="/lecturer/:lecturerId" element={<LectureDetail />} />
              <Route path="/lecturer/:lecturerId/edit" element={<LectureEditProfile />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/notification/:notificationId" element={<NotificationDetail />} />
              <Route path="/notification/:notificationId/edit" element={<NotificationEditDetail />} />
              <Route path="/grade/:gradeId" element={<Grade />} />
              <Route path="/gradeClass/:gradeId" element={<GradeClass />} />
              <Route path="/AllClass" element={<AllClass />} />
              <Route path="/AllSubject/:classId" element={<AllSubject />} />
              <Route path="/AllSubjectStu" element={<AllSubjectStu />} />
              <Route path="/calendarLec" element={<CalendarLec />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default LoggedIn;
