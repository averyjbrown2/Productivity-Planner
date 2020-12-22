//Add post on click
$("#addPost").on("click", event => {
  event.preventDefault();
  const newPost = {
    title: $("#postTitle")
      .val()
      .trim(),
    author: $("#postAuthor")
      .val()
      .trim(),
    text: $("#postText")
      .val()
      .trim()
  };
  $.post("/api/posts", newPost).then(data => {
    location.reload();
  });
});

$(".delete-btn").on("click", function() {
  const deletePost = $(this).data("id");
  console.log(deletePost);
  $.ajax({
    type: "DELETE",
    url: "/api/posts/" + deletePost
  }).then(() => {
    location.reload();
  });
});
