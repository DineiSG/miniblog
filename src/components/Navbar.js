import { NavLink } from 'react-router-dom'

//Componente da barra de navegação

import styles from './Navbar.module.css'

const Navbar = () => {
  return (
   <nav className={styles.navbar}>
    <NavLink to="" className={styles.brand}>
        Mini <span>Blog</span>
    </NavLink>
    <ul className={styles.links_list}>
        <li>
            <NavLink to="/home" className={({isActive}) => (isActive ? styles.active : "")}>
                Home
            </NavLink>
        </li>
        <li>
            <NavLink to="/login" className={({isActive}) => (isActive ? styles.active : "")}>
                Login
            </NavLink>
        </li>
        <li>
            <NavLink to="/register" className={({isActive}) => (isActive ? styles.active : "")}>
                Cadastrar
            </NavLink>
        </li>
        <li>
            <NavLink to="/About" className={({isActive}) => (isActive ? styles.active : "") }>
                Sobre
            </NavLink>
        </li>
    </ul>
   </nav>
  )
}

export default Navbar
