// script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('note-form');
    const titleInput = document.getElementById('title-input');
    const contentInput = document.getElementById('content-input');
    const notesList = document.getElementById('notes-list');
    //console.log(form);
  
    // Fetch all notes from the server
    fetch('http://localhost:3500/api/notes')
      .then(response => response.json())
      .then(notes => {
        notes.forEach(note => {
          displayNoteInList(note);
        });
      })
      .catch(error => console.error('Error:', error));
  
    // Add new note on form submit
    form.addEventListener('submit', event => {
      event.preventDefault();
  
      const title = titleInput.value;
      const content = contentInput.value;
  
      if (title.trim() === '' || content.trim() === '') {
        return;
      }
  
      const newNote = { title, content };
  
      fetch('http://localhost:3500/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote),
      })
        .then(response => response.json())
        .then(note => {
          displayNoteInList(note);
          titleInput.value = '';
          contentInput.value = '';
        })
        .catch(error => console.error('Error:', error));
    });
  
    // Display a note in the list
    function displayNoteInList(note) {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');
      noteElement.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
      `;
      notesList.appendChild(noteElement);
    }
  });
  