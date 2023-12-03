import { createSlice } from "@reduxjs/toolkit";

export interface RootStateInterface {
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    name: string;
    email: string;
    balance: number;
  } | null;
}

const initialState: RootStateInterface = {
  accessToken: null,
  refreshToken: null,
  user: null,
};

const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    updateUser: (
      state,
      action: {
        payload: {
          name: string;
          email: string;
          balance: number;
        };
      }
    ) => {
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
        balance: action.payload.balance,
      };
    },

    clearStates: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
  },
});

const { actions, reducer } = slice;
export default reducer;
export const { updateUser, clearStates } = actions;
