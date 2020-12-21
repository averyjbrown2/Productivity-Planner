$(document).ready(() => {
  //Add goal on click
  $("#addGoal").on("click", event => {
    event.preventDefault();
    const newGoal = {
      title: $("#goalTitle")
        .val()
        .trim()
    };
    $.post("/api/goals", newGoal).then(() => {
      location.reload();
    });
  });

  //delete goal on click
  $(".delete-btn").on("click", function() {
    const deleteGoal = $(this).data("id");
    $.ajax({
      type: "DELETE",
      url: "/api/goals/" + deleteGoal
    }).then(() => {
      location.reload();
    });
  });
  //change goal to inProgress, remove completed and move column
  $(".prog-btn").on("click", function() {
    const inProgressStatus = {
      added: false,
      inProgress: true,
      completed: false
    };
    const currentGoal = $(this).data("id");
    $.ajax({
      type: "PUT",
      url: "/api/goals/" + currentGoal,
      data: inProgressStatus
    }).then(() => {
      location.reload();
    });
  });
  //change goal to Completed and move column
  $("#completeBtn").on("click", function() {
    const completeStatus = {
      added: false,
      inProgress: false,
      completed: true
    };
    const completedId = $(this).data("id");
    $.ajax({
      type: "PUT",
      url: "/api/goals/" + completedId,
      data: completeStatus
    }).then(() => {
      location.reload();
    });
  });
});
