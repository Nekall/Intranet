// Styles
import styles from "./styles.module.scss";

const Card = ({ user }) => {
    return(
        <div className={styles.__card}>
            <img src={user.avatar} alt={user.name} />
            <div className={styles.__card_info}>
                <img className={styles.__avatar} src={user.photo} alt="Avatar" />
                <p>{user.firstname} {user.lastname}</p>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <p>{user.birthdate}</p>
                <p>{user.gender}</p>
                <p>{user.category}</p>
                <p>{user.city}</p>
                <p>{user.country}</p>
            </div>
        </div>
    )
};

export default Card;