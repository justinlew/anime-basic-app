'use client';
import AnimeDetailModal from '@/components/AnimeModal';
import { useQuery, gql } from '@apollo/client';
import {
  Box,
  List,
  ListItem,
  Text,
  useDisclosure,
  Image,
  Flex,
  Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type AnimeTitle = {
  english: string | null;
  native: string | null;
};

type AnimeCoverImage = {
  large: string;
};

export type Anime = {
  id: number;
  title: AnimeTitle;
  coverImage: AnimeCoverImage;
  description: string | null;
};

type PageInfo = {
  total: number;
  currentPage: number;
  lastPage: number;
};

type AnimeQueryResult = {
  Page: {
    pageInfo: PageInfo;
    media: Anime[];
  };
};

const GET_ANIME_LIST = gql`
  query GetAnimeList($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
      }
      media(type: ANIME) {
        id
        title {
          english
          native
        }
        coverImage {
          large
        }
        description
      }
    }
  }
`;

const InformationPage = () => {
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem('username');
    const jobTitle = localStorage.getItem('jobTitle');

    if (!username || !jobTitle) {
      router.push('/'); // Redirect to Home Page
    }
  }, [router]);

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10; // You can adjust this number as needed
  const { data, loading, error } = useQuery<AnimeQueryResult>(GET_ANIME_LIST, {
    variables: { page: currentPage, perPage: perPage },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const openModal = (anime: Anime) => {
    setSelectedAnime(anime);
    onOpen();
  };

  const handleKeyDown = (event: React.KeyboardEvent, anime: Anime) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      openModal(anime);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (data && currentPage < data.Page.pageInfo.lastPage)
      setCurrentPage(currentPage + 1);
  };

  if (!data || data.Page.media.length === 0) {
    return <p>No anime data available.</p>;
  }

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>
        Anime List
      </Text>
      <List spacing={3}>
        {data.Page.media.map(anime => (
          <ListItem
            key={anime.id}
            role="button"
            tabIndex={0}
            border="1px"
            borderColor="gray.200"
            p={3}
            onClick={() => openModal(anime)}
            onKeyDown={e => handleKeyDown(e, anime)}
          >
            <Flex align="center">
              <Image
                src={anime.coverImage.large}
                alt={
                  anime.title.english || anime.title.native || 'Unknown Title'
                }
                boxSize="50px"
                mr={3}
              />
              <Text fontWeight="bold">
                {anime.title.english || anime.title.native}
              </Text>
            </Flex>
          </ListItem>
        ))}
      </List>

      <Flex justifyContent="center" mt={4}>
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Text mx={2}>
          Page {currentPage} of {data?.Page.pageInfo.lastPage}
        </Text>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === data?.Page.pageInfo.lastPage}
        >
          Next
        </Button>
      </Flex>
      {selectedAnime && (
        <AnimeDetailModal
          anime={selectedAnime}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </Box>
  );
};

export default InformationPage;
