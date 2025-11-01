const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

// 📘 Add a new book
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  displayBooks();
}

// 📖 Display all books
function displayBooks() {
  const libraryDiv = document.getElementById("library");
  libraryDiv.innerHTML = "";

  myLibrary.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.id = book.id;

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>by ${book.author}</p>
      <p>${book.pages} pages</p>
      <p>${book.read ? "✅ Read" : "❌ Not read"}</p>
      <button class="toggle-read">Toggle Read</button>
      <button class="remove-book">Remove</button>
    `;

    card.querySelector(".toggle-read").addEventListener("click", () => {
      book.toggleRead();
      displayBooks();
    });

    card.querySelector(".remove-book").addEventListener("click", () => {
      removeBook(book.id);
    });

    libraryDiv.appendChild(card);
  });
}

function removeBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) myLibrary.splice(index, 1);
  displayBooks();
}

// 📋 Form Handling
const newBookBtn = document.getElementById("newBookBtn");
const bookFormDialog = document.getElementById("bookFormDialog");
const bookForm = document.getElementById("bookForm");
const cancelBtn = document.getElementById("cancelBtn");

newBookBtn.addEventListener("click", () => bookFormDialog.showModal());
cancelBtn.addEventListener("click", () => bookFormDialog.close());

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);
  bookForm.reset();
  bookFormDialog.close();
});

// 테스트용 기본 책 2개
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 214, false);
