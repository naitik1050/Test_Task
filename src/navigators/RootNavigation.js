import * as React from "react";
import { StackActions } from "@react-navigation/native";

export const navigationRef = React.createRef();

function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

function push(...args) {
    navigationRef.current?.dispatch(StackActions.push(...args));
}

export const RootNavigation = {
    navigate,
    push
}