import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaTicketAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import EventCard from "../components/EventCard";
import Spinner from "../components/Spinner";
import { db } from "../firebase.config";
import useAuthStatus from "../hooks/useAuthStatus";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState(null);

  const { loggedIn, checkingStatus } = useAuthStatus();

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsRef = collection(db, "events");

      const q = query(eventsRef, orderBy("timestamp"));
      const querySnap = await getDocs(q);

      const events = [];
      querySnap.forEach((doc) => {
        return events.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setEvents(events);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (checkingStatus) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        {loggedIn && <h1>Welcome Back</h1>}
        {/* <h1>Welcome Back{loggedIn && `, ${auth.currentUser.displayName}`}</h1> */}
        {/* <p>What do you want to do?</p> */}
      </section>
      {/* <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle /> Create New Ticket
      </Link> */}

      <Link to="/tickets" className="btn btn-block">
        <FaTicketAlt /> View My Tickets
      </Link>

      <h2>Upcoming Events</h2>

      <div className="eventsContainer">
        {loading ? (
          <Spinner />
        ) : events && events.length > 0 ? (
          <Slider {...settings}>
            {events.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                image={event.img}
                price={event.price}
                timestamp={event.timestamp}
                date={event.date}
                time={event.time}
              />
            ))}
          </Slider>
        ) : (
          <p>No events</p>
        )}
      </div>
    </>
  );
};
export default Home;
