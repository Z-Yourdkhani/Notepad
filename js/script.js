const $ = document;
const addNoteBtn = $.querySelector("#addNote");
const allNote = $.querySelector("#allNote");
const colorButtons = $.querySelectorAll(".color");
const inputNote = $.querySelector("#inputNote");
const message = $.querySelector("#message");

inputNote.focus();

colorButtons.forEach(button => {
    button.addEventListener("click", setBackgroundColor);
});

inputNote.addEventListener("keyup", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        addAndSaveNote();
    }
});

addNoteBtn.addEventListener("click", addAndSaveNote);

function setBackgroundColor(event) {
    const userColor = event.target.style.backgroundColor;
    $.body.style.backgroundColor = userColor;
}

function addAndSaveNote() {
    const noteContent = inputNote.value.trim();
    if (noteContent === "") {
        showMessage(" لطفا متن مورد نظر خود را وارد کنید.");
    } else {
        const noteId = Date.now().toString();
        const noteElement = createNoteElement(noteContent, noteId);
        appendNoteElement(noteElement);
        saveNoteToLocalStorage(noteId, noteContent);
        inputNote.value = "";
    }
}

function createNoteElement(content, id) {
    const noteElement = document.createElement("li");
    noteElement.classList.add("newNoteClass");
    noteElement.setAttribute("data-note-id", id);

    const textElement = document.createElement("p");
    textElement.textContent = content;

    const editButton = createButton("fa-pencil", () => {
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.value = content;
        inputField.classList.add("edit-input");

        const confirmButton = createButton("fa-check", () => {
            const newText = inputField.value.trim();
            if (newText !== "") {
                textElement.textContent = newText;
                saveNoteToLocalStorage(id, newText);
            }
            noteElement.replaceChild(textElement, inputField);
            noteElement.removeChild(confirmButton);
            editButton.style.display = "inline-block";
            deleteButton.style.display = "inline-block";
        });

        noteElement.replaceChild(inputField, textElement);
        noteElement.appendChild(confirmButton);

        editButton.style.display = "none";
        deleteButton.style.display = "none";

        inputField.focus();

        confirmButton.addEventListener("click", () => {
            const newText = inputField.value.trim();
            if (newText !== "") {
                textElement.textContent = newText;
                saveNoteToLocalStorage(id, newText);
            }
            noteElement.replaceChild(textElement, inputField);
            noteElement.removeChild(confirmButton);
            editButton.style.display = "inline-block";
            deleteButton.style.display = "inline-block";
        });
    });

    const deleteButton = createButton("fa-trash-o", () => deleteNoteAndSave(id));
    deleteButton.style.display = "inline-block";

    noteElement.append(textElement, editButton, deleteButton);
    return noteElement;
}

function createButton(iconClass, onClick) {
    const button = document.createElement("i");
    button.className = `fa ${iconClass} cursor-pointer`;
    button.style.fontSize = "1.4rem";
    button.addEventListener("click", onClick);
    return button;
}

function appendNoteElement(noteElement) {
    allNote.appendChild(noteElement);
}

function deleteNoteAndSave(id) {
    const noteElement = allNote.querySelector(`li[data-note-id="${id}"]`);
    noteElement.remove();
    deleteNoteFromLocalStorage(id);
}

function showMessage(msg) {
    message.textContent = msg;
    message.style.display = "block"
    setTimeout(() => {
        message.style.display = "none";
    }, 1200);
}

function saveNoteToLocalStorage(id, content) {
    localStorage.setItem(id, content);
}

function deleteNoteFromLocalStorage(id) {
    localStorage.removeItem(id);
}

function loadNotesFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        const id = localStorage.key(i);
        const content = localStorage.getItem(id);
        const noteElement = createNoteElement(content, id);
        appendNoteElement(noteElement);
    }
}

document.addEventListener("DOMContentLoaded", loadNotesFromLocalStorage);