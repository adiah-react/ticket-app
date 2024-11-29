import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase.config";
import useAuthStatus from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

const Header = () => {
  // const [user, setUser] = useState(false);
  const { loggedIn, checkingStatus } = useAuthStatus();

  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };
  if (checkingStatus) {
    return <Spinner />;
  }
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Oxis Events</Link>
      </div>
      <ul>
        {loggedIn ? (
          <button className="btn" onClick={onLogout}>
            <FaSignOutAlt /> Logout
          </button>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            {/* li register <FaUser /> */}
          </>
        )}
      </ul>
    </header>
  );
};
export default Header;
