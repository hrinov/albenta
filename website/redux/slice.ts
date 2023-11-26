import { createSlice } from "@reduxjs/toolkit";

export interface RootStateInterface {
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    name: string | null;
    email: string | null;
  };
}

const initialState: RootStateInterface = {
  accessToken: null,
  refreshToken: null,
  user: {
    name: null,
    email: null,
  },
};

const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    updateTokens: (
      state,
      action: {
        payload: {
          accessToken: string;
          refreshToken: string;
        };
      }
    ) => {
      state.accessToken = action.payload?.accessToken;
      state.refreshToken = action.payload?.refreshToken;
    },

    updateUser: (
      state,
      action: {
        payload: {
          name: string;
          email: string;
        };
      }
    ) => {
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
      };
    },

    clearStates: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = {
        email: null,
        name: null,
      };
    },
  },
});

const { actions, reducer } = slice;
export default reducer;
export const { updateTokens, updateUser, clearStates } = actions;
