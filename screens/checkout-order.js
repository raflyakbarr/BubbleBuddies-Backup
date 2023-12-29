import { Heading, Box, Image, HStack, Text, Button, ScrollView, FlatList, Spinner } from "native-base";
import { Header } from "../components";
import { SafeAreaView, TouchableOpacity, View, Alert, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addOrder, getOrder, uploadImage } from "../src/actions/AuthAction";

const CheckoutOrder = ({ route }) => {
    const imageUri = route.params && route.params.photos;
    const navigation = useNavigation();
    const [orderData, setOrderData] = useState(null);
    const [uploading, setUploading] = useState(false);
    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('orderData');
                if (storedData !== null) {
                    const parsedData = JSON.parse(storedData);
                    setOrderData(parsedData);
                    // Filter produk dengan quantity lebih dari 0
                    const filteredProducts = parsedData.products.filter(product => product.quantity > 0);
                    setValidProducts(filteredProducts);
                    
                }
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
        };

        fetchOrderData();
    }, []);
    const calculateTotal = (products) => {
        let total = 0;
        if (products && products.length > 0) {
            products.forEach(product => {
                total += product.price * product.quantity;
            });
        }
        return total;
    };
    
    useEffect(() => {
        if (orderData) {
            const total = calculateTotal();
            setTotal(total);
        }
    }, [orderData]);

    const [total, setTotal] = useState(0);
    const [validProducts, setValidProducts] = useState([]);
    const onAddOrder = async () => {
        try {
            if (orderData) {
                // Filter produk dengan quantity lebih dari 0
                const validProducts = orderData.products.filter(product => product.quantity > 0);    
                if (validProducts.length === 0) {
                    Alert.alert('Error', 'No products to order');
                    return;
                }
                // Mendapatkan tanggal saat ini
                const currentDate = new Date();        
                // Menambahkan URL gambar ke dalam properti evidence pada orderData
                if (imageUri && Array.isArray(imageUri) && imageUri.length > 0) {
                    setUploading(true);
                    const uploadedImageUrls = await Promise.all(
                      imageUri.map(async (item, index) => {
                        try {
                          const imageUrl = await uploadImage(item.uri, `image_${index}`);
                          return imageUrl;                         
                        } catch (error) {
                          console.error('Error uploading image:', error);
                          return null;
                        }
                      })
                    );
            
                    orderData.evidence = uploadedImageUrls.filter(url => url !== null);
                    setUploading(false);
                  }
    
                // Simpan orderData yang diperbarui ke dalam AsyncStorage dengan key orderData
                await AsyncStorage.setItem('orderData', JSON.stringify(orderData));    
                // Mendefinisikan objek date dengan informasi hari, bulan, dan tahun
                const formattedDate = `${currentDate.getDate()} ${
                    currentDate.toLocaleString('default', { month: 'long' })
                } ${currentDate.getFullYear()}`;   
                // Menambahkan informasi tanggal, bulan, dan tahun ke dalam properti date
                orderData.date = formattedDate;   
                // Mengambil order sebelumnya dari Firebase
                const previousOrders = await getOrder();
                const orderNumber = previousOrders.length + 1;    
                // Menambahkan properti orderNumber dengan nomor urutan berikutnya
                orderData.orderNumber = orderNumber;
                orderData.status = 0;
                orderData.total = calculateTotal(validProducts); // Menggunakan calculateTotal untuk total produk yang valid   
                await addOrder({ ...orderData, products: validProducts });
                navigation.replace("SuccesOrder");
                console.log({ ...orderData, products: validProducts });
            } else {
                Alert.alert('Error', 'No order data found');
            }
        } catch (error) {
            console.error('Error adding order:', error);
            Alert.alert('Error', 'Failed to send order data to Firebase');
        }
    };


    const handleIncrement = (productIndex) => {
        setOrderData((prevOrderData) => {
            const updatedProducts = [...prevOrderData.products];
            updatedProducts[productIndex].quantity += 1;
            console.log("Updated Order Data after Increment:", { ...prevOrderData, products: updatedProducts });
            return { ...prevOrderData, products: updatedProducts };
        });
    };

    const handleDecrement = (productIndex) => {
        setOrderData((prevOrderData) => {
            const updatedProducts = [...prevOrderData.products];
            if (updatedProducts[productIndex].quantity > 0) {
                updatedProducts[productIndex].quantity -= 1;
            }
            console.log("Updated Order Data after Decrement:", { ...prevOrderData, products: updatedProducts });
            return { ...prevOrderData, products: updatedProducts };
        });
    };
    const renderItem = ({ item }) => (

                <View>
                    <Image alt="gambar" source={{ uri: item.uri }} style={{ width: 100, height: 100 }} />
                </View>

    );
    

    return (
        <>
            <SafeAreaView>
            {orderData && (
                <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
                    <Box bg={"#82a9f4"} flex={1}>
                        <Header title={"Order List"} withBack="true"/>
                        <Box py={"5"} bg="#f6f6f6" w={"full"} h={"full"} borderTopRadius={"40"}  pt={"5"} pl={"10"} pr={"10"} pb={"5"}>
                            <Box pb={7} >
                                <Heading pt={5} fontSize={16}>{orderData.service}</Heading>
                            </Box>
                            <Box>
                            {orderData.products.map((product, index) => (
                                <Box key={index} borderBottomColor={"black"} borderBottomWidth={0.5}>
                                    <HStack>
                                        <Image 
                                            source={{ uri: product.image }}
                                            alt="Alternate Text"
                                            size={"70"}
                                            mt={2}
                                        />
                                        <Box p={5}>
                                            <Text pb={2.5} fontWeight={"bold"} >{product.name}</Text>
                                            <Text>Rp {product.price}</Text>
                                        </Box>
                                        <Box>
                                        <Box>
                                            <HStack pt={5} pl={5}>
                                                <TouchableOpacity onPress={() => handleDecrement(index)}>
                                                    <Feather name="minus-circle" size={25} color="#82A9F4" />
                                                </TouchableOpacity>
                                                <Text fontSize={16} px={3} >{product.quantity}</Text>
                                                <TouchableOpacity onPress={() => handleIncrement(index)}>
                                                    <Feather name="plus-circle" size={25} color="#82A9F4" />
                                                </TouchableOpacity>
                                            </HStack>
                                        </Box>
                                        </Box>
                                    </HStack>
                                </Box>
                                 ))}
                                 
                                 <View style={{ flex: 1 }}>
                                    {imageUri && imageUri.length > 0 ? (
                                    <View style={{ flex: 1 }}>
                                        <FlatList
                                        data={imageUri}
                                        renderItem={renderItem}
                                        keyExtractor={(item, index) => index.toString()}
                                        horizontal={true} 
                                        contentContainerStyle={{ paddingVertical: 20 }}
                                        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                                        />
                                    </View>
                                    ) : (
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>No selected photo</Text>
                                    </View>
                                    )}
                                    </View>
                                    <Box>
                                        <Button bg="#82a9f4" onPress={() => {
                                            navigation.navigate('AddImage'); // Sending the product ID to the AddImage screen
                                        }}>
                                            Add photo
                                        </Button>
                                    </Box>
                                {uploading && <HStack marginTop={2} space={2} justifyContent="center">
                                <Spinner color="#82a9f4" accessibilityLabel="Loading posts" />
                                <Heading color="#82a9f4" fontSize="lg">
                                    Uploading
                                </Heading>
                                </HStack> }
                                <Box borderWidth={0.5} mt={10} p={5} borderRadius={15} borderColor={"black"}>
                                    <Text fontSize={16} fontWeight={"bold"} pb={3} style={{ flexDirection: 'row', justifyContent: 'space-between',  marginLeft: 11,marginRight: 11 }}>
                                        Detail Pembayaran
                                    </Text>
                                    {orderData && orderData.products && orderData.products.map((product, index) => (
                                    <HStack key={index} style={{ flexDirection: 'row', justifyContent: 'space-between',  marginLeft: 11, marginRight: 11 }}>
                                        <Text>{product.name} x {product.quantity}</Text>
                                        <Text>Rp {product.price * product.quantity}</Text>
                                    </HStack>
                                    ))}
                                    <HStack pt={3} style={{ flexDirection: 'row', justifyContent: 'space-between',  marginLeft: 11, marginRight: 11 }}>
                                    <Text fontSize={16} fontWeight={"bold"}>Total Pembayaran</Text>
                                    <Text>Rp {calculateTotal(validProducts)}</Text>
                                    </HStack>
                                </Box>
                                <TouchableOpacity onPress={onAddOrder}>
                                    <Box mt={50} h={38} borderRadius={10} bg="#82a9f4" justifyContent={"center"} alignItems={"center"} >
                                        <Text color={"white"} fs={15} fontWeight={"semibold"}>Order Now</Text>
                                    </Box>
                                </TouchableOpacity>
                            </Box>
                        </Box>
                    </Box>
                </ScrollView>
                )}
            </SafeAreaView>
        </>
    );
};

export default CheckoutOrder;
