import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Text, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate();  

  const handleLogout = () => {
    logout(() => {
      navigate('/');
    });
  }

  return (
    <div>
      <Text fontSize="xl" mb="4">Profile</Text>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Button onClick={handleLogout} colorScheme="red" mt="4">Logout</Button>
    </div>
  )
}

export default Profile