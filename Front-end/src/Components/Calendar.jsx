/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Modal, Button, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";

function Calendar() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [calendarData, setCalendarData] = useState([]);
  useEffect(() => {
    generateCalendarData(year, month);
  }, [year, month]);

  const generateCalendarData = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startingDayOfWeek = firstDay.getDay();

    const monthData = [];
    let currentWeek = [];

    // Add empty slots for days before the start of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      currentWeek.push("");
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        monthData.push(currentWeek);
        currentWeek = [];
      }
    }

    // Add remaining days of the last week
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push("");
      }
      monthData.push(currentWeek);
    }
    setCalendarData(monthData);
  };

  const handlePrevYear = () => {
    setYear(year - 1);
  };

  const handleNextYear = () => {
    setYear(year + 1);
  };

  const handlePrevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  const [show, setShow] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDay, setEventDay] = useState("");
  const [eventTime, setEventTime] = useState("");
  // const handleClose = () => {
  //   //   // if (e.target === e.currentTarget) {
  //   setShow(false); // Close the modal
  //   setEventTitle("");
  //   setEventDay("");
  //   setEventTime("");
  //   //   resetFields(); // Reset input fields when modal is closed
  //   //   // }
  // };

  // const handleShow = () => {
  //   setShow(true); // Show the modal
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process your form submission here
    setShow(false);
    addEvent(eventDay, eventTitle);
    console.log("Event Title:", eventTitle);
    console.log("Event Day:", eventDay);
    console.log("Event Time:", eventTime);
  };

  // resetFields(); // Reset input fields after form submission
  // const resetFields = () => {
  // };

  const [eventData, setEventData] = useState({
    "2024-04-17": [
      "Meeting with Client",
      "Parents Teacher Meeting",
      "Going to play cricket",
      "Going to play cricket",
    ],
  });
  // Function to add an event for a specific date
  const addEvent = (date, event) => {
    // Create a new object by copying the existing one
    const newEventData = { ...eventData };
    // If the date already exists in the data, add the event to its array
    if (newEventData[date]) {
      newEventData[date].push(event);
    } else {
      // If the date doesn't exist, create a new array with the event
      newEventData[date] = [event];
    }
    // Update the state with the new data
    setEventData(newEventData);
  };
  useEffect(() => {
    // console.log(eventData);
  }, [eventData]);
  // Function to remove an event for a specific date
  const removeEvent = (date, eventIndex) => {
    // Create a new object by copying the existing one
    const newEventData = { ...eventData };
    // If the date exists in the data, remove the event from its array
    if (newEventData[date]) {
      newEventData[date].splice(eventIndex, 1);
      // Update the state with the new data
      setEventData(newEventData);
    }
  };
  const [selectedDate, setSelectedDate] = useState("");
  const handleBoxClick = (day, month, year) => {
    if (parseInt(month) < 10) {
      if (parseInt(day) < 10) {
        setSelectedDate(year + "-0" + month + "-0" + day);
      } else {
        setSelectedDate(year + "-0" + month + "-" + day);
      }
    } else {
      if (parseInt(day) < 10) {
        setSelectedDate(year + "-" + month + "-0" + day);
      } else {
        setSelectedDate(year + "-" + month + "-" + day);
      }
      // setSelectedDate(year + "-" + month + "-" + day);
    }
    console.log(eventData);
  };

  const filteredEvents = eventData[selectedDate] || [];
  const handleRemoveEvent = (date, index) => {
    const updatedEvents = [...filteredEvents];
    updatedEvents.splice(index, 1); // Remove the event at the specified index
    const updatedEventData = { ...eventData };
    updatedEventData[date] = updatedEvents;
    setEventData(updatedEventData);
  };

  return (
    <>
      <div className="container mt-4">
        {/* <div className="container"></div> */}
        <div className="container">
          <div className="row justify-content-start mb-4">
            <div className="col-auto d-flex">
              <div
                className="rounded-circle d-flex justify-content-center align-items-center flex-shrink-0 calendar-btn"
                style={{ height: "38px", width: "38px" }}
                title="Previous month"
                onClick={handlePrevMonth}
              >
                <p className="m-0">
                  <IoIosArrowBack />
                </p>
              </div>
              <div
                className="rounded-circle d-flex justify-content-center align-items-center flex-shrink-0 calendar-btn"
                style={{ height: "38px", width: "38px" }}
                title="Next month"
                onClick={handleNextMonth}
              >
                <p className="m-0">
                  <IoIosArrowForward />
                </p>
              </div>
            </div>
            <div className="col-auto">
              <span className="calendar-navigation text-center calendar-month">
                {new Date(year, month).toLocaleString("default", {
                  month: "long",
                })}
                &nbsp;{year}
              </span>
            </div>
            <div className="col-auto">
              <button
                className="btn btn-primary"
                onClick={() => setShow(true)}
                style={{ cursor: "pointer" }}
              >
                Add Event
              </button>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="field1 border">Sun</div>
            <div className="field1 border">Mon</div>
            <div className="field1 border">Tue</div>
            <div className="field1 border">Wed</div>
            <div className="field1 border">Thu</div>
            <div className="field1 border">Fri</div>
            <div className="field1 border">Sat</div>
          </div>
          {calendarData.map((week, index) => (
            <div key={index} className="row" style={{ padding: "0" }}>
              {week.map((day, idx) => (
                <div
                  key={idx}
                  className={`field d-flex justify-content-center border`}
                  style={{ padding: "0" }}
                >
                  <div
                    className="scrollable-div"
                    style={{
                      overflowY: "auto",
                      position: "",
                      width: "100%",
                    }}
                    onClick={() => handleBoxClick(day, month + 1, year)}
                  >
                    {day !== "" ? (
                      <>
                        <div className="d-flex justify-content-center">
                          <div
                            className={`rounded-circle d-flex justify-content-center align-items-center${
                              day !== "" &&
                              day === new Date().getDate() &&
                              month === new Date().getMonth() &&
                              year === new Date().getFullYear()
                                ? " date"
                                : " date1"
                            }`}
                          >
                            {day}
                          </div>
                        </div>
                        {Object.keys(eventData).map((date) => {
                          let a = date.split("-");

                          if (
                            year === parseInt(a[0]) &&
                            month + 1 === parseInt(a[1]) &&
                            day === parseInt(a[2])
                          ) {
                            return eventData[date].map((event, index) => (
                              <div
                                key={`${date}-${index}`}
                                className="event"
                                style={{
                                  textAlign: "left",
                                  marginTop: "2px",
                                  borderRadius: "10px",
                                  color: "blue",
                                }}
                                onDoubleClick={() => removeEvent(date, index)}
                              >
                                {event}
                              </div>
                            ));
                          } else {
                            null; // Return null if the condition doesn't match
                          }
                        })}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
          setEventTitle("");
          setEventDay("");
          setEventTime("");
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="eventTitle">
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event title"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="eventDay">
              <Form.Label>Event Day</Form.Label>
              <Form.Control
                type="date"
                value={eventDay}
                onChange={(e) => setEventDay(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="eventTime">
              <Form.Label>Event Time</Form.Label>
              <Form.Control
                type="time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Add Event
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {selectedDate && (
        <div className="container mt-4">
          <h3 className="text-center mb-3">Events for {selectedDate}</h3>
          <div className="event-list">
            {filteredEvents.map((event, index) => (
              <div key={index} className="event-item d-flex align-items-center">
                <span className="event-text">{event}</span>
                <button
                  className="btn btn-sm btn-danger ml-2"
                  onClick={() => handleRemoveEvent(selectedDate, index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Calendar;
