const url = `http://localhost:3000/tasks`;

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const status = document.querySelector("#status").value;
  const dueDate = document.querySelector("#dueDate").value;

  console.log(dueDate);

  addToDo(title, description, status, dueDate);

  window.location.href = "index.html";
});

async function addToDo(title, description, status, dueDate) {
  try {
    const obj = {
      title,
      description,
      status,
      dueDate,
    };
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
  } catch (error) {
    console.log(error);
  }
}
