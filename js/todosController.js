'use strict'

function init() {
    loadData();
    renderTodos();
}


function renderTotals() {
    var elTotalSpan = document.querySelector('#total-todos');
    var elActiveSpan = document.querySelector('#active-todos');

    elTotalSpan.innerHTML = getTotalTodosCount();
    elActiveSpan.innerHTML = getActiveTodosCount();
}

function renderTodosList() {
    var elTodods = document.querySelector('.todos');
    var todos = getTodosToRender();
    if (todos.length === 0) {
        var userMsg = listIsEmptyMsg(todos);
        elTodods.innerHTML = userMsg;
    }
    else {
        var strLis = todos.map(function (todo) {
            return `<li class="todo ${todo.isDone ? 'done' : ''}" onclick="onTodoClicked(${todo.id})">
                    ${todo.title} <span class="delete" onclick="confirmDelete(${todo.id} , event)">🐽</span><span class="time-stamp">Created at: ${todo.createTime}</span>
                    <span class="show-importance">Importance: ${todo.importance}</span>
                </li>\n`;
        })
        elTodods.innerHTML = strLis.join('');
    }
    
}

function confirmDelete(todoID, event) {
    var str = `Are you Sure?
            <button onclick="onDeleteClick(${todoID})">YES</button>
            <button onclick="closeWindow()">NO</button>`
    console.log(str);
    document.querySelector('.modal-confirm').innerHTML = str;
    event.stopPropagation();
}

function closeWindow() {
    document.querySelector('.modal-confirm').innerHTML = '';
}

function listIsEmptyMsg(todos) {
    if (gStatusFilter === 'all') return 'No todos';
    if (gStatusFilter === 'active') return 'No Active Todos';
    if (gStatusFilter === 'done') return 'No Done Todos';
}

function renderTodos() {
    renderTodosList();
    renderTotals();
}

function onDeleteClick(todoID) {
    deleteTodo(todoID);
    closeWindow();
    renderTodos();
}

function onTodoClicked(todoID) {
    toggleDone(todoID);
    renderTodos();
}

function onAddClick() {
    var elTxtTodo = document.querySelector('#todo-title');
    var newTodoTitle = elTxtTodo.value;
    if (!newTodoTitle) return;
    addTodo(newTodoTitle, document.querySelector('#importance').value);
    renderTodos();
}

function onStatusFilterChange(elStatusFilter) {
    var filterByStatus = elStatusFilter.value;
    setFilterStatus(filterByStatus);
    renderTodos();
}

function onStatusSortChange(elStatusSort) {
    var SortByStatus = elStatusSort.value;
    setSortStatus(SortByStatus);
    renderTodos();
}
