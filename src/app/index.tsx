import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { Camera } from "expo-camera";

import { getPermissions } from "@/utils/permissions";

export default function Index() {
  const [facing, setFacing] = useState("back");
  const [permission, setPermission] = useState<boolean | void>();

  useEffect(() => {
    (async () => {
      const response = await getPermissions();
      console.log(response);

      setPermission(response);
    })();
  }, []);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="flex items-center justify-center">
        <Text className="text-white">
          We need your permission to show the camera
        </Text>
        <TouchableOpacity className="bg-white" onPress={requestPermission} />
      </View>
    );
  }

  return <View></View>;
}
