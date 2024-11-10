import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Stack, IconButton, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { MenuOutlined } from "@ant-design/icons";
import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";
import styles from "./styles.module.css";

function Navbar() {
  const { isLoginSucces, logout, user } = useAuth();
  const { basket } = useBasket();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const handleLogout = () => {
    logout(() => {
      navigate('/');
    });
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className="logo">
          <Link to={`/`}>eCommerce</Link>
        </div>

        {isMobile && (
          <Link to={`/products`} className="flex w-full justify-end">Products</Link>
        )}

        {isMobile ? (
          <>
            <MenuOutlined className="flex w-full justify-end" onClick={onOpen} />
            <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerBody>
                  <Stack spacing={4}>
                    {!isMobile && (
                      <Link to={`/products`} onClick={onClose}>Products</Link>
                    )}
                    {!isLoginSucces ? (
                      <>
                        <Link to={`/signup`} onClick={onClose}>
                          <Button colorScheme="blue">Register</Button>
                        </Link>
                        <Link to={`/signin`} onClick={onClose}>
                          <Button colorScheme="blue">Login</Button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to={`/basket`} onClick={onClose}>
                          <Button colorScheme="blue">
                            Basket ({basket.length})
                          </Button>
                        </Link>
                        {user && user?.role === 'admin' && (
                          <Link to={`/admin-panel`} onClick={onClose}>
                            <Button colorScheme="blue">Admin Panel</Button>
                          </Link>
                        )}
                        <Link to={`/profile`} onClick={onClose}>
                          <Button colorScheme="blue">Profile</Button>
                        </Link>
                        <Button onClick={() => { handleLogout(); onClose(); }} colorScheme="blue" variant="outline">
                          Logout
                        </Button>
                      </>
                    )}
                  </Stack>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        ) : (
          <ul className={styles.menu}>
            <li>
              <Link to={`/products`}>Products</Link>
            </li>
          </ul>
        )}
      </div>

      {!isMobile && (
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
      )}
    </nav>
  );
}

export default Navbar;
