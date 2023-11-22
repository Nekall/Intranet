// Styles
import { useEffect, useState } from "react";

// Styles
import styles from "./styles.module.scss";

// Components
import Card from "../../components/Card";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    if (users.length === 0) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        headers: {
          "Access-Control-Allow-Origin": '*',
          "Content-Type": "application/json",
        }
      })
        .then(response => response.json())
        .then((data) => {
          console.log(data)
          if (data.success) {
            setUsers(data.data);
            setUser(data.data[Math.floor(Math.random() * data.data.length)]);
          }
        })
        .then(json => console.log(json));
    }
  }
    , [user, users]);

  const sayHiToUser = () => {
    setAnimation(true);

    setTimeout(() => {
      setAnimation(false);
      setUser(users[Math.floor(Math.random() * users.length)]);
    }, 1500);

  }


  return (
    <div className={styles.__home}>
      <h1>Hello Neka,</h1>
      <div className={styles.__container}>
        <Card
          animation={animation}
          user={user}
        />
        <button className={styles.__hello_btn}
          onClick={sayHiToUser}
        >Say hello to {user.firstname} {user.lastname}
          <span className={animation ? styles.__say_hi : ""}>👋</span>
        </button>
      </div>
    </div>
  );
}

export default Home;
