import React from 'react'
import { useBasket } from '../../contexts/BasketContext'
import { Alert, Button, Image, Box, Text } from '@chakra-ui/react'

function Basket() {
    const { basket } = useBasket()

    const totalAmount = basket.reduce((acc, item) => acc + item.price, 0)
    
  return (
    <div className='flex flex-col gap-3'>
        {basket.length === 0 && <Alert status="warning">Basket is empty</Alert>}
        {basket.map((item, index) => (
            <div className='flex gap-4' key={index}>
                <Image h={40} src={item.images} alt={item.title} />
                <div className='flex flex-col gap-4 justify-center'>
                  <p>{item.title}</p>
                  <p>{item.price} $</p>
                  <Button w={40} onClick={() => {}} colorScheme='red'>Remove</Button>
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