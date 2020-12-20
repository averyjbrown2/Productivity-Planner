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
$("#deleteGoal").on("click", () => {
  const id = $(this).data("id");
  $.ajax({
    method: "DELETE",
    url: "/api/goals/" + id
  }).then(() => {
    location.reload();
  });
});
//change goal to inProgress and move column
$("#inProgressBtn").on("click", () => {
  const inProgressStatus = {
    inProgress: true
  };
  const currentGoal = $(this).data("id");
  $.ajax({
    method: "PUT",
    url: "/api/goals/" + currentGoal,
    data: inProgressStatus
  }).then(() => {
    location.reload();
  });
});
//change goal to Completed and move column
$("#completeBtn").on("click", () => {
  const completeStatus = {
    inProgress: false,
    completed: true
  };
  const id = $(this)
    .parent()
    .parent()
    .data("goal").id;
  $.ajax({
    method: "PUT",
    url: "/api/goals/" + id,
    data: completeStatus
  }).then(() => {
    location.reload();
  });
});
