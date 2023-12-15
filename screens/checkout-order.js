import { Heading, Box, Image, HStack, Text, Button } from "native-base";
import { Header } from "../components";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";

const Counter = () => {

    const [counter, setCounter] = useState(0);
    const handleButtonClick = (val) => {
        setCounter(counter + val);
    };

    return (
        <Box>
            <HStack pt={5} pl={5}>
                <TouchableOpacity onPress={() => handleButtonClick(-1)}>
                    <Feather name="minus-circle" size={25} color="#82A9F4" />
                </TouchableOpacity>
                <Text fontSize={16} px={3} >{counter}</Text>
                <TouchableOpacity onPress={() => handleButtonClick(+1)}>
                    <Feather name="plus-circle" size={25} color="#82A9F4" />
                </TouchableOpacity>
            </HStack>
        </Box>
    )
}

const CheckoutOrder = () => {
    const navigation = useNavigation();

    return (
    <>
        <Box bg={"#82a9f4"} flex={1}>
            <Header title={"Order List"} withBack="true"/>
            {/* <Box bg="#82a9f4"> */}
            <Box py={"5"} bg="#f6f6f6" w={"full"} h={"full"} borderTopRadius={"40"}  pt={"5"} pl={"10"} pr={"10"} pb={"5"}>
                <Box pb={7} >
                    <Heading pt={5} fontSize={16}>Wash & Iron</Heading>
                </Box>
                <Box>
                    <Box borderBottomColor={"black"} borderBottomWidth={0.5}>
                        <HStack>
                            <Image 
                                source={require('../assets/t-shirt.png')}
                                alt="Alternate Text"
                                size={"70"}
                                mt={2}
                            />
                            <Box p={5}>
                                <Text pb={2.5} fontWeight={"semibold"} >T-Shirt</Text>
                                <Text>Rp 2.500 / pcs</Text>
                            </Box>
                            <Box>
                                <Counter />
                                <TouchableOpacity onPress={() => navigation.navigate('AddImage')} >
                                    <Text pl={7} pt={2}>Add Image</Text>
                                </TouchableOpacity>
                            </Box>
                        </HStack>
                    </Box>
                    <Box borderBottomColor={"black"} borderBottomWidth={0.5}>
                        <HStack>
                            <Image 
                                source={require('../assets/blazer.png')}
                                alt="Alternate Text"
                                size={"70"}
                                mt={2}
                            />
                            <Box p={5}>
                                <Text pb={2.5} fontWeight={"semibold"} >Blazer</Text>
                                <Text>Rp 3.000 / pcs</Text>
                            </Box>
                            <Box>
                                <Counter />
                                <TouchableOpacity onPress={() => navigation.navigate('AddImage')} >
                                    <Text pl={7} pt={2}>Add Image</Text>
                                </TouchableOpacity>
                            </Box>
                        </HStack>
                    </Box>
                </Box>
                <TouchableOpacity onPress={() => navigation.navigate('AddService')}>
                    <Text p={3} color={"#82a9f4"}>Add more order ?</Text>
                </TouchableOpacity>
                <Box borderWidth={0.5} p={5} borderRadius={15} borderColor={"black"}>
                    <Text fontSize={16} fontWeight={"semibold"} pb={3}>Detail Pembayaran</Text>
                    <HStack>
                        <Text pr={140} >T-shirt x 2</Text>
                        <Text>Rp 5.000</Text>
                    </HStack>
                    <HStack>
                        <Text pr={145} >Blazer x 1</Text>
                        <Text>Rp 3.000</Text>
                    </HStack>
                    <HStack pt={3}>
                        <Text fontSize={16} fontWeight={"semibold"} pr={70}>Total Pembayaran</Text>
                        <Text>Rp 8.000</Text>
                    </HStack>
                </Box>
                <TouchableOpacity onPress={() => navigation.navigate('SuccesOrder')}>
                    <Box mt={50} h={38} borderRadius={10} bg="#82a9f4" justifyContent={"center"} alignItems={"center"} >
                        <Text color={"white"} fs={15} fontWeight={"semibold"}>Order Now</Text>
                    </Box>
                </TouchableOpacity>
            </Box>
      </Box>
    </>
  );
};

export default CheckoutOrder;