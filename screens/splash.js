import { StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import IconLogo from '../assets/iconlogo'
import { getData } from '../src/utils'
import { Text, Spinner } from 'native-base'


export default class Splash extends Component {
    componentDidMount() {
        setTimeout(async() => {
            const userData = await getData("user");
            if (userData) {
                this.props.navigation.replace('Tabs');
            } else {
                this.props.navigation.navigate('Landing');
            }
        }, 3000)
    }

    render() {
        return (
            <View style={styles.pages}>
                <Text color="#82A9F4" fontSize={32} fontWeight={"bold"} pt={2}>
                     BubbleBuddies
                </Text>
                <Spinner color={"#82a9f4"} size="lg" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pages: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})