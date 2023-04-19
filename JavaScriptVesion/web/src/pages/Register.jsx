import { useState } from "react";
import {
  Container,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import {useMutation } from "@apollo/client";
import Login from "./Login";
import { REGISTER } from "../graphql/mutations";

const Register = () => {
  const [registerUser] = useMutation(REGISTER);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser({ variables: { name, email, password } });
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <VStack>
      <Container maxW="lg">
        <form onSubmit={handleSubmit}>
          <VStack>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </FormControl>
            <Button type="submit" colorScheme="blue">
              Register
            </Button>
          </VStack>
        </form>
      </Container>
    </VStack>
  );
};

export default Register;
