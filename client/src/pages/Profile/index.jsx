import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Styles
import styles from "./styles.module.scss";

// Components
import Card from "../../components/Card";

// Helpers
import jwtDecode from "../../helpers/jwtDecode";
import isJwt from "../../helpers/isJwt";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [refresh, setRefresh] = useState(false);
  let userData;
  const token = localStorage.getItem("__intranet_token");

  if (token) {
    if (isJwt(token) && jwtDecode(token)) {
      userData = jwtDecode(token);
    } else {
      localStorage.removeItem("__intranet_token");
      toast.error("An error has occurred with your session, please reconnect.", { style: { background: '#18191b' } })
      navigate("/login");
    }
  } else {
    toast.error("An error has occurred with your session, please reconnect.", { style: { background: '#18191b' } })
    navigate("/login");
  }

  useEffect(() => {
    if (!token || !userData) {
      navigate("/login");
    }

    if (userData) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userData.id}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": '*',
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        }
      })
        .then(response => response.json())
        .then((data) => {
          if (data.success) {
            setUser(data.data);
          } else {
            toast.error("An error has occurred with your session, please reconnect.", { style: { background: '#18191b' } })
            navigate("/login");
          }
        })
        .catch(_ => {
          toast.error("An error has occurred, please contact support.", { style: { background: '#18191b' } })
          navigate("/login");
        });
    }
  }
    , [refresh]);

  return (
    <div className={styles.__profile}>
      <h1>Your profile {userData && userData.firstname},</h1>
      {userData && user &&
        <div className={styles.__container}>
          <Card
            user={user}
            editMode={true}
            editModeAdmin={false}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        </div>}
    </div>
  );
}

export default Profile;
