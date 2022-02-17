const url='http://localhost:3000/notes/notes'
const addBtn = document.getElementById("add");
const notes = document.getElementById('notes');

if (notes) {
    notes.forEach((note) => {
        addNewNote(note);
    });
}

addBtn.addEventListener("click", () => {
    addNewNote();
});

function addNewNote(text = "") {
    const note = document.createElement("div");
    note.classList.add("note");  
    /*let now = new Date();
    const DateTime = note.querySelector(".dateTime")
    let dateTime = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()} | ${now.getHours()}:${now.getMinutes()}`;
    */
    note.innerHTML = `
        <div class="notes">
            <div class="tools">
                <div id="dateTime">
                </div>
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="main ${text ? "" : "hidden"}"></div>
            <textarea class="${text ? "hidden" : ""}"></textarea>
        </div>
    `;

    const editBtn = note.querySelector(".edit");
    const deleteBtn = note.querySelector(".delete");

    const main = note.querySelector(".main");
    const textArea = note.querySelector("textarea");

   
  

    textArea.value = text;
    main.innerHTML = marked(text);




    editBtn.addEventListener("click", () => {
        main.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    });

    deleteBtn.addEventListener("click", () => {
        note.remove();

        updateLS();
    });

   

    textArea.addEventListener("input", (e) => {
        const { value } = e.target;

        main.innerHTML = marked(value);

        updateLS();
    });

    document.body.appendChild(note);
}

function updateLS() {
    const notesText = document.querySelectorAll("textarea");

    const notes = [];

    notesText.forEach((note) => {
        notes.push(note.value);
    });

    localStorage.setItem("notes", JSON.stringify(notes));
}