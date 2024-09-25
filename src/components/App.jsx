// import { useState, useEffect } from 'react';
// import { ContactForm } from './ContactForm/ContactForm';
// import { Filter } from './Filter/Filter';
// import { ContactList } from './ContactList/ContactList';

// const initialContacts = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];

// export const App = () => {
//   const savedContacts = localStorage.getItem('contacts');
//   const [contacts, setContacts] = useState(
//     savedContacts !== null ? JSON.parse(savedContacts) : initialContacts
//   );
//   const [filter, setFilter] = useState('');

//   useEffect(() => {
//     localStorage.setItem('contacts', JSON.stringify(contacts));
//   }, [contacts]);
//   const addContact = newContact => {
//     setContacts(prevState => [...prevState, newContact]);
//   };

//   const deleteContact = id => {
//     setContacts(prevState => prevState.filter(contact => contact.id !== id));

//   };

//   const filterContact = () => {

//     const filterLowerCase = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filterLowerCase)
//     );
//   };

//   return (
//     <div>
//       <h1>Phonebook</h1>
//       <ContactForm addContact={addContact} contacts={contacts} />
         
//       <h2>Contacts</h2>
//       <Filter filter={filter} setFilter={setFilter} />
//       <ContactList
//         filterContact={filterContact}
//         deleteContact={deleteContact}
//       />
//     </div>
//   );
// };
import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { SharedLayout } from 'pages/SharedLayout';
import { RegisterPage } from 'pages/RegisterPage';
import { LoginPage } from 'pages/LoginPage';
import { ContactsPage } from 'pages/ContactsPage';
import { RestrictedRoute } from './RestrictedRoute/RestrictedRoute';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import { HomePage } from 'pages/HomePage';
import { useDispatch } from 'react-redux';
import { useAuth } from '../redux/hooks/useAuth';
import { useEffect } from 'react';
import { refreshUser } from '../redux/auth/authOperations';

export const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
    navigate('/contacts');
  }, [dispatch, navigate]);

  return isRefreshing ? (
    <h1>Refreshing user... Please wait...</h1>
  ) : (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                component={RegisterPage}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute component={LoginPage} redirectTo="/contacts" />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute component={ContactsPage} redirectTo="/login" />
            }
          />
          <Route
            path="/logout"
            element={<PrivateRoute component={HomePage} redirectTo="/" />}
          />
        </Route>
      </Routes>
    </>
  );
};