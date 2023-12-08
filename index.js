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

let state = [];
const firstGet = JSON.parse(localStorage.getItem("result-1"));
state = firstGet ? firstGet : [];

console.log(state);

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
  state.push({ ...result });
  localStorage.setItem("result-1", JSON.stringify(state));
  render();
};

add_button.addEventListener("click", () => {
  setData(result);

  title_input.value = "";
  desc_input.value = "";
  select_status.value = "Todo";
  select_priority.value = "low";
  myModal.style.display = "none";
  number_todo.innerHTML = task_todo.length;
  number_progress.innerHTML = task_progress.length;
  number_stuck.innerHTML = task_stuck.length;
  number_done.innerHTML = task_done.length;
});

const cardComponent = (props) => {
  const { title, desc, status, priority } = props;

  return `<div class=${status} draggable="true">
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

const render = () => {
  const todo_cont = document.getElementById("to_do-container");
  const progress_container = document.getElementById("progress_container");
  const stuck_container = document.getElementById("stuck_container");
  const done_container = document.getElementById("done_container");
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
};
render();

let task_todo = document.getElementsByClassName("Todo");
let task_progress = document.getElementsByClassName("Inprogress");
let task_stuck = document.getElementsByClassName("Stuck");
let task_done = document.getElementsByClassName("Done");

let number_todo = document.getElementById("number_todo");
let number_progress = document.getElementById("number_progress");
let number_stuck = document.getElementById("number_stuck");
let number_done = document.getElementById("number_done");

let task = document.getElementById("component");

for (el of task_todo) {
  task_todo.addEventListener("dragstart", (event) => {
    let selected = event.target.id;
    event.dataTransfer.setData("myId", selected);
  });
}
for (el of task) {
  task.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  task.addEventListener("drop", (event) => {
    const divId = event.dataTransfer.getData("myId");
    const div = document.getElementById(divId);
    task.appendChild(div);
  });
}
for (el of task_progress) {
  task_progress.addEventListener("dragstart", (event) => {
    let selected = event.target.id;
    event.dataTransfer.setData("myId", selected);
  });
}
