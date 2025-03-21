import {createSlice} from "@reduxjs/toolkit";
import {PayloadAction} from "@reduxjs/toolkit";
type BookState = {
    bookItems : BookingItem[];
}

const initialState : BookState={bookItems:[]};

export const bookSlice = createSlice({
    name : "book",
    initialState,
    reducers : {
        addBooking : (state,action : PayloadAction<BookingItem>)=> {
            const index = state.bookItems.findIndex(
                (item)=> (item.bookDate === action.payload.bookDate && item.venue === action.payload.venue)

            );
            if(index !== -1) {
                state.bookItems[index] = action.payload;
            } else {
                state.bookItems.push(action.payload);
            }
        },
        removeBooking : (state,action : PayloadAction<BookingItem>) => {
            state.bookItems = state.bookItems.filter(
                (item) => !(
                    item.bookDate === action.payload.bookDate &&
                    item.nameLastname === action.payload.nameLastname &&
                    item.tel === action.payload.tel &&
                    item.venue === action.payload.venue
                )
            );
            
        },
    },
});

export const{addBooking,removeBooking}=bookSlice.actions;
export default bookSlice.reducer;