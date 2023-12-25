import React, {useState} from "react";
import {Text, TouchableOpacity} from "react-native";
import { KeyboardAvoidingView, View, HStack, Heading, FormControl, Input, VStack, Button, Box, Modal, ModalBackdrop, AlertText, Alert, ScrollView } from "native-base";
import { useNavigation } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { registerUser } from "../src/actions/AuthAction";


const Register =() => {
    const [username,setUsername] = useState ("");
    const [email,setEmail] = useState ("");
    const [telp,setTelp] = useState ("");
    const [alamat, setAlamat] = useState ("")
    const [password,setPassword] = useState("");

    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false);
    const onCloseModal = () => {
        setShowModal(false);
    };
    const toggleModal = () => {
        setShowModal(!showModal);
    };
    const [modalContent, setModalContent] = useState({
        title: "",
        message: "",
      });
      const onRegister = async () => {
        if (email && password.length >= 6) {
          const data = {
            email: email,
            username: username,
            alamat: alamat,
            telp: telp,
            status: "user",
          };
    
          try {
            await registerUser(data, password);
            setModalContent({
              title: "Registrasi Berhasil",
              message: "Registrasi berhasil! Anda dapat login sekarang.",
            });
            toggleModal();
          } catch (error) {
            if (error) {
              setModalContent({
                title: "Registrasi Gagal",
                message: "Format email salah atau telah digunakan. Silakan gunakan email lain.",
              });
              toggleModal();
            }
          }
        } else {
          setModalContent({
            title: "Data Tidak Lengkap",
            message: "Data yang dimasukkan tidak lengkap atau password harus minimal 6 karakter.",
          });
          toggleModal();
        }
      };

    const handleBack = () => {
        navigation.navigate("Landing");
    };

    const isPasswordValid = password.length >= 6;

    return (
        <View flex={1} bg={"#f7f6fd"} alignContent={"center"} px={10} pt={20}>
            <TouchableOpacity title="Back to Landing" onPress={handleBack}><Text marginBottom={50} marginTop={-30} ><Ionicons name="arrow-back-outline" size={32} color="#373248" /><Text/></Text></TouchableOpacity> 
            <ScrollView vertical={true} showsVerticalScrollIndicator={false}>        
            <Text style={{
                fontSize: 28,
                color:"#373248",
                fontWeight:"bold",
                textAlign:"center",
                paddingBottom:12,
            }}>
                Register
            </Text>

            <Text style={{
                textAlign:"center",
                fontSize:16,
            }}>
                  <Text>Silahkan Masukkan Data Diri Anda</Text>
            </Text>
            <VStack pt={8}>

                <FormControl>
                    <FormControl.Label>Username / Nama</FormControl.Label>
                        <Input
                        value={username}
                        onChangeText={(username) => setUsername(username)}
                        placeholder="Enter Your Username"/>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                        placeholder="Enter Your Email"
                        w={"full"}/>
                    <FormControl.Label>Password</FormControl.Label>
                        <Input
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                        placeholder="Enter Your Password"
                        type="password"/>
                        {password.length < 6 && (
                        <Text style={{ color: 'red' }}>
                            Password should be at least 6 characters long.
                        </Text>
                        )}

                    <FormControl.Label>No Telp</FormControl.Label>
                        <Input
                        value={telp}
                        onChangeText={(telp) => setTelp(telp)}
                        placeholder="Enter Your Phone Number"
                        keyboardType="phone-pad"
                        w={"full"}/>
                    <FormControl.Label>Alamat</FormControl.Label>
                        <Input
                        value={alamat}
                        onChangeText={(alamat) => setAlamat(alamat)}
                        placeholder="Enter Your Address"
                        w={"full"}/>
                </FormControl>
                <Box>
                    <Button  mt={6} bg={"#82a9f4"} title="Register" onPress={() => {onRegister();}}>Registrasi</Button>
                    <Text style={{
                        textAlign:"center",
                        fontWeight:"bold",
                        marginTop:40}}>
                        Atau login dengan 
                    </Text>
                    <Modal isOpen={showModal} onClose={onCloseModal}>
                        <Modal.Content>
                        <Modal.CloseButton />
                        <Modal.Header>{modalContent.title}</Modal.Header>
                        <Modal.Body>
                            <Text>{modalContent.message}</Text>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onPress={onCloseModal}>Tutup</Button>
                        </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                </Box>
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
            <TouchableOpacity onPress={() => navigation.navigate('Login') }style={{
                marginTop:20,
                marginRight:20
            }}>
                <Text style={{
                    textAlign:"center",
                    fontWeight:"bold",
                    marginTop:30
                }}>
                    Sudah member ? <Text style={{color:"#82A9F4"}}>Login Disini</Text>
                </Text>
            </TouchableOpacity>
            </VStack>
            </ScrollView>  
        </View>
    )
}

export default Register;