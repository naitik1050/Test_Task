import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CONSTANTS } from '../constants/AppConst';
import { Colors } from '../theme/colors';
import { Rating } from 'react-native-ratings';
import { ROUTES } from '../constants/AppRoutes';
import { Loader } from '../components/Loader';
import { metrics } from '../theme';

export const restaurentList = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const response = useSelector(state => state.restaurentListReducer);

  useEffect(() => {
    dispatch({ type: CONSTANTS.RESTAURENT_GET_REQUEST })
  }, [])

  return (
    <Fragment>
      {response?.restaurentList.length > 0 ? response?.restaurentList?.map((item, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.imgView}>
            <Image
              source={{ uri: item?.images[0].url }}
              style={styles.img} />
          </View>
          <View style={styles.textWrap}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={styles.label}>
                  {item.title}
                </Text>
                <Rating
                  style={styles.rate}
                  readonly
                  startingValue={item.rating}
                  ratingCount={5}
                  imageSize={25} />
              </View>
              <TouchableOpacity
                style={styles.iconView}
                activeOpacity={0.9}
                onPress={() => navigation.navigate(ROUTES.MAP_VIEW, { item })}>
                <Image
                  source={require('../assets/map.png')}
                  resizeMode='center'
                  style={styles.mapIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )) :
        <View style={styles.container}>
          <Loader status={response?.loading} />
        </View>
      }
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  card: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: Colors.white,
    margin: 5,
    elevation: 2
  },
  imgView: {
    margin: 10,
    width: metrics.images.large,
    height: metrics.images.large,
  },
  img: {
    width: '100%',
    height: '100%'
  },
  label: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: 'bold'
  },
  rate: {
    marginTop: 10,
    alignSelf: 'flex-start'
  },
  textWrap: {
    flex: 1,
    margin: metrics.icons.tiny,
    justifyContent: 'center'
  },
  iconView: {
    justifyContent: 'center'
  },
  mapIcon: {
    width: metrics.icons.tiny,
    height: metrics.icons.tiny,
    backgroundColor: Colors.green,
    padding: metrics.icons.tiny,
    borderRadius: 2,
    marginRight: 5,
  }
})