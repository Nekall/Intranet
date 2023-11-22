// Styles
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Styles
import styles from "./styles.module.scss";

// Components
import Card from "../../components/Card";

// Helpers
import jwtDecode from "../../helpers/jwtDecode";
import isJwt from "../../helpers/isJwt";

const List = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  let userData;
  const token = localStorage.getItem("__intranet_token");
  console.log(token)
  if (token) {
    if (isJwt(token)) {
      userData = jwtDecode(token);
      console.log(userData)
    } else {
      localStorage.removeItem("__intranet_token");
      navigate("/login");
    }
  } else {
    navigate("/login");
  }

  useEffect(() => {
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
        } else {
          navigate("/login");
        }
      })
      .catch(error => {
        console.log(error);
        navigate("/login");
      })
  }
    , [navigate, token]);


  return (
    <div className={styles.__home}>
      <div className={styles.__users_container}>
        {users && users.map((user, index) => (
          <React.Fragment key={user.id}>
            <Card user={user} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default List;
