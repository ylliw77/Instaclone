import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { gql, useQuery } from "@apollo/client";
import { getAccessToken } from "../SecureStore/secure-Store";
import { AuthContext } from "../Authentication/auth";

const GETALLPOST = gql`
  query Post {
    post {
      content
      _id
      tags
      imgUrl
      authorId
      comments {
        content
        username
      }
      likes {
        username
      }
    }
  }
`;

const Home = ({ navigation }) => {
  const { loading, error, data } = useQuery(GETALLPOST);
  console.log(data, " ini data<<<<<<");
// console.log(styles, "<<<<<<<<< ini styles")
  const renderPost = (item) => {
    console.log(item, " ini item");
    return (
      <>
  
        <View style={styles.post}>
          <View style={styles.postHeader}>
            <Image
              source={{
                uri: "https://assets.bandwagon.asia/system/tinymce/image/file/6380/content_mceu_31710599211661851757100.jpg",
              }}
              style={styles.userAvatar}
            />
            <Text>{item.content}</Text>
            <Ionicons name="ellipsis-vertical" size={24} color="black" />
          </View>
          <Image source={{ uri: item.imgUrl }} style={styles.postImage} />
          {/* <View style={styles.postFooter}>
            <View style={styles.interactionIcons}>
              <Ionicons
                name="heart-outline"
                size={24}
                color="black"
                style={styles.iconSpacing}
              />
              <Ionicons
                name="chatbubble-outline"
                size={24}
                color="black"
                style={styles.iconSpacing}
              />
              <Ionicons name="paper-plane-outline" size={24} color="black" />
            </View>
            <Text>Liked by craig_love and {item.likes} others</Text>
            <Text>
              {item.user} | {item.caption}
            </Text>
          </View> */}
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hactivgram</Text>
        <View style={styles.iconsTop}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
          >
            <Ionicons
              style={{ right: 10 }}
              name="heart-outline"
              size={28}
              color="black"
            />
          </TouchableOpacity>
          <AntDesign name="message1" size={24} color="black" />
        </View>
      </View>

      <FlatList
        data={data.post}
        keyExtractor={item => item._id}
        renderItem={({item}) => renderPost(item)}
        style={styles.postsList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },

  postsList: {
    flex: 1,
  },
  post: {
    marginBottom: 10,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postImage: {
    width: "100%",
    height: 300,
  },
  postFooter: {
    padding: 10,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  bottomAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  interactionIcons: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconSpacing: {
    marginRight: 10,
  },
  iconsTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default Home;
