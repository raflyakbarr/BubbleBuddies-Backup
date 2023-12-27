import React from 'react';
import { useEffect, useState } from 'react';
import { Box, VStack, HStack, Center, ScrollView, Image, Text } from 'native-base';
import { Header } from '../components';
import { getOrder, getImage } from '../src/actions/AuthAction';


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
  const [imageUrls, setImageUrls] = useState([]);


  useEffect(() => {
    // Panggil getImage untuk setiap nama file gambar yang ada di dalam evidences
    const fetchImages = async () => {
      try {
        const urls = await Promise.all(evidences.map(async (evidence) => {
          const url = await getImage(evidence);
          return url;
        }));
        setImageUrls(urls);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [evidences]);
  return (
    <>
      <Box bg="#82a9f4">
        <Box mb={10}>
          <Header withBack="true" title={'Detail Image'} />
        </Box>
      </Box>
     
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
      {imageUrls.map((url, index) => (
        <Box key={index} backgroundColor={"muted.300"} width={350} height={350} alignSelf={"center"} marginTop={10} borderRadius={5}>
          <Box mb={10} mt={10} space={30} justifyContent="center" alignItems="center" >          
                <Image
                alt='nama gambarrrr'
                  key={index}
                  source={{ uri: url }}
                  style={{ width: 300, height: 300 }} // Sesuaikan ukuran sesuai kebutuhan
                />
          </Box>          
        </Box>  
        ))}
      </ScrollView>
      
    </>
  );
};

export default ListImage;
