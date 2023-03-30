import { NavigationContainer } from "@react-navigation/native";
import { NativeWindStyleSheet } from "nativewind";
import { AuthProvider } from "./hooks/useAuth";
import StackNavigator from "./StackNavigator";
import * as WebBrowser from "expo-web-browser";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  WebBrowser.maybeCompleteAuthSession();

  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
