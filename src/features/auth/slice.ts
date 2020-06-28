import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppThunk, AppDispatch } from "app/store";
import { User } from "features/auth/types";
import AuthService from "./auth-service";

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

function startLoading(state: AuthState) {
  state.isLoading = true;
}

function loadingFailed(state: AuthState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticationStart: startLoading,
    authenticationFailure: loadingFailed,
    updateUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.isLoading = false;
    },
  },
});

export const signOut = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.authenticationStart);
  try {
    const authService = new AuthService();
    await authService.signOut();
    dispatch(slice.actions.updateUser(null));
  } catch (error) {
    dispatch(slice.actions.authenticationFailure(error.message));
  }
};

export const authenticate = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.authenticationStart);
  try {
    const authService = new AuthService();
    const user = await authService.authenticate();
    dispatch(slice.actions.updateUser(user ? user : null));
  } catch (error) {
    dispatch(slice.actions.authenticationFailure(error.message));
  }
};

export const authenticateWithTwitch = (): AppThunk => async (
  dispatch: AppDispatch
) => {
  dispatch(slice.actions.authenticationStart);
  try {
    const authService = new AuthService();
    await authService.authenticateWithTwitch();
  } catch (error) {
    dispatch(slice.actions.authenticationFailure(error.message));
  }
};

export const authenticateWithFirebase = (
  code: string | null,
  state: string | null
): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.authenticationStart);
  try {
    const authService = new AuthService();
    const user = await authService.authenticateWithFirebase(code, state);
    console.log("USER", user);
    await dispatch(slice.actions.updateUser(user));
    window.location.href = "/";
  } catch (error) {
    dispatch(slice.actions.authenticationFailure(error.message));
  }
};

export default slice.reducer;
