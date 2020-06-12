import React, {useState, useEffect} from "react"

export default function App() {
  let [events, setUsers] = useState([])

  useEffect(() => {
    // fetch("/api/event")
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setUsers(json.events)
    //   })
    fetch("/api/events")
        .then((res) => res.json())
        .then((json) => {
          setUsers(json.events)
        })
  }, [])

  return (
    <ul>
      {
        events.map((user) => (
          <li key={ user.id }>
            <div>ID: { user.id }</div>
            <div>Country: { user.geoData }</div>
            <div>Device: { user.device }</div>
            <div>OS Version: { user.version }</div>
            <div>Purchase: { user.purchase }$</div>
          </li>
        ))
      }
    </ul>
  )
}
