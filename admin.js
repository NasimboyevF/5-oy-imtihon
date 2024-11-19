const form = document.getElementById("product-create-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  fetch("http://localhost:5000/orders", {
    method: "POST",
    body: formData,
  });

  event.target;
});
