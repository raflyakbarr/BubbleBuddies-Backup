import React from "react";
import { useState, useEffect } from "react";
import { HStack, Center, VStack, Box, Heading, Image, Text, ScrollView, FormControl, Input, Select } from "native-base";
import { TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../components";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddList = () => {
  const [defaultProducts, setDefaultProducts] = useState ([
    { 
      name: 'T-Shirt', 
      price: 3000 ,
      image: "https://i.pinimg.com/originals/42/04/cb/4204cbbc687d47fda5a66561da4935a9.png",
      quantity: 0,
      evidence: [],
    },
    { 
      name: 'Blanket', 
      price: 6000 ,
      image: "https://i.pinimg.com/736x/b9/63/ae/b963ae7da4aaeea35cbbd94bb5109e72.jpg",
      quantity: 0,
      evidence: [],
    },
    { 
      name: 'Blazer', 
      price: 5000 ,
      image: "https://i.pinimg.com/736x/5e/6b/7d/5e6b7d8cd5489b67dc542a10c3406bc9.jpg",
      quantity: 0,
      evidence: [],
    },
    { 
      name: 'Jacket', 
      price: 3000 ,
      image: "https://i.pinimg.com/originals/94/f9/b3/94f9b3818464bd292bc24a3a8acf067a.png",
      quantity: 0,
      evidence: [],
    },
    { 
      name: 'Bottom', 
      price: 4000 ,
      image: "https://i.pinimg.com/originals/3c/74/58/3c7458869ee918b90f5649a44d41f46f.png",
      quantity: 0,
      evidence: [],
    },
  ]);

  const navigation = useNavigation();
  //Tambahkan fungsi saveListOrder dibawah sini
  const [selectedService, setSelectedService] = useState('');
  useEffect(() => {
    // Ambil data service dari AsyncStorage saat halaman dimuat
    const fetchService = async () => {
      try {
        const service = await AsyncStorage.getItem('selectedService');
        
        if (service !== null) {
          setSelectedService(service);
        }
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };

    fetchService();
  }, []);

  const saveListOrder = async () => {
    try {
      // Periksa apakah semua quantity adalah 0
      const isQuantityEmpty = defaultProducts.every(product => product.quantity === 0);
  
      if (isQuantityEmpty) {
        // Jika semua quantity kosong, tampilkan alert
        Alert.alert('Quantity kosong', 'Tambahkan quantity');
        return; // Berhenti proses menyimpan jika quantity kosong
      }
  
      // Persiapkan data untuk disimpan
      const dataToSave = {
        service: selectedService,
        products: defaultProducts.filter(product => product.quantity > 0),
        // Hanya simpan produk dengan quantity > 0
      };
  
      // Simpan data ke AsyncStorage
      await AsyncStorage.setItem('orderData', JSON.stringify(dataToSave));
  
      // Tampilkan pesan bahwa data berhasil disimpan
      console.log('Data terbaru', dataToSave);
      navigation.replace('CheckoutOrder');
    } catch (error) {
      console.error('Error saving order data:', error);
    }
  };

  const incrementQuantity = (index) => {
    const updatedProducts = [...defaultProducts];
    updatedProducts[index].quantity++;
    setDefaultProducts(updatedProducts); // Update state atau variabel defaultProducts
  };

  const decrementQuantity = (index) => {
    const updatedProducts = [...defaultProducts];
    if (updatedProducts[index].quantity > 0) {
      updatedProducts[index].quantity--;
      setDefaultProducts(updatedProducts); // Update state atau variabel defaultProducts
    }
  };

  return (
    <>
      <Header title={"Add List"} withBack={true} />
      <Box py={"4"} bg="#82a9f4">
        <Box py={"5"} bg="#f6f6f6" w={"full"} borderRadius={"40"} mt={"30"} pt={"10"} pl={"10"} pr={"10"} pb={"30"} mb={"20"}>
          <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
            <Box>
            {defaultProducts.map((product, index) => (
            <FormControl key={index}>
              <Box borderRadius={"10"} shadow={"1"} mb={5} bgColor={"white"}>
                <HStack>
                  <Box flexDirection="row">
                    <Image
                      source={{uri: product.image }}
                      w="70"
                      h="70"
                      m={"6"}
                      alt="Image Data"
                      
                    />
                  </Box>
                  <VStack>
                    <Box flex={1.8}>
                      <Heading pl={"6"} pt={"3"} fontWeight={"800"} mt={"5"}>
                      {product.name}
                      </Heading>
                    </Box>
                    <Box>
                      <Text fontSize={"sm"} pl={"6"} pb={"6"}>
                        Rp {product.price} /pcs
                      </Text>
                    </Box>
                  </VStack>
                  <HStack pl={"6"} pt={"45"}>
                    <TouchableOpacity activeOpacity={0.8}  onPress={() => decrementQuantity(index)}>
                      <Ionicons name="remove-circle-outline" size={20} color="#82a9f4" />
                    </TouchableOpacity>
                    <Text ml={"2"} mr={"2"}>{product.quantity}</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => incrementQuantity(index)}>
                      <Ionicons name="add-circle-outline" size={20} color="#82a9f4" />
                    </TouchableOpacity>
                  </HStack>
                </HStack>
              </Box>
              {/* ke 2 */}
            </FormControl>
            ))}
            </Box>
            <Box py={"4"}>
              <TouchableOpacity activeOpacity={0.8} onPress={saveListOrder}>
                <Box py={"2"} bg="#82a9f4" borderRadius={"10"}>
                  <Center>
                    <Heading color="white" fontSize={"20"}>
                      Next
                    </Heading>
                  </Center>
                </Box>
              </TouchableOpacity>
            </Box>
          </ScrollView>
        </Box>
      </Box>
    </>
  );
};

export default AddList;
