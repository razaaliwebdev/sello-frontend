import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Async thunk for fetching filtered cars
export const fetchFilteredCars = createAsyncThunk(
  'cars/fetchFiltered',
  async (filters, { rejectWithValue }) => {
    try {
      // Convert filters object to URLSearchParams
      const params = new URLSearchParams();
      
      // Add all filters to the params
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value)) {
            // Handle array values (e.g., features)
            value.forEach(item => params.append(key, item));
          } else if (typeof value === 'object' && value !== null) {
            // Handle nested objects (e.g., price range)
            Object.entries(value).forEach(([subKey, subValue]) => {
              if (subValue !== undefined && subValue !== null && subValue !== '') {
                params.append(`${key}[${subKey}]`, subValue);
              }
            });
          } else {
            // Handle primitive values
            params.append(key, value);
          }
        }
      });

      // Make the API request
      const response = await axios.get(`${API_URL}/cars/filter?${params.toString()}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch cars. Please try again.';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Initial state
const initialState = {
  filteredCars: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  pages: 1,
  limit: 12,
  filters: {},
  sort: { field: 'createdAt', order: 'desc' }
};

// Create slice
const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    clearFilters: (state) => {
      state.filters = {};
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
      state.page = 1; // Reset to first page when changing sort
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch filtered cars
      .addCase(fetchFilteredCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredCars.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredCars = action.payload.data || [];
        state.total = action.payload.total || 0;
        state.page = action.payload.page || 1;
        state.pages = action.payload.pages || 1;
        state.limit = action.payload.limit || 12;
      })
      .addCase(fetchFilteredCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch cars';
        state.filteredCars = [];
      });
  }
});

// Export actions
export const { clearFilters, setPage, setSort } = carSlice.actions;

// Export selectors
export const selectFilteredCars = (state) => ({
  cars: state.car.filteredCars,
  loading: state.car.loading,
  error: state.car.error,
  total: state.car.total,
  page: state.car.page,
  pages: state.car.pages,
  limit: state.car.limit
});

export default carSlice.reducer;
