import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, Text } from '@chakra-ui/react'
import moment from "moment";

function Orders({ orders }) {
  const totalAmount = orders?.items?.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <Text fontSize="xl" mb="4">Orders</Text>
      <Table variant="simple">
        <TableCaption>Orders: {orders.items?.length} - Total Amount: ${totalAmount} - Adress: {orders.address}</TableCaption>
        <Thead>
          <Tr>
            <Th>User Name</Th>
            <Th>Order ID</Th>
            <Th>Order Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders?.items?.map((order, index) => (
            <Tr key={index}>
              <Td>{orders.userName}</Td>
              <Td>{order.id}</Td>
              <Td>${order.price}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  )
}

export default Orders