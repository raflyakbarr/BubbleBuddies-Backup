import React from 'react';
import { Box, VStack, HStack, Center, ScrollView } from 'native-base';
import { Header } from '../components';

const ListImage = () => {
  return (
    <>
      <Box bg="#82a9f4">
        <Box mb={10}>
          <Header withBack="true" title={'Detail Image'} />
        </Box>
      </Box>
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <VStack mb={10} mt={10} space={30} justifyContent="center" alignItems="center">
          <HStack space={30}>
            <Center h="40" w="40" bg="muted.300" rounded="md" shadow={3}>
              Gambar 1
            </Center>
            <Center h="40" w="40" bg="muted.300" rounded="md" shadow={3}>
              Gambar 2
            </Center>
          </HStack>
          <HStack space={30}>
            <Center h="40" w="40" bg="muted.300" rounded="md" shadow={3}>
              Gambar 3
            </Center>
            <Center h="40" w="40" bg="muted.300" rounded="md" shadow={3}>
              Gambar 4
            </Center>
          </HStack>
          <HStack space={30}>
            <Center h="40" w="40" bg="muted.300" rounded="md" shadow={3}>
              Gambar 5
            </Center>
            <Center h="40" w="40" bg="muted.300" rounded="md" shadow={3}>
              Gambar 6
            </Center>
          </HStack>
          <HStack space={30}>
            <Center h="40" w="40" bg="muted.300" rounded="md" shadow={3}>
              Gambar 7
            </Center>
            <Center h="40" w="40" bg="muted.300" rounded="md" shadow={3}>
              Gambar 8
            </Center>
          </HStack>
          <HStack space={30}>
            <Center h="40" w="40" bg="muted.300" rounded="md" shadow={3}>
              Gambar 9
            </Center>
            <Center h="40" w="40" bg="muted.300" rounded="md" shadow={3}>
              Gambar 10
            </Center>
          </HStack>
        </VStack>
      </ScrollView>
    </>
  );
};

export default ListImage;
