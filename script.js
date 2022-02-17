const url= 'http://localhost:3000/notes'
const addBtn = document.getElementById("add");
const notes = document.getElementById("notes")

if (notes) {
    notes.forEach((note) => {
        addNewNote(note);
    });
}



function myNotes(){
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
    for (let noteObj of data) {
        renderNoteItem(noteObj)
    }
    })

}

// CRUD FUCCTIONATO UPDATE 
function updateNote(element) {  
    const noteTitle = document.querySelector('NoteTitle').value 
    const noteBody = document.querySelector('textarea').value
    fetch(`http://localhost:3000/notes/${noteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: noteTitle,
            body: noteBody,
            
            // updated_at: moment().format(),
        }),
    })
    .then(function (res) {
        return res.json()
    })
    .then(function (data) {
        console.log(data)
        renderNoteText(element.parentElement, data)
    })

}

// ---------------------CREATE IT-------------------------------------------
// @@ FETCH FUNCTION RETURNS NULL
function createNote(noteBody){
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item: todoText,
          created_at: moment().format(),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          renderTodoItem(data)
        })
      clearInputs()

}
addBtn.addEventListener("click", () => 
{

    addNewNote();
});


///----------------------------- MORE CONSTSTANTS ---------------------------------
const main = note.querySelector(".main");
const Notetitle= note.querySelector("Notetitle")
const textArea = note.querySelector("textarea");

textArea.value = text;
main.innerHTML = marked(text);


//----------------AM I DOING THIS RIGHT?? IDK I've HAD WAY TO MANY MONSTERS---------------------------

function deleteNote(element){
    const todoId = element.parentElement.id
    // problems initalizing json server
    fetch(`http://localhost:3000/todos/${todoId}`, {
      method: 'DELETE',
    }).then(function () {
    
        deleteBtn.addEventListener("click", () => {
            const deleteBtn = note.querySelector(".delete");
        
            note.remove();
        
            updateLS();
        });
      
    })

  
}
function updateTodo(element){


}
function updateNotes(element){
    const editBtn = note.querySelector(".edit");
    const NotesId=element.parentElement.id

//fetch('')


/*editBtn.addEventListener("click", () => {
  
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
});
*/

}

textArea.addEventListener("input", (e) => {
    
    const { value } = e.target;

    main.innerHTML = marked(value);

    updateLS();
});

// UNsure how to use fetch function to create element and post to url
// used fucntion to create element and display html
function addNewNote(text = "") {
    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `
        <div class="notes">
            <div class="tools">
            <div id="Notetitle"></div>
            <div id="dateTime"></div>
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="main ${text ? "" : "hidden"}"></div>
            <textarea class="${text ? "hidden" : ""}"></textarea>
        </div>
    `;

  

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


// NEED TO ADD HTTP REQUEST
// CRUD IS CRUD LOL