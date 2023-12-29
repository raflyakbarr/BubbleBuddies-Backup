// Di halaman ListImage
import React from 'react';
import { Box, ScrollView, Image } from 'native-base';
import { Header } from '../components';

const ListImage = ({ route }) => {
  const { evidence: orderEvidence } = route.params;

  return (
    <>
      <Box bg="#82a9f4">
        <Header withBack="true" title={'Detail Image'} />
      </Box>
     
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
      {orderEvidence && orderEvidence.length > 0 &&
            orderEvidence.map((imageUrl, index) => (
        <Box key={index} backgroundColor={"muted.300"} width={350} height={350} alignSelf={"center"} marginTop={10} borderRadius={5}>

              <Box mb={10} mt={10} space={30} justifyContent="center" alignItems="center">
                <Image
                  alt={`Image ${index}`}
                  source={{ uri: imageUrl }}
                  style={{ width: 300, height: 300 }} // Sesuaikan ukuran sesuai kebutuhan
                />
              </Box>
        </Box>
                    ))
                  }  
      </ScrollView>
    </>
  );
};

export default ListImage;
