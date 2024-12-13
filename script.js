// Get DOM elements
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Render todos
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => toggleTodo(index);
        
        const span = document.createElement('span');
        span.textContent = todo.text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTodo(index);
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
    
    // Save to localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Add new todo
function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ text, completed: false });
        todoInput.value = '';
        renderTodos();
    }
}

// Toggle todo completion
function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

// Delete todo
function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

// Add todo on Enter key
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Initial render
renderTodos();