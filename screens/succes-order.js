import { Heading, Text, Box, HStack } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';

const SuccesOrder = () => {
  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView>
        <StatusBar barStyle="light" backgroundColor={'#82a9f4'} />
          <Box justifyContent="space-between" alignItems="center">
            <Box pt={'20'} pb={15} justifyContent="space-between" alignItems="center">
              <Ionicons name="md-checkmark-circle" size={80} color="#46D33A" />
              <Heading fontSize={30} fontWeight={"semibold"} >Thank You !</Heading>
              <Text fontSize={18} py={2} >Your Order is Confirmed</Text>
            </Box>
            <Box borderRadius={10} pr={20} bg={"white"} mt={10} w={313} > 
                <Box pl={5} py={5} >
                    <HStack>
                        <Ionicons name="ios-pricetag-outline" size={35} color="black"/>
                        <Box pl={5}>
                            <Heading pb={2} fontSize={'16'} fontWeight={"semibold"} >Order Number</Heading>
                            <Text  fontSize={'md'}>#122</Text>
                        </Box>
                    </HStack>
                </Box>
                <Box pl={5} pb={5} >
                    <HStack>
                        <MaterialIcons name="local-laundry-service" size={35} color="black" />
                        <Box pl={5}>
                            <Heading pb={2} fontSize={'16'} fontWeight={"semibold"}>Service</Heading>
                            <Text  fontSize={'md'}>Wash and Iron</Text>
                        </Box>
                    </HStack>
                </Box>
            </Box>
            <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
                <Box mt={50} h={38} w={313} borderRadius={10} bg="#82a9f4" justifyContent={"center"} alignItems={"center"} >
                    <Text color={"white"} fs={15} fontWeight={"semibold"}>Close</Text>
                </Box>
            </TouchableOpacity>
          </Box>
      </SafeAreaView>
    </>
  );
};

export default SuccesOrder;