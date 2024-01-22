import { gql, useQuery } from "@apollo/client";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Or any other icon library you prefer

const UserProfile = gql`
  query IsUserLogin($isUserLoginId: ID) {
    isUserLogin(id: $isUserLoginId) {
      _id
      name
      username
      avatar
      email
      password
      following {
        followingId
      }
      followers {
        followerId
      }
      posts {
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
  }
`;

export default function ProfileScreen() {
  // console.log(Authorized())

  // const { loading, error, data } = useQuery(UserProfile,{
  //   variables : {
  //     isUserLoginId :
  //   }
  // });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>a.t.o_bradley</Text>
        <Icon name="ellipsis-vertical" size={25} />
      </View>

      <View style={styles.profileInfo}>
        <Image
          style={styles.profileImage}
          source={{
            uri: "https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-6/344873692_718891926587895_2014352947666914133_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=wQ86uwAyPtEAX_14FBE&_nc_ht=scontent-atl3-2.xx&oh=00_AfDdQ9sbDVFjcKQb85rcmA92NW-YwXX4h1ULtTU0XP1bsw&oe=6538024C",
          }}
        />
        <View style={styles.profileNumbers}>
          <Text style={styles.postCount}>49 </Text>
          <Text style={styles.followers}>Posts</Text>
        </View>
        <View style={styles.profileNumbers}>
          <Text style={styles.postCount}>4,142 </Text>
          <Text style={styles.followers}>Followers</Text>
        </View>
        <View style={styles.profileNumbers}>
          <Text style={styles.postCount}>1,131 </Text>
          <Text style={styles.following}>Following</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        ATO Tech Information Technology Company I go by ATO. Full stack
        Developer & Studentpreneur Founded orramo.com 9/5/2021 Founded
        orralearn.com 24/05/2021
      </Text>

      <TouchableOpacity style={styles.contactButton}>
        <Text>Contact</Text>
      </TouchableOpacity>

      <View style={styles.highlights}>
        {/* Add highlight circles here, for simplicity I added just one */}
        <View style={styles.highlight}>
          <Image
            style={styles.highlightImage}
            source={{
              uri: "https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-6/344873692_718891926587895_2014352947666914133_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=wQ86uwAyPtEAX_14FBE&_nc_ht=scontent-atl3-2.xx&oh=00_AfDdQ9sbDVFjcKQb85rcmA92NW-YwXX4h1ULtTU0XP1bsw&oe=6538024C",
            }}
          />
          <Text>Icy</Text>
        </View>
        <View style={styles.highlight}>
          <Image
            style={styles.highlightImage}
            source={{
              uri: "https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-6/344873692_718891926587895_2014352947666914133_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=wQ86uwAyPtEAX_14FBE&_nc_ht=scontent-atl3-2.xx&oh=00_AfDdQ9sbDVFjcKQb85rcmA92NW-YwXX4h1ULtTU0XP1bsw&oe=6538024C",
            }}
          />
          <Text>Nice</Text>
        </View>
      </View>

      <View style={styles.posts}>
        <Image
          style={styles.postImage}
          source={{
            uri: "https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-6/344873692_718891926587895_2014352947666914133_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=wQ86uwAyPtEAX_14FBE&_nc_ht=scontent-atl3-2.xx&oh=00_AfDdQ9sbDVFjcKQb85rcmA92NW-YwXX4h1ULtTU0XP1bsw&oe=6538024C",
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 30,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: "#E0E0E0",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileInfo: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profileNumbers: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 26,
    marginVertical: 15,
  },
  postCount: {
    flex: 1,
    alignItems: "center",
  },
  followers: {
    flex: 1,
    alignItems: "center",
    fontWeight: "bold",
  },
  following: {
    flex: 1,
    alignItems: "center",
    fontWeight: "bold",
  },
  bio: {
    padding: 15,
    lineHeight: 20,
  },
  contactButton: {
    borderWidth: 0.5,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    margin: 15,
  },
  highlights: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: "#E0E0E0",
  },
  highlight: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 15,
  },
  highlightImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  posts: {
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  postImage: {
    width: "31%", // Approx. for 3 images per row with a little space in between
    aspectRatio: 1, // Square images
    marginBottom: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderTopWidth: 0.5,
    borderColor: "#E0E0E0",
  },
  footerProfileImage: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
  },
});
