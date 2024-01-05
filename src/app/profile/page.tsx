'use client';
import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { JOBTITLE_KEY, USERNAME_KEY } from '@/const';

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  // Load user data on component mount
  useEffect(() => {
    // Fetch user data from localStorage or API
    const storedUsername = localStorage.getItem(USERNAME_KEY) || '';
    const storedJobTitle = localStorage.getItem(JOBTITLE_KEY) || '';

    setUsername(storedUsername);
    setJobTitle(storedJobTitle);
  }, []);

  const handleUsernameChange = e => setUsername(e.target.value);
  const handleJobTitleChange = e => setJobTitle(e.target.value);

  const saveProfile = () => {
    // Save user data to localStorage or send it to an API
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(JOBTITLE_KEY, jobTitle);

    // Implement any additional logic after saving (like showing a success message)
  };

  return (
    <VStack spacing={4} p={4}>
      <FormControl id="username">
        <FormLabel>Username</FormLabel>
        <Input value={username} onChange={handleUsernameChange} />
      </FormControl>

      <FormControl id="job-title">
        <FormLabel>Job Title</FormLabel>
        <Input value={jobTitle} onChange={handleJobTitleChange} />
      </FormControl>

      <Button colorScheme="blue" onClick={saveProfile}>
        Save Profile
      </Button>
    </VStack>
  );
};

export default ProfilePage;
