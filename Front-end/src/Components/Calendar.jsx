/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "./Loader"; // Import the Loader component

function Calendar() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  const [show, setShow] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDay, setEventDay] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [newEventAdded, setNewEventAdded] = useState(false);
  const [eventData, setEventData] = useState({});
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    generateCalendarData(year, month);
  }, [year, month]);

  const generateCalendarData = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startingDayOfWeek = firstDay.getDay();

    const monthData = [];
    let currentWeek = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      currentWeek.push("");
    }

    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        monthData.push(currentWeek);
        currentWeek = [];
      }
    }

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

  // const [show, setShow] = useState(false);
  // const [eventTitle, setEventTitle] = useState("");
  // const [eventDay, setEventDay] = useState("");
  // const [eventTime, setEventTime] = useState("");
  // const [newEventAdded, setNewEventAdded] = useState(false);
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

    setShow(false);

    // Get current date and time
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed
    const currentDay = currentDate.getDate();
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();

    // Parse event date and time
    const [eventYear, eventMonth, eventDayi] = eventDay.split("-").map(Number);
    const [eventHours, eventMinutes] = eventTime.split(":").map(Number);

    // Check if event date is in the past
    const eventDateIsPast =
      eventYear < currentYear ||
      (eventYear === currentYear && eventMonth < currentMonth) ||
      (eventYear === currentYear &&
        eventMonth === currentMonth &&
        eventDayi < currentDay);

    // Check if event time is in the past
    const eventTimeIsPast =
      eventYear === currentYear &&
      eventMonth === currentMonth &&
      eventDayi === currentDay &&
      (eventHours < currentHours ||
        (eventHours === currentHours && eventMinutes < currentMinutes));

    if (eventDateIsPast || eventTimeIsPast) {
      toast.error("Event date or time is in the past!", {
        position: toast.position,
      });
      return;
    }

    const formdata = {
      title: eventTitle,
      date: eventDay,
      time: eventTime,
    };
    setEventDay("");
    setEventTime("");
    setEventTitle("");
    const fetchData = async () => {
      try {
        const data = { name: "just authenticating and getting token" };
        const response = await fetch(
          "http://localhost:8000/api/dashboard/members-token-verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
          }
        );
        if (response.ok) {
          try {
            const response = await fetch(
              "http://localhost:8000/api/dashboard/add-event",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formdata),
              }
            );
            if (response.ok) {
              const data = await response.json();
              toast.success("Event added successfully", {
                position: toast.position,
              });
              setNewEventAdded(!newEventAdded);
            }
          } catch (error) {
            toast.error("Error fetching the data", {
              position: toast.position,
            });
          }
        } else {
          const errorData = await response.json();
          toast.success(errorData.msg, {
            position: toast.position,
          });
        }
      } catch (error) {
        toast.error("Error fetching the data", {
          position: toast.position,
        });
      }
    };

    fetchData();
  };

  // resetFields(); // Reset input fields after form submission
  // const resetFields = () => {
  // };

  // const [eventData, setEventData] = useState({});
  // Function to add an event for a specific date
  // const addEvent = (date, event) => {
  //   // Create a new object by copying the existing one
  //   const newEventData = { ...eventData };
  //   // If the date already exists in the data, add the event to its array
  //   if (newEventData[date]) {
  //     newEventData[date].push(event);
  //   } else {
  //     // If the date doesn't exist, create a new array with the event
  //     newEventData[date] = [event];
  //   }
  //   // Update the state with the new data
  //   // setEventData(newEventData);
  // };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetch starts
      try {
        const data = { name: "just authenticating and getting token" };
        const response = await fetch(
          "http://localhost:8000/api/dashboard/members-token-verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
          }
        );
        if (response.ok) {
          try {
            const response = await fetch(
              "http://localhost:8000/api/dashboard/get-events",
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
              }
            );
            if (response.ok) {
              const data = await response.json();
              const transformedData = data.reduce((acc, event) => {
                if (!acc[event.eventDate]) {
                  acc[event.eventDate] = [];
                }
                acc[event.eventDate].push({
                  id: event._id,
                  title: event.eventName,
                });
                return acc;
              }, {});

              setEventData(transformedData);
            } else {
              if (response.status == 401) {
                toast.error(
                  "You are Unauthorized!!! Kindly SignIn or Register",
                  {
                    position: toast.position,
                  }
                );
                setTimeout(() => {
                  window.location.href = "/sign-in";
                }, 4000); // 3000 milliseconds delay (3 seconds)
              } else {
                toast.error("Error fetching the data", {
                  position: toast.position,
                });
              }
            }
          } catch (error) {
            toast.error("Error fetching the data", {
              position: toast.position,
            });
          }
        } else {
          const errorData = await response.json();
          toast.error(errorData.msg, {
            position: toast.position,
          });
        }
      } catch (error) {
        toast.error("Error fetching the data", {
          position: toast.position,
        });
      } finally {
        setLoading(false); // Set loading to false when fetch completes
      }
    };

    fetchData();
  }, [newEventAdded]);
  // Function to remove an event for a specific date
  // const removeEvent = (date, eventIndex) => {
  //   // Create a new object by copying the existing one
  //   const newEventData = { ...eventData };
  //   // If the date exists in the data, remove the event from its array
  //   if (newEventData[date]) {
  //     newEventData[date].splice(eventIndex, 1);
  //     // Update the state with the new data
  //     setEventData(newEventData);
  //   }
  // };
  // const [selectedDate, setSelectedDate] = useState("");
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
    }
  };

  const filteredEvents = eventData[selectedDate] || [];
  const handleRemoveEvent = async (eventDate, eventId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/dashboard/remove-event/${eventId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        setEventData((prevEvents) => {
          const updatedEvents = { ...prevEvents };
          updatedEvents[eventDate] = updatedEvents[eventDate].filter(
            (event) => event.id !== eventId
          );
          return updatedEvents;
        });
        toast.success("Event removed", {
          position: toast.position,
        });
      } else {
        toast.error("Failed to remove event", {
          position: toast.position,
        });
      }
    } catch (error) {
      toast.error("Error removing event", {
        position: toast.position,
      });
    }
  };

  return (
    <>
      <div className="container mt-4">
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
          {loading ? (
            <Loader /> // Show loader while loading
          ) : (
            <>
              <div className="row align-items-center">
                {days.map((day, index) => (
                  <div key={index} className="field1 border">
                    {day}
                  </div>
                ))}
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
                                    key={event.id}
                                    className="event"
                                    style={{
                                      textAlign: "left",
                                      marginTop: "2px",
                                      borderRadius: "10px",
                                      color: "blue",
                                    }}
                                    onDoubleClick={() =>
                                      handleRemoveEvent(date, event.id)
                                    }
                                  >
                                    {event.title}
                                  </div>
                                ));
                              } else {
                                return null;
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
            </>
          )}
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
              <div
                key={event.id}
                className="event-item d-flex align-items-center"
              >
                <span className="event-text">{event.title}</span>
                <button
                  className="btn btn-sm btn-danger ml-2"
                  onClick={() => handleRemoveEvent(selectedDate, event.id)}
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
