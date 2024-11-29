import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import TicketItem from "../components/TicketItem";
import { auth, db } from "../firebase.config";

const Tickets = () => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState(null);

  useEffect(() => {
    const fetchUserTickets = async () => {
      const ticketsRef = collection(db, "tickets");

      const q = query(ticketsRef, where("userRef", "==", auth.currentUser.uid));

      const querySnap = await getDocs(q);

      let tickets = [];

      querySnap.forEach((doc) => {
        return tickets.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setTickets(tickets);
      setLoading(false);
    };

    fetchUserTickets();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Event</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </>
  );
};
export default Tickets;
