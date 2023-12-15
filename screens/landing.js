import React, { useState, useEffect } from 'react';
import { Text, Image, Box, Center, ScrollView } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Landing = () => {
  const navigation = useNavigation();
  
return (
  
  <Box flex={1} pt={10} bg={"#f1f3ff"}>
    <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
    <Center>
      <Image
        justifyContent={"center"}
        alignItems={"center"} 
        source={require('../assets/yeye2.jpg')}
        width={340}
        height={360}
        alt='image'
        marginTop={10}
        borderRadius={15}
        />
    </Center>
    <Box p={"5"} justifyContent={"center"} alignItems={"center"}>
      <Box justifyContent={'center'} alignItems={'center'}>
        <Text color="#82A9F4" fontSize={32} fontWeight={"bold"} pt={2}>
          BubbleBudies
        </Text>
        <Box>
          <Text textAlign={"center"}  fontSize={13} fontWeight={"bold"} >"Laundry Lebih Mudah, Lebih Cepat, Lebih Hemat, bersama BubbleBudies!" </Text>
          <Text textAlign={"center"} pt={5} fontSize={15} >BubbleBudies membantu anda dalam menyelesaikan permasalahan laundry anda melalui pemesanan online </Text>
        </Box>
      </Box>
    </Box>
    <Box pt={60}>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Box
          bg="#87C4FF"
          position="absolute"
          w={110}
          h={50}
          bottom={0}
          left={70}
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          borderRadius={8}>
          <Text color="#ffffff">Register</Text>
        </Box>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Box
          bg="#87C4FF"
          position="absolute"
          flexDirection="row-reverse"
          bottom={0}
          right={70}
          w={110}
          h={50}
          alignItems="center"
          justifyContent="center"
          borderRadius={8}>
          <Text color="#ffffff">Login</Text>
        </Box>
      </TouchableOpacity>
    </Box>
    </ScrollView>
  </Box>
 
  );
};

export default Landing;
