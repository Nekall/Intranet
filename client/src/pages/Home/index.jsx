// Styles
import { useEffect, useState } from "react";

// Styles
import styles from "./styles.module.scss";

// Components
import Card from "../../components/Card";

const Home = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
      headers: {
        "Access-Control-Allow-Origin": '*',
        "Content-Type": "application/json",
      }
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        if(data.success) {
          setUser(data.data[Math.floor(Math.random() * data.data.length)]);
        }
      })
      .then(json => console.log(json));
  }
    , []);


  return (
    <div className={styles.__home}>
        <p>Say hello to a random colleague 👋</p>
      <div className={styles.__container}>
        <Card
          user={user}
        />
      </div>
    </div>
  );
}

export default Home;
