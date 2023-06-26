import React, { useEffect } from 'react';
import '../styles/App.css';
import { useState } from 'react';
import data from '../services/ObjectApi.json'
import callToApi from '../services/api';


function App() {

const [quotes, setQuotes] = useState([])
const [filterQuote, setFilterQuote] = useState('')
const [selectionName, setSelectionName] = useState('')
const [newQuote, setNewQuote] =useState({
  quote:'',
  character:''
})


useEffect(()=>{
  callToApi().then((response)=>{
    setQuotes(response)
  })
},[])



const handleFilterQuote =(ev)=>{
  setFilterQuote(ev.target.value)
}

const handleSelection = (ev)=>{
  if(ev.target.value !== 'Todos'){
    setSelectionName(ev.target.value)
  } else{
    setSelectionName('')
  }
console.log('selectionName: ', selectionName)
}

const handleAddNewQuote =(ev)=>{
setNewQuote({...newQuote,
  [ev.target.id] : ev.target.value})
}

const handleAddNewQuoteBtn =()=>{
  console.log('newQuote: ', newQuote)
 setQuotes([...quotes, newQuote])
 setNewQuote({ quote: '', character: '' });
}

const renderQuotes = ()=>{
  return quotes.filter((quote) =>{
    return quote.quote.toLowerCase().includes(filterQuote.toLowerCase());
  })
  .filter((quote)=> {
    return quote.character.toLowerCase().includes(selectionName.toLowerCase());
  })
  .map((quote, idx)=>{
  return <li key={idx}>{quote.quote}
  <p>{quote.character}</p>
  </li>
})
}
  
  return (
    <React.Fragment>
      <main>
        <section>
          <h1>Frases de Friends</h1>
          <label>Filtrar por frase</label>
          <input
            type='text'
            name='filterQuote'
            id='filterQuote'
            value={filterQuote}
            onChange={handleFilterQuote}
          />
          <label>Filtrar por personaje</label>
          <select name='SelectName' id='SelectName' onClick={handleSelection}>
            <option value='Todos'>Todos</option>
            <option value='Ross'>Ross</option>
            <option value='Monica'>Monica</option>
            <option value='Joey'>Joey</option>
            <option value='Phoebe'>Phoebe</option>
            <option value='Chandler'>Chandler</option>
            <option value='Rachel'>Rachel</option>
          </select>
        </section>
        <section>
          <h2>Añadir una nueva frase</h2>
          <label>
            Frase
            <input
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
              type='text'
              name='character'
              id='character'
              value={newQuote.character}
              onChange={handleAddNewQuote}
            />
          </label>
          <input type='button' value='Añadir una nueva frase' onClick={handleAddNewQuoteBtn}/>
        </section>
        <section>
          <ul>{renderQuotes()}</ul>
        </section>
      </main>
    </React.Fragment>
  );
}

export default App;
