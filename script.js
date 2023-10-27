const headerBtn = document.querySelector('#btn');
const overlay = document.querySelector('.overlay');
const main = document.querySelector('.main');
const form = document.querySelector('form');
const modal = document.querySelector('.modal');

const LOCAL_STORAGE_LIST_KEY = 'book.list';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

// Code without class (Function code)

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
}

function saveAndRender() {
  save();
  render();
}

function clearList(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function RemoveBtn(ID) {
  // const removeBook = document.getElementById(Id);
  lists = lists.filter((list) => list.id !== ID);
  clearList(main);
  saveAndRender();
}

function createBook() {
  lists.forEach((book) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.dataset.id = book.id;
    const books = document.createElement('p');
    books.classList.add('name');
    books.innerText = book.bookName;
    const author = document.createElement('p');
    author.classList.add('author');
    author.innerText = book.author;
    const pages = document.createElement('p');
    pages.classList.add('pages');
    pages.innerText = `${book.pages} pages`;
    const buttons = document.createElement('div');
    buttons.classList.add('buttons');
    const unreadBtn = document.createElement('button');
    unreadBtn.classList.add(book.status, 'btn');
    unreadBtn.innerText = book.status;

    unreadBtn.addEventListener('click', () => {
      book.status = book.status === 'Read' ? 'Unread' : 'Read';
      saveAndRender();
    });

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn', 'btn');
    removeBtn.innerText = 'Remove';

    removeBtn.addEventListener('click', () => {
      RemoveBtn(book.id);
    });

    buttons.appendChild(unreadBtn);
    buttons.appendChild(removeBtn);
    cardDiv.appendChild(books);
    cardDiv.appendChild(author);
    cardDiv.appendChild(pages);
    cardDiv.appendChild(buttons);
    main.appendChild(cardDiv);
  });
}

function render() {
  clearList(main);
  createBook();
}

function openAndClosePopup() {
  overlay.classList.toggle('active');
  modal.classList.toggle('active');
}

function openPopup() {
  openAndClosePopup();
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function closePopup(event) {
    if (event.target === overlay) {
      openAndClosePopup();
    }
  };
}

function addBook(event) {
  event.preventDefault();
  const fd = new FormData(form);
  const obj = Object.fromEntries(fd);
  obj.status = 'Unread';
  obj.id = Date.now().toString();
  lists.push(obj);
  openAndClosePopup();
  saveAndRender();
  form.reset();
}

headerBtn.addEventListener('click', openPopup);
form.addEventListener('submit', addBook);
render();
