import React, { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';
import initialContacts from 'data/contacts.json';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { Header } from './Header/Header';
import Filter from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';

export default class App extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };
  addContact = newContact => {
    const isExist = this.state.contacts.some(
      ({ name, number }) =>
        name.toLowerCase() === newContact.name.toLowerCase() ||
        number === newContact.number
    );
    if (isExist) {
      return alert(`Contact ${newContact.name} already exists`);
    }
    this.setState(prevState => ({
      contacts: [{id: nanoid(), ...newContact}, ...prevState.contacts],
    }));
  };

  deleteContact = idContact => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== idContact),
    }));
  };

  changeFilter = evt =>
    this.setState({ filter: evt.target.value.toLowerCase() });

  getVisibleContacts = () =>
    this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

  render() {
    const { filter, contacts } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <Layout>
        <Section title="Phonebook">
          <ContactForm onAddContact={this.addContact} />
          {contacts.length > 0 && (
            <>
              <Header title="Contacts" />
              <Filter onChange={this.changeFilter} value={filter} />
              <ContactList
                contacts={visibleContacts}
                onDelete={this.deleteContact}
              />
            </>
          )}
        </Section>
        <GlobalStyle />
      </Layout>
    );
  }
}
