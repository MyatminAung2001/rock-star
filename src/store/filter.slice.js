import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filter: "relevance",
    isDropDownOpen: false,
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        handleDropDown: (state, action) => {
            state.isDropDownOpen = action.payload;
        },
    },
});

export const { setFilter, handleDropDown } = filterSlice.actions;

export default filterSlice.reducer;
