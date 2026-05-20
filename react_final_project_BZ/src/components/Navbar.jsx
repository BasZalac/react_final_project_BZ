import { NavLink } from "react-router-dom"
import { useAuth } from "../context/loginContext"
import classes from './Navbar.module.css'
const NavBar = () => {
    const {isLogged, logout} = useAuth()
    return (
        <nav className={classes.navbar}>
            <NavLink to='/' className={({isActive}) =>isActive ? classes.active : classes.link}>Listanézet</NavLink>
            {isLogged && <NavLink to='form' className={({isActive}) =>isActive ? classes.active : classes.link}>Új termék</NavLink>}
            {!isLogged ? <NavLink to='login' className={({isActive}) =>isActive ? classes.active : classes.link}>Bejelentkezés</NavLink> : <a onClick={logout} className={classes.isActive}>Kijelentkezés</a>}
        </nav>
    )

}

export default NavBar