import React from 'react'
import Orders from '../AdminPanel/Orders'
import Products from '../AdminPanel/Products'
function AdminPanel() {
  const orders = JSON.parse(localStorage.getItem("orders"));


  if (!orders) {
    localStorage.setItem('orders', JSON.stringify([]))
  }

  return (
    <div>
      <Products />
      <Orders orders={orders} />
    </div>
  )
}

export default AdminPanel