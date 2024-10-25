import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button, Stack } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { isLoginSucces, logout, user } = useAuth();
  const { basket } = useBasket();
  const navigate = useNavigate();  

  const handleLogout = () => {
    logout(() => {
      navigate('/');
    });
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className="logo">
          <Link to={`/`}>eCommerce</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to={`/products`}>Products</Link>
          </li>
        </ul>
      </div>
      <Stack spacing={4} direction="row" align="center">
        {!isLoginSucces ? (
          <>
            <Link to={`/signup`}>
              <Button colorScheme="blue">Register</Button>
            </Link>
            <Link to={`/signin`}>
              <Button colorScheme="blue">Login</Button>
            </Link>
          </>
        ) : (
          <>
            <Link to={`/basket`}>
              <Button colorScheme="blue">
                Basket ({basket.length})
              </Button>
            </Link>
            {user && user?.role === 'admin' && (
              <Link to={`/admin-panel`}>
                <Button colorScheme="blue">Admin Panel</Button>
              </Link>
            )}
            <Link to={`/profile`}>
              <Button colorScheme="blue">Profile</Button>
            </Link>
            <Button onClick={handleLogout} colorScheme="blue" variant="outline">Logout</Button>
          </>
        )}
      </Stack>
    </nav>
  );
}

export default Navbar;
