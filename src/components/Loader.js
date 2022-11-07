import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { Colors } from '../theme'

export const Loader = ({
    status
}) => {
    return (
        <View>
            {status ?
                <ActivityIndicator size={25} color={Colors.green} style={styles.spinner} /> : null}
        </View>
    )
}
const styles = StyleSheet.create({
    spinner: {
        backgroundColor: Colors.white,
        alignSelf: 'center',
        padding: 10,
        borderRadius: 100
    }
})

