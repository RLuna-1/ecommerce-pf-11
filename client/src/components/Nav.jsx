import React from "react";
import {Link, useLocation} from "react-router-dom"
import styles from "../css/Nav.module.css"

const Nav = (props) => {
    const {pathname} = useLocation();
    return (
        <div> /* DIV GENERAL */
            <Link to="/home"> <button className={styles.ButtonNav}>HOME</button> </Link>
            <Link to="/allcards"> <button className={styles.ButtonNav}>All Cards</button> </Link>
            <Link to="/favorites"> <button className={styles.ButtonNav}>FAVORITES</button> </Link>
            <Link to="/about"> <button className={styles.ButtonNav}>ABOUT</button> </Link>
            /*luego agrego el seacrh*/
        </div>
    )
}
export default Nav