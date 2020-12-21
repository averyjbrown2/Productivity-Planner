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
    console.log(data);
    location.reload();
  });
});
