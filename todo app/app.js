// Fetch content of todo key in localStorage
function get_todos(){
    var todos = new Array;
    var todos_str = localStorage.getItem('todo');
    if (todos_str != null) {
        todos = JSON.parse(todos_str);
    }
    return todos;
}

// Add new todo entry
function add(){
    // Locate HTML element with id 'task' and retrieve value user typed in
    var task = document.getElementById('task').value;
    // Call get_todos, retrieve already existing list of todo items in database
    var todos = get_todos();
    // Append new task to array using push method and save new list of todos to database
    todos.push(task);
    localStorage.setItem('todo', JSON.stringify(todos));
    // Updates list of todos displayed on page
    show();
    // Avoid any further actions generated from click event
    return false;

}

// show the todo list
function show() {
    // Call get_todos to get the array of todo items
    var todos = get_todos();
    // Create HTML snippet in html variable (ul with li for each todo entry). Adds a button to each list item, used to remove items from the list.
    var html = '<ul>';
    for(var i=0; i < todos.length; i++){
        html += '<li>' + todos[i] + '<button class="remove fas fa-times pure-button id="' + i + '"></button></li>';
    };
    html += '</ul>';
    // Inserts newly generated HTML snippet into the original document
    document.getElementById('todos').innerHTML = html;
    // Fetch all buttons in the 'remove' class. Assign an event listener that will be called if the user clicks on buttons.
    var buttons = document.getElementsByClassName('remove');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    }
}

// Remove a todo item
function remove(){
    // 'this' represents the current DOM-object which is the remove button. Retrieves value of its id using getAttribute.
    var id = this.getAttribute('id');
    var todos = get_todos();
    // Removes specific element from array
    todos.splice(id,1);
    // Stores new list back into database
    localStorage.setItem('todo', JSON.stringify(todos));
    // Update list in the browser
    show();
    // Stops propagination of click event
    return false;
}

document.getElementById('add').addEventListener('click', add);
show();

