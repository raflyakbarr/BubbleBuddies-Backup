import { Heading, Center, Text, Box, HStack, Button, Modal, Flex } from "native-base";
import { Header } from "../components";''
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "native-base";
import { useNavigation } from "@react-navigation/native";
import React,{ useState, useEffect } from 'react';
import FIREBASE from "../src/config/FIREBASE";
import { clearStorage,getData } from "../src/utils/localStorage";

const Profile = () => {
  const navigation = useNavigation();

  const [showModal, setShowModal] = useState(false);
  const handleLogOut = () => {
    setShowModal(true);
  };
  const [profile, setProfile] = useState(null);

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

  const onSubmit = (profile) => {
    if (profile) {
      FIREBASE.auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          clearStorage();
          navigation.replace("Landing");
        })
        .catch((error) => {
          // An error happened.
          alert(error);
        });
    } else {
      navigation.replace("Login");
    }
  };


  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUserData();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  
  return ( 
    <>
    <Header title={"Profile"} withBack={"true"} mt={-100}/>
      <SafeAreaView>
        <Box mb={50}>
         <StatusBar backgroundColor={"white"} barStyle={"dark-content"}></StatusBar>
          <HStack ml={10}>

          <Ionicons name="person-circle" size={90} color="grey"></Ionicons>
            <Box>
              <Heading alignItems={"center"} mt="8" marginTop={5} >{profile?.username}</Heading>
              <TouchableOpacity onPress={()=> navigation.navigate("DetailProfile")}>
                <Box backgroundColor="#82a9f4" height={7} width={120} borderRadius={10} mt={2}>
                  <Text color={"white"} fontSize={18} textAlign="center">Detail</Text>
                </Box>
              </TouchableOpacity>
            </Box>
          </HStack>

        <TouchableOpacity onPress={()=> navigation.navigate("AboutUs")}>
          <Box p={1} backgroundColor="#FFFFFF" height={16} width={300} borderRadius={12} alignSelf="center" mt={20}>
            <Ionicons size={33} color="#82a9f4" name="information-circle-outline">
              <Box>
                <Text color={"#82a9f4"} fontSize={25} fontWeight={"bold"} mt={2} ml={8}>About Us</Text>
              </Box>
            </Ionicons>
          </Box>
        </TouchableOpacity>

       <TouchableOpacity onPress={handleLogOut}>
           <Box p={1} backgroundColor="#FFFFFF" height={16} width={300} borderRadius={12} alignSelf="center" mt={5}>
             <Ionicons size={33} color="#82a9f4" name="log-out-outline">
                <Box>
                  <Text color={"#82a9f4"} fontSize={25} fontWeight={"bold"} mt={2} ml={8}>Logout</Text>
                </Box>
              </Ionicons>
          </Box>
        </TouchableOpacity>
        
      </Box>
      </SafeAreaView>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} motionPreset="slide">
            <Modal.Content maxWidth="400" maxH="400">
                <Modal.CloseButton />
                <Center>
                    <Ionicons name="alert-circle-outline" size={50} color="#82a9f4"></Ionicons>
                      <Modal.Body>
                        <Text fontWeight="bold" fontSize={17}>Are you sure want to logout?</Text>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button.Group space={6}>
                            <Button backgroundColor="#82a9f4" borderColor="#FFFFFF" colorScheme="white" rounded="15" pl={2} pr={2} height={10}
                                onPress={() => onSubmit(profile)}>                    
                                <Text fontWeight={"bold"} borderColor={"black"} pr={5} pl={5} rounded="20" variant="outline" color={"white"}>Yes</Text>
                            </Button>
                            <Button backgroundColor="#82a9f4" borderColor="#FFFFFF" colorScheme="white" rounded="15" pl={2} pr={2} height={10} 
                                onPress={() => setShowModal(false)}> 
                            <Text fontWeight={"bold"} borderColor={"black"} pr={5} pl={5} rounded="20" variant="outline" color={"white"}>No</Text>
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Center>
            </Modal.Content>
        </Modal>
    </>
  );
};


export default Profile;
