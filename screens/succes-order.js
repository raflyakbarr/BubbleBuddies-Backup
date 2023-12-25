import { Heading, Text, Box, HStack, ScrollView } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { getOrder } from '../src/actions/AuthAction';

const SuccesOrder = () => {
  const navigation = useNavigation();
  const [latestOrder, setLatestOrder] = useState(null);

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const orders = await getOrder();
        if (orders.length > 0) {
          // Ambil pesanan terbaru dengan mengurutkan berdasarkan waktu atau orderID
          const latest = orders[orders.length - 1];
          setLatestOrder(latest);
        }
      } catch (error) {
        console.error('Error fetching latest order:', error);
      }
    };

    fetchLatestOrder();
  }, []);

  return (
    <>
      <SafeAreaView>
        <ScrollView>
        <StatusBar barStyle="light" backgroundColor={'#82a9f4'} />
          <Box justifyContent="space-between" alignItems="center">
            <Box pt={'20'} pb={15} justifyContent="space-between" alignItems="center">
              <Ionicons name="md-checkmark-circle" size={80} color="#46D33A" />
              <Heading fontSize={30} fontWeight={"bold"} >Thank You !</Heading>
              <Text fontSize={18} py={2} >Your Order is Confirmed</Text>
            </Box>
            {latestOrder && (
            <Box borderRadius={10} pr={20} bg={"white"} mt={10} w={313} shadow="7"> 
                <Box pl={5} py={5} >
                    <HStack>
                        <Ionicons name="ios-pricetag-outline" size={35} color="black"/>
                        <Box pl={5}>
                            <Heading pb={2} fontSize={'20'} fontWeight={"bold"} >Order Number</Heading>
                            <Text  fontSize={'md'}>#{latestOrder.orderNumber}</Text>
                        </Box>
                    </HStack>
                </Box>
                <Box pl={5} pb={5} >
                    <HStack>
                        <MaterialIcons name="local-laundry-service" size={35} color="black" />
                        <Box pl={5}>
                            <Heading pb={2} fontSize={'20'} fontWeight={"bold"}>Service</Heading>
                            <Text  fontSize={'md'}>{latestOrder.service}</Text>
                        </Box>
                    </HStack>
                </Box>
            </Box>
            )}
            <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
                <Box mt={70} h={38} w={313} borderRadius={10} bg="#82a9f4" justifyContent={"center"} alignItems={"center"} >
                    <Text color={"white"} fs={15} fontWeight={"semibold"}>Close</Text>
                </Box>         
            </TouchableOpacity>
          </Box>
          </ScrollView>          
      </SafeAreaView>
    </>
  );
};

export default SuccesOrder;