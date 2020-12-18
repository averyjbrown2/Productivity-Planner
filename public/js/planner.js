$(document).ready(() => {
  // Getting a reference to the input field where user adds a new todo
  const newNoteInput = $("#new-note");
  $("#note-save-btn").on("click", saveNote);

  //Run these functions when the planner page loads
  getNote();

  // This function grabs notes from the database
  function getNote() {
    $.get("/api/notes", data => {
      note = data;
      renderNotes();
    });
  }

  //upload Notes onto page
  function renderNotes() {
    newNoteInput.empty();

    //need to change this to a loop that goes through the notes data base and only popluates the note where the date matches the date the user is on
    newNoteInput.val(note[0].text);
    console.log(note);
  }

  function saveNote() {
    //grab notes table
    $.get("/api/notes", data => {
      note = data;

      //goes to the first row of the table
      const savedNote = note[0];

      //changes the value of the exisitng not text to the value of the textarea
      savedNote.text = newNoteInput.val();
      //runs update note function
      updateNote(savedNote);
    });
  }

  function updateNote(note) {
    //uses put method the take in saved not and runs route using saved note
    $.ajax({
      method: "PUT",
      url: "/api/notes",
      data: note
    }).then(getNote);
  }

  // function insertNote(event) {
  //   event.preventDefault();
  //   console.log(newNoteInput.val());
  //   var note = {
  //     text: newNoteInput.val().trim(),
  //   };
  //   $.post("/api/notes", note);
  // }
});
