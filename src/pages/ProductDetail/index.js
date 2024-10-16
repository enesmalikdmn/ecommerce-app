import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getProductDetail } from '../../services/api'
import { Box, Image, Text, Button } from '@chakra-ui/react'


function ProductDetail() {
  const { id } = useParams()
  const { isLoading, error, data } = useQuery(['productDetail', id], () =>
    getProductDetail(id)
  )

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    console.log(data);
    
  return (
    <div>
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src={data.image} alt={data.title} loading='lazy' />
    
            <Box p="6">
                <Box d="flex" alignItems="baseline">
                    <Text fontSize="sm" color="gray.500">
                        {data.category}
                    </Text>
                </Box>

                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                    {data.title}
                </Box>

                <Box>
                    <Text fontSize="sm" color="gray.500">
                        {data.description}
                    </Text>
                </Box>

                <Box>
                    <Text fontSize="sm" color="gray.500">
                    $ {data.price}
                    </Text>
                </Box>

                <Box>
                    <Button colorScheme="blue">Add to basket</Button>
                </Box>
            </Box>
        </Box>
    </div>
  )
}

export default ProductDetail