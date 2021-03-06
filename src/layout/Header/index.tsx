import { FunctionComponent } from "react"
import { NavLink, Link } from 'react-router-dom'
import Logo from '../../assets/logo.svg'
import './style.scss'

/**
 * Header Layout component
 * @returns {FunctionComponent}
 */
const Header: FunctionComponent = () => {
  return (
    <header>
      <Link to="/" className="logo">
        <svg><use xlinkHref={Logo + '#logo'}></use></svg>
      </Link>
      <nav>
        <ul>
          <li><NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/">Acceuil</NavLink></li>
          <li><NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/profil/12/Karl">Profil</NavLink></li>
          <li><NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/reglage">Réglage</NavLink></li>
          <li><NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/communaute">Communauté</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header
