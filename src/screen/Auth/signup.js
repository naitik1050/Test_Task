import React, { useState } from 'react'
import { Text, View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform,StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input } from '../../components';
import { CONSTANTS, ROUTES, validations } from '../../constants';
import { Colors, metrics } from '../../theme';

export function signup({ navigation }) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.authReducer);

    const [uname, setUname] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('')

    const onSignup = (signupData) => {
        dispatch({ type: CONSTANTS.SIGNUP_REQUESTED, payload: signupData });
    }

    const allFieldsIsCorrect = (fields) => {
        return fields.every((filed) => filed);
    };

    const fieldsCorrect = allFieldsIsCorrect([
        validations.noEmpty(uname),
        validations.email(email),
        validations.password(password),
        validations.cPassword(cpassword, password)
    ]);

    return (
        <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.getStart}>Let's Get Started!</Text>
                <Text style={styles.getStartDesc}>Create an account & get all features</Text>
                <Input
                    placeholder="Username"
                    icon={'user'}
                    message="Please enter a valid username."
                    autoCapitalize={'none'}
                    onChangeText={(uname) => setUname(uname)}
                    value={uname}
                    valid={validations.noEmpty(uname)}
                />
                <Input
                    placeholder="Email"
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
                    message="The password must be at least 8 characters and contain at least 1 uppercase character, 1 number and 1 special character."
                    onChangeText={(password) => setPassword(password)}
                    secure={true}
                    value={password}
                    valid={validations.password(password)}
                    maxLength={30}
                />
                <Input
                    placeholder="Confirm Password"
                    icon={'lock'}
                    message="Password and Confirm Password does not match."
                    onChangeText={(cpassword) => setCpassword(cpassword)}
                    secure={true}
                    value={cpassword}
                    valid={validations.cPassword(cpassword, password)}
                    maxLength={30}
                />
                <Button
                    onPress={() => onSignup({ email: email.toLowerCase(), password })}
                    text={'CREATE'}
                    loading={state.loading}
                    disabled={!fieldsCorrect}
                />
                <View style={styles.loginView}>
                    <Text style={styles.signupText}>Already have an account?</Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.loginTextView}
                        onPress={() => {
                            navigation.navigate(ROUTES.LOGIN)
                        }}>
                        <Text
                            style={[
                                styles.loginText,
                                { color: Colors.base},
                            ]}>
                            Login here
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
    getStart: {
        fontSize: metrics.text.xxl,
        color: Colors.lightBlack,
        textAlign: 'center',
        marginBottom: metrics.baseMargin
    },
    getStartDesc: {
        fontSize: metrics.text.medium,
        textAlign: 'center',
        marginBottom: metrics.doubleBaseMargin
    },
    loginText: {
        fontSize: metrics.text.small,
        lineHeight: 16,
        textAlign: 'center',
        color: Colors.lightBlack
    },
    loginView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: metrics.baseMargin
    },
    loginTextView: {
        marginLeft: metrics.baseMargin * 0.5
    },
})