import React, { useMemo } from 'react'
import { useBasket } from '../../contexts/BasketContext'
import { Alert, Button, Image, Box, Text } from '@chakra-ui/react'

function Basket() {
    const { basket, setBasket } = useBasket()

    const totalAmount = basket.reduce((acc, item) => acc + item.price, 0)
    const uniqueBasket = useMemo(() => {
      return basket.reduce((acc, item) => {
          const foundItem = acc.find(i => i.id === item.id);
          if (foundItem) {
              foundItem.count += 1; // increase count if item already exists
          } else {
              acc.push({ ...item, count: 1 }); // add item with initial count 1
          }
          return acc;
      }, []);
  }, [basket]);  // uniqueBasket will only recalculate when basket changes

  const removeItem = (item) => () => {
      const index = basket.findIndex(i => i.id === item.id);
      if (index !== -1) {
          const newBasket = [...basket];
          newBasket.splice(index, 1);
          setBasket(newBasket);
      }
  }
  
  return (
    <div className='flex flex-col gap-3'>
        {uniqueBasket.length === 0 && <Alert status="warning">Basket is empty</Alert>}
        {uniqueBasket.map((item, index) => (
            <div className='flex gap-4' key={index}>
                <Image loading="lazy" h={40} src={item.images} alt={item.title} />
                <div className='flex flex-col gap-4 justify-center'>
                  <p>{item.title}</p>
                  <p>{item.price} $</p>
                  <p>Count: {item.count}</p>
                  <Button w={40} onClick={removeItem(item)} colorScheme='red'>Remove</Button>
                </div>
            </div>
        ))}
        <Box>
          <Text fontSize={24}>Total Amount: {totalAmount} $</Text>
        </Box>
    </div>
  )
}

export default Basket