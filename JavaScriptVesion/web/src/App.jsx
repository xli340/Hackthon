import { VStack, Text, Container, Heading, Button, Box, Flex, styled } from "@chakra-ui/react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { GET_USERS, ME } from "./graphql/queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link  } from "react-router-dom";

const Home = ({username}) => (
  <VStack>
    <Heading>Welcome {username}!</Heading>
    <Text>
      Please log in or register to continue.
    </Text>
    <Flex>
      <Button as={Link} to="/login" mr={2} colorScheme="blue">
        Login
      </Button>
      <Button as={Link} to="/register" colorScheme="blue">
        Register
      </Button>
    </Flex>
  </VStack>
);

function App() {
  const { loading, error, data } = useQuery(ME);
  const [username, setUsername] = useState("Guest");
  const user = data?.me;
  useEffect(() => {
    if (user) {
      setUsername(data.me.name);
    }
  }, [data]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home username = {username}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
