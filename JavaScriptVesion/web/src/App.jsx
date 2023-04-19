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
import { useQuery, useMutation, gql } from "@apollo/client";

// using Apollo's method to define GET_USERS, which can get all users in DB
const GET_USERS = gql`
  query {
    users {
      id
      name
      email
      password
    }
  }
`;

// using Apollo's method to define REGISTER_USER, which can create a new user in DB
const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    registerUser(name: $name, email: $email, password: $password) {
      id
      name
      email
      password
    }
  }
`;

function App() {
  // initial state
  const { loading, error, data } = useQuery(GET_USERS);
  const [registerUser] = useMutation(REGISTER_USER);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // page shows loading or error when loading or error appears
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :</Text>;

  // The handleSubmit function is bound to the submit event of the form
  // so that the function is executed when the user submits the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser({ variables: { name, email, password } });
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    // The VStack component is a vertical layout container for vertically arranging subcomponents
    // The Heading component in Chakra UI is used to render the title in the page
    // Container is a layout component provided by Chakra UI, which is used to wrap page content in a central container
    // FormControl is a form control container component provided by Chakra UI
    

    <VStack>
      <Heading as="h1" size="2xl" mb="8">
        Users
      </Heading>
      <Container maxW="lg">
        <VStack mb="8">
          {data.users.map((user) => (
            <Text key={user.id}>
              {user.name} ({user.email})
            </Text>
          ))}
        </VStack>
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
  )
}

export default App;
