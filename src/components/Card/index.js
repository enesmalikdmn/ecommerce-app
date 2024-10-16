import React from 'react'
import { Box, Image, Text, Button } from '@chakra-ui/react'
import { Link } from "react-router-dom";
import moment from 'moment';

function Card({ item }) {
  return (
    <div>
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Link to={`/products/${item.id}`}>
            <Image src={item.image} alt={item.title} loading='lazy' />
    
            <Box p="6">
                <Box d="flex" alignItems="baseline">
                    <Text fontSize="sm" color="gray.500">
                        {moment('2024-10-10T14:48:00.000Z').format('MMMM Do YYYY')}
                    </Text>
                </Box>

                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                    {item.title}
                </Box>

                <Box>
                    <Text fontSize="sm" color="gray.500">
                    $ {item.price}
                    </Text>
                </Box>

                <Box>
                    <Button colorScheme="blue">Add to basket</Button>
                </Box>
            </Box>
            </Link>
        </Box>
    </div>
  )
}

export default Card