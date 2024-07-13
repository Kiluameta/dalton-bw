import { Alert, Linking, Platform } from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

export async function getPermissions() {
  const cameraPermission = await Camera.requestCameraPermissionsAsync();

  if (
    cameraPermission.granted == false ||
    cameraPermission.status == "denied"
  ) {
    return Alert.alert(
      "Deseja abrir as Configurações?",
      "Será preciso permitir, nas configurações do seu dispositivo, o acesso à Camera para continuar!",
      [
        { text: "Não", onPress: () => null, style: "destructive" },
        { text: "Sim", onPress: () => Linking.openSettings() },
      ]
    );
  }

  if (Platform.OS === "android") {
    const locationPermission =
      await Location.requestForegroundPermissionsAsync();

    if (
      locationPermission.status === "denied" ||
      locationPermission.granted === false
    ) {
      const backPermission = await Location.requestBackgroundPermissionsAsync();

      if (
        backPermission.status === "denied" ||
        backPermission.granted === false
      ) {
        return Alert.alert(
          "Deseja abrir as Configurações?",
          "Será preciso permitir, nas configurações do seu dispositivo, o acesso à Camera para continuar!",
          [
            { text: "Não", onPress: () => null, style: "destructive" },
            { text: "Sim", onPress: () => Linking.openSettings() },
          ]
        );
      }
    }
  } else {
    let permission = await Location.getForegroundPermissionsAsync();
    if (!permission.canAskAgain || permission.status === "denied") {
      return Alert.alert(
        "Deseja abrir as Configurações?",
        "Será preciso permitir, nas configurações do seu dispositivo, o acesso à localização para continuar!",
        [
          { text: "Não", onPress: () => null, style: "destructive" },
          { text: "Sim", onPress: () => Linking.openSettings() },
        ]
      );
    }

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return Alert.alert(
        "Deseja abrir as Configurações?",
        "Será preciso permitir, nas configurações do seu dispositivo, o acesso à localização para continuar!",
        [
          { text: "Não", onPress: () => null, style: "destructive" },
          { text: "Sim", onPress: () => Linking.openSettings() },
        ]
      );
    }
  }

  return true;
}
