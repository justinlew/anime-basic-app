import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

const USERNAME_KEY = 'username';
const JOBTITLE_KEY = 'jobTitle';

interface WelcomeModalProps {
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);

  const initialRef = useRef<HTMLInputElement | null>(null);

  const handleNext = () => {
    if (page === 1) {
      setPage(2);
    } else {
      // Save username and job title to Local Storage
      localStorage.setItem(USERNAME_KEY, username);
      localStorage.setItem(JOBTITLE_KEY, jobTitle);
      // Close modal and redirect to Information Page
      setIsOpen(false);
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      initialRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(
      localStorage.getItem(USERNAME_KEY) === null ||
        localStorage.getItem(JOBTITLE_KEY) === null
    );
  }, []);

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Welcome</ModalHeader>
        <ModalBody>
          {page === 1 ? (
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                ref={initialRef}
                placeholder="Enter username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </FormControl>
          ) : (
            <FormControl>
              <FormLabel htmlFor="jobTitle">Job Title</FormLabel>
              <Input
                id="jobTitle"
                ref={initialRef}
                placeholder="Enter job title"
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
              />
            </FormControl>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleNext}>
            {page === 1 ? 'Next' : 'Finish'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WelcomeModal;
