import React from 'react'
import { useBasket } from '../../contexts/BasketContext'
import { Alert, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function Basket() {
    const { basket } = useBasket()
  return (
    <div>
        {basket.length === 0 && <Alert status="warning">Basket is empty</Alert>}
        {basket.map((item, index) => (
            <div key={index}>
                <Image src={item.image} alt={item.title} />
                <p>{item.title}</p>
                <p>{item.price}</p>
            </div>
        ))}
    </div>
  )
}

export default Basket