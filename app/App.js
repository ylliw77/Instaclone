import { StyleSheet, Text, View } from "react-native";
import { ApolloProvider } from "@apollo/client";

import { NavigationContainer } from "@react-navigation/native";

import Stacking from "./src/Stacks/stack";
import client from "./config/apollo";
import AuthProvider from "./src/Authentication/auth";

export default function App() {
  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <AuthProvider>
          <Stacking />
        </AuthProvider>
      </ApolloProvider>
    </NavigationContainer>
  );
}
