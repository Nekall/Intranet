import { useState } from "react";
import { toast } from "react-toastify";

// Styles
import styles from "./styles.module.scss";

// Assets
import maleSymbol from "../../assets/images/male-symbol.svg";
import femaleSymbol from "../../assets/images/female-symbol.svg";
import edit from "../../assets/images/edit.svg";
import trash from "../../assets/images/trash.svg";

// Helpers
import validators from "../../helpers/validators";

const Card = ({ user, animation, editMode, refresh, setRefresh }) => {
    const token = localStorage.getItem("__intranet_token");
    const [editFields, setEditFields] = useState(false);
    const birthdate = new Date(user.birthdate);
    const day = birthdate.getDate().toString().length === 1 ? `0${birthdate.getDate()}` : birthdate.getDate();
    const month = birthdate.getMonth().toString().length === 1 ? `0${birthdate.getMonth()}` : birthdate.getMonth();
    const year = birthdate.getFullYear();
    const birthday = `${day}/${month}/${year}`;

    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [currentBirthdate, setCurrentBirthdate] = useState(birthdate);
    const [category, setCategory] = useState(user.category);
    const [city, setCity] = useState(user.city);
    const [country, setCountry] = useState(user.country);
    const [gender, setGender] = useState(user.gender);

    const updateUser = (e) => {
        e.preventDefault();
        if (!validators.firstname(firstname)) {
            return toast.error("Firstname is not valid. (It must be between 3 and 20 letters long)", { style: { background: '#18191b' } })
        }
        if (!validators.lastname(lastname)) {
            return toast.error("Lastname is not valid. (It must be between 3 and 20 letters long)", { style: { background: '#18191b' } })
        }
        if (!validators.phone(phone)) {
            return toast.error("Phone is not valid. (It must be a valid phone number like 01-23-45-67-89)", { style: { background: '#18191b' } })
        }
        if (!validators.city(city)) {
            return toast.error("City is not valid. (It must be between 3 and 20 letters long)", { style: { background: '#18191b' } })
        }
        if (!validators.country(country)) {
            return toast.error("Country is not valid. (It must be between 3 and 20 letters long)", { style: { background: '#18191b' } })
        }

        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${user._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                firstname,
                lastname,
                birthdate: currentBirthdate,
                email,
                phone,
                city,
                country,
                gender,
                category,
                isAdmin: user.isAdmin
            })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setEditFields(!editFields)
                    setRefresh(!refresh)
                    toast.success(`${data.data.firstname} ${data.data.lastname}'s profile has been successfully updated.`, { style: { background: '#18191b' } })
                } else {
                    toast.error(data.message, { style: { background: '#18191b' } })
                }
            })
            .catch(_ => {
                toast.error("An error has occurred, please contact support.", { style: { background: '#18191b' } })
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
                    setRefresh(!refresh);
                    toast.success(data.message, { style: { background: '#18191b' } })
                } else {
                    toast.error(data.message, { style: { background: '#18191b' } })
                }
            })
            .catch(_ => {
                toast.error("An error has occurred, please contact support.", { style: { background: '#18191b' } })
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
                firstname: user.firstname,
                lastname: user.lastname,
                birthdate: user.birthdate,
                email: user.email,
                phone: user.phone,
                city: user.city,
                country: user.country,
                gender: user.gender,
                category: user.category,
                isAdmin: !user.isAdmin
            })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setRefresh(!refresh);
                    toast.success("User ROLE updated successfully.", { style: { background: '#18191b' } })
                } else {
                    toast.error(data.message, { style: { background: '#18191b' } })
                }
            })
            .catch(_ => {
                toast.error("An error has occurred, please contact support.", { style: { background: '#18191b' } })
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
                            <button className={[styles.__delete_btn, user.isAdmin ? styles.__disable_btn : ""].join(" ")} onClick={deleteUser(user._id)} disabled={user.isAdmin} title={"You cannot delete admin account"}>
                                <img src={trash} alt="Trash" />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
};

export default Card;