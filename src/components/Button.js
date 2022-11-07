import React from 'react'
import { TouchableOpacity, Text, ActivityIndicator,StyleSheet } from 'react-native'
import { Colors, metrics } from '../theme'

export const Button = ({
    onPress,
    text,
    onlyText,
    style,
    textStyle,
    loading = false,
    disabled }) => {
    if (onlyText) {
        return (
            <TouchableOpacity
                style={[styles.onlyButton, style]}
                onPress={onPress}
                disabled={disabled}
            >
                <Text style={[styles.onlyText, textStyle]}>{text}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <TouchableOpacity
            style={[styles.button, style, disabled ? { opacity: .5 } : null]}
            onPress={onPress}
            disabled={disabled}
        >
            {loading ? (
                <ActivityIndicator color={Colors.white} size={metrics.indicatorSize} />
            ) : (
                <Text style={[styles.text, textStyle]}>{text}</Text>
            )}
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        height: metrics.baseBtnHeight,
        marginTop: metrics.doubleBaseMargin,
        borderRadius: metrics.baseBtnHeight,
    },
    text: {
        fontSize: metrics.text.medium,
        color: Colors.white,
    },
    onlyButton: {
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 1,
    },
    onlyText: {
        fontSize: metrics.text.medium,
    },
})