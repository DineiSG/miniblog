import { NavLink } from 'react-router-dom'


//Importado para fazer a função de logout na barra de navegação
import { useAuthentication} from '../hooks/useAuthentication'

//Importado para pegar o valor do contexo
import { useAuthValue } from '../context/AuthContext'

//Componente da barra de navegação
import styles from './Navbar.module.css'


const Navbar = () => {
    const user = useAuthValue()
    const {logout} =useAuthentication()

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
        {/*Se nao tiverr usuario logado esses links serao exibidos */}
        {!user &&(
            <>
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
            </>
        )}
        {/*Se tiver usuario logado esses links aparecerao */}
        {user &&(
              <>
              <li>
                  <NavLink to="/posts/create" className={({isActive}) => (isActive ? styles.active : "")}>
                      Novo Post
                  </NavLink>
              </li>
              <li>
                  <NavLink to="/dashboard" className={({isActive}) => (isActive ? styles.active : "")}>
                      Dashboard
                  </NavLink>
                  </li>
              </>
        )}
        <li>
            <NavLink to="/About" className={({isActive}) => (isActive ? styles.active : "") }>
                Sobre
            </NavLink>
        </li>
        {/*Caso o usuario esteja logado irá aparecer o botao de Sair */}
        {user &&(
            <li>
                <button onClick={logout}>Sair</button>
            </li>
        )}
    </ul>
   </nav>
  )
}

export default Navbar
