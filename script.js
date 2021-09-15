    let addMessage = document.querySelector(".message"),
        addButton = document.querySelector(".add"),
        todo = document.querySelector(".todo"); // список элементов li

    let todoList = [];

    // получение данных после перезагрузки, если они есть
    if(localStorage.getItem("todoLocal")){
        todoList = JSON.parse(localStorage.getItem("todoLocal"));
        displayMessages();
    }

    addButton.addEventListener("click", function(){
        if(!addMessage.value) return; // запрещвем добавлять пустую строку в список

        let newTodo = {
            todo: addMessage.value,
            checked: false,
            important: false
        };

        todoList.push(newTodo);
        displayMessages();
        localStorage.setItem("todoLocal", JSON.stringify(todoList)); // сохраняем введённые данные
        addMessage.value = ""; // очищаем инпут
    });

    function displayMessages(){
        let displayMessage = "";
        if(todoList.length === 0) todo.innerHTML = "";
        todoList.forEach(function(item, i){ // item тут то что ввели в инпут
            displayMessage +=
                `<li>
                    <input type="checkbox" id="item_${i}" ${item.checked ? "checked" : ""}>
                    <label for="item_${i}" class="${item.important ? "important" : ""}" >${item.todo}</label>
                </li>`;
            todo.innerHTML = displayMessage;
        });
    }

    todo.addEventListener("change", function(event){ 
        let idInput = event.target.getAttribute("id");
        let forLabel = todo.querySelector("[for=" + idInput + "]"); // ищем селектор с помощью атрибута for
        let valueLabel = forLabel.innerHTML;

        todoList.forEach(function(item){ // запоминаем выбор checkbox
            if(item.todo === valueLabel){
                item.checked = !item.checked;
                localStorage.setItem("todoLocal", JSON.stringify(todoList));
            }
        });
    });

    todo.addEventListener("contextmenu", function(event){ // действие для правой кнопки мыши
        event.preventDefault(); // отменяем стандартное поведение браузера
        todoList.forEach(function(item, i){
            if(item.todo === event.target.innerHTML){
                if(event.ctrlKey || event.metaKey){ // проверяем. если кнопка зажата. тогда удаляем элемент
                    todoList.splice(i, 1);
                } else {
                    item.important = !item.important;
                }
                displayMessages();
                localStorage.setItem("todoLocal", JSON.stringify(todoList));
            }
        });
    });
