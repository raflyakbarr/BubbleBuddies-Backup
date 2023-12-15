import { Heading, Box, HStack, Text, View } from "native-base";
import { useNavigation, route } from "@react-navigation/native";
import { TouchableOpacity, FlatList, RefreshControl } from "react-native";
import { Header } from "../components"
import Orders from "./orders";

const DetailOrder = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();

  const handleButtonPress = () => {
    navigation.navigate('ListImage'); 
  };

  const calculateTotal = () => {
    const totalHarga = item.barang.reduce((total, item) => total + item.harga, 0);
    const totalBarang = item.barang.reduce((total, item) => {
      total[item.namaBarang] = (total[item.namaBarang] || 0) + 1;
      return total;
    }, {});

    return { totalHarga, totalBarang };
  };
  return (
    <>
    <Box py={"4"} bg="#82a9f4">
    <Header withBack="true" title={"Details about"} />
        <Box mt={-3} mb={-5}>
            <Text bold  color="white" textAlign="center" fontSize={"20"} >{item.orderan}</Text> 
        </Box>
    </Box>
    <Box flex={1} bg="#82a9f4" p={10}>
        <Box p={"3"} bgColor="white" borderRadius={"10"} shadow="2" mt="5" height={350}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 11 }}>
                <Text bold fontSize={"20"} lineHeight={"50"}>Order Details{"\n"}</Text>
            </View>
            <HStack>
              <Heading fontSize={"20"} lineHeight={"25"} ml={3}>
                <Text style={{color:"#82a9f4"}}>{item.jenisOrder}{"\n"}</Text>
              </Heading>
            </HStack>
            {Object.entries(calculateTotal().totalBarang).map(([namaBarang, jumlah]) => (
              <Box key={namaBarang} style={{ flexDirection: 'row', justifyContent: 'space-between',  marginLeft: 11,marginRight: 11 }}>
                <Text bold >{jumlah} x {namaBarang}:</Text>
                <Text>Rp {item.barang.find(item => item.namaBarang === namaBarang)?.harga}</Text>
              </Box>
            ))}
            <TouchableOpacity onPress={handleButtonPress} style={{marginTop: 25, marginBottom: 25,  marginLeft: 11, }}>
                <Text style={{color:"#82a9f4"}}>View Image</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 50,  marginLeft: 11, marginRight: 11 }}>
            <Text bold fontSize={"20"}>Total</Text>
            <Text>Rp {calculateTotal().totalHarga}</Text>
            </View>
        </Box>
    </Box>
    </>
  );
};

export default DetailOrder;
