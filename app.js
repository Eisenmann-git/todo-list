let todos = JSON.parse(localStorage.getItem('todos')) || [];

const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// 1. Общая функция-отрисовщик (умеет собирать одну задачу на экране)
const renderTodo = (taskObj) => {
    const newTodo = document.createElement('li');
    const deleteBtn = document.createElement('button');

    newTodo.textContent = taskObj.text;
    newTodo.dataset.id = taskObj.id;
    deleteBtn.textContent = 'X';
    deleteBtn.style.marginLeft = '10px';

    if (taskObj.completed) {
        newTodo.classList.add('completed');
    }

    newTodo.appendChild(deleteBtn);
    todoList.appendChild(newTodo);
};

// 2. Функция добавления новой задачи (по клику на кнопку)
addBtn.addEventListener('click', () => {
    const taskText = todoInput.value.trim();

    if (taskText === "") return; // Валидация на пустоту

    const taskObj = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    todos.push(taskObj);
    localStorage.setItem('todos', JSON.stringify(todos));

    // Вызываем наш отрисовщик
    renderTodo(taskObj);

    // Очищаем поле ввода
    todoInput.value = '';
});

todoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addBtn.click();
    }
})

// 3. Слушатель для кликов по списку (Удаление и Зачеркивание)
todoList.addEventListener('click', (event) => {
    const clickedElement = event.target;

    // Если кликнули по кнопке удаления
    if (clickedElement.tagName === 'BUTTON') {
        const parentLi = clickedElement.parentElement;
        const idToDelete = Number(parentLi.dataset.id);

        todos = todos.filter(task => task.id !== idToDelete);
        localStorage.setItem('todos', JSON.stringify(todos));
        parentLi.remove();
    }
    // Если кликнули по самому тексту задачи (по тегу LI)
    else if (clickedElement.tagName === "LI") {
        const clickedId = Number(clickedElement.dataset.id);
        const task = todos.find(item => item.id === clickedId);

        if (task) {
            task.completed = !task.completed;
        }

        clickedElement.classList.toggle('completed');
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});

// 4. Отрисовка сохраненных задач при загрузке страницы 
todos.forEach(renderTodo);
