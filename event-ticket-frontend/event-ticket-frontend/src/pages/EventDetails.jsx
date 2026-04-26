import { useParams, Link } from "react-router-dom";

function EventDetails() {
  const { id } = useParams();

  return (
    <div className="container">
      <h1>Event Details</h1>
      <p>Event ID: {id}</p>

      <Link to={`/purchase/${id}`}>
        <button>Buy Ticket</button>
      </Link>
    </div>
  );
}

export default EventDetails;