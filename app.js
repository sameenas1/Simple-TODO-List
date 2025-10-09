// Get references to DOM elements
const todoForm = document.getElementById('todoForm');
const taskNameInput = document.getElementById('taskName');
const dueDateInput = document.getElementById('dueDate');
const todoTableBody = document.getElementById('todoTableBody');

// Array to hold tasks
let tasks = [];

// Load tasks from localStorage on page load
window.onload = function() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    renderTasks();
};

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Add simple hover effect for table rows using onmouseover and onmouseout
function addRowHoverEvents(row) {
    row.onmouseover = function() {
        row.style.background = '#f1f3fa';
    };
    row.onmouseout = function() {
        row.style.background = '';
    };
}

// Function to render tasks in the table
function renderTasks() {
    todoTableBody.innerHTML = '';
    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        if (task.completed) row.classList.add('task-completed');

        // Task name cell
        const nameCell = document.createElement('td');
        nameCell.textContent = task.name;
        row.appendChild(nameCell);

        // Due date cell
        const dateCell = document.createElement('td');
        dateCell.textContent = task.dueDate;
        row.appendChild(dateCell);

        // Complete checkbox cell
        const completeCell = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.className = 'form-check-input';
        checkbox.onclick = () => toggleComplete(index);
        completeCell.appendChild(checkbox);
        row.appendChild(completeCell);

        // Delete button cell
        const deleteCell = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-delete btn-sm';
        deleteBtn.innerHTML = '<i class="bi bi-trash"></i> Delete';
        deleteBtn.onclick = () => deleteTask(index);
        deleteCell.appendChild(deleteBtn);
        row.appendChild(deleteCell);

    addRowHoverEvents(row);
    todoTableBody.appendChild(row);
    });
}

// Function to add a new task
if (todoForm) {
    todoForm.onsubmit = function(e) {
        e.preventDefault();
        const name = taskNameInput.value.trim();
        const dueDate = dueDateInput.value;
        if (!name || !dueDate) return;

        // Add new task to array
        tasks.push({
            name: name,
            dueDate: dueDate,
            completed: false
        });
        saveTasks(); // Save to localStorage
        renderTasks(); // Update UI

        // Clear form inputs
        taskNameInput.value = '';
        dueDateInput.value = '';
    };
}

// Function to toggle completion status
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// ...existing code...

// Note: All logic is explained in comments above each function.
// - Adding: Form submission adds a new task to the array and localStorage.
// - Deleting: Clicking delete removes the task from array and localStorage.
// - Marking complete: Checkbox toggles completion, updates array and localStorage.
// - Saving: All changes are persisted in localStorage for page reloads.
