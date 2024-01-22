import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../Screens/Welcome";
import Login from "../Screens/Login";
import SignUp from "../Screens/Signup";
import ProfileScreen from "../Screens/Profile";
import BottomTabs from "../Screens/Navigation/BottomTabs";
import { getAccessToken } from "../SecureStore/secure-Store";
import { AuthContext } from "../Authentication/auth";
import { useEffect, useContext } from "react";

const Stack = createNativeStackNavigator();

export default function Stacking() {
  const auth = useContext(AuthContext);
  

  useEffect(() => {
    getAccessToken("access_token").then((res) => {
      if (res) {
        // console.log(auth.isLogin , "<<<<< islogin")
        console.log(res, "<<< ini res")
        auth.setIsLogin(true);
      }
    })
  }, []);


  return (
    <Stack.Navigator>
      {auth.isLogin ? (
        <>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={BottomTabs}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: "Profile" }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Login" }}
          />

          <Stack.Screen
            name="Signup"
            component={SignUp}
            options={{ title: "Signup" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
