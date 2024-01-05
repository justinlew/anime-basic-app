'use client';

import { Inter } from 'next/font/google';
import { ChakraProvider } from '@chakra-ui/react';
import NavBar from '@/components/NavBar';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib/apolloClient';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider client={apolloClient}>
          <ChakraProvider>
            <NavBar />
            {children}
          </ChakraProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
