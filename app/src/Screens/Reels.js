import React from "react";
import { SafeAreaView,View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Icon } from "react-native-elements";

const Reels = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Video Background */}
      <View style={styles.videoBackground}>
        <Image
          source={{
            uri: "https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-6/344873692_718891926587895_2014352947666914133_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=wQ86uwAyPtEAX_14FBE&_nc_ht=scontent-atl3-2.xx&oh=00_AfDdQ9sbDVFjcKQb85rcmA92NW-YwXX4h1ULtTU0XP1bsw&oe=6538024C",
          }}
          width={500}
          height={1100}
        />
      </View>

      {/* Overlay UI */}
      <View style={styles.overlayUI}>
        {/* User and Follow */}
        <View style={styles.userContainer}></View>

        {/* Description and Music */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Hello This is my first reel on the platform
          </Text>
          <Text style={styles.music}>♫ Music Title</Text>
        </View>

        {/* Social Interactions */}
        <View style={styles.socialContainer}>
          <View style={styles.socialIcon}>
            <Icon name="heart" type="ionicon" size={30} color="red" />
            <Text style={{ color: "white" }}>123k</Text>
          </View>
          <View style={styles.socialIcon}>
            <Icon
              name="chatbubble-outline"
              type="ionicon"
              size={30}
              color="white"
            />
            <Text style={{ color: "white" }}>456</Text>
          </View>
          <View style={styles.socialIcon}>
            <Icon
              name="paper-plane-outline"
              type="ionicon"
              size={30}
              color="white"
            />
            <Text style={{ color: "white" }}>789</Text>
          </View>
          <Image
            style={styles.musicDisk}
            source={{
              uri: "https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-6/344873692_718891926587895_2014352947666914133_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=wQ86uwAyPtEAX_14FBE&_nc_ht=scontent-atl3-2.xx&oh=00_AfDdQ9sbDVFjcKQb85rcmA92NW-YwXX4h1ULtTU0XP1bsw&oe=6538024C",
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayUI: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  userContainer: {
    alignSelf: "flex-start",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  username: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 5,
  },
  followButton: {
    backgroundColor: "#ff0055",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  followButtonText: {
    color: "white",
  },
  descriptionContainer: {
    alignSelf: "flex-start",
  },
  description: {
    color: "white",
    marginBottom: 5,
  },
  music: {
    color: "white",
  },
  socialContainer: {
    position: "absolute",
    right: 20,
    top: "60%",
  },
  socialIcon: {
    alignItems: "center",
    marginBottom: 15,
  },
  musicDisk: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default Reels;