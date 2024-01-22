import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Authentication/auth";

import { useMutation, gql } from "@apollo/client";

import { setToken } from "../SecureStore/secure-Store";

const gql_Login = gql`
  mutation Login($loginUser: LoginUser) {
    login(loginUser: $loginUser) {
      access_token
    }
  }
`;
const Login = ({ navigation }) => {
  const [loginUser, { loading, error, data }] = useMutation(gql_Login);
  // console.log(error, "<<< erorr dari pages >>>");
  const auth = useContext(AuthContext);
 
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  function handleChange(value, name) {
    setUserInput((userInput) => ({ ...userInput, [name]: value }));
  }

  useEffect(() => {
    console.log(data, "<<< ini dari login")
    if (data) {
      setToken("access_token", data.login.access_token).then(() => {
   
        auth.setIsLogin(true);
      });
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Hactivgram</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => handleChange(value, "email")}
        placeholder="example@mail.com"
      />
      <TextInput
        style={styles.input}
        onChangeText={(value) => handleChange(value, "password")}
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity
        onPress={async () => {
          console.log(userInput, "<<<<< user input");
          try {
            auth.setIsLogin(true)
            if (!loading) {
              await loginUser({
                variables: {
                  loginUser: {
                    email: "nutella@mail.com",
                    password: "secret",
                  },
                },
              });
            }
          } catch (err) {
            console.log(err, "<<<<ini error on press>>>>>>>");
          }
        }}
        style={styles.loginButton}
      >
        <Text style={styles.loginText}>Log in</Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <View style={styles.line}></View>
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line}></View>
      </View>
      <View style={styles.signUpContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signUpText}>Sign up.</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footer}>Instagram or Email</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loginButton: {
    height: 50,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 20,
  },
  loginText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  facebookButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  facebookText: {
    color: "#1877F2",
    fontSize: 16,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
  },
  orText: {
    width: 40,
    textAlign: "center",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  signUpText: {
    color: "#0099FF",
  },
  footer: {
    color: "gray",
    textAlign: "center",
  },
});

export default Login;
