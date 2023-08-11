import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { render } from "@testing-library/react";
import Popup from "./popup";
import axios from "axios";
var counter = 0;

const Calander = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const loadPost = async () => {
      const response = await axios.get("http://localhost:5000/api/events/");
      setEvents(response.data);
    };
    loadPost();
  }, []);

  //click function
  const handleDateClick = (arg) => {
    console.log("date click");
    counter++;
    arg.counter = "popup" + counter;
    return render(<Popup data={arg} events={setEvents} />);
  };

  //return
  return (
    <div className="calander-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        dateClick={handleDateClick}
        events={events}
      />
    </div>
  );
};

export default Calander;
