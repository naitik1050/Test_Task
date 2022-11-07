import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants/AppRoutes'
import { restaurentList, mapView } from '../screen';
import { Colors } from '../theme/colors';
import { login } from '../screen/Auth/login';
import { signup } from '../screen/Auth/signup';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { metrics } from '../theme';
import { CONSTANTS } from '../constants';

const Stack = createNativeStackNavigator();

const options = {
    headerStyle: { elevation: 0, backgroundColor: Colors.green },
    tabBarShowLabel: false,
    headerTitleAlign: 'center',
    headerTintColor: Colors.white,
}

const AppNavigation = () => {
    const state = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    const optionsBtn = {
        ...options,
        headerRight: () => (
            <TouchableOpacity activeOpacity={0.9} onPress={() => dispatch({ type: CONSTANTS.SIGNOUT_REQUESTED })}>
                <Image source={require('../assets/power-off.png')} resizeMode='center' style={styles.image} />
            </TouchableOpacity>
        ),
    }

    return (
        <Stack.Navigator>
            {!state?.authStatus ?
                <>
                    <Stack.Screen name={ROUTES.LOGIN} component={login} options={options} />
                    <Stack.Screen name={ROUTES.SIGNUP} component={signup} options={options} />
                </>
                :
                <>
                    <Stack.Screen name={ROUTES.RESTAURENT_LIST} component={restaurentList} options={optionsBtn} />
                    <Stack.Screen name={ROUTES.MAP_VIEW} component={mapView} options={options} />
                </>}
        </Stack.Navigator>
    );
};

export { AppNavigation };

const styles = StyleSheet.create({
    image: {
        width: metrics.images.small,
        height: metrics.images.small,
    }
})
