import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { formatDate } from "@fullcalendar/core";

const CalendarLec = () => {
  const token = localStorage.getItem("token");
  const [calenderData, setCalenderData] = useState([]);
  const id = localStorage.getItem("id");
  console.log(calenderData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3456/lecturer/getSlotsByWeek', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          },
          body: JSON.stringify({
            id: id
          }),
        });
        if (response.ok) {
          const data = await response.json();
          const filteredData = data.map(item => ({
            id: item._id,
            title: `${item.Subject.SubjectCode} - ${item.ClassID} - P${item.RoomCode}`,
            date: `${item.Day.Date.split('T')[0]}T${item.Period.StartTime}`,
            end: `${item.Day.Date.split('T')[0]}T${item.Period.EndTime}`,
          }));
          setCalenderData(filteredData);

        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  return (
    <Box m="20px">
      <Header title="TIMETABLE" subtitle="Class Timetable" />
      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Slots</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={false}
            selectable={false}
            selectMirror={true}
            dayMaxEvents={true}
            eventsSet={(events) => setCurrentEvents(events)}
            events={calenderData}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CalendarLec;