const url= 'http://localhost:3000/notes'
const  = document.getElementById("add");
const notes = document.getElementById("notes")

if (notes) {
    notes.forEach((note) => {
        addNewNote(note);
    });
}


/*
function myNotes(){
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
    for (let noteObj of data) {
        renderNoteItem(noteObj)
    }
    })

}
*/

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
function createNote(element){
    const noteTitle = document.querySelector('NoteTitle').value 
    const noteBody = document.querySelector('textarea').value
    fetch(url, {
       
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: noteTitle.value,
          body: noteBody.value,
          created_at: moment().format(),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          renderTodoItem(data)
        })
      clearInputs()

}



//----------------AM I DOING THIS RIGHT??---------------------------

function deleteNote(element){
    const todoId = element.parentElement.id
    fetch(`http://localhost:3000/todos/${todoId}`, {
      method: 'DELETE',
    }).then(function () {
      // this might not be the same DOM structure for you
      element.parentElement.remove()
    })
   

  
}
function updateTodo(element) {
    const todoId = element.parentElement.id
    const todoText = document.querySelector('')
    fetch(`http://localhost:3000/todos/${todoId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item: todoText.value,
        updated_at: moment().format(),
      }),
    })
      .then(function (res) {
        return res.json()
      })
      .then(function (data) {
        console.log(data)
        // update the item in the DOM
        renderTodoText(element.parentElement, data)
      })
  }

// UNsure how to use fetch function to create element and post to url
// used fucntion to create element and display html



function createTodo(todoText) {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // I don't have to include "id" here because json server will add this for me
        item: todoText,
        created_at: moment().format(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // what I get back from the server IS the newly created todo object that looks like this:
        /*
        {
          "item": "Another thing!",
          "id": 5
        }
      */
        // So I can take that data and create a new todo item in the DOM
        renderTodoItem(data)
      })
    clearInputs()
  }



  function renderTodoItem(todoObj) {
    const itemEl = document.createElement('i')
    // I will need to have the id of the todo in order to edit or delete it later, so make sure it's in the DOM
    itemEl.id = todoObj.id
    // These classes are from the css library I'm using -- you can use your own or leave this out
    itemEl.classList.add(
      'lh-copy',
      'pv3',
      'ba',
      'bl-0',
      'bt-0',
      'br-0',
      'b--dotted',
      'b--black-3'
    )
    renderTodoText(itemEl, todoObj)
    todoList.prepend(itemEl)
  }
  
  function renderTodoText(addBtn, todoObj) {
    addBtn.innerHTML = 
    `
    
    `;
  }
  function editTodo(element) {
    showEditInput(element.parentElement)
  }
  function showEditInput(addBtn) {
    todoItem.innerHTML = `
    <input class="edit-text input-reset ba b--black-20 pa2 mb2 w-60" type="text" value="${todoItem.textContent}" autofocus>
    <button class='update-todo bn f6 link br1 ph2 pv1 ml1 dib white bg-green' data-note=${todoItem.id}>save</button>
    <button class='cancel bn f6 link br1 ph2 pv1 ml2 dib black bg-light-gray'>cancel</button>`
  }


function hideEditControls(todoItem) {
    fetch(`http://localhost:3000/todos/${todoItem.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        renderTodoText(todoItem, data)
      })
  }
  
  function clearInputs() {
    form.reset()
  }

