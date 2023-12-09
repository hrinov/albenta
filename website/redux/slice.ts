import { createSlice } from "@reduxjs/toolkit";
import { DepositInterface } from "../types";

export interface RootStateInterface {
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    name: string;
    email: string;
    balance: number;
  } | null;
  deposits: DepositInterface[] | [] | null;
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

    updateDeposits: (state, action) => {
      if (state.deposits && !Array.isArray(action.payload)) {
        let newDeposits = state.deposits as DepositInterface[];
        newDeposits.push(action.payload as DepositInterface);
        state.deposits = newDeposits;
      } else {
        state.deposits = action.payload as DepositInterface[];
      }
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
