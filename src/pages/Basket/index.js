import React, { useMemo, useState } from "react";
import { useBasket } from "../../contexts/BasketContext";
import {
  Alert,
  Button,
  Image,
  Box,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import CustomModal from "../../shared/CustomModal"; // Modal bileşenini dahil edin

function Basket() {
  const { basket, setBasket } = useBasket();
  const [address, setAddress] = useState("");
  const [userName, setUserName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const totalAmount = basket.reduce((acc, item) => acc + item.price, 0);
  
  const uniqueBasket = useMemo(() => {
    return basket.reduce((acc, item) => {
      const foundItem = acc.find((i) => i.id === item.id);
      if (foundItem) {
        foundItem.count += 1;
      } else {
        acc.push({ ...item, count: 1 });
      }
      return acc;
    }, []);
  }, [basket]);

  const removeItem = (item) => () => {
    const index = basket.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      const newBasket = [...basket];
      newBasket.splice(index, 1);
      setBasket(newBasket);
    }
  };

  const handleOrder = () => {
    const order = {
      userName,
      address,
      items: basket,
    };
    localStorage.setItem("orders", JSON.stringify(order));
    setBasket([]);
    onClose();
  };

  return (
    <div className="flex flex-col gap-3">
      {uniqueBasket.length === 0 && (
        <Alert status="warning">Basket is empty</Alert>
      )}
      {uniqueBasket.map((item, index) => (
        <div className="flex gap-4" key={index}>
          <Image loading="lazy" h={40} src={item.images} alt={item.title} />
          <div className="flex flex-col gap-4 justify-center">
            <p>{item.title}</p>
            <p>{item.price} $</p>
            <p>Count: {item.count}</p>
            <Button w={40} onClick={removeItem(item)} colorScheme="red">
              Remove
            </Button>
          </div>
        </div>
      ))}
      <Box>
        <Text fontSize={24}>Total Amount: {totalAmount} $</Text>
      </Box>

      <Button onClick={onOpen} colorScheme="green">
        Order
      </Button>

      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        address={address}
        setAddress={setAddress}
        userName={userName}
        setUserName={setUserName}
        handleOrder={handleOrder}
      />
    </div>
  );
}

export default Basket;
