import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://66ea44be55ad32cda47833ad.mockapi.io/api/';


export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    try {
      // HTTP request
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for adding a contact
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contactData, thunkAPI) => {
    try {
      // POST requests require a request body in the form of an object // this is the contactData
      const response = await axios.post('/contacts', contactData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Reject the promise with the error message
    }
  }
);

// Async thunk for deleting a contact
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      // DELETE requests do not require a request body, only a paramId in the form of a string which corresponds to the item to be deleted
      await axios.delete(`/contacts/${contactId}`);
      return contactId; // Return the id to identify which contact was deleted
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Reject the promise with the error message
    }
  }
);