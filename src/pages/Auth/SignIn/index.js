import React from "react";
import {
  Button,
  Flex,
  Box,
  Heading,
  Text,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Alert,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { signInValidationSchema } from "./validations";
import { signIn } from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInValidationSchema,
    onSubmit: async (values, bag) => {
      try {
        const response = await signIn({ email: values.email, password: values.password });
        bag.setSubmitting(false);
        bag.resetForm();
        login(response);
        navigate('/products');
      } catch (error) {
        bag.setErrors({ email: "Invalid email or password", password: "Invalid email or password" });
      }
    },
  });
  return (
    <div>
      <Flex align="center" justify="center" h="80vh">
        <Box
          w="sm"
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="lg"
        >
          <Box textAlign="center">
            <Heading>Sign In</Heading>
            <Text>Enter your credentials to sign in</Text>
          </Box>
          <Box my={4} textAlign="left">
            {formik.errors.email && (
              <Alert status="error" mb={4}>
                {formik.errors.email}
              </Alert>
            )}
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                />
                <FormHelperText>We'll never share your email.</FormHelperText>
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}
                />
              </FormControl>
              <Button width="full" mt={4} type="submit" colorScheme="blue">
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default SignIn;
