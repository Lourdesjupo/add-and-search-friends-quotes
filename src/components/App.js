import React, { useEffect } from 'react';
import '../styles/App.css';
import { useState } from 'react';
import data from '../services/ObjectApi.json';
import callToApi from '../services/api';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [filterQuote, setFilterQuote] = useState('');
  const [selectionName, setSelectionName] = useState('');
  const [newQuote, setNewQuote] = useState({
    quote: '',
    character: '',
  });
  const [error, setError] = useState(false);


  useEffect(() => {
    callToApi().then((response) => {
      setQuotes(response);
    });
  }, []);

  const handleFilterQuote = (ev) => {
    setFilterQuote(ev.target.value);
  };

  const handleSelection = (ev) => {
    if (ev.target.value !== 'Todos') {
      setSelectionName(ev.target.value);
    } else {
      setSelectionName('');
    }
    console.log('selectionName: ', selectionName);
  };

  const handleAddNewQuote = (ev) => {
    setNewQuote({ ...newQuote, [ev.target.id]: ev.target.value });
  };

  const handleAddNewQuoteBtn = (ev) => {
    console.log('newQuote: ', newQuote, ev.target.value);
    if (newQuote.quote !==''  && newQuote.character !== '') {
      setQuotes([...quotes, newQuote]);
      setNewQuote({ quote: '', character: '' });
      setError(false)
    }else {
      setError(true)
    }
  };

  const renderQuotes = () => {
    return quotes
      .filter((quote) => {
        return quote.quote.toLowerCase().includes(filterQuote.toLowerCase());
      })
      .filter((quote) => {
        return quote.character
          .toLowerCase()
          .includes(selectionName.toLowerCase());
      })
      .map((quote, idx) => {
        return (
          <li className='list__quote' key={idx}>
            {quote.quote}
            <p className='list__chara'>{quote.character}</p>
          </li>
        );
      });
  };

  return (
    <React.Fragment>
      <header>
        <div className='logo__container'>
          <img
            className='logo'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Friends_logo.svg/1186px-Friends_logo.svg.png'
            alt=''
          />
        </div>
      </header>
      <main>
        <form className='form'>
          <section className='filters'>
            <h1 className='title'>Frases de Friends</h1>
            <form className='section filter'>
              <label>
                Filtrar por frase
                <input
                  className='filterQuote'
                  type='text'
                  name='filterQuote'
                  id='filterQuote'
                  value={filterQuote}
                  onChange={handleFilterQuote}
                />
              </label>
              <label>
                Filtrar por personaje
                <select
                  className='filterSelect'
                  name='SelectName'
                  id='SelectName'
                  onClick={handleSelection}
                >
                  <option value='Todos'>Todos</option>
                  <option value='Ross'>Ross</option>
                  <option value='Monica'>Monica</option>
                  <option value='Joey'>Joey</option>
                  <option value='Phoebe'>Phoebe</option>
                  <option value='Chandler'>Chandler</option>
                  <option value='Rachel'>Rachel</option>
                </select>
              </label>
            </form>
          </section>
          <section className='addQuote'>
            <h2 className='title'>Añadir una nueva frase</h2>
            <form className='section'>
              <label>
                Frase
                <input
                  className='selectQuote'
                  type='text'
                  name='quote'
                  id='quote'
                  value={newQuote.quote}
                  onChange={handleAddNewQuote}
                />
              </label>
              <label>
                Personaje
                <input
                  className='selectCharacter'
                  type='text'
                  name='character'
                  id='character'
                  value={newQuote.character}
                  onChange={handleAddNewQuote}
                />
              </label>
              <input
                className='btn__sectionAdd'
                type='button'
                value='Añadir una nueva frase'
                onClick={handleAddNewQuoteBtn}
              />
            </form>
            {error && <p className='error'>Rellene los campos frase y personaje</p>}
          </section>
        </form>
        <section>
          <ul className='list'>{renderQuotes()}</ul>
        </section>
      </main>
    </React.Fragment>
  );
}

export default App;
