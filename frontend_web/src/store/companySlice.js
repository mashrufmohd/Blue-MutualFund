import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCompanyData } from '../services/api';

export const getCompanyDetails = createAsyncThunk(
  'company/getDetails',
  async (id, { rejectWithValue }) => {
    try {
      return await fetchCompanyData(id);
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch data');
    }
  }
);

const companySlice = createSlice({
  name: 'company',
  initialState: {
    currentCompany: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearData: (state) => {
      state.currentCompany = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCompanyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompanyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCompany = action.payload;
      })
      .addCase(getCompanyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearData } = companySlice.actions;
export default companySlice.reducer;