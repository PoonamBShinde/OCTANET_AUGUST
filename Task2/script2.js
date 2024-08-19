const taskList = document.querySelector('.list-group');
const taskTitleInput = document.getElementById('taskTitle');
const saveTaskButton = document.querySelector('.card-footer .btn-primary');


function createTaskElement(taskText) {
  const li = document.createElement('li');
  li.classList.add('list-group-item');

  li.innerHTML = `
    <div class="todo-indicator bg-primary"></div>
    <div class="widget-content p-0">
      <div class="widget-content-wrapper">
        <div class="widget-content-left mr-2">
          <div class="custom-checkbox custom-control">
            <input class="custom-control-input" type="checkbox">
            <label class="custom-control-label">&nbsp;</label>
          </div>
        </div>
        <div class="widget-content-left">
          <div class="widget-heading">${taskText}</div>
        </div>
        <div class="widget-content-right">
          <button class="border-0 btn-transition btn btn-outline-success" title="Mark Task as Complete">
            <i class="fa fa-check"></i> Complete
          </button>
          <button class="border-0 btn-transition btn btn-outline-info" title="Edit Task">
            <i class="fa fa-edit"></i> Edit
          </button>
          <button class="border-0 btn-transition btn btn-outline-danger" title="Delete Task">
            <i class="fa fa-trash"></i> Delete
          </button>
        </div>
      </div>
    </div>
  `;

  li.querySelector('.btn-outline-success').addEventListener('click', () => markTaskComplete(li));
  li.querySelector('.btn-outline-info').addEventListener('click', () => editTask(li));
  li.querySelector('.btn-outline-danger').addEventListener('click', () => deleteTask(li));

  return li;
}


function addTask() {
  const taskText = taskTitleInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  const newTask = createTaskElement(taskText);
  taskList.appendChild(newTask);
  taskTitleInput.value = '';
}

function markTaskComplete(taskElement) {
  const checkbox = taskElement.querySelector('.custom-control-input');
  checkbox.checked = !checkbox.checked;
  if (checkbox.checked) {
    taskElement.querySelector('.widget-heading').classList.add('text-muted', 'text-decoration-line-through');
  } else {
    taskElement.querySelector('.widget-heading').classList.remove('text-muted', 'text-decoration-line-through');
  }
}


function editTask(taskElement) {
  const taskHeading = taskElement.querySelector('.widget-heading');
  const currentTask = taskHeading.innerText;

  const newTaskText = prompt('Edit your task:', currentTask);
  if (newTaskText !== null && newTaskText.trim() !== '') {
    taskHeading.innerText = newTaskText.trim();
  }
}


function deleteTask(taskElement) {
  if (confirm('Are you sure you want to delete this task?')) {
    taskList.removeChild(taskElement);
  }
}


saveTaskButton.addEventListener('click', addTask);

taskTitleInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});
