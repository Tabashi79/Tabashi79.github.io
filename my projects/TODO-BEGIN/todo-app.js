(function() {
  // создаём и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  // создаём и возвращаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button
    };
  }

  // создаём и возвращаем список элементов
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  function createTodoItem(objArrayCases) {
    let item = document.createElement('li');
    // кнопки помещаем в элемент, который красиво покажет их в одной группе
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    // устанавливаем стили для элемента списка, а также для размещения кнопок
    // в его правой части с помощью flex
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = objArrayCases.name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    // вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    // приложению нужен доступ к самому элементу в кнопкам, чтобы обрабатывать события нажатия
    return {
      item,
      doneButton,
      deleteButton
    }
  }

  function createTodoApp(container, title = 'Список дел', listName) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    let arrayCases = [];

    // проверяем есть дело в localStorage
    if (localStorage.getItem(listName) !== null) {
      let strLoadCase = localStorage.getItem(listName);
      let arrayLoadCase = JSON.parse(strLoadCase);
      arrayCases = arrayLoadCase;
      console.log(arrayCases);

      // добавить список дел на страницу
      for (v of arrayCases) {
        let todoItem = createTodoItem(v);

        if (v.done === true) {
          todoItem.item.classList.add('list-group-item-success');
        } else {
          todoItem.item.classList.remove('list-group-item-success');
        }

        changeItemStatus(todoItem.item, todoItem.doneButton);
        deleteItem(todoItem.item, todoItem.deleteButton);
        todoList.append(todoItem.item);
      }
    }

    // сохранение список дел
    function saveCases(cases) {
      let strCases = JSON.stringify(cases);
      localStorage.setItem(listName, strCases);
    }

    // функция для поиска
    function searchArrayName(item) {
      let cloneItem = item.cloneNode(true);
      let childNodes = cloneItem.querySelectorAll('*');
      childNodes.forEach((child) => {
        child.textContent = '';
      })

      return newTextParent = cloneItem.textContent.trim();
    }

    // событие для кнопки, disabled
    function toggleSubmitButton() {
      if (todoItemForm.input.value.trim() !== "") {
        todoItemForm.button.disabled = false;
      } else {
        todoItemForm.button.disabled = true;
      }
    }

    function searchItemStatus(array, item) {
      searchArrayName(item);

      for (let object of array) {
        if (object.name === newTextParent) {
          if (object.done === false) {
            object.done = true;
          } else {
            object.done = false;
          }
        }
      }
    }

    // кнопка для сделанных делов
    function changeItemStatus(item, button) {
      button.addEventListener('click', function() {
        searchArrayName(item);

        for (let object of arrayCases) {
          if (object.name === newTextParent) {
            item.classList.toggle('list-group-item-success');
            searchItemStatus(arrayCases, item);
            saveCases(arrayCases);
          }
        }
      });
    }

    // кнопка для удаление элемента
    function deleteItem(item, button) {
      button.addEventListener('click', function () {
        if (confirm('Вы уверены?')) {
          searchArrayName(item);

          for (let object of arrayCases) {
            if (object.name === newTextParent) {
              arrayCases.splice(arrayCases.indexOf(object), 1);
              item.remove();
              saveCases(arrayCases);
            }
          }
        }
      });
    }

    todoItemForm.input.value = '';

    // игнорируем создание элемента, если пользователь ничего не ввёл в поле
    if (todoItemForm.input.value === '') {
      todoItemForm.button.setAttribute('disabled', '');
    }

    // чтоб кнопка не работала когда текста нет
    todoItemForm.input.addEventListener('input', toggleSubmitButton);

    // браузер создаёт событие submit на форме по нажатию на Enter или на кнопку создания дела
    todoItemForm.form.addEventListener('submit', function(e) {
      // эта строчка необходима, чтобы предотвратить стандартное действия браузера
      // в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
      e.preventDefault();

      let todoItem = createTodoItem({name: todoItemForm.input.value});

      // генерация id
      let id = Math.floor(Math.random() * 9999) + 1;

      // заполняем массив дел
      arrayCases.push({id, name: todoItemForm.input.value, done: false});

      saveCases(arrayCases);

      changeItemStatus(todoItem.item, todoItem.doneButton);
      deleteItem(todoItem.item, todoItem.deleteButton);

      // создаём и добавляем в список новое дела с названием из поля для ввода
      todoList.append(todoItem.item);
      // обнуляем значение в поле, чтобы не пришлось стирать его вручную
      todoItemForm.input.value = '';
    });
  }

  window.createTodoApp = createTodoApp;
})();