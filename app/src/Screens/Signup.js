import { gql, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";

const registeGql = gql`
  mutation Register($registerUser: RegisterUser) {
    register(registerUser: $registerUser) {
      _id
      username
      email
    }
  }
`;
const SignUp = ({ navigation }) => {
  const [register, { loading, error, data }] = useMutation(registeGql);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const handleChange = (value, input) => {
    setUserInput((userInput) => ({ ...userInput, [input]: value }));
  };

  useEffect(() => {
    if (data) {
      navigation.navigate("Login");
    }
  }, [data]);

  return (
    <>
      <View style={styles.container}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 30,
            paddingBottom: 10,
          }}
        >
          Register Form
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          autoCapitalize="none"
          placeholderTextColor="gray"
          onChangeText={(value) => handleChange(value, "name")}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          autoCapitalize="none"
          placeholderTextColor="gray"
          onChangeText={(value) => handleChange(value, "username")}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="gray"
          onChangeText={(value) => handleChange(value, "email")}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor="gray"
          onChangeText={(value) => handleChange(value, "password")}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            try {
              if (!loading) {
                await register({
                  variables: {
                    registerUser: {
                      name: userInput.name,
                      email: userInput.email,
                      avatar : '',
                      username: userInput.username,
                      password: userInput.password,
                    },
                  },
                });
              }
            } catch (err) {
              console.log(err);
            }
          }}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SignUp;

const screenSize = {
  height: Dimensions.get("window").height,
  width: Dimensions.get("window").width,
};

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: "#ffffff",
    margin: 10,
    padding: 8,
    color: "black",
    borderRadius: 14,
    fontSize: 18,
    fontWeight: "500",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "black",
  },
});
