// Styles
import styles from "./styles.module.scss";

const Card = ({ user }) => (
    <div className={styles.__card}>
        <img src={user.avatar} alt={user.name} />
        <div className={styles.__card_info}>
            <h2>{user.firstname}</h2>
            <p>{user.email}</p>
        </div>
    </div>
);

export default Card;