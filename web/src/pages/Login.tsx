import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Alert,
  AlertIcon,
  VStack,
} from "@chakra-ui/react";
import { LOGIN } from "../graphql/mutations";
import { useCookies } from 'react-cookie';

type LoginData = {
  name: string;
  password: string;
};

const Login: React.FC = () => {
  // const navigate = useNavigate();
  const [login, { loading, error }] = useMutation(LOGIN);
  const [formData, setFormData] = useState<LoginData>({
    name: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: formData,
      });
            
      // navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VStack>
      <form onSubmit={handleSubmit}>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          Invalid email or password
        </Alert>
      )}
      <Stack spacing={4}>
        <FormControl id="name">
          <FormLabel>User name</FormLabel>
          <Input
            type="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </FormControl>
        <Button type="submit" isLoading={loading} colorScheme="blue">
          Sign in
        </Button>
      </Stack>
    </form>

    </VStack>
    
  );
};

export default Login;
