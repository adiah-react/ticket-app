import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import TicketLayout from "../components/TicketLayout";
import { db } from "../firebase.config";

const Ticket = () => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchTicket = async () => {
      const docRef = doc(db, "tickets", params.ticketId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTicket({
          id: params.ticketId,
          ...docSnap.data(),
        });
        setLoading(false);
      }
    };

    fetchTicket();
  }, [params.ticketId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
      </header>
      <TicketLayout ticket={ticket} />
    </div>
  );
};
export default Ticket;
