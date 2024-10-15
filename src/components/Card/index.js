import React from 'react'
import { Box, Image, Text, Button } from '@chakra-ui/react'
import { Link } from "react-router-dom";

function Card() {
  return (
    <div>
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Link to={`/products/1`}>
            <Image src="https://bit.ly/sage-adebayo" alt="product" />
    
            <Box p="6">
                <Box d="flex" alignItems="baseline">
                    <Text fontSize="sm" color="gray.500">
                    April 1, 2021
                    </Text>
                </Box>

                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                    Product Name
                </Box>

                <Box>
                    <Text fontSize="sm" color="gray.500">
                    $20
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