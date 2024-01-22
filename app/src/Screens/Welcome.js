import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hactivgram</Text>
      <View style={styles.profileContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://cdn4.iconfinder.com/data/icons/social-media-black-white-2/600/Instagram_glyph_svg-512.png",
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.loginButton}
      >
        <Text style={styles.loginText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.switchButton}></TouchableOpacity>
      <View style={styles.signUpContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signUpText}>Sign up.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 40,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loginButton: {
    width: 300,
    height: 50,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  loginText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  switchButton: {
    marginBottom: 40,
  },
  switchText: {
    fontSize: 16,
    color: "#0099FF",
  },
  signUpContainer: {
    flexDirection: "row",
  },
  signUpText: {
    color: "#0099FF",
  },
});

export default Welcome;
