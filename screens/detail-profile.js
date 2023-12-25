import React from 'react';
import { Heading, Box, HStack, Text, View, ScrollView, Button } from "native-base";
import { useNavigation, route } from "@react-navigation/native";
import { TouchableOpacity, FlatList, RefreshControl } from "react-native";
import { Header } from "../components"
import { editOrder } from '../src/actions/AuthAction';
import { useState } from 'react';
import { getData } from '../src/utils/localStorage';
import { MaterialCommunityIcons ,Feather } from '@expo/vector-icons';
import { Alert } from 'react-native';

const DetailOrder = ({ route }) => {
  const { orderService, orderTotal, orderProducts, orderNumber, orderStatus, orderId } = route.params;
  const [status, setStatus] = useState(orderStatus);

  const navigation = useNavigation();

  const handleButtonPress = () => {
    // Navigasi ke halaman ListImage sambil membawa order number dan evidence
    navigation.navigate('ListImage', {
      orderNumber: orderNumber,
      orderId: orderId,
      evidence: orderProducts.evidence
    });
  };

  const statusText = orderStatus === 0 ? <MaterialCommunityIcons name="timer-sand" size={35} color="#82a9f4" /> : <Feather name="check-circle" size={35} color="#82a9f4" />;

  const onEditOrder = async () => {
    try {
      const userData = await getData('user'); // Ambil data pengguna yang sudah login
      if (userData) {
        const updatedData = {
          status: 1, // Atur nilai status yang ingin diubah (dari 0 ke 1)
        };
        await editOrder(orderId, updatedData); // Panggil fungsi editOrder untuk mengubah status
        console.log('Order status updated successfully');
        Alert.alert('Success', 'Order data saved successfully');
        navigation.navigate("Orders")
      } else {
        console.log('User data not found');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };
  const buttonStyle = {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#82a9f4', 
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 0,
  };
  return (
    <>
    <Box py={"4"} bg="#82a9f4">
        <Header withBack="true" title={"Details about"} />
          <Box mt={-3} mb={-5}>
              <Text bold  color="white" textAlign="center" fontSize={"20"} >Order #{orderNumber}</Text> 
          </Box>
    </Box>
    <Box flex={1} bg="#82a9f4" p={10}>
        <Box p={"3"} bgColor="white" borderRadius={"10"} shadow="2" mt="5">
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 11 }}>
                <Text bold fontSize={"20"} lineHeight={"50"}>Order Details{"\n"}</Text>
                <Text bold fontSize={"20"} marginRight={2} lineHeight={"50"}>{statusText}</Text>
            </View>
            <HStack>
              <Heading fontSize={"20"} lineHeight={"25"} ml={3}>
                <Text style={{color:"#82a9f4"}}>{orderService}{"\n"}</Text>
              </Heading>
            </HStack>
            {orderProducts &&
              orderProducts.map((product, index) => (          
              <Box key={index} style={{ flexDirection: 'row', justifyContent: 'space-between',  marginLeft: 11,marginRight: 11 }}  bgColor="white">
                <Text bold >{product.name} x {product.quantity}</Text>
                <Text>Rp {product.price}</Text>
              </Box>
            ))}            
            <TouchableOpacity onPress={handleButtonPress} style={{marginTop: 25, marginBottom: 25,  marginLeft: 11, }}>
                <Text style={{color:"#82a9f4"}}>View Image</Text>
            </TouchableOpacity>
            <Box style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 50,  marginLeft: 11, marginRight: 11 }}>
            <Text bold fontSize={"20"}>Total</Text>
            <Text>Rp {orderTotal}</Text>
            </Box>
            <Box style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 11 }}>
            <Text bold fontSize={20}></Text>
            {status === 0 && (
              <Button  style={buttonStyle} onPress={onEditOrder}>
                <Text>Set Completed</Text>
              </Button>
            )}
            </Box>
        </Box>
    </Box>
    </>
  );
};

export default DetailOrder;
