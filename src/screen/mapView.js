import { StyleSheet, Text, View, Image, PermissionsAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import MapView, { Marker, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import { Colors } from '../theme';
import { Rating } from 'react-native-ratings';

export const mapView = (props) => {

  const { route } = props;
  console.log("route==>", route);
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [destinationLongitude, setDestinationLongitude] = useState(route?.params?.item?.longitude);
  const [destinationLatitude, setDestinationLatitude] = useState(route?.params?.item?.latitude);

  const initialRegion = {
    latitude: 21.1702,
    longitude: 72.8311,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getGeoLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getGeoLocation();

          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch();
    };
  }, []);


  const getGeoLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
      },
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={initialRegion}>
        <MapViewDirections
          origin={{
            latitude: Number(currentLatitude),
            longitude: Number(currentLongitude)
          }}
          destination={{
            latitude: Number(destinationLatitude),
            longitude: Number(destinationLongitude)
          }}
          apikey={"AIzaSyCOuixostGUo7_7LX1Xz9JOEEszQ_X4s-A"}
        />
        <Marker
          coordinate={{
            latitude: Number(currentLatitude),
            longitude: Number(currentLongitude)
          }}
        />
        <Marker
          coordinate={{
            latitude: Number(destinationLatitude),
            longitude: Number(destinationLongitude)
          }}
          image={require('../assets/shop-pin.png')}
        >
          <>
            <Callout tooltip>
              <View style={styles.toolTipView}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles?.flexWrap}>
                    <View style={styles.imgView}>
                      <Text style={styles.imageView}>
                        <Image
                          source={{ uri: route?.params?.item?.images[0].url }}
                          resizeMode="cover"
                          style={styles.img} />
                      </Text>
                    </View>
                  </View>
                  <View style={{ flex: 0.6 }}>
                    <Text
                      style={styles.label}>
                      {route?.params?.item?.title}
                    </Text>
                    <Rating
                      style={styles.rate}
                      readonly
                      startingValue={route?.params?.item?.rating}
                      ratingCount={5}
                      imageSize={20} />
                  </View>
                </View>
              </View>
            </Callout>
          </>
        </Marker>
      </MapView>
    </View>
  )
}



const styles = StyleSheet.create({
  imgView: {
    margin: 5,
    width: 40,
    height: 40,
  },
  img: {
    width: 40,
    height: 40,
  },
  label: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: 'bold'
  },
  rate: {
    marginTop: 10,
    alignSelf: 'flex-start'
  },
  flexWrap: {
    flex: 0.4,
    justifyContent: 'center'
  },
  imageView: {
    position: "relative",
    bottom: 15,
    right: 10
  },
  toolTipView: {
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    borderRadius: 10
  }

})