let todos = JSON.parse(localStorage.getItem('todos')) || [];

const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// 2. Функция добавления новой задачи
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

    // Создаем элементы
    const newTodo = document.createElement('li');
    const deleteBtn = document.createElement('button');

    // Наполняем их содержимым
    newTodo.textContent = taskText;
    newTodo.dataset.id = taskObj.id;
    deleteBtn.textContent = 'X';
    deleteBtn.style.marginLeft = '10px';

    // Вкладываем кнопку удаления внутрь li
    newTodo.appendChild(deleteBtn);

    // Добавляем готовую li в общий список ul
    todoList.appendChild(newTodo);

    // Очищаем поле ввода
    todoInput.value = '';
});

// 3. ОТДЕЛЬНЫЙ слушатель для управления списком (Делегирование)
todoList.addEventListener('click', (event) => {
    const clickedElement = event.target; // Элемент, по которому реально кликнули

    // Если кликнули по кнопке удаления
    if (clickedElement.tagName === 'BUTTON') {
        // 1. Находим родителя (тег LI) кнопки удаления и забираем его ID
        const parentLi = clickedElement.parentElement;
        const idToDelete = Number(parentLi.dataset.id);

        // 2. ФИЛЬТРУЕМ: Оставляем в массиве только те задачи, ID которых НЕ равен idToDelete
        todos = todos.filter(task => task.id !== idToDelete);

        // 3. Сохраняем обновленный (уже уменьшенный) массив в localStorage
        localStorage.setItem('todos', JSON.stringify(todos));

        // 4. Удаляем строку с экрана
        parentLi.remove();
    }
    // Если кликнули по самому тексту задачи (по тегу LI)
    else if (clickedElement.tagName === "LI") {
        // 1. Берем ID из HTML-тега и превращаем в число
        const clickedId = Number(clickedElement.dataset.id);

        // 2. Ищем этот объект задачи в нашем массиве todos
        const task = todos.find(item => item.id === clickedId);

        // 3. Если нашли, инвертируем его статус completed (был false -> станет true)
        if (task) {
            task.completed = !task.completed;
        }

        // 4. Переключаем зачеркивание на экране
        clickedElement.classList.toggle('completed');

        // 5. Записываем обновленный массив в записную книжку браузера
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});

// 4. Отрисовка сохранненных задач при загрузке страницы
todos.forEach(taskObj => {
    const newTodo = document.createElement('li');
    const deleteBtn = document.createElement('button')

    newTodo.textContent = taskObj.text;
    newTodo.dataset.id = taskObj.id;
    deleteBtn.textContent = 'X';
    deleteBtn.style.marginLeft = '10px';

    if (taskObj.completed) {
        newTodo.classList.add('completed');
    }

    newTodo.appendChild(deleteBtn);
    todoList.appendChild(newTodo);
});