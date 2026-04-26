import { useParams } from "react-router-dom";

function Purchase() {
  const { id } = useParams();

  const handlePayment = () => {
    alert("Payment Successful 💳");
  };

  return (
    <div className="container">
      <h1>Purchase Ticket</h1>
      <p>Event ID: {id}</p>

      <button onClick={handlePayment}>Pay ₹499</button>
    </div>
  );
}

export default Purchase;