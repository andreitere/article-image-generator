document.addEventListener("DOMContentLoaded", (_) => {
  const $title = document.querySelector("#title");
  const $description = document.querySelector("#description");
  console.log(window.location);
  const params = window.location.search;

  const urlParams = new URLSearchParams(params);
  let title = urlParams.get("title");
  let description = urlParams.get("description");
  $title.innerHTML = title;
  $description.innerHTML = description;
});
