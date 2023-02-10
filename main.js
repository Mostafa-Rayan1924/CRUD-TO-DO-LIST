let openSending = document.querySelector(".open-sending");
let del = document.querySelector(".del");
let ok = document.querySelector(".ok");
let edit = document.querySelector(".edit");
let overlay = document.querySelector(".overlay");
let mainBtn = document.querySelector(".main-btn");
let sending = document.querySelector(".sending");
let date = document.querySelector(".date");
let addressInp = document.querySelector(".addressInp");

// main array
if (localStorage.getItem("tasks") !== null) {
  mainAarray = JSON.parse(localStorage.getItem("tasks"));
} else {
  mainAarray = [];
}
// end of array
// set storage
function setstorage() {
  localStorage.setItem("tasks", JSON.stringify(mainAarray));
}
// end of set
openSending.addEventListener("click", () => {
  overlay.classList.add("d-block");
  sending.classList.add("d-block");
});
// show data
function showData() {
  document.querySelector(".tasks").innerHTML = "";

  let i = 0;
  mainAarray.map((item) => {
    let result = `    <div class="task ${mainAarray[i].isDone ? "done" : ""}">
        <div class="info">
            <h3>${item.title}</h3>
            <span><i class="fas fa-user"></i></span>
            <span class="history">${item.dating}</span>
        </div>
        <div class="icons">
        <div onclick="deleteItem(${i})" class="del">
            <i class="fa-solid fa-trash"></i>
        </div>
        ${
          mainAarray[i].isDone
            ? `    <div onclick="acceptItem(${i})" class="ok">
        <i class="fas fa-times"></i>
    </div>`
            : `    <div onclick="acceptItem(${i})" class="ok">
            <i class="fa-solid fa-check"></i>
            </div>`
        }
        <div onclick="editItem(${i})" class="edit">
            <i class="fa-solid fa-pen"></i>
        </div>
        </div>
    </div>
    `;
    document.querySelector(".tasks").innerHTML += result;
    i++;
  });
  document.querySelector(".dont").innerHTML = mainAarray.length;
  doned();
}
showData();
// end of data
// main btn to create task
mainBtn.addEventListener("click", () => {
  let newObj = {
    title: addressInp.value,
    dating: date.value,
    isDone: false,
  };
  if (addressInp.value != "" && date.value != "") {
    mainAarray.push(newObj);
  }
  setstorage();
  showData();
  clear();
  overlay.classList.remove("d-block");
  sending.classList.remove("d-block");
});
// end main btn to create task

document.querySelector(".dont").innerHTML = mainAarray.length;
// clear input
function clear() {
  addressInp.value = "";
  date.value = "";
}
// end of clear

// delete item
function deleteItem(i) {
  let confirmmsg = confirm(`  هل انت متاكد من حذف ${mainAarray[i].title}`);
  if (confirmmsg) {
    mainAarray.splice(i, 1);
    showData();
    setstorage();
  }
}
// end of del
