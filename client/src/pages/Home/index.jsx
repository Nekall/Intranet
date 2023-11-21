// Styles
import { useEffect, useState } from "react";

// Styles
import styles from "./styles.module.scss";

// Components
import Card from "../../components/Card";

const Home = () => {
  const [users, setUsers] = useState([]);

  // fetch users
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
        setUsers(data.data);
      })
      .then(json => console.log(json));
  }
    , []);


  return (
    <div className={styles.__home}>
      {/* <h1>Intranet</h1> */}
      <div className={styles.__users_container}>
      <p>Say Hi to a random colleage</p>
      </div>
    </div>
  );
}

export default Home;
