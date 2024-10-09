import React from 'react'
import { Outlet, Link } from "react-router-dom";
import styles from './styles.module.css'
function Navbar() {
  return (
  <nav className={styles.nav}>
    <div className={styles.left}>
      <div className='logo'>
        <Link to={`/`}>eCommerce</Link>
      </div>
      <ul className={styles.menu}>
        <li>
          <Link to={`/products`}>Products</Link>
        </li>
      </ul>
    </div>
    <div className='right'> right </div>
  </nav>
  )
}

export default Navbar