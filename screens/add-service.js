import { Heading, Box, HStack, Image } from "native-base";
import { Header } from "../components";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AddService = () => {
  const navigation = useNavigation();

  return (
    <>
      <Header title={"Choose Service"} withBack="true" />
      <Box py={"4"} bg="#82a9f4" pb={300}>
        <Box py={"4"} mr={"10"} ml={"10"}>
          <TouchableOpacity activeOpacity={1.0} onPress={() => navigation.navigate('AddList')}>
            <Box w="full" bgColor="white" p={"5"} borderRadius={"10"} shadow="2" mt={"10"}>
              <HStack>
                <Image 
                  source={require('../assets/washIron.png')}
                  alt="Alternate Text"
                  size={"74"}
                />
                <Heading p={"6"} fontWeight={"500"}>
                  Wash & Iron
                </Heading>
              </HStack>
            </Box>
            <Box w="full" bgColor="white" p={"5"} borderRadius={"10"} shadow="2" mt={"7"}>
            <HStack>
              <Image 
                source={require('../assets/iron.png')}
                alt="Alternate Text"
                size={"60"}
                ml={"3"}
              />
              <Heading p={"6"} fontWeight={"500"}>
                Ironing
              </Heading>
            </HStack>
            </Box>
            <Box w="full" bgColor="white" p={"5"} borderRadius={"10"} shadow="2" mt={"7"}>
              <HStack>
                <Image 
                  source={require('../assets/shoes.png')}
                  alt="Alternate Text"
                  size={"60"}
                  ml={"3"}
                  mt={"2"}
                />
                <Heading p={"6"} fontWeight={"500"}>
                  Shoe Cleaning
                </Heading>
              </HStack>
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>
    </>
  );
};

export default AddService;
