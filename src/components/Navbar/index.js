import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button, Stack } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";

function Navbar() {
  const { isLoginSucces } = useAuth();

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
        {isLoginSucces ? (
          <Button colorScheme="red" variant="outline">
            <Link to={`/auth/signout`}>Sign Out</Link>
          </Button>
        ) : (
          <>
            <Link to={`/signup`}>
              <Button colorScheme="blue">Register</Button>
            </Link>
            <Link to={`/signin`}>
              <Button colorScheme="blue">Login</Button>
            </Link>
          </>
        )}
      </Stack>
    </nav>
  );
}

export default Navbar;
