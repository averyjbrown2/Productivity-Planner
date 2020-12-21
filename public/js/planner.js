$(document).ready(() => {
  // Getting a reference to the input field where user adds a new todo
  const newNoteInput = $("#new-note");

  $("#note-save-btn").on("click", saveNote);

  const dateID = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );

  //Run these functions when the planner page loads
  getNote();

  // This function grabs notes from the database
  function getNote() {
    $.get("/api/notes", data => {
      note = data;
      if (note.length === 0) {
        console.log("NO DATA SO WE QUIT FUNCTION");
        return;
      }
      renderNotes();
    });
  }

  //upload Notes onto page
  function renderNotes() {
    newNoteInput.empty();
    console.log("RENDER NOTES HAS RUN!");
    for (let i = 0; i < note.length; i++) {
      if (dateID === note[i].date) {
        console.log(note[i]);
        newNoteInput.val(note[i].text);
        console.log(note);
      }
    }
  }

  function saveNote() {
    console.log("CLICKED!");
    //grab notes table
    $.get("/api/notes", data => {
      note = data;
    });
    if (note.length === 0) {
      insertNote();
    } else {
      for (let i = 0; i < note.length; i++) {
        if (dateID === note[i].date) {
          const savedNote = note[i];

          console.log(
            "FOUND A MATCH!!: Date - " +
              savedNote.dateId +
              " Text - " +
              savedNote.Id
          );
          savedNote.text = newNoteInput.val();
          console.log(
            "Updated Note!: Date - " +
              savedNote.dateId +
              " Text - " +
              savedNote.Id
          );
          //runs update note function
          updateNote(savedNote);
        } else {
          console.log("NO matching date so INSERTING NEW NOTE INTO TABLE");
          insertNote();
        }
      }
    }
  }

  function updateNote(note) {
    console.log("UPDATE NOTE HAS RUN");
    //uses put method the take in saved not and runs route using saved note
    $.ajax({
      method: "PUT",
      url: "/api/notes",
      data: note
    }).then(getNote);
  }

  function insertNote() {
    console.log("INSERT NOTE RUN");
    const note = {
      date: dateID,
      text: newNoteInput.val().trim()
    };
    console.log(note);
    $.post("/api/notes", note);
  }
  $("#newGoal").on("submit", function(event) {
    event.preventDefault();
    const newGoalText = {
      text: $("#goalText")
        .val()
        .trim(),
      date: dateID,
      complete: false
    };
    $.post("/api/goal", newGoalText).then(() => location.reload());
  });
  $(".goals-checkboxes").click(function() {
    const goalId = $(this).attr("data-id");
    const newState = $(this).attr("data-completed") === "true" ? false : true;
    $(this).attr("data-completed", newState);
    const goalState = { state: newState };
    console.log(goalId, goalState);
    $.ajax({
      method: "PUT",
      url: "/api/goal/" + goalId,
      data: goalState
    }).then(results => console.log(results));
  });
  const objectives = [
    { className: "checkbox1", checked: null, goal: null },
    { className: "checkbox2", checked: null, goal: null },
    { className: "checkbox3", checked: null, goal: null },
    { className: "checkbox4", checked: null, goal: null }
  ];

  const goals = [
    { className: "checkbox2", checked: "checked", goal: "Workout Today!" },
    { className: "checkbox4", checked: "checked", goal: "Finish Project!" }
  ];

  const newGoals = objectives.map(objectives => {
    for (let i = 0; i < goals.length; i++) {
      if (objectives.className === goals[i].className) {
        return goals[i];
      }
    }
    return objectives;
  });
  console.log(newGoals);
});

module.exports = {
  newGoals: newGoals
};
