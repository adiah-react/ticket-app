import { doc, getDoc } from "firebase/firestore";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { db } from "../firebase.config";
import Spinner from "./Spinner";

const TicketLayout = ({ ticket }) => {
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
    <div className="ticket-container">
      <div className="ticket-details">
        <h2>{event.title}</h2>
        <div className="row">
          <div className="ticket-info">
            <p className="label">Date</p>
            <p className="data">{event.date}</p>
          </div>
          <div className="ticket-info">
            <p className="label">Time</p>
            <p className="data time">{event.time}</p>
          </div>
        </div>
        <div className="row">
          <div className="ticket-info">
            <p className="label">Status</p>
            <p className="data">{ticket.status}</p>
          </div>
          <div className="ticket-info">
            <p className="label">Name</p>
            <p className="data">{ticket.name}</p>
          </div>
        </div>
      </div>
      <div className="ticket-code">
        <QRCode
          bgColor="#25573e"
          fgColor="#c4961a"
          size={200}
          // size={120}
          value={ticket.id}
        />
      </div>
    </div>
  );
};

export default TicketLayout;

TicketLayout.propTypes = {
  ticket: PropTypes.object,
};
