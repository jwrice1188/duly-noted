import React from 'react';
import NoteListPage from './components/NoteListPage';
import NoteEditPage from './components/NoteEditPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <NoteListPage />
      {/* <NoteEditPage text="React is fun prop!" /> */}
    </div>
  );
}

export default App;
