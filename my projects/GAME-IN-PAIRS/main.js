(() => {
  // Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

  function createNumbersArray(count) {
    let arrayNumbers = [];

    for (let i = 1; i <= count; ++i) {
      arrayNumbers.push(i);
      arrayNumbers.push(i);
    }

    return arrayNumbers;
  }

  // Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

  function shuffle(arr) {
    for (let i = 0; i < arr.length; ++i) {
      let j = Math.floor(Math.random() * arr.length);

      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    return arr;
  }

  // Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

  function startGame(count) {
    const ARRAY_OF_PAIRS = createNumbersArray(count);
    const ARRAY_OF_RANDOM_PAIRS = shuffle(ARRAY_OF_PAIRS);

    return ARRAY_OF_RANDOM_PAIRS;
  }

  // Этам 4. Создаем DOM
  function createCardItem(array) {
    for (let i = 0; i < array.length; ++i) {
      const cardItem = document.createElement('li');
      cardItem.classList.add('list-card-item', 'flex');
      gameAppUI.append(cardItem);
      arrayItems.push(cardItem);
    }
  }

  function comparisonOfCards(event) {
    // сравним если не взяты карточки
    if (firstCard === null) {
      firstCard = event.target.textContent;
      firstCardElement = event.target;
    } else if (secontCard === null) {
      secontCard = event.target.textContent;
      secontCardElement = event.target
    }
    // если оба карточки взяты
    if ((firstCard !== null) && (secontCard !== null)) {
      // если пары есть оставляем
      if (firstCard === secontCard) {
        copyArrayCards.pop();
        copyArrayCards.pop();
        console.log(copyArrayCards);
        firstCard = null;
        secontCard = null;
        // удалить из коопии массива пары для появление кнопки
      } else {
        setTimeout(() => {
          firstCardElement.classList.remove('list-card-item_click');
          firstCardElement.classList.add('list-card-item');
          secontCardElement.classList.remove('list-card-item_click');
          secontCardElement.classList.add('list-card-item');
          firstCardElement.textContent = '';
          secontCardElement.textContent = '';
          firstCard = null;
          secontCard = null;
        }, 1000);
      }
    }
  }

  const gameApp = document.getElementById('game-in-pairs');
  const gameAppUI = document.createElement('ul');
  gameAppUI.classList.add('list-cards', 'flex');
  const buttonRest = document.createElement('button');

  let arrayCards = startGame(4);
  let copyArrayCards = startGame(4);

  let arrayItems = []; // массив элементов li
  let firstCard = null;   // первая карточка
  let secontCard = null;  // вторая карточка
  let firstCardElement = null;
  let secontCardElement = null;

  // надо будет сравнить что две карточки выбраны и только тогда сравнивать
  // их на совпадение

  gameAppUI.addEventListener('click', (event) => {
    // перебираем элементы в массива для совпадение клика
    // можно написать функцию с event аргументом
    for (let i = 0; i < arrayItems.length; ++i) {
      if (event.target === arrayItems[i]) {
        event.target.classList.add('list-card-item_click');
        event.target.classList.remove('list-card-item');
        event.target.textContent = arrayCards[i];
      }
    }

    comparisonOfCards(event);
    // если все карточки открыты
    if (copyArrayCards.length === 0) {
      gameApp.append(buttonRest);
      buttonRest.textContent = 'Сыграть ещё раз';
    }
  });
  // событие для кнопки
  buttonRest.addEventListener('click', () => {
    // удаляем все
    for (let i = 0; i < arrayItems.length; ++i) {
      arrayItems[i].classList.remove('list-card-item_click');
      arrayItems[i].classList.add('list-card-item');
      arrayItems[i].textContent = '';
    }

    arrayCards = startGame(4);
    copyArrayCards = startGame(4);

    buttonRest.remove();
  });

  document.addEventListener('DOMContentLoaded', () => {
    gameApp.append(gameAppUI);
    createCardItem(arrayCards);
  });
})();