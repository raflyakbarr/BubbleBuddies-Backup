import { Heading, Center, Box, ScrollView, Image, HStack, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import {Ionicons } from "@expo/vector-icons/";
import { TouchableOpacity } from "react-native";
import { getData } from "../src/utils/localStorage";

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


  return (
    <>
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
                source={require('../assets/shoes.png')}
                alt="Alternate Text"
                size={"50"}
                my={"2"}
                mx={"2"}
              />
              <Heading p={"3"} fontSize={"18"} fontWeight={"500"}>
                Shoe{"\n"}Cleaning
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
          <Box p={"3"} bgColor="white" borderRadius={"10"} shadow="2">
            <HStack>
              <Image 
                source={require('../assets/washIron.png')}
                alt="Alternate Text"
                size={"79"}
                mr={"1"}
              />
              <Heading p={"3"} fontSize={"20"} lineHeight={"25"}>
                Wash & Iron{"\n"}
                <Text fontSize={"15"} fontWeight={"500"}>19 Oktober 2023{"\n"}</Text>
                <Text fontSize={"15"} fontWeight={"500"}>Rp 8.000</Text>
              </Heading>
            </HStack>
          </Box>
          <Box p={"3"} bgColor="white" mt={"18"} borderRadius={"10"} shadow="2">
            <HStack>
              <Image 
                source={require('../assets/iron.png')}
                alt="Alternate Text"
                size={"60"}
                m={"3"}
              />
              <Heading p={"3"} fontSize={"20"} lineHeight={"25"}>
                Ironing{"\n"}
                <Text fontSize={"15"} fontWeight={"500"}>18 Oktober 2023{"\n"}</Text>
                <Text fontSize={"15"} fontWeight={"500"}>Rp 23.000</Text>
              </Heading>
            </HStack>
          </Box>
          <Box p={"3"} bgColor="white" mt={"18"} borderRadius={"10"} shadow="2">
            <HStack>
              <Image 
                source={require('../assets/shoes.png')}
                alt="Alternate Text"
                size={"60"}
                m={"3"}
              />
              <Heading p={"3"} fontSize={"20"} lineHeight={"25"}>
                Shoe Clean{"\n"}
                <Text fontSize={"15"} fontWeight={"500"}>16 Oktober 2023{"\n"}</Text>
                <Text fontSize={"15"} fontWeight={"500"}>Rp 30.000</Text>
              </Heading>
            </HStack>
          </Box>
          <Box p={"3"} bgColor="white" mt={"18"} borderRadius={"10"} shadow="2">
            <HStack>
              <Image 
                source={require('../assets/washIron.png')}
                alt="Alternate Text"
                size={"79"}
                mr={"1"}
              />
              <Heading p={"3"} fontSize={"20"} lineHeight={"25"}>
                Wash & Iron{"\n"}
                <Text fontSize={"15"} fontWeight={"500"}>15 Oktober 2023{"\n"}</Text>
                <Text fontSize={"15"} fontWeight={"500"}>Rp 10.000</Text>
              </Heading>
            </HStack>
          </Box>
          <Box p={"3"} bgColor="white" mt={"18"} borderRadius={"10"} shadow="2">
            <HStack>
              <Image 
                source={require('../assets/shoes.png')}
                alt="Alternate Text"
                size={"60"}
                m={"3"}
              />
              <Heading p={"3"} fontSize={"20"} lineHeight={"25"}>
                Shoe Clean{"\n"}
                <Text fontSize={"15"} fontWeight={"500"}>14 Oktober 2023{"\n"}</Text>
                <Text fontSize={"15"} fontWeight={"500"}>Rp 30.000</Text>
              </Heading>
            </HStack>
          </Box>
          <Box p={"3"} bgColor="white" mt={"18"} borderRadius={"10"} shadow="2">
            <HStack>
              <Image 
                source={require('../assets/washIron.png')}
                alt="Alternate Text"
                size={"79"}
                mr={"1"}
              />
              <Heading p={"3"} fontSize={"20"} lineHeight={"25"}>
                Wash & Iron{"\n"}
                <Text fontSize={"15"} fontWeight={"500"}>12 Oktober 2023{"\n"}</Text>
                <Text fontSize={"15"} fontWeight={"500"}>Rp 14.000</Text>
              </Heading>
            </HStack>
          </Box>
        </ScrollView>
      </Box>
    </>
  );
};

export default Home;
