import { Anime } from '@/app/information/page';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Image,
  Text,
  Box,
} from '@chakra-ui/react';

interface AnimeDetailModalProps {
  anime: Anime;
  isOpen: boolean;
  onClose: () => void;
}

const AnimeDetailModal: React.FC<AnimeDetailModalProps> = ({
  anime,
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{anime.title.english || anime.title.native}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box textAlign="center">
            <Image
              src={anime.coverImage.large}
              alt={anime.title.english || anime.title.native || 'Unknown Title'}
              mb={4}
            />
            <Text>{anime.description}</Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AnimeDetailModal;
