import React from 'react'
import { useQuery } from 'react-query'
import { getProducts } from '../../../services/api'
import { Table, Button, Space } from 'antd'
import { Text } from '@chakra-ui/react'
import AdminProducts from './adminProducts'

function Products() {
  const { data, error, isLoading, isError } = useQuery('admin:products', getProducts);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  const columns = AdminProducts();
  

  return (
    <div>
      <Text fontSize="xl" mb="4">Products</Text>
      <Table dataSource={data} columns={columns} />
    </div>
  )
}

export default Products