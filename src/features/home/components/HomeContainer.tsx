/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading, Button, Box, TextInput, List } from "grommet";
import { RootState } from "app/store";
import SignIn from "features/auth/components/SignIn";
import ReactTwitchEmbedVideo from "react-twitch-embed-video";

import {
  authenticate,
  authenticateWithTwitch,
  signOut,
} from "features/auth/slice";
import { addStreamer, loadStreamers, loadEvents } from "../slice";

export default function HomeContainer() {
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const { streamers, events } = useSelector((state: RootState) => state.home);
  const [streamerId, setStreamerId] = useState("");
  const [selectedStreamer, setSelectedStreamer] = useState("");

  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(loadStreamers(user));
    }
  }, [dispatch, user]);

  const handleSelectStreamer = (streamerId: string, streamerName: string) => {
    setSelectedStreamer(streamerName);
    dispatch(loadEvents(streamerId));
  };

  const handleSignIn = () => {
    dispatch(authenticateWithTwitch());
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  const handleAddStreamer = () => {
    if (user) {
      dispatch(addStreamer(streamerId, user));
    }
  };

  return user ? (
    <Box gap="medium">
      <Box direction="row" align="center" justify="between" background="black">
        <Box margin="small">
          <Heading level="2">Welcome {user.name}</Heading>
        </Box>
        <Box margin="small">
          {" "}
          <Button
            label="Sign out from Twitch Account"
            onClick={handleSignOut}
          />
        </Box>
      </Box>
      <Box direction="row" align="center" justify="stretch">
        <Box margin="medium">
          <Box>
            <Box direction="row" align="center" gap="small">
              <Box>
                <TextInput
                  placeholder="Enter Streamer Id"
                  value={streamerId}
                  onChange={(event) => setStreamerId(event.target.value)}
                />
              </Box>
              <Box>
                <Button label="Add" onClick={handleAddStreamer} />
              </Box>
            </Box>
          </Box>
          <Box>
            <Box direction="row" align="center" gap="small">
              <Box>
                <Box>
                  <Heading level="4">Favourite Streamers</Heading>
                </Box>
                <Box overflow="auto">
                  <List
                    primaryKey="id"
                    secondaryKey="name"
                    data={streamers}
                    onClickItem={(event: any) =>
                      handleSelectStreamer(event.item.id, event.item.name)
                    }
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box direction="row" align="center" justify="start" gap="medium">
          <Box>
            <Box>
              <Heading level="4">Live Stream</Heading>
            </Box>
            <Box>
              {selectedStreamer && (
                <ReactTwitchEmbedVideo channel={selectedStreamer} />
              )}
            </Box>
          </Box>
          <Box>
            <Box>
              <Heading level="4">Events</Heading>
              <List primaryKey="type" secondaryKey="started_at" data={events} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  ) : (
    <SignIn handleSignIn={handleSignIn} />
  );
}
