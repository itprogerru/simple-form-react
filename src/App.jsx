import React from 'react';
import './App.css';
import ItemForm from './component/froms/ItemForm/ItemForm'

function App() {

  const control= {
    name: {
      value: 10
    }
  }
  return (
    <div className="App">
      <ItemForm controlValue = {control} />
    </div>)
}

export default App;
