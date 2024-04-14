import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IJar } from "../../interfaces/spending.interfaces";

export interface SpendingState {
  data: {
    information: {
      income: number;
      outcome: number;
    };
    jars: IJar[];
  };
  isFetching: boolean;
  fetchingError: any;
}

const initialState: SpendingState = {
  data: {
    information: {
      income: 10000000,
      outcome: 0,
    },
    jars: [
      {
        id: "1",
        name: "Chi tiêu",
        income: 5500000,
        outcome: 0,
        spendingDetail: [],
        percent: 55,
      },
      {
        id: "2",
        name: "Học tập",
        income: 1000000,
        outcome: 0,
        spendingDetail: [],
        percent: 10,
      },
      {
        id: "3",
        name: "Tiết kiệm",
        income: 1000000,
        outcome: 0,
        spendingDetail: [],
        percent: 10,
      },
      {
        id: "4",
        name: "Đầu tư",
        income: 1000000,
        outcome: 0,
        spendingDetail: [],
        percent: 10,
      },
      {
        id: "5",
        name: "Hưởng thụ",
        income: 1000000,
        outcome: 0,
        spendingDetail: [],
        percent: 10,
      },
      {
        id: "6",
        name: "Từ tâm",
        income: 500000,
        outcome: 0,
        spendingDetail: [],
        percent: 5,
      },
    ],
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
