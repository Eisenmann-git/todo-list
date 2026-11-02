// 1. Получаем элементы из DOM
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// 2. Функция добавления новой задачи
addBtn.addEventListener('click', () => {
    const taskText = todoInput.value.trim();

    if (taskText === "") return; // Валидация на пустоту

    // Создаем элементы
    const newTodo = document.createElement('li');
    const deleteBtn = document.createElement('button');

    // Наполняем их содержимым
    newTodo.textContent = taskText;
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
        clickedElement.parentElement.remove(); // Удаляем родительский <li>
    } 
    // Если кликнули по самому тексту задачи (по тегу LI)
    else if (clickedElement.tagName === 'LI') {
        clickedElement.classList.toggle('completed'); // Переключаем зачеркивание
    }
});
