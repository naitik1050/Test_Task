import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

const baseMargin = 12;
const btnHeight = 50;
const headerHeight = 65;

export const metrics = {
    screenWidth: width < height ? width : height,
    screenHeight: width < height ? height : width,

    marginHorizontal: baseMargin,
    marginVertical: baseMargin,
    baseMargin,
    baseBtnHeight: btnHeight,
    baseOpacity: 0.87,
    baseLineHeight: baseMargin * 2,
    doubleBaseMargin: baseMargin * 2,
    tripleBaseMargin: baseMargin * 3,
    smallMargin: baseMargin / 2,
    buttonMargin: 20,

    headerNavHeight: headerHeight,
    headerPlatFormNavHeight:
        Platform.OS === "ios" ? headerHeight + 15 : headerHeight,

    tabBarHeight: 36,

    indicatorSize: 16,

    text: {
        tiny: 12,
        small: 14,
        medium: 16,
        large: 18,
        xl: 20,
        xxl: 36,
    },

    icons: {
        tiny: 15,
        small: 20,
        medium: 30,
        large: 45,
        xl: 50,
    },

    images: {
        small: 20,
        medium: 40,
        large: 60,
        logo: 200,
    },
};