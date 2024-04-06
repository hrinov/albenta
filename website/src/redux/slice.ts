import { fetchUser, getDeposits } from "../utils";
import { createSlice } from "@reduxjs/toolkit";

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
        payload: RootStateInterface["user"];
      }
    ) => {
      state.user = action.payload;
    },

    updateDeposits: (
      state,
      action: {
        payload: RootStateInterface["deposits"];
      }
    ) => {
      state.deposits = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(getDeposits.fulfilled, (state, action) => {
      state.deposits = action.payload;
    });
  },
});

export default slice.reducer;
export const { updateUser, updateDeposits } = slice.actions;
