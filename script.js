document.addEventListener("DOMContentLoaded", loadNotes);

// Function to load notes from localStorage
function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  displayNotes(notes);
}

// Event listener to add a new note
document.getElementById("addNote").addEventListener("click", () => {
  const title = document.getElementById("noteTitle").value.trim();
  const content = document.getElementById("noteContent").value.trim();

  if (title && content) {
    const note = { title, content };
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes(notes);

    // Clear input fields
    document.getElementById("noteTitle").value = "";
    document.getElementById("noteContent").value = "";
  } else {
    alert("Please enter both title and content");
  }
});

// Function to display notes
function displayNotes(notes) {
  const notesContainer = document.getElementById("notes");
  notesContainer.innerHTML = "";

  notes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    noteDiv.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
        `;

    notesContainer.appendChild(noteDiv);
  });
}

// Function to delete a note
function deleteNote(index) {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes(notes);
}

// Event listener for searching notes
document.getElementById("search").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const notes = JSON.parse(localStorage.getItem("notes")) || [];

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
  );

  displayNotes(filteredNotes);
});
