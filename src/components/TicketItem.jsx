import { doc, getDoc } from "firebase/firestore";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase.config";
import Spinner from "./Spinner";

const TicketItem = ({ ticket }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      const docRef = doc(db, "events", ticket.event);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setEvent(docSnap.data());
        setLoading(false);
      }
    };

    fetchEvent();
  }, [ticket.event]);

  // const date = event.timestamp.toDate();

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="ticket">
      <div>{event.timestamp.toDate().toLocaleString("en-GB")}</div>
      <div>{event.title}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <Link to={`/tickets/${ticket.id}`} className="btn btn-reverse btn-sm">
        View
      </Link>
    </div>
  );
};

export default TicketItem;

TicketItem.propTypes = {
  ticket: PropTypes.object,
};
