// Styles
import { useEffect, useState } from "react";

// Styles
import styles from "./styles.module.scss";

// Components
import Card from "../../components/Card";

const List = () => {
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
      <div className={styles.__users_container}>
      {users.map((user) => (
        <Card key={user.id} user={user} />
      ))}
      </div>
    </div>
  );
}

export default List;
