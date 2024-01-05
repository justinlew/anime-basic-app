import { Box, Flex, Button, Text, Link } from '@chakra-ui/react';

const NavBar = () => {
  return (
    <Flex
      bg="teal.500"
      color="white"
      padding="4"
      justifyContent="space-between"
    >
      <Link href="/" mr={2}>
        <Box>
          <Text fontSize="xl">Anime app</Text>
        </Box>
      </Link>
      <Box>
        <Link href="/" mr={2}>
          Home
        </Link>
        <Link href="/profile" mr={2}>
          Profile
        </Link>
        <Link href="/information" mr={2}>
          Information
        </Link>
      </Box>
    </Flex>
  );
};

export default NavBar;
