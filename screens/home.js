import { Heading, Box, ScrollView, Image, HStack, Text, FlatList } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons/";
import { SafeAreaView, TouchableOpacity, View, RefreshControl } from "react-native";
import { getData } from "../src/utils/localStorage";
import { getOrder } from "../src/actions/AuthAction";


const Home = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUserData();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);
  const [profile, setProfile] = useState("Belum Login");
  const getUserData = () => {
    getData("user").then((res) => {
      const data = res;
      if (data) {
        setProfile(data);
      } else {
        // navigation.replace('Login');
      }
    });
  };
  const [orders, setOrders] = useState([]);

  const [orderData, setOrderData] = useState([]);
  
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const userData = await getData('user');
        const userId = userData.uid;
        const fetchedOrder = await getOrder(userId);
        if (fetchedOrder) {
          const orders = Object.entries(fetchedOrder).map(([orderId, orderData]) => ({
            orderId,
            ...orderData,
          }));
          setOrderData(orders);
        }
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };
  
    const interval = setInterval(() => {
      fetchOrderData();
    }, 3000); // Misalnya, panggil setiap 5 detik
  
    // Membersihkan interval saat komponen tidak lagi digunakan
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      <SafeAreaView>
        <Box py={"4"} bg="#82a9f4">
          <Box py={"4"} mr={"10"} ml={"10"}>
            <Heading
              pt={"5"}
              fontSize={"30"}
              fontWeight={"900"}
              color="white"
              lineHeight={"lg"}
            >
              Welcome Back,{"\n"}{profile?.username}
            </Heading>
          </Box>
              
          <Box py={"7"} pb={"20"}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Box w={170} bgColor="white" p={"3"} borderRadius={"10"} shadow="2" ml={10}>
              <HStack>
                <Image 
                  source={require('../assets/washIron.png')}
                  alt="Alternate Text"
                  size={"60"}
                />
                <Heading p={"3"} fontSize={"18"} fontWeight={"500"}>
                  Wash{"\n"} & Iron
                </Heading>
              </HStack>
            </Box>
            <Box w={170} bgColor="white" p={"3"} borderRadius={"10"} shadow="2" ml={5}>
              <HStack>
                <Image 
                  source={require('../assets/iron.png')}
                  alt="Alternate Text"
                  size={"45"}
                  my={"2"}
                  mx={"2"}
                />
                <Heading p={"5"} fontSize={"18"} fontWeight={"500"}>
                  Ironing
                </Heading>
              </HStack>
            </Box>
            <Box w={170} bgColor="white" p={"3"} borderRadius={"10"} shadow="2" ml={5} mr={5}>
              <HStack>
                <Image 
                  source={require('../assets/wash.png')}
                  alt="Alternate Text"
                  size={"50"}
                  my={"2"}
                  mx={"2"}
                />
                <Heading p={"3"} fontSize={"18"} fontWeight={"500"}>
                  Wash
                </Heading>
              </HStack>
            </Box>
            </ScrollView>
          </Box>
        </Box>
        <Box py={"5"} bg="#f6f6f6" w={"full"} borderRadius={"40"} top={"-40"} pt={"5"} pl={"10"} pr={"10"} pb={"5"} mb={"40"}>
          <Box flexDirection="row" mt={5}>
            <Heading  fontSize={30}>
              My Orders
            </Heading>
          </Box>
          <Box alignItems="flex-end" top={-35}>
            <TouchableOpacity onPress={() => navigation.navigate('AddService')}>
              <Ionicons name="add-circle" size={40} color="#82a9f4" />
            </TouchableOpacity>
          </Box>
          <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
            {orderData.map((orderItem, orderIndex) => {
              let serviceImage = '';

              switch (orderItem.service) {
                case 'Wash & Iron':
                  serviceImage = require('../assets/washIron.png'); // Ganti dengan URL gambar untuk Wash & Iron
                  break;
                case 'Wash':
                  serviceImage = require('../assets/wash.png'); // Ganti dengan URL gambar untuk Wash
                  break;
                case 'Ironing':
                  serviceImage = require('../assets/iron.png'); // Ganti dengan URL gambar untuk Ironing
                  break;
                default:
                  serviceImage = ''; // URL default jika tidak ada yang cocok
                  break;
              }

              return (
                <Box key={orderIndex} p={"3"} bgColor="white" borderRadius={"10"} shadow="2" marginBottom={5} >
                  <HStack>
                    <Image 
                      source={serviceImage} // Gunakan serviceImage yang sudah ditentukan
                      alt="Alternate Text"
                      size={"79"}
                      mr={"1"}
                    />
                    <Heading p={"3"} fontSize={"20"} lineHeight={"25"}>
                      {orderItem.service}{"\n"}
                      <Text fontSize={"15"} fontWeight={"500"}>{orderItem.date}{"\n"}</Text>
                      <Text fontSize={"15"} fontWeight={"500"}>Rp {orderItem.total}</Text>
                    </Heading>             
                  </HStack>
                </Box>
              );
            })}
          </ScrollView>
        </Box>
      </SafeAreaView>
    </>
  );
};

export default Home;
