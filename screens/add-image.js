import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import { Box, HStack, Heading, ScrollView, View } from 'native-base';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components';

const AddImage = ({ navigation }) => {
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();
    }, []);

    const takePic = async () => {
        if (cameraRef.current) {
            let options = {
                quality: 1,
                base64: true,
                exif: false
            };
    
            const newPhoto = await cameraRef.current.takePictureAsync(options);
            
            setPhotos([...photos, newPhoto]); // Accumulate photos in the state
        }
    };
    const handleSelect = () => {
        navigation.navigate('CheckoutOrder', { photos }); // Kirim foto saja tanpa indeks produk terpilih
    };

    const renderPhotos = () => {
        return photos.map((photo, index) => (        
                <Box key={index} backgroundColor={"white"} >
                    <Image source={{ uri: photo.uri }} style={{ width: 100, height: 100 }} />
                </Box>
        ));
    };

    if (hasCameraPermission === null) {
        return <Text>Requesting permissions...</Text>;
    } else if (hasCameraPermission === false) {
        return <Text>Permission for camera not granted. Please change this in settings.</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            <Header withBack="true" title={"Add Image"}/>
            <Camera style={{ flex: 1  }} ref={cameraRef}>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <TouchableOpacity onPress={takePic}>
                        <Ionicons name="md-radio-button-on-outline" size={60} color="white" />
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal={true}>   
                {renderPhotos()}
                </ScrollView>   
             
            </Camera>

            {photos.length > 0 && ( // Show select button if there are photos
                <TouchableOpacity onPress={handleSelect}>
                    <Box p={2} alignItems="center">
                        <Text style={{ color: 'black' }}>Save</Text>
                    </Box>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default AddImage;