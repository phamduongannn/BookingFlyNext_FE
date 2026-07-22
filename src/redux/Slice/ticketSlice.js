import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: 0,
  total_price: 0,
};

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setTotalPrice: (state, action) => {
      state.total_price = action.payload;
    },
  },
});

export const { setStep, setTotalPrice } = ticketSlice.actions;

export default ticketSlice.reducer;
