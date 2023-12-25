import React from 'react';
import { useEffect, useState } from 'react';
import { Box, VStack, HStack, Center, ScrollView, Image, Text } from 'native-base';
import { Header } from '../components';
import { getOrder } from '../src/actions/AuthAction';


const ListImage = ({ route }) => {
  const { orderNumber, orderId } = route.params;
  const [evidences, setEvidences] = useState([]);
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const orderArray = await getOrder(); // Mendapatkan data order dari fungsi getOrder
        // Mencari order yang sesuai dengan orderId yang diberikan
        const selectedOrder = orderArray.find(order => order.orderId === orderId);
        if (selectedOrder) {
          // Mengambil evidences dari setiap products di orderId
          const extractedEvidences = selectedOrder?.products?.flatMap(product => product.evidence) || [];
          setEvidences(extractedEvidences);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrderData();
  }, [orderId]);

  return (
    <>
      <Box bg="#82a9f4">
        <Box mb={10}>
          <Header withBack="true" title={'Detail Image'} />
        </Box>
      </Box>
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
      <Box>
    </Box>
        <VStack mb={10} mt={10} space={30} justifyContent="center" alignItems="center">
          <HStack space={30}>
            <Center h="40" w="40" bg="muted.300" rounded="md" shadow={3}>
              <Box>
              </Box>
              <Text>
                {orderId}
              </Text>
              {evidences.map((evidence, index) => (
            <Text key={index}>
              Evidence {index + 1}: {evidence}
            </Text>
          ))}
              <Text>
                {orderNumber}
              </Text>              
            </Center>
            <Center h="40" w="40" bg="muted.300" rounded="md" shadow={3}>
              Gambar 2
            </Center>
          </HStack>
        </VStack>
      </ScrollView>
    </>
  );
};

export default ListImage;
