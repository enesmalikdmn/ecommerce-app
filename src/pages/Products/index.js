import React from 'react'
import Card from '../../components/Card'
import { Grid } from '@chakra-ui/react'
import { useQuery } from 'react-query'

function Products() {
  console.log('Products');
  
  const { isLoading, error, data } = useQuery('repoData', () =>
    fetch('https://fakestoreapi.com/products').then(res =>
      res.json()
    )
  )

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  console.log(data);
  
  return (
    <div>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          {data.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </Grid>
    </div>
  )
}

export default Products