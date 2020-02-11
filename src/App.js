import React from 'react';
import './App.css';
import NoteListPage from './components/NoteListPage';

function App() {
  return (
    <div className="App">
      <NoteListPage />
      {/* <NoteEditPage text="React is fun prop!" /> */}
    </div>
  );
}

export default App;