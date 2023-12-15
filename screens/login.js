import React, {useState,useEffect} from "react";
import {Text, TouchableOpacity, Alert} from "react-native";
import { View, FormControl, Input, VStack, Modal, Button, ScrollView,} from "native-base";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from '@expo/vector-icons';
import { loginUser } from "../src/actions/AuthAction";


const Login =() => {
    const [email,setEmail] = useState ("");
    const [password,setPassword] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const tombolDaftar = () => {
        navigation.navigate("Register")
    }
    const navigation = useNavigation();
    const login = () => {
        if (!email || !password) {
              toggleModal();
            }
          loginUser(email, password)
            .then((user) => {
              navigation.replace("Tabs");
            })
            .catch((error) => {
              console.log("Error", error.message);
              toggleModal();
            });
      };
    const handleBack = () => {
        navigation.navigate('Landing'); 
    };
    const toggleModal = () => {
        setShowModal(!showModal);
    };
    const onCloseModal = () => {
        setShowModal(false);
    };
    
    return (
        <View flex={1} bg={"#f7f6fd"} alignContent={"center"} px={10} pt={20} avoidKeyboard={true}>
             <TouchableOpacity title="Back to Landing" onPress={handleBack}><Text marginBottom={50} marginTop={-30} ><Ionicons name="arrow-back-outline" size={32} color="#373248" /><Text/></Text></TouchableOpacity>           
            <Text style={{
                fontSize: 28,
                color:"#373248",
                fontWeight:"bold",
                textAlign:"center",
                paddingBottom:12,
            }}>
                Login
            </Text>

            <Text style={{
                textAlign:"center",
                fontSize:16,
            }}>
                <Text>Login ke aplikasi <Text style={{color:"#82A9F4"}}>BubbleBudies</Text></Text>
            </Text>
            <VStack pt={8}>
                <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input
                    label={"Login"}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Enter Your Email"/>
                </FormControl>
                <FormControl>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input
                    label="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    placeholder="Enter Your Password"
                    type="password"
                    w={"full"}
                    />
                </FormControl>
                <Button mt={6} bg={"#82a9f4"} type="text" title="Login" onPress={() => login()}>Login</Button>
                <Text style={{
                textAlign:"center",
                fontWeight:"bold",
                marginTop:40
            }}>
                Atau login dengan 
            </Text>
            <View style={{
                flexDirection:"row",
                marginHorizontal:"20",
                marginTop:40
            }}>
                <TouchableOpacity style={{
                    backgroundColor:"#ffffff",
                    flex:1,
                    paddingVertical:10,
                    borderRadius:9,
                    justifyContent:"center",
                    alignItems:"center",
                    marginRight:10,
                    elevation:2,
                }}>
                    <AntDesign name="google" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor:"#ffffff",
                    flex:1,
                    paddingVertical:10,
                    borderRadius:9,
                    justifyContent:"center",
                    alignItems:"center",
                    marginRight:10,
                    elevation:2,
                }}>
                    <FontAwesome5 name="facebook" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor:"#ffffff",
                    flex:1,
                    paddingVertical:10,
                    borderRadius:9,
                    justifyContent:"center",
                    alignItems:"center",
                    marginRight:10,
                    elevation:2,
                }}>
                    <AntDesign name="apple1" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={tombolDaftar} style={{
                marginTop:20,
                marginRight:20
            }}>
                <Text style={{
                    textAlign:"center",
                    fontWeight:"bold",
                    marginTop:30
                }}>
                    Belum member ? <Text style={{color:"#82A9F4"}}>Daftar Disini</Text>
                </Text>
            </TouchableOpacity>
            </VStack>
            <Modal isOpen={showModal} onClose={onCloseModal} avoidKeyboard>
            <Modal.Content>
              <Modal.CloseButton />
              <Modal.Header>Login Gagal</Modal.Header>
              <Modal.Body>
                <Text>Email atau Password yang anda masukan salah!</Text>
              </Modal.Body>
              <Modal.Footer>
                <Button onPress={toggleModal}>Close</Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </View>
    )
}

export default Login;