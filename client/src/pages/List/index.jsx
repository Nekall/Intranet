// Styles
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Styles
import styles from "./styles.module.scss";

// Components
import Card from "../../components/Card";
import SearchBar from "../../components/SearchBar";

// Helpers
import jwtDecode from "../../helpers/jwtDecode";
import isJwt from "../../helpers/isJwt";

// Assets
import logoLoading from "../../assets/images/logo-loading.svg";

const List = () => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [filters, setFilters] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem("__intranet_token");

  useEffect(() => {
    if (token) {
      if (isJwt(token)) {
        setUserData(jwtDecode(token));
      } else {
        localStorage.removeItem("__intranet_token");
        toast.error("An error has occurred with your session, please reconnect.", { style: { background: '#18191b' } })
        navigate("/login");
      }
    } else {
      toast.error("An error has occurred with your session, please reconnect.", { style: { background: '#18191b' } })
      navigate("/login");
    }

    setIsLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users${filters.length > 0 ? filters : ""}`, {
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
          setIsLoading(false);
        } else {
          toast.error("An error has occurred with your session, please reconnect.", { style: { background: '#18191b' } })
          navigate("/login");
        }
      })
      .catch(error => {
        toast.error("An error has occurred, please contact support.", { style: { background: '#18191b' } })
        navigate("/login");
      })
  }
    , [navigate, token, refresh, filters]);

  return (
    <div className={styles.__home}>
      <SearchBar
        setFilters={setFilters}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      <div className={styles.__users_container}>
        {users && users.length > 0 && users.map((user, index) => (
          <React.Fragment key={`${user.email}-${index}`}>
            <Card user={user} editMode={userData ? userData.isAdmin : false} editModeAdmin={userData ? userData.isAdmin : false} setRefresh={setRefresh} refresh={refresh} />
          </React.Fragment>
        ))}
        {users && users.length === 0 &&

          <div className={styles.__result}>
            {isLoading ?
              <img src={logoLoading} alt="logoLoading" />
              :
              <h1>No users found</h1>
            }
          </div>}
      </div>
    </div>
  );
}

export default List;
