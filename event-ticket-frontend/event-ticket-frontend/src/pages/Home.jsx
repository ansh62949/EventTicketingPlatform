import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Home() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    API.get("/published-events")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setEvents(res.data);
        } else {
          console.log("Invalid data:", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const filtered = events.filter((e) =>
    e?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Events 🎟️</h1>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p>No events found</p>
      ) : (
        filtered.map((e) => (
          <div className="card" key={e.id}>
            <h3>{e.name}</h3>
            <p>{e.venue}</p>

            <Link to={`/event/${e.id}`}>
              <button>View Details</button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;