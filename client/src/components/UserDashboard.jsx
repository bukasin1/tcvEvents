import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const token = localStorage.getItem("tcv-token");
  const navigate = useNavigate();
  console.log(token, "token");
  const [events, setEvents] = useState([])
  console.log(events)
  const getEventSuggestions = () => {
    console.log(token)
    setEvents(["first"])
    fetch("http://localhost:3003/api/v1/events/discoverEvents", {
      method: "GET",
      headers: {
        "authorization": token
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, "data found")
        if(data.events) setEvents(data.events)
      })
      .catch(error => {
        console.log(error, "error fetching")
      })
  }

  const logout = () => {
    localStorage.removeItem("tcv-token")
    navigate("/login")
  }

  useEffect(() => {
    if (!token) {
      console.log(token, "protected");
      navigate("/login")
    }
  }, [])

  return (
    <div>
      <h3>Welcome to your dashboard</h3>
      <p onClick={logout}>logout</p>
      <p onClick={getEventSuggestions}>Click to Discover Events</p>
      <div>
        {events.map((event, index) => (
          <div key={index}>
            <p>{event.title}</p>
            <p>{event.description}</p>
            <p>{event.address}</p>
            <p>{event.isVirtual ? "Virtual Event" : "Physical Event"}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default UserDashboard