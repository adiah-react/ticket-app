import PropTypes from "prop-types";

const EventCard = ({ title, image, price, timestamp, date, time }) => {
  // const dateObject = timestamp.toDate();
  // const dateString = dateObject.toLocaleDateString();
  // const timeString = dateObject.toLocaleTimeString();

  // console.log(dateString);
  // console.log(timeString);

  return (
    <div className="eventCard">
      <div className="eventTitle">{title}</div>
      <div className="eventImage">
        <img src={image} alt="" />
      </div>
      <div className="eventDetails" data--timestamp={timestamp}>
        <p className="date">Date: {date}</p>
        {time && <p className="time">Time: {time}</p>}
        <div className="price">Admission: ${price === 0 ? "free" : price}</div>
      </div>
    </div>
  );
};

export default EventCard;

EventCard.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  timestamp: PropTypes.object,
  date: PropTypes.string,
  time: PropTypes.string,
};
