// Styles
import styles from "./styles.module.scss";

// Assets
import maleSymbol from "../../assets/images/male-symbol.svg";
import femaleSymbol from "../../assets/images/female-symbol.svg";

const Card = ({ user, animation }) => {

    const birthdate = new Date(user.birthdate);
    const day = birthdate.getDate().toString().length === 1 ? `0${birthdate.getDate()}` : birthdate.getDate();
    const month = birthdate.getMonth().toString().length === 1 ? `0${birthdate.getMonth()}` : birthdate.getMonth();
    const year = birthdate.getFullYear();
    const birthday = `${day}/${month}/${year}`;

    return(
        <div className={[styles.__card, animation ? styles.__card_out : ""].join(" ")}>
            <img src={user.avatar} alt={user.name} />
            <div className={styles.__card_info}>
                <img className={styles.__avatar} src={user.photo} alt="Avatar" />
                <p>{user.firstname} {user.lastname}</p>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <p>{birthday}</p>
                <img className={styles.__gender} src={user.gender === "female" ? femaleSymbol : maleSymbol} alt={user.gender} />
                <p>{user.category}</p>
                <p>{user.city}</p>
                <p>{user.country}</p>
            </div>
        </div>
    )
};

export default Card;