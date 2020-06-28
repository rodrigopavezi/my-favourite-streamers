import { firebaseAuth, db } from "config/firebase";
import axios from "axios";
import { User } from "./types";

class AuthService {
  async _getUser(user: any) {
    const docRef = db.collection("users").doc(user.uid);
    const doc = await docRef.get();
    return {
      id: user.uid,
      name: user.displayName,
      photoURL: user.photoURL,
      accessToken: doc.data()?.accessToken,
    };
  }

  async signOut() {
    return firebaseAuth().signOut();
  }

  async authenticate() {
    const user = firebaseAuth().currentUser;
    console.log("currentUser", user);
    if (user) {
      return this._getUser(user);
    } else {
      return this.authenticateWithFirebase(null, null);
    }
  }

  authenticateWithTwitch() {
    return (window.location.href =
      "https://us-central1-my-favourite-streamers.cloudfunctions.net/redirect");
  }

  async authenticateWithFirebase(
    code: string | null,
    state: string | null
  ): Promise<User> {
    return new Promise(async (resolve, reject) => {
      firebaseAuth().onAuthStateChanged(async (user) => {
        console.log("user", user);
        if (user) {
          resolve(this._getUser(user));
        } else {
          // reject(new Error("No user is signed in"));
        }
      });

      try {
        if (code && state) {
          const response = await axios.get(
            `https://us-central1-my-favourite-streamers.cloudfunctions.net/token?code=${code}&state=${state}`,
            { withCredentials: true }
          );
          const twitchToken = response.data.token;
          if (twitchToken) {
            await firebaseAuth().signInWithCustomToken(twitchToken);
          }
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }
}

export default AuthService;
