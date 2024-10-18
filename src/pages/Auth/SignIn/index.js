import React from 'react'
import { Button, Flex, Box, Heading, Text, Input, FormControl, FormLabel, FormHelperText } from '@chakra-ui/react'


function SignIn() {
  return (
    <div>
      <Flex align="center" justify="center" h="80vh">
        <Box w="sm" p={4} borderWidth="1px" borderRadius="lg" boxShadow="lg" bg="orange.100">
          <Box textAlign="center">
            <Heading>Sign In</Heading>
            <Text>Enter your credentials to sign in</Text>
          </Box>
          <Box my={4} textAlign="left">
            <form>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input type="email" placeholder="Enter your email address" />
                <FormHelperText>We'll never share your email.</FormHelperText>
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="Enter your password" />
              </FormControl>
              <Button width="full" mt={4} type="submit" colorScheme='blue'>
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  )
}

export default SignIn