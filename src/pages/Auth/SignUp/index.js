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
import { signUpValidationSchema } from "./validations";
import { signIn, signUp } from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";

function SignUp() {
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpValidationSchema,
    onSubmit: async (values, bag) => {
      try {
        await signUp({name: values.username, email: values.email, password: values.password});
        const loginResponse = await signIn({email: values.email, password: values.password});
        bag.setSubmitting(false);
        bag.resetForm();
        login(loginResponse);
        window.location.href = "/products";
      } catch (error) {
        bag.setErrors({ general: error.response.data.message });
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
            <Heading>Sign Up</Heading>
            <Text>Enter your credentials to create an account</Text>
          </Box>
          <Box my={4} textAlign="left">
            {formik.errors.general && (
              <Alert status="error" mb={4}>
                {formik.errors.general}
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
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  isInvalid={formik.touched.username && formik.errors.username}
                />
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
              <FormControl mt={6}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  isInvalid={
                    formik.touched.confirmPassword && formik.errors.confirmPassword
                  }
                />
              </FormControl>
              <Button width="full" mt={4} type="submit" colorScheme="blue">
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default SignUp;
