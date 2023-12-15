import { useEffect, useRef, useState } from 'react';
import { Box } from 'native-base';
import { Text, Button, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import Header from '../components/header';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AddImage = () => {
    const navigation = useNavigation();
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState();

    useEffect(() => {
        (async () => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
        setHasCameraPermission(cameraPermission.status === "granted");
        setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
    }, []);

    if (hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted. Please change this in settings.</Text>
    }

    let takePic = async () => {
        let options = {
        quality: 1,
        base64: true,
        exif: false
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
    };

    if (photo) {
        let sharePic = () => {
        shareAsync(photo.uri).then(() => {
            setPhoto(undefined);
        });
        };

        let savePhoto = () => {
        MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
            setPhoto(undefined);
        });
        };

        return (
            <>
            <Box bg={"#82a9f4"} h={"full"}>
                <Header withBack="true" />
                    <Image 
                        style={{alignSelf: 'stretch', height: 500,}}
                        source={{ uri: "data:image/jpg;base64," + photo.base64 }} 
                    />
                <Button color={"white"} title="Share" onPress={sharePic} />
                    {hasMediaLibraryPermission ? 
                    <Button color={"white"} title="Save" onPress={savePhoto} /> : undefined}
                <Button color={"white"} title="Discard" onPress={() => setPhoto(undefined)} />
            </Box>
            </>
        );
    }

    return (
        <>
        <Box bg={"#82a9f4"}>
            <Header withBack="true" title={"Add Image"} />
            <Camera ref={cameraRef}>
                <Box h={500}></Box>
            </Camera>
            <Box bg={"#82a9f4"} h={"full"} justifyContent={"space-between"} alignItems={"center"} >
                <TouchableOpacity onPress={takePic}>
                    <Box pt={10} justifyContent={"space-between"} alignContent={"center"}>
                        <Ionicons name="md-radio-button-on-outline" size={60} color="white" />
                    </Box>
                </TouchableOpacity>
            </Box> 
        </Box>
        </>
    );
};

export default AddImage;
