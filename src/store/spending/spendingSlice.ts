import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IJar } from "../../services/Models/JarModel";
import { IInformation } from "../../services/Models/InformationModel";

export interface SpendingState {
  data: {
    information?: IInformation;
    jars: IJar[];
  };
  isFetching: boolean;
  fetchingError: any;
}

const initialState: SpendingState = {
  data: {
    information: undefined,
    jars: [],
  },
  isFetching: false,
  fetchingError: null,
};

export const spendingSlice = createSlice({
  name: "spending",
  initialState,
  reducers: {
    fetchSpendingDataRequest: (state) => {
      state.isFetching = true;
    },
    fetchSpendingDataSuccess: (
      state,
      action: PayloadAction<SpendingState["data"]>
    ) => {
      state.isFetching = false;
      state.data = action.payload;
    },
    fetchSpendingDataFalure: (
      state,
      action: PayloadAction<SpendingState["fetchingError"]>
    ) => {
      state.isFetching = false;
      state.fetchingError = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fetchSpendingDataRequest,
  fetchSpendingDataSuccess,
  fetchSpendingDataFalure,
} = spendingSlice.actions;

export default spendingSlice.reducer;
