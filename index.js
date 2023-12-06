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

const state = [];
let result = { title: "", desc: "", status: "todo", priority: "low" };

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

add_button.addEventListener("click", () => {
  state.push(result);
  console.log(state);
  title_input.value = "";
  desc_input.value = "";
  select_status.value = "To do";
  select_priority.value = "low";
  myModal.style.display = "none";
  localStorage.setItem("result-1", JSON.stringify(state));
});

const cardComponent = (props) => {
  const { title, desc, select_status, priority } = props;

  return `<div>
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
  const component = document.getElementById("to_do-container");
  const response = JSON.parse(localStorage.getItem("result-1"));
  response.forEach((el) => {
    const result = cardComponent(el);
    component.innerHTML += result;
  });
};
render();
