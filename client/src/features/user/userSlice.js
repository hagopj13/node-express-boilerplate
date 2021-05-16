import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    facebookId: '',
    id: '',
    name: '',
    address: '',
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setFacebookId: (state, action) => {
      state.facebookId = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { setFacebookId, setId, setName, setAddress } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectFacebookId = (state) => state.user.facebookId;
export const selectId = (state) => state.user.id;
export const selectName = (state) => state.user.name;
export const selectAddress = (state) => state.user.address;

export default userSlice.reducer;