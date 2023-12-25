import { Heading, Box, HStack, Image } from "native-base";
import { Header } from "../components";
import { SafeAreaView, Touchable, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddService = () => {
  const navigation = useNavigation();
  const saveServiceOption = async (service) => {
    try {
      await AsyncStorage.setItem('selectedService', service);
      console.log(service)
      // Redirect to the next screen (AddList) here if needed
      navigation.navigate('AddList');
    } catch (error) {
      console.error('Error saving service option:', error);
    }
  };


  return (
    <>
      <SafeAreaView>
        <Box bg={"#82a9f4"}>
          <Header title={"Choose Service"} withBack="true" />
          <Box py={"4"} bg="#82a9f4" pb={300}>
            <Box py={"4"} mr={"10"} ml={"10"}>
              <TouchableOpacity activeOpacity={1.0} onPress={() => saveServiceOption('Wash & Iron')}>
                <Box w="full" bgColor="white" p={"5"} borderRadius={"10"} shadow="2">
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
              </TouchableOpacity>
              <TouchableOpacity onPress={() => saveServiceOption('Ironing')}>
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
              </TouchableOpacity>
              <TouchableOpacity onPress={() => saveServiceOption('Wash')}>
                <Box w="full" bgColor="white" p={"5"} borderRadius={"10"} shadow="2" mt={"7"}>
                  <HStack>
                    <Image 
                      source={require('../assets/wash.png')}
                      alt="Alternate Text"
                      size={"60"}
                      ml={"3"}
                      mt={"2"}
                    />
                    <Heading p={"6"} fontWeight={"500"}>
                      Wash
                    </Heading>
                  </HStack>
                </Box>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </SafeAreaView>
    </>
  );
};

export default AddService;
