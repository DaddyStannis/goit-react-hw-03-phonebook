import Section from './shared/components/Section/Section';
import ContactForm from './modules/ContactForm/ContactForm';
import ContactList from './modules/ContactList/ContactList';
import { Component } from 'react';
import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  render() {
    const contacts = this.getFilteredContacts();

    return (
      <div className="container">
        <Section title="Phonebook">
          <ContactForm onSubmit={this.handleSubmit} />
        </Section>
        <Section title="Contacts">
          <ContactList
            onFilter={this.handleFilter}
            onDelete={this.handleDelete}
            contacts={contacts}
          />
        </Section>
      </div>
    );
  }

  getFilteredContacts() {
    const { filter: substring, contacts } = this.state;
    if (!substring.length) {
      return contacts;
    } else {
      return contacts.filter(({ name }) => {
        return name.toLowerCase().includes(substring);
      });
    }
  }

  handleSubmit = ({ name, number }) => {
    const { contacts } = this.state;

    if (this.isDublicate(name)) {
      return;
    }

    contacts.push({
      id: nanoid(),
      name: name,
      number: number,
    });

    this.setState({
      contacts,
    });
  };

  isDublicate(name) {
    const { contacts } = this.state;
    const normalizedName = name.toLowerCase();

    const coincidence = contacts.find(
      ({ name }) => normalizedName === name.toLowerCase()
    );

    if (coincidence) {
      return true;
    } else {
      return false;
    }
  }

  handleDelete = id => {
    const { contacts } = this.state;
    const filteredContacts = contacts.filter(
      ({ id: idFromArray }) => idFromArray !== id
    );

    this.setState({
      contacts: filteredContacts,
    });
  };

  handleFilter = substring => {
    this.setState({ filter: substring.toLowerCase() });
  };
}

export default App;
