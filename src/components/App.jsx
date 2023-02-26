import Section from './shared/components/Section/Section';
import ContactForm from './modules/ContactForm/ContactForm';
import ContactList from './modules/ContactList/ContactList';
import { Component } from 'react';
import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    let contacts;
    try {
      contacts = JSON.parse(localStorage.getItem('contacts'));
    } catch (error) {
      console.error(error);
    }
    this.setState({ contacts: contacts ? contacts : [] });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this.state.contacts);
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
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
      alert('This contact already exist');
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    this.setState((state, props) => {
      return { contacts: [...contacts, newContact] };
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
}

export default App;
