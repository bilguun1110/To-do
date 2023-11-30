// const button = document.getElementById("button");
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
