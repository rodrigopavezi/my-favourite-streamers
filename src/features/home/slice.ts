import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppThunk, AppDispatch } from "app/store";
import TwitchService from "./twitch-service";
import { User } from "features/auth/types";

export interface HomeState {
  streamers: any[];
  events: any[];
}

const initialState: HomeState = {
  streamers: [],
  events: [],
};

const slice = createSlice({
  name: "home",
  initialState,
  reducers: {
    updateStreamers(state, action: PayloadAction<any[]>) {
      state.streamers = action.payload;
    },
    updateEvents(state, action: PayloadAction<any[]>) {
      state.events = action.payload;
    },
  },
});

export const addStreamer = (streamerId: string, user: User): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const twitchService = new TwitchService();
    await twitchService.addStreamer(streamerId, user);
    const streamers = await twitchService.loadStreamers(user);
    console.log("streamers", streamers);
    dispatch(slice.actions.updateStreamers(streamers));
  } catch (error) {
    console.log(error);
  }
};

export const loadStreamers = (user: User): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const twitchService = new TwitchService();
    const streamers = await twitchService.loadStreamers(user);
    dispatch(slice.actions.updateStreamers(streamers));
  } catch (error) {
    console.log(error);
  }
};

export const loadEvents = (streamerId: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const twitchService = new TwitchService();
    const events = await twitchService.loadEvents(streamerId);
    dispatch(slice.actions.updateEvents(events));
    twitchService.listenEvents(streamerId, (events: any) => {
      dispatch(slice.actions.updateEvents(events));
    });
  } catch (error) {
    console.log(error);
  }
};

export default slice.reducer;
