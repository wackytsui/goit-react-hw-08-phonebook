// import { createSlice } from '@reduxjs/toolkit';
// import { nanoid } from 'nanoid';

// const initialContactsState = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];

// export const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: initialContactsState,
//   reducers: {
    
//     addContact: {
//       reducer(state, action) {
//         state.push(action.payload);
//       },
//       prepare({ name, number }) {
//         return { payload: { id: nanoid(), name, number } };
//       },
//     },
//     deleteContact: {
//       reducer(state, action) {
//         const index = state.findIndex(contact => contact.id === action.payload);
//         if (index !== -1) {
//           state.splice(index, 1);
//         }
//       },
//     },
//   },
// });

// export const { addContact, deleteContact } = contactsSlice.actions;
/* 
import { createSlice, nanoid } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const contactsSlice = createSlice ({
  name: 'contacts',
  initialState: {
    initialContacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  },
  reducers : {
    addContact: {
      reducer: (state, action) => {
        state.initialContacts.push(action.payload)
      },
      prepare: (name, number) => {
        return {
          payload: {
            id: nanoid(),
            name: name.trim(),
            number: number.trim(),
          },
        };
      },
    },
    deleteContact: (state, action) => {
      const index = state.initialContacts.findIndex(
        contact => contact.id === action.payload
      );
      state.initialContacts.splice(index, 1);
    }
  }
});

const persistConfig = {
  key: 'contacts',
  storage,
};

export const contactsReducer = persistReducer (
  persistConfig,
  contactsSlice.reducer
);

export const { addContact, deleteContact, deleteAllContacts } = contactsSlice.actions;
*/

//
import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const initialContactsState = {
  contacts: [],
  isLoading: false,
  error: null,
};


export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContactsState,

  reducers: {
    // for each action type, we will declare a reducer and/OR the prepare function
    // reducer function is responsible for modifying the actual state
    // prepare function is responsible for describing the action payload
    // addContact: {
    //   reducer(state, action) {
    //     state.contacts.push(action.payload);
    //   },
    //   prepare({ name, number }) {
    //     return { payload: { id: nanoid(), name, number } };
    //   },
    // },
    // deleteContact: {
    //   reducer(state, action) {
    //     const index = state.contacts.findIndex(
    //       contact => contact.id === action.payload
    //     );
    //     if (index !== -1) {
    //       state.contacts.splice(index, 1);
    //     }
    //   },
    // },
    // for asynchronous action generators
    // we have to declare three action generators corresponding to each phase of the Javascript async promise namely: fulfilled, rejected, pending
    // fetchingContactsInProgress: {
    //   reducer(state) {
    //     state.isLoading = true;
    //   },
    // },
    // fetchingContactsSuccess: {
    //   reducer(state, action) {
    //     state.isLoading = false;
    //     state.error = null;
    //     state.contacts = action.payload;
    //   },
    // },
    // fetchingContactsError: {
    //   reducer(state, action) {
    //     state.isLoading = false;
    //     state.error = action.payload;
    //   },
    // },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});