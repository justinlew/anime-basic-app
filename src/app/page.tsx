'use client';
import WelcomeModal from '@/components/WelcomeModal';
import { JOBTITLE_KEY, USERNAME_KEY } from '@/const';
import { Box, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  const handleClose = () => {
    setUsername(localStorage.getItem(USERNAME_KEY) || '');
    setJobTitle(localStorage.getItem(JOBTITLE_KEY) || '');
  };

  useEffect(() => {
    setUsername(localStorage.getItem(USERNAME_KEY) || '');
    setJobTitle(localStorage.getItem(JOBTITLE_KEY) || '');
  }, []);

  return (
    <Box p={4}>
      <Text mb={4}>
        {username && jobTitle && `Welcome ${username}, ${jobTitle}!`}
      </Text>
      <Text mb={4}>New year, new animes to watch</Text>
      <WelcomeModal onClose={handleClose} />
    </Box>
  );
}
