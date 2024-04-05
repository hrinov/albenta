import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestHandler } from "../utils";

export const fetchUser = createAsyncThunk("slice/fetchUser", async () => {
  const userData = await requestHandler("me", "GET");
  if (userData?.success) {
    return userData?.data!;
  }
});

const initialState: RootStateInterface = {
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
          avatar: string;
        };
      }
    ) => {
      state.user = {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        balance: action.payload.balance,
        avatar: action.payload.avatar,
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
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

const { actions, reducer } = slice;
export default reducer;
export const { updateUser, updateDeposits } = actions;
