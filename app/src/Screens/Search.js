import React from "react";
import {
  View,
  ScrollView,
  StatusBar,
  Image,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.header}>
        <TextInput placeholder="Search" style={styles.searchInput} />
      </View>
      <ScrollView contentContainerStyle={styles.grid}>
        {/* Just using a sample image for demonstration */}
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <Image
              key={index}
              source={{
                uri: "https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-6/344873692_718891926587895_2014352947666914133_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=wQ86uwAyPtEAX_14FBE&_nc_ht=scontent-atl3-2.xx&oh=00_AfDdQ9sbDVFjcKQb85rcmA92NW-YwXX4h1ULtTU0XP1bsw&oe=6538024C",
              }}
              style={styles.gridItem}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#d3d3d3",
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#f1f1f1",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridItem: {
    width: "33.33%",
    height: 120,
  },
});