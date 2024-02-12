let $ = document;
let addNote = $.querySelector("#addNote");
let allNote = $.querySelector("#allNote");
let color = $.querySelectorAll(".color");
let inputNote = $.querySelector("#inputNote");
let message = $.querySelector("#message");

color.forEach(function (newColor) {
  newColor.addEventListener("click", function (event) {
    let userColor = event.target.style.backgroundColor;
    $.body.style.backgroundColor = userColor;
  });
});
addNote.addEventListener("click", function () {
  if (inputNote.value === "") {
    message.style.display = "block";
  } else {
    message.style.display = "none";
    let newNote = $.createElement("li");
    newNote.classList.add("newNoteClass");
    let txtNote = $.createElement("span");
    let deleteNote = $.createElement("i");
    deleteNote.className = "fa fa-trash-o text-danger pl-3 cursor-pointer";
    deleteNote.style.fontSize = "1.4rem";
    deleteNote.addEventListener("click", function (event) {
      event.target.parentElement.remove();
    });
    newNote.innerHTML = "";
    allNote.append(newNote);
    newNote.append(txtNote, deleteNote);
    txtNote.innerHTML = inputNote.value;
    inputNote.value = "";
  }
});
