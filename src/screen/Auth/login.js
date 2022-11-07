import React, { useState } from 'react'
import { Text, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform,StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input } from '../../components';
import { CONSTANTS, ROUTES, validations } from '../../constants';
import { Colors, metrics } from '../../theme';

export function login({ navigation }) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.authReducer);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (loginData) => {
        dispatch({ type: CONSTANTS.SIGNIN_REQUESTED, payload: loginData });
    }

    const allFieldsIsCorrect = (fields) => {
        return fields.every((filed) => filed);
    };

    const fieldsCorrect = allFieldsIsCorrect([
        validations.email(email),
        validations.noEmpty(password)
    ]);

    return (
        <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.welcome}>Welcome back!</Text>
                <Text style={styles.welcomeDesc}>Log in to your existant account</Text>
                <Input
                    placeholder="Enter email ID"
                    icon={'envelope'}
                    message="Please enter a valid email address."
                    keyboardType={'email-address'}
                    autoCapitalize={'none'}
                    onChangeText={(email) => setEmail(email)}
                    value={email}
                    valid={validations.email(email)}
                />
                <Input
                    placeholder="Password"
                    icon={'lock'}
                    message="Please enter valid password."
                    onChangeText={(password) => setPassword(password)}
                    secure={true}
                    value={password}
                    valid={validations.noEmpty(password)}
                    maxLength={30}
                />

                <Button
                    onPress={() => onLogin({ email: email.toLowerCase(), password })}
                    text={'LOG IN'}
                    style={styles.btn}
                    loading={state.loading}
                    disabled={!fieldsCorrect}
                />
                <View style={styles.signUpView}>
                    <Text style={styles.signupText}>Don't have an account?</Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.signUpTextView}
                        onPress={() => {
                            navigation.navigate(ROUTES.SIGNUP);
                        }}>
                        <Text
                            style={[
                                styles.signupText,
                                { color: Colors.base },
                            ]}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.lightwhite,
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: metrics.baseMargin * 2
    },
    welcome: {
        fontSize: metrics.text.xxl,
        color: Colors.lightBlack,
        textAlign: 'center',
        marginBottom: metrics.baseMargin
    },
    welcomeDesc: {
        fontSize: metrics.text.medium,
        textAlign: 'center',
        marginBottom: metrics.doubleBaseMargin
    },
    forgotButton: {
        alignItems: 'flex-end',
    },
    forgotText: {
        textAlign: 'right',
        color: Colors.lightBlack,
    },
    btn:{
        marginTop:metrics.baseBtnHeight
    },
    signupText: {
        fontSize: metrics.text.medium,
        lineHeight: 16,
        textAlign: 'center',
        color: Colors.lightBlack,
        marginTop:10
    },
    signUpView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: metrics.baseMargin
    },
    signUpTextView: {
        marginLeft: metrics.baseMargin * 0.5
    },
})