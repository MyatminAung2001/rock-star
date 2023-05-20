import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filterText: "relevance",
    isDropDownOpen: false,
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        handleFilter: (state, action) => {
            state.filterText = action.payload;
        },
        handleDropDown: (state, action) => {
            state.isDropDownOpen = action.payload;
        },
    },
});

export const { handleFilter, handleDropDown } = filterSlice.actions;

export default filterSlice.reducer;
