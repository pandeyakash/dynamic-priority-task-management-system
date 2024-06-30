const url = `http://localhost:3000/tasks`;

const id = localStorage.getItem("taskId");

const form = document.querySelector("form");

async function onLoad() {
  const response = await fetch(`${url}/${id}`);
  const data = await response.json();

  document.querySelector("#title").value = data.title;
  document.querySelector("#description").value = data.description;
  document.querySelector("#status").value = data.status;
  document.querySelector("#dueDate").value = data.dueDate;
}

onLoad();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const status = document.querySelector("#status").value;
  const dueDate = document.querySelector("#dueDate").value;
  editToDo(title, description, status, dueDate);
  window.location.href = "index.html";
});

async function editToDo(title, description, status, dueDate) {
  try {
    await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        status,
        dueDate,
      }),
    });
  } catch (error) {
    console.log(error);
  }
}
