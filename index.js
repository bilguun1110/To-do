const myModal = document.getElementById("myModal");
const footer = document.getElementsByClassName("footer");

Array.prototype.forEach.call(footer, (el) => {
  el.onclick = (event) => {
    myModal.style.display = "block";
  };
});

window.onclick = function (event) {
  if (event.target == myModal) {
    myModal.style.display = "none";
  }
};

const title_input = document.getElementById("title_input");
const desc_input = document.getElementById("desc_input");
const select_status = document.getElementById("select_status");
const select_priority = document.getElementById("select_priority");
const add_button = document.getElementById("add_button");
const cards = document.querySelectorAll(".card");
const todo_cont = document.getElementById("to_do-container");
const progress_container = document.getElementById("progress_container");
const stuck_container = document.getElementById("stuck_container");
const done_container = document.getElementById("done_container");

let state = [];
const firstGet = JSON.parse(localStorage.getItem("result-1"));
state = firstGet ? firstGet : [];

let result = { title: "", desc: "", status: "Todo", priority: "low" };

title_input.addEventListener("change", (event) => {
  result.title = event.target.value;
});
desc_input.addEventListener("change", (event) => {
  result.desc = event.target.value;
});
select_status.addEventListener("change", (event) => {
  result.status = event.target.value;
});
select_priority.addEventListener("change", (event) => {
  result.priority = event.target.value;
});

const setData = (result) => {
  const uniqId = "id" + Math.random().toString(16).slice(2);
  state.push({ ...result, id: uniqId });
  localStorage.setItem("result-1", JSON.stringify(state));
  render();
  location.reload();
};

add_button.addEventListener("click", () => {
  setData(result);

  title_input.value = "";
  desc_input.value = "";
  select_status.value = "Todo";
  select_priority.value = "low";
  myModal.style.display = "none";
});

const cardComponent = (props) => {
  const { title, desc, status, priority, id } = props;

  return `<div class="${status} results" id=${id} draggable="true">
  <div class="main_content">
  <div class="check">
    <i class="fa-regular fa-circle-check"></i>
  </div>
  <div class="lists">
    <h3>${title}</h3>
    <div>${desc}</div>
    <button style="width: 60px">${priority}</button>
  </div>
  <div class="edits">
    <i class="fa-regular fa-circle-xmark"></i>
    <i class="fa-solid fa-pen-to-square"></i>
  </div>
</div>
    `;
};

let task_todo = document.getElementsByClassName("Todo");
let task_progress = document.getElementsByClassName("Inprogress");
let task_stuck = document.getElementsByClassName("Stuck");
let task_done = document.getElementsByClassName("Done");

let number_todo = document.getElementById("number_todo");
let number_progress = document.getElementById("number_progress");
let number_stuck = document.getElementById("number_stuck");
let number_done = document.getElementById("number_done");

const render = () => {
  const response = JSON.parse(localStorage.getItem("result-1"));
  todo_cont.innerHTML = "";
  progress_container.innerHTML = "";
  stuck_container.innerHTML = "";
  done_container.innerHTML = "";

  response.forEach((el) => {
    const result = cardComponent(el);
    switch (el.status) {
      case "Todo":
        todo_cont.innerHTML += result;
        break;
      case "Inprogress":
        progress_container.innerHTML += result;
        break;
      case "Stuck":
        stuck_container.innerHTML += result;
        break;
      case "Done":
        done_container.innerHTML += result;
        break;
    }
  });
  number_todo.innerHTML = task_todo.length;
  number_progress.innerHTML = task_progress.length;
  number_stuck.innerHTML = task_stuck.length;
  number_done.innerHTML = task_done.length;
};
render();
console.log(result);
// drag and drop
const allTasks = document.querySelectorAll(".results");
const todoCard = document.getElementById("to-do");
const progressCard = document.getElementById("progress");
const stuckCard = document.getElementById("stuck");
const doneCard = document.getElementById("done");
let temp = "";

const checkStatus = (sttus, checks) => {
  if (checks) {
    if (sttus.id === "todocard") {
      objOfresult.status = "Todo";
    } else if (sttus.id === "progressCard") {
      objOfresult.status = "Inprogress";
    } else if (sttus.id === "stuckCard") {
      objOfresult.status = "Stuck";
    } else if (sttus.id === "doneCard") {
      objOfresult.status = "Done";
    }
  }
};

allTasks.forEach((el) => {
  el.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("todo", event.target.id);
  });
});
cards.forEach((el) => {
  el.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
});

todoCard.addEventListener("drop", (event) => {
  temp = event.dataTransfer.getData("todo");
  const draggedTodo = document.getElementById(temp);
  todo_cont.appendChild(draggedTodo);
  // status oorchloh
  const sum = state.find(({ id }) => id == temp);
  const responsePrg = JSON.parse(localStorage.getItem("result-1"));

  const newArr = responsePrg.map((el) => {
    if (el.id == temp) {
      return { ...el, status: "Todo" };
    }
    return el;
  });
  localStorage.setItem("result-1", JSON.stringify(newArr));

  render();
  checkStatus();
  location.reload();
});

progressCard.addEventListener("drop", (event) => {
  temp = event.dataTransfer.getData("todo");
  const draggedProg = document.getElementById(temp);
  progress_container.appendChild(draggedProg);
  // status oorchloh
  const sum = state.find(({ id }) => id == temp);
  const responsePrg = JSON.parse(localStorage.getItem("result-1"));

  const newArr = responsePrg.map((el) => {
    if (el.id == temp) {
      return { ...el, status: "Inprogress" };
    }
    return el;
  });
  localStorage.setItem("result-1", JSON.stringify(newArr));

  render();
  checkStatus();
  location.reload();
});
stuckCard.addEventListener("drop", (event) => {
  temp = event.dataTransfer.getData("todo");
  const draggedStuck = document.getElementById(temp);
  stuck_container.appendChild(draggedStuck);
  // status oorchloh
  const sum = state.find(({ id }) => id == temp);
  const responsePrg = JSON.parse(localStorage.getItem("result-1"));

  const newArr = responsePrg.map((el) => {
    if (el.id == temp) {
      return { ...el, status: "Stuck" };
    }
    return el;
  });
  localStorage.setItem("result-1", JSON.stringify(newArr));

  render();
  checkStatus();
  location.reload();
});
doneCard.addEventListener("drop", (event) => {
  temp = event.dataTransfer.getData("todo");
  const draggedDone = document.getElementById(temp);
  done_container.appendChild(draggedDone);
  // status oorchloh
  const sum = state.find(({ id }) => id == temp);
  const responsePrg = JSON.parse(localStorage.getItem("result-1"));

  const newArr = responsePrg.map((el) => {
    if (el.id == temp) {
      return { ...el, status: "Done" };
    }
    return el;
  });
  localStorage.setItem("result-1", JSON.stringify(newArr));

  render();
  checkStatus();
  location.reload();
});
