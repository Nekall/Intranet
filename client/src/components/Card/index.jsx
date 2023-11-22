import { useEffect, useState } from "react";

// Styles
import styles from "./styles.module.scss";

// Assets
import maleSymbol from "../../assets/images/male-symbol.svg";
import femaleSymbol from "../../assets/images/female-symbol.svg";
import edit from "../../assets/images/edit.svg";
import trash from "../../assets/images/trash.svg";
import check from "../../assets/images/check.svg";

// Helpers
import jwtDecode from "../../helpers/jwtDecode";

const Card = ({ user, animation, editMode, refresh, setRefresh }) => {
    const token = localStorage.getItem("__intranet_token");
    const userData = jwtDecode(token);
    const [editFields, setEditFields] = useState(false);
    const birthdate = new Date(user.birthdate);
    const day = birthdate.getDate().toString().length === 1 ? `0${birthdate.getDate()}` : birthdate.getDate();
    const month = birthdate.getMonth().toString().length === 1 ? `0${birthdate.getMonth()}` : birthdate.getMonth();
    const year = birthdate.getFullYear();
    const birthday = `${day}/${month}/${year}`;
    const [confirmDelete, setConfirmDelete] = useState(false);

    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [currentBirthdate, setCurrentBirthdate] = useState(birthdate);
    const [category, setCategory] = useState(user.category);
    const [city, setCity] = useState(user.city);
    const [country, setCountry] = useState(user.country);
    const [gender, setGender] = useState(user.gender);


    useEffect(() => {
        if (confirmDelete) {
            setTimeout(() => {
                setConfirmDelete(false)
            }, 3000);
        }
    }, [confirmDelete]);

    const updateUser = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${user._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                firstname, lastname, birthdate: currentBirthdate, email, phone, city, country, gender, category
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.success) {
                    setEditFields(!editFields)
                    setRefresh(!refresh)
                } else {
                    console.log("Error")
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const deleteUser = (id) => () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': `Bearer ${token}`,
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setRefresh(!refresh)
                } else {
                    console.log("Error")
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const updateRole = (id) => () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                isAdmin: !user.isAdmin
            })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setRefresh(!refresh)
                } else {
                    console.log("Error")
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }


    return (
        <div className={[styles.__card, animation ? styles.__card_out : ""].join(" ")}>
            <img src={user.avatar} alt={user.name} />
            <div className={styles.__card_info}>
                <img className={styles.__avatar} src={user.photo} alt="Avatar" />
                {editFields ?
                    <form className={styles.__edit_user} onSubmit={updateUser}>
                        <div className={styles.__field}>
                            <label htmlFor="firstname">Firstname :</label>
                            <input type="text" placeholder="Firstname"
                                onChange={(event) => setFirstname(event.target.value)}
                                value={firstname}
                            />
                        </div>
                        <div className={styles.__field}>
                            <label htmlFor="lastname">Lastname :</label>
                            <input type="text" placeholder="Lastname"
                                onChange={(event) => setLastname(event.target.value)}
                                value={lastname}
                            />
                        </div>
                        <div className={styles.__field}>
                            <label htmlFor="email">Email :</label>
                            <input type="email" placeholder="Email"
                                onChange={(event) => setEmail(event.target.value)}
                                value={email}
                            />
                        </div>
                        <div className={styles.__field}>
                            <label htmlFor="phone">Phone :</label>
                            <input type="text" placeholder="Phone"
                                onChange={(event) => setPhone(event.target.value)}
                                value={phone}
                            />
                        </div>
                        <div className={styles.__field}>
                            <label htmlFor="birthdate">Birthdate :</label>
                            <input type="date" placeholder="Birthdate"
                                onChange={(event) => setCurrentBirthdate(event.target.value)}
                                value={`${year}-${month}-${day}`}
                            />
                        </div>
                        <div className={styles.__field}>
                            <label htmlFor="gender">Gender :</label>
                            <select
                                onChange={(event) => setGender(event.target.value)}
                                value={gender}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className={styles.__field}>
                            <label htmlFor="category">Category :</label>
                            <input type="text" placeholder="Category"
                                onChange={(event) => setCategory(event.target.value)}
                                value={category}
                            />
                        </div>
                        <div className={styles.__field}>
                            <label htmlFor="city">City :</label>
                            <input type="text" placeholder="City"
                                onChange={(event) => setCity(event.target.value)}
                                value={city}
                            />
                        </div>
                        <div className={styles.__field}>
                            <label htmlFor="country">Country :</label>
                            <input type="text" placeholder="Country"
                                onChange={(event) => setCountry(event.target.value)}
                                value={country}
                            />
                        </div>
                        <button>Save</button>
                    </form>
                    :
                    <>
                        <p>{user.firstname} {user.lastname}</p>
                        <p>{user.email}</p>
                        <p>{user.phone}</p>
                        <p>{birthday}</p>
                        <img className={styles.__gender} src={user.gender === "female" ? femaleSymbol : maleSymbol} alt={user.gender} />
                        <p>{user.category}</p>
                        <p>{user.city}</p>
                        <p>{user.country}</p>
                    </>}
                {editMode && (
                    <>
                        <div className={styles.__is_admin}>
                            <button className={[styles.__change_btn, user.isAdmin ? styles.__admin : styles.__user].join(" ")} onClick={updateRole(user._id)}>{user.isAdmin ? "Admin" : "User"}</button>
                        </div>
                        <div className={styles.__edit_mode}>
                            <button className={styles.__edit_btn} onClick={() => setEditFields(!editFields)}>
                                <img src={edit} alt="Edit" />
                            </button>
                            <button className={[styles.__delete_btn, user.isAdmin ? styles.__disable_btn : ""].join(" ")} onClick={() => {
                                if (confirmDelete) {
                                    deleteUser(user._id)
                                } else {
                                    setConfirmDelete(true)
                                }
                            }} disabled={user.isAdmin ? "true" : ""} title={confirmDelete ? "Are you sure ?" : "You cannot delete admin account"}>
                                {confirmDelete ? <img src={check} alt="Check" /> : <img src={trash} alt="Trash" />}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
};

export default Card;