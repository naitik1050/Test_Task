import React, { useState } from 'react'
import { TouchableOpacity, Text, TextInput, View, StyleSheet } from 'react-native'
import { Colors, metrics } from '../theme';

export const Input = ({
    placeholder,
    message,
    keyboardType,
    autoCapitalize,
    autoFocus,
    numberOfLines,
    multilines,
    maxLength,
    onChangeText,
    value,
    valid,
    secure }) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [touched, setTouched] = useState(false)
    const [focused, setFocused] = useState(false)
    const [errorWasShown, setErrorWasShown] = useState(false)


    const shouldDisplayMessage = () => {
        if (!errorWasShown) {
            const showError = touched && !focused && value && !valid && message;
            showError && (setErrorWasShown(showError));
            return showError;
        } else {
            return !valid && value;
        }
    }

    const toggleFocus = () => {
        if (!touched) {
            setTouched(true);
        }
        setFocused(!focused);
    }


    const _renderMessage = () => {
        if (shouldDisplayMessage()) {
            return <Text style={styles.errorMessage}>{message}</Text>;
        }
    };

    const _renderToggleShowPasswordIcon = () => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setIsPasswordVisible(!isPasswordVisible)
                }}
            >
            </TouchableOpacity>
        );
    };

    const _renderInput = () => {
        const inputProps = {
            style: [styles.input, { color: Colors.black }],
            value,
            placeholder,
            placeholderTextColor: focused ? Colors.black : Colors.lightgrey,
            underlineColorAndroid: "transparent",
            secureTextEntry: (secure ? !isPasswordVisible : false),
            onFocus: toggleFocus,
            onBlur: toggleFocus,
            keyboardType: keyboardType || "default",
            maxLength: maxLength || null,
            autoCapitalize,
            autoFocus,
            numberOfLines,
            multilines
        };

        return (
            <TextInput
                onChangeText={(str) => onChangeText(str)}
                {...inputProps}
            />
        );

    };


    return (
        <View style={styles.wrapper}>
            <View style={[styles.container, { borderColor: focused ? Colors.lightBlue : Colors.transparent }]}>
                {_renderInput()}
                {secure && _renderToggleShowPasswordIcon()}
            </View>
            {_renderMessage()}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
    },
    input: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        fontSize: metrics.text.medium,
        paddingLeft: 15
    },
    container: {
        position: "relative",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.white,
        height: metrics.baseBtnHeight,
        alignSelf: "stretch",
        marginTop: metrics.baseMargin,
        borderWidth: 1,
        borderRadius: 10,
    },
    icon: {
        marginHorizontal: metrics.doubleBaseMargin,
    },
    errorMessage: {
        left: 5,
        fontSize: metrics.text.small,
        color: Colors.error,
        marginTop: 4,
        paddingRight: metrics.baseMargin * 2,
    }
})