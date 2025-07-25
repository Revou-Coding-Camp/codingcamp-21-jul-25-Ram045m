console.log("Hello, world!");

let tasks = [];

function addTask() {
    //Function to add task
    const taskInput = document.getElementById('todo-input');
    const dateInput = document.getElementById('date-input');

    if (!taskInput.value || !dateInput.value) {
        //alert if task or date input is empty
        alert("Task or date input is empty.");
        return;
    }

    tasks.push({
        title: taskInput.value,
        date: dateInput.value,
    });

    console.log("Task added:", taskInput.value, "on", dateInput.value);
    console.log(tasks);

    renderTasks(); // Re-render tasks after adding a new one
}

function toggleComplete(index) {
    // Function to toggle task completion
    const task = tasks[index];
    task.status = task.status === "complete" ? "incomplete" : "complete";
    renderTasks(); // Re-render tasks after toggling
}

function removeallTask() {
    // Function to remove task
    tasks = [];

    renderTasks(); // Re-render tasks after clearing
}

function removeTask(index) {
    // Function to remove a specific task
    tasks.splice(index, 1);
    renderTasks(); // Re-render tasks after removal
}

function editTask(index) {
    // Function to edit a specific task
    const task = tasks[index];
    const newTitle = prompt("Edit Task Title:", task.title);
    const newDate = prompt("Edit Task Date:", task.date);

    if (newTitle && newDate) {
        tasks[index] = {
            title: newTitle,
            date: newDate,
        };
        renderTasks(); // Re-render tasks after editing
    } else {
        alert("Task title or date cannot be empty.");
    }

}

function renderTasks() {
    // Function to render tasks
    const taskList = document.getElementById('todo-list');
    taskList.innerHTML = ""; // Clear Current tasks

    tasks.forEach((task, index) => {
        taskList.innerHTML += `
        <li class="todo-item flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-2">
            <span class="todo-item">${task.title}</span>
            <span class="todo-date">${task.date}</span>
            <span class="todo-status">${task.status || "incomplete"}</span>
            <div>
            <button class="border px-[20px] py-[6px] rounded-[4px] bg-yellow-500 text-white" onclick="editTask(${index})">Edit</button>
            <button class="border px-[20px] py-[6px] rounded-[4px] bg-red-600 text-white" onclick="removeTask(${index})">Delete</button>
            <button class="border px-[20px] py-[6px] rounded-[4px] ${task.status === 'complete' ? 'bg-gray-500' : 'bg-green-500'} text-white" onclick="toggleComplete(${index})">${task.status === 'complete' ? 'Incomplete' : 'Complete'}
            </button>

            </div>
        </li>
        `;
    });
}

function filterTasks() {
    const statusFilter = document.getElementById('filter-status').value;
    const dateFilter = document.getElementById('filter-date').value;

    let filteredTasks = tasks;

    // Filter by status
    if (statusFilter === "complete") {
        filteredTasks = filteredTasks.filter(task => task.status === "complete");
    } else if (statusFilter === "incomplete") {
        filteredTasks = filteredTasks.filter(task => task.status !== "complete");
    }

    // Filter by date
    if (dateFilter) {
        filteredTasks = filteredTasks.filter(task => task.date === dateFilter);
    }

    // Render filtered tasks
    const taskList = document.getElementById('todo-list');
    taskList.innerHTML = "";

    filteredTasks.forEach((task, index) => {
        taskList.innerHTML += `
        <li class="todo-item flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-2">
            <span class="todo-item">${task.title}</span>
            <span class="todo-date">${task.date}</span>
            <span class="todo-status">${task.status || "incomplete"}</span>
            <div>
            <button class="border px-[20px] py-[6px] rounded-[4px] bg-yellow-500 text-white" onclick="editTask(${index})">Edit</button>
            <button class="border px-[20px] py-[6px] rounded-[4px] bg-red-600 text-white" onclick="removeTask(${index})">Delete</button>
            <button class="border px-[20px] py-[6px] rounded-[4px] ${task.status === 'complete' ? 'bg-gray-500' : 'bg-green-500'} text-white" onclick="toggleComplete(${index})">${task.status === 'complete' ? 'Incomplete' : 'Complete'}</button>
            </div>
        </li>
        `;
    });
}
