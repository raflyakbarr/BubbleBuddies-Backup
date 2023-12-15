import { useState, useEffect } from "react";
import { Heading, Center, Text, Box, HStack, Button, ScrollView } from "native-base";
import { Header } from "../components";''
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native"
import {StatusBar} from "native-base";
import { getData } from "../src/utils/localStorage";

const DetailProfile = ({navigation}) => {
    const [profile, setProfile] = useState(null);
    const getUserData = () => {
        getData("user").then((res) => {
          const data = res;
          if (data) {
            console.log("isi data", data);
            setProfile(data);
          } else {
            // navigation.replace('Login');
          }
        });
    };
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
          getUserData();
        });
    
        return () => {
          unsubscribe();
        };
      }, [navigation]);
    
    return(

        <>
        <Header title={"Profile"} withBack="true" p={5}/>
        <Box mb={50} alignItems="center">
            <StatusBar backgroundColor={"white"} barStyle={"dark-content"} ></StatusBar>
        
            <Ionicons name="person-circle" size={90} alignSelf={"center"}  color="grey" ></Ionicons>
                <Box>
                    <Heading alignSelf="center" fontSize={20}> {profile?.username} </Heading>
                    <Heading alignSelf="center" fontWeight={300} fontSize={18}>{profile?.status}</Heading>
                </Box>
            <ScrollView>  
            <Box backgroundColor="#FFFFFF" height={16} width={300} borderRadius={12} alignSelf="center" mb={30} mt={5}>
                <Box>
                    <Text color={"black"} fontSize={17} ml={5} mt="1" bold="5">Username</Text>
                    <Text color={"black"} fontSize={16} ml={5} mt="0">{profile?.username}</Text>
                </Box>
           </Box>

           <Box backgroundColor="#FFFFFF" height={16} width={300} borderRadius={12} alignSelf="center" mb={30} mt={1}>
                <Box>
                    <Text color={"black"} fontSize={17} ml={5} mt="1" bold="5">Email</Text>
                    <Text color={"black"} fontSize={16} ml={5} mt="0">{profile?.email}</Text>
                </Box>
           </Box>

           <Box backgroundColor="#FFFFFF" height={16} width={300} borderRadius={12} alignSelf="center" mb={30} mt={1}>
                <Box>
                    <Text color={"black"} fontSize={17} ml={5} mt="1" bold="5">Phone Number</Text>
                    <Text color={"black"} fontSize={16} ml={5} mt="-0">{profile?.telp}</Text>
                </Box>
           </Box>

           <Box backgroundColor="#FFFFFF" height={16} width={300} borderRadius={12} alignSelf="center" mb={30} mt={1}>
                <Box>
                    <Text color={"black"} fontSize={17} ml={5} mt="1" bold="5">Address</Text>
                    <Text color={"black"} fontSize={16} ml={5} mt="0">{profile?.alamat}</Text>
                </Box>
           </Box>
           </ScrollView>  
        </Box>
        </>
    );
};

export default DetailProfile;