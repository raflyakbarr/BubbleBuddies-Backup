import { useNavigation } from "@react-navigation/native";
import { Box, Button, HStack, Heading, Image, ScrollView, Text, Modal } from "native-base";
import React, { useState, useEffect } from "react";
import { Header } from "../components";
import DataOrder from "../DataOrder";
import { TouchableOpacity, ActivityIndicator, RefreshControl, Animated, useWindowDimensions  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";




const Orders = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState(null); // Data yang akan dimuat
  const [loading, setLoading] = useState(true); // Status loading
  
  const handleButtonPress = () => {
    navigation.navigate('DetailOrder'); 
  };

  const [scrollY] = useState(new Animated.Value(0));
  const window = useWindowDimensions();
  const scrollContentHeight = 1000;

  const buttonStyle = {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(DataOrder);
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

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); 
  };
  
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
          style={buttonStyle}>
            <Text style={textStyle}>Active</Text>
        </Button>
        </Box>
        <Box alignItems="flex-end" top={-30} mr={8}>
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Text>
              Completed
            </Text>
          </TouchableOpacity>
        </Box>
        {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        
        <ScrollView vertical={true}  
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={5}
        showsVerticalScrollIndicator={false} marginBottom={250}  refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        >
          {data && data.map((item) => (
            <Box key={item.id} p={"3"} bgColor="white" borderRadius={"10"} mt={"2"} mb={"2"} shadow={2}>
              <HStack>
                <Image 
                  source={{ uri: item.image }}
                  alt="Gambar"
                  size={"70"}
                  mr={"2"}
                />
                <Heading p={"3"} fontSize={20} lineHeight={"25"}>
                  {item.orderan} {"\n"}
                  <Text fontSize={"15"} fontWeight={"500"}>{item.tanggal}{"\n"}</Text>
                  <Text fontSize={"15"} fontWeight={"500"}>Rp {calculateTotalHarga(item)}</Text>
                </Heading>
              </HStack>
              <Button key={item.id} onPress={() => navigation.navigate('DetailOrder', { item })} style={{ backgroundColor: "#82a9f4" }}>Order Details</Button>
            </Box>
          ))}
        </ScrollView>
      )}
      </Box>
      <Modal isOpen={showModal} justifyContent="flex-end" bottom="0" size="full" onClose={() => setShowModal(false)}>
      <Modal.Content h={"full"} bg={"#f6f6f6"} py={30} borderTopRadius={40}>
        
        <Box alignItems="flex-start" mt={5} ml={83}>
          <TouchableOpacity
            onPress={() => {
            setShowModal(false);
            }}
           >
            <Text>
              Active
            </Text>
          </TouchableOpacity>
        </Box>
        <Box alignItems="flex-end" top={-30} mr={60}>
          <Button
          style={buttonStyle}>
            <Text style={textStyle}>Completed</Text>
        </Button>
        </Box>
          <Modal.Body px={41}>
          {DataOrder.map((item) => (
          <Box key={item.id} p={"3"} bgColor="white" borderRadius={"10"} mt={"2"} mb={"2"} shadow={2}>
            <HStack>
              <Image 
                source={{ uri: item.image }}
                alt="Gambar"
                size={"70"}
                mr={"2"}
              />
              <Heading p={"3"} fontSize={"20"} lineHeight={"25"}>
                {item.orderan} {"\n"}
                <Text fontSize={"15"} fontWeight={"500"}>{item.tanggal}{"\n"}</Text>
                <Text fontSize={"15"} fontWeight={"500"}>Rp </Text>
              </Heading>
            </HStack>
            <Button onPress={handleButtonPress} style={{backgroundColor: "#82a9f4"}}>Order Details</Button>
          </Box>
          ))}
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default Orders;
