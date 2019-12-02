var gTodos = [], gNextID = 1, gStatusFilter = 'all', gStatusSort = 'created';

function createTodo(title, importance) {
    var todo = {
        title,
        isDone: false,
        id: gNextID++,
        timeStamp: Date.now(),
        createTime: createdAt(Date.now()),
        importance: +importance
    }
    saveToStorage('gNextID', gNextID);
    return todo;
}


function saveTodos() {
    saveToStorage('todos', gTodos);
}

function loadData() {
    gTodos = loadFromStorage('todos', []);
    gNextID = loadFromStorage('gNextID', 1)
}


function getTodosToRender() {
    var filteredTodos = gTodos.filter(function (todo) {
        return ((gStatusFilter === 'all') ||
            (gStatusFilter === 'active' && !todo.isDone) ||
            (gStatusFilter === 'done' && todo.isDone))
    });
    filteredTodos = filterBy(filteredTodos);
    return filteredTodos;
}

function findTodoById(todoID) {
    return gTodos.find(function (todo) {
        return todo.id === todoID
    });
}
function findTodoIndexById(todoID) {
    return gTodos.findIndex(function (todo) {
        return todo.id === todoID
    });
}

function toggleDone(todoID) {
    var todo = findTodoById(todoID);
    todo.isDone = !todo.isDone;
    saveTodos()
}

function addTodo(title, importance) {
    var newTodo = createTodo(title, importance);
    gTodos.push(newTodo);
    saveTodos()
}

function deleteTodo(todoID) {
    var todoIndex = findTodoIndexById(todoID);
    gTodos.splice(todoIndex, 1);
    saveTodos()
}

function setFilterStatus(statusFilter) {
    gStatusFilter = statusFilter;
}

function setSortStatus(statusSort) {
    gStatusSort = statusSort;
}

function getActiveTodosCount() {
    return gTodos.reduce(function (count, todo) {
        if (!todo.isDone) count++;
        return count;
    }, 0);
}

function getTotalTodosCount() {
    return gTodos.length;
}

function filterBy(filteredTodos) {

    if (gStatusSort === 'created') {
        filteredTodos.sort(function (a, b) {
            a.createTime - b.createTime;
        })
    }

    if (gStatusSort === 'txt') {

        filteredTodos.sort(function (a, b) {
            var nameA = a.title.toUpperCase(); // ignore upper and lowercase
            var nameB = b.title.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        })
    }

    if (gStatusSort === 'importance') {
        filteredTodos.sort(function (a, b) {
            a.importance - b.importance;
        })
    }

    return filteredTodos;
}


function createdAt(now) {
    var date = new Date(now);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}
