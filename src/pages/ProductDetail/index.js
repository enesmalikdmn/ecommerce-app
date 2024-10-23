import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getProductDetail } from '../../services/api'
import { Box, Text, Button } from '@chakra-ui/react'
import ReactImageGallery from 'react-image-gallery'
import { useBasket } from '../../contexts/BasketContext'


function ProductDetail() {
  const { id } = useParams()
  const { addProduct } = useBasket()
  
  const { isLoading, error, data } = useQuery(['productDetail', id], () =>
    getProductDetail(id)
  )

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  const images = data.images.map(image => ({
    original: image.replace(/^\["|"\]$/g, ""),
  }))
    
  return (
    <div>
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
            {/* <Image src={data.image} alt={data.title} loading='lazy' /> */}
            <ReactImageGallery items={images} showThumbnails={false} />
    
            <Box p="6">
                <Box d="flex" alignItems="baseline">
                    <Text fontSize="sm" color="gray.500">
                        {data.category.name}
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
                    <Button onClick={() => addProduct(data)} colorScheme="blue">Add to basket</Button>
                </Box>
            </Box>
        </Box>
    </div>
  )
}

export default ProductDetail