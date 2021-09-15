const addBtn = document.getElementById("add");
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => {
    addNotes(note);
  });
  let textArea = document.querySelector("textarea");
  textArea.focus();
}

addBtn.addEventListener("click", () => {
  addNotes();
  let textAreas = document.querySelectorAll("textarea");
  textAreas.forEach((textArea) => {
    textArea.focus();
  });
});

function addNotes(text = "") {
  const note = document.createElement("main");
  note.classList.add("note");

  note.innerHTML = `
  <section class="notes">
        <div class="tools">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""} "></textarea>
      </section>`;

  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");
  const main = note.querySelector(".main");
  const textarea = note.querySelector("textarea");

  textarea.value = text;
  main.innerHTML = marked(text);

  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textarea.classList.toggle("hidden");
    textarea.focus();
  });

  deleteBtn.addEventListener("click", () => {
    note.remove();
    update();
  });

  textarea.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = marked(value);
    update();
  });

  document.body.appendChild(note);
}

function update() {
  const notesText = document.querySelectorAll("textarea");
  const notes = [];

  notesText.forEach((note) => {
    notes.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}
