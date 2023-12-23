import { createSlice } from "@reduxjs/toolkit";
import { DepositInterface } from "../types";

export interface RootStateInterface {
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    id: number;
    name: string;
    email: string;
    balance: number;
  } | null;
  deposits: {
    active: DepositInterface[] | [];
    ready: DepositInterface[] | [];
    closed: DepositInterface[] | [];
  } | null;
}

const initialState: RootStateInterface = {
  accessToken: null,
  refreshToken: null,
  user: null,
  deposits: null,
};

const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    updateUser: (
      state,
      action: {
        payload: {
          id: number;
          name: string;
          email: string;
          balance: number;
        };
      }
    ) => {
      state.user = {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        balance: action.payload.balance,
      };
    },

    updateDeposits: (
      state,
      action: {
        payload: {
          active: DepositInterface[] | [];
          ready: DepositInterface[] | [];
          closed: DepositInterface[] | [];
        };
      }
    ) => {
      state.deposits = action.payload;
    },

    clearStates: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.deposits = null;
    },
  },
});

const { actions, reducer } = slice;
export default reducer;
export const { updateUser, updateDeposits, clearStates } = actions;
