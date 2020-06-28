import axios from "axios";
import { User } from "features/auth/types";
import { db } from "config/firebase";
import { CLIENT_ID } from "config/twitch";
import firebase from "firebase";

class TwitchService {
  async addStreamer(streamerId: string, user: User) {
    const AuthStr = "Bearer ".concat(user.accessToken);
    const {
      data,
    } = await axios.get(
      `https://api.twitch.tv/helix/users?login=${streamerId}`,
      { headers: { Authorization: AuthStr, "Client-ID": CLIENT_ID } }
    );

    if (data.data && data.data.length > 0) {
      const docRef = db.collection("users").doc(user.id);
      await docRef.set(
        {
          streamers: firebase.firestore.FieldValue.arrayUnion({
            id: data.data[0].id,
            name: data.data[0].display_name,
          }),
        },
        { merge: true }
      );
    }
  }

  async loadStreamers(user: User) {
    const docRef = db.collection("users").doc(user.id);
    const data = await (await docRef.get()).data();
    return data?.streamers;
  }

  async loadEvents(streamerId: string) {
    const docRef = db.collection("events").doc(streamerId);
    const data = await (await docRef.get()).data();

    return data?.events;
  }

  listenEvents(streamerId: string, callback: Function) {
    db.collection("events")
      .doc(streamerId)
      .onSnapshot((doc) => {
        const data = doc.data();
        callback(data?.events);
      });
  }
}

export default TwitchService;
