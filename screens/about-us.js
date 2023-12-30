import { Heading, Center, Text, Box, HStack, Button, ScrollView, Stack, VStack } from "native-base";
import { Header } from "../components";''
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native"
import {StatusBar} from "native-base";
import MapView, { PROVIDER_GOOGLE }  from "react-native-maps";

const AboutUs = ({}) => {
    const mapStyle = {
        width: '100%',
        height: '100%',
    };
    const ASPECT_RATIO = 400 / 600;
    const LATITUDE_DELTA = 0.02;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const INITIAL_POSITION = {
        latitude:-7.310478381225582,
        longitude:112.72866367573715,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    }
    
    return(
        <>
        <Header title ={"About Us"} withBack= "true">
            <Box mb={50} alignItems="center">
                <StatusBar backgroundColor={"white"} barStyle={"dark-content"} ></StatusBar>
            </Box>
        </Header>
        <Box flex={1}>
            <ScrollView >
                <Heading textAlign={"center"} fontSize={20} mr={"2"} mt="10"> BubbleBuddies</Heading>
                <Text alignItems= {"center"} mt={8} ml={8} fontWeight={300} fontSize={16} textAlign={"justify"} pr={8}>
                
                Selamat datang di BubbleBuddies Laundry, mitra cuci pakaian terpercaya Anda!
                Di BubbleBuddies, kami mengerti betapa berharganya waktu dan kenyamanan Anda. Sebagai layanan laundry yang berkomitmen untuk memberikan kualitas terbaik, kami hadir untuk menjawab kebutuhan cucian harian Anda dengan penuh perhatian dan profesionalisme. 
                Misi Kami
                Misi kami sederhana: memberikan layanan laundry berkualitas tinggi dengan fokus pada kepuasan pelanggan dan kemudahan. Kami percaya bahwa membersihkan pakaian Anda tidak hanya tentang mencuci kotoran, tetapi juga tentang merawat dan memperpanjang umur pakaian Anda.
                Mengapa Memilih BubbleBuddies?
                BubbleBuddies Laundry bukan sekadar layanan cuci pakaian biasa. Dengan fasilitas terkini dan tim profesional yang berdedikasi, kami menjamin pakaian Anda diperlakukan dengan cermat dan dikembalikan kepada Anda segar dan bersih.
                - Kenapa Kami?
                Pelayanan Cepat: Kami menghargai waktu Anda. Dengan layanan cepat dan efisien, kami memastikan pakaian Anda kembali dalam waktu singkat.
                Kualitas yang Diutamakan: Kami menggunakan teknologi dan produk terbaik untuk merawat pakaian Anda. Hasilnya? Pakaian yang bersih, harum, dan terawat.
                Kemudahan Pesan: Pemesanan bisa dilakukan dengan mudah melalui aplikasi kami. Anda cukup duduk santai, dan kami akan menjemput cucian Anda.
                Keamanan dan Kebersihan: Keamanan dan kebersihan adalah prioritas kami. Dengan protokol sanitasi yang ketat, Anda bisa merasa tenang menyerahkan cucian kepada kami.
                Bergabunglah dengan BubbleBuddies Laundry dan nikmati pengalaman mencuci pakaian yang menyenangkan dan tanpa ribet. Kami hadir untuk memudahkan hidup Anda dengan menjaga kebersihan pakaian Anda. Terima kasih telah memilih BubbleBuddies Laundry sebagai mitra setia Anda.
                </Text>
                <Box padding={2} width={"full"} height={600} >
                    <MapView style={mapStyle} provider={PROVIDER_GOOGLE} initialRegion={INITIAL_POSITION} />
                </Box>
            </ScrollView>
        </Box>

        </>
    )
}

export default AboutUs;