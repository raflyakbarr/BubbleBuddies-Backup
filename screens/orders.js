import { useNavigation } from "@react-navigation/native";
import { Box, Button, HStack, Heading, Image, ScrollView, Text, Modal } from "native-base";
import React, { useState, useEffect } from "react";
import { Header } from "../components";
import { TouchableOpacity, ActivityIndicator, RefreshControl, Animated, useWindowDimensions  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getData } from "../src/utils/localStorage";
import { getOrder } from "../src/actions/AuthAction";

const Orders = () => {
  const navigation = useNavigation();
  const [data, setData] = useState(null); // Data yang akan dimuat
  const [loading, setLoading] = useState(true); // Status loading
  const [scrollY] = useState(new Animated.Value(0));
  const window = useWindowDimensions();
  const scrollContentHeight = 1000;

  const buttonStyle = {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: "transparent",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 0,

  };

  const buttonStyleTwo = {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#82a9f4', 
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 0,
  };

  const textStyle = {
    color: '#82a9f4',
  };
  const textStyleTwo = {
    color: 'black',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(orderData);
        setLoading(false);
      } catch (error) {
        console.error('Data Tidak Ditemukan', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateTotalHarga = (order) => {
    if (!order || !order.barang || order.barang.length === 0) {
      return 0;
    }

    return order.barang.reduce((total, item) => {
      const harga = parseFloat(item.harga);
      return isNaN(harga) ? total : total + harga;
    }, 0)
  };

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
    }, 1000); // Misalnya, panggil setiap 5 detik
  
    // Membersihkan interval saat komponen tidak lagi digunakan
    return () => clearInterval(interval);
  }, []);
  const handleActiveButtonPress = () => {
    setShowBox(true);
    setActiveButton(true);
    setActiveButtonStyle(buttonStyleTwo);
  };

  const handleCompletedButtonPress = () => {
    setShowBox(false);
    setActiveButton(false);
    setActiveButtonStyle(buttonStyleTwo);
  };

  const [showBox, setShowBox] = useState(false);
  const [activeButton, setActiveButton] = useState(true);
  useEffect(() => {
    handleActiveButtonPress();
  }, []);
  const [activeButtonStyle, setActiveButtonStyle] = useState(buttonStyle);
  
  return (
    <>
      <Box py={"4"} bg="#82a9f4">
        <Animated.View  style={{
          height: scrollY.interpolate({
            inputRange: [scrollContentHeight - window.height, scrollContentHeight], // Sesuaikan dengan rentang yang diinginkan
            outputRange: [200, 0], // Sesuaikan dengan tinggi header yang diinginkan
            extrapolate: 'clamp',
          }),
        }} >
        <Box mb={10}>
        <Header scrollY={scrollY} withBack="true" title={"Orders"} />
        </Box>
        </Animated.View>
      </Box>
      <Box py={"5"} bg="#f6f6f6" w={"full"} borderRadius={"40"} top={"-40"} pt={"5"} pl={"10"} pr={"10"} pb={"5"}>
        <Box alignItems="flex-start" mt={5} ml={8}>
        <Button
          style={activeButton ? activeButtonStyle : buttonStyle}
          onPress={handleActiveButtonPress} 
        >
           <Text style={activeButton ? textStyle : textStyleTwo}>Active</Text>
        </Button>
        </Box>
        <Box alignItems="flex-end" top={-45} mr={8}>
        <Button
          style={!activeButton ? activeButtonStyle : buttonStyle}
          onPress={handleCompletedButtonPress}
        >
          <Text style={!activeButton ? textStyle : textStyleTwo}>Completed</Text>
        </Button>
        </Box>
        {showBox && (
      <Box>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} >
            {orderData
              .filter((orderItem) => orderItem.status === 0)
              .map((orderItem, orderIndex) => {
                // Render for Active orders
                switch (orderItem.service) {
                  case 'Wash & Iron':
                    serviceImage = require('../assets/washIron.png');
                    break;
                  case 'Wash':
                    serviceImage = require('../assets/wash.png');
                    break;
                  case 'Ironing':
                    serviceImage = require('../assets/iron.png');
                    break;
                  default:
                    serviceImage = '';
                    break;
                }
                return (
                  <Box key={orderIndex} p={"3"} bgColor="white" borderRadius={"10"} shadow="2" marginBottom={5}>
                    <HStack>
                      <Image 
                        source={serviceImage}
                        alt="Alternate Text"
                        size={"79"}
                        mr={"1"}
                      />
                      <Heading p={"3"} fontSize={"20"} lineHeight={"25"}>
                        Order #{orderItem.orderNumber}{"\n"}
                        <Text fontSize={"15"} fontWeight={"500"}>{orderItem.date}{"\n"}</Text>
                        <Text fontSize={"15"} fontWeight={"500"}>Rp {orderItem.total}</Text>
                      </Heading>             
                    </HStack>
                    <Button onPress={() => navigation.navigate('DetailOrder', { 
                      orderService: orderItem.service, 
                      orderTotal: orderItem.total, 
                      orderProducts: orderItem.products,
                      orderNumber: orderItem.orderNumber,
                      orderStatus: orderItem.status,
                      orderId: orderItem.orderId
                    })} style={{ backgroundColor: "#82a9f4" }}>Order Details</Button>
                  </Box>
                );
              })}
          </ScrollView>
        )}
      </Box>
    )}
    {!showBox && (
      <Box>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {orderData
              .filter((orderItem) => orderItem.status === 1)
              .map((orderItem, orderIndex) => {
                let serviceImage = '';

                switch (orderItem.service) {
                  case 'Wash & Iron':
                    serviceImage = require('../assets/washIron.png');
                    break;
                  case 'Wash':
                    serviceImage = require('../assets/wash.png');
                    break;
                  case 'Ironing':
                    serviceImage = require('../assets/iron.png');
                    break;
                  default:
                    serviceImage = '';
                    break;
                }
                return (
                  <Box key={orderIndex} p={"3"} bgColor="white" borderRadius={"10"} shadow="2" marginBottom={5}>
                    <HStack>
                      <Image 
                        source={serviceImage}
                        alt="Alternate Text"
                        size={"79"}
                        mr={"1"}
                      />
                      <Heading p={"3"} fontSize={"20"} lineHeight={"25"}>
                        Order #{orderItem.orderNumber}{"\n"}
                        <Text fontSize={"15"} fontWeight={"500"}>{orderItem.date}{"\n"}</Text>
                        <Text fontSize={"15"} fontWeight={"500"}>Rp {orderItem.total}</Text>
                      </Heading>             
                    </HStack>
                    <Button onPress={() => navigation.navigate('DetailOrder', { 
                      orderService: orderItem.service, 
                      orderTotal: orderItem.total, 
                      orderProducts: orderItem.products,
                      orderNumber: orderItem.orderNumber,
                      orderStatus: orderItem.status,
                      orderId: orderItem.orderId
                    })} style={{ backgroundColor: "#82a9f4" }}>Order Details</Button>
                  </Box>
                );
              })}
          </ScrollView>
        )}
      </Box>
    )}
      </Box>
    </>
  );
};

export default Orders;
