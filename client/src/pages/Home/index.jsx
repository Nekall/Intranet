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

const Home = () => {
  const navigate = useNavigate();
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

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    if (users.length === 0) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
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
            setUsers(data.data);
            setUser(data.data[Math.floor(Math.random() * data.data.length)]);
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
    , [user, users, navigate, token, users.length]);

  const sayHiToUser = () => {
    setAnimation(true);

    setTimeout(() => {
      setAnimation(false);

      const randomUserGen = () => {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        if (randomUser._id === user._id) {
          return randomUserGen();
        } else {
          return randomUser;
        }
      }
      setUser(randomUserGen());
    }, 1500);
  }


  return (
    <div className={styles.__home}>
      <h1>Hello {userData && userData.firstname},</h1>
      {user &&
        <div className={styles.__container}>
          <Card
            animation={animation}
            user={user}
            editMode={false}
          />
          <button className={styles.__hello_btn}
            onClick={sayHiToUser}
          >Say hello to {user.firstname} {user.lastname}
            <span className={animation ? styles.__say_hi : ""}>👋</span>
          </button>
        </div>}
    </div>
  );
}

export default Home;
