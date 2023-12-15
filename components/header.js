import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { Box, HStack, Heading } from "native-base";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, withBack = false }) => {
  
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <StatusBar barStyle="light" bg={"#82a9f4"} />
      <Box bg={"#82a9f4"} p={"4"} h={"120"}>
        <HStack justifyContent="space-between" alignItems="center">
          <HStack alignItems="center">
            {!withBack ? (
              <>
              </>
            ) : (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.goBack()}
              >
                <Box mr={"3"}>
                  <Ionicons name="arrow-back-outline" size={32} color="white" />
                </Box>
              </TouchableOpacity>
            )}
          </HStack>
        </HStack>
        <Box justifyContent={"space-evenly"} alignItems={"center"}>
            <Heading color={"white"} p={"5"}>{title}</Heading>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default Header;
