const url = `http://localhost:3000/tasks`;

const container = document.querySelector(".container");
const statusFilter = document.querySelector("#status");
const priorityFilter = document.querySelector("#priority");
const paginationNmbr = document.querySelector(".pagination-nmbr");

getData(`${url}`);

statusFilter.addEventListener("change", () => {
  const status = statusFilter.value;
  console.log(status);
  if (status !== "All") {
    getData(`${url}/?status=${status}`);
  } else {
    getData(url);
  }
});

priorityFilter.addEventListener("change", () => {
  const priority = priorityFilter.value;
  console.log(priority);
  if (priority !== "All") {
    getData(`${url}/?priority=${priority}`);
  } else {
    getData(url);
  }
});

async function getData(url) {
  console.log(url);
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayData(data);
  } catch (error) {
    console.log(error);
  }
}

function displayData(data) {
  container.innerHTML = "";
  data.forEach((ele) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const id = document.createElement("div");
    id.textContent = ele.id;

    const title = document.createElement("h3");
    title.textContent = ele.title;

    const description = document.createElement("div");
    description.textContent = ele.description;

    const status = document.createElement("div");
    status.textContent = ele.status;

    const dueDate = document.createElement("div");
    dueDate.textContent = ele.dueDate;

    const priority = document.createElement("div");
    priority.textContent = "xyz";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit Task";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Task";

    card.append(
      id,
      title,
      description,
      status,
      dueDate,
      priority,
      editBtn,
      deleteBtn
    );
    container.append(card);

    editBtn.addEventListener("click", () => {
      localStorage.setItem("taskId", ele.id);
      window.location.href = "edit.html";
    });

    deleteBtn.addEventListener("click", () => {
      deleteTask(ele.id);
    });
  });
  let count = 1;
  for (let i = 0; i <= data.length / 5; i++) {
    const span = document.createElement("span");
    span.textContent = count;
    paginationNmbr.append(span);
    count++;
  }
}

async function deleteTask(id) {
  try {
    await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    window.location.href = "index.html";
  } catch (error) {
    console.log(error);
  }
}
