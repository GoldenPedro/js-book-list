class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() { this.read == "true" ? this.read = "false" : this.read = "true" }
}

const quixote = new Book("The Martian", "Andy Weir", 387, "true");
const artOfWar = new Book("Foundation", "Isaac Asimov", 255, "true");
const books = [quixote, artOfWar];
const submitBtn = document.getElementById("form-submit");
const bookForm = document.querySelector(".book-form");

// Submit form button listener
submitBtn.addEventListener("click", function() {
  addBook(books);
  render(books);
})

function render(books) {
  const mainContainer = document.querySelector(".main-container");
  let booksContainer = document.querySelector(".books-container");
  
  // Removes books container to prevent listing books more than once
  if (booksContainer) { mainContainer.removeChild(booksContainer); }

  booksContainer = document.createElement("section");
  booksContainer.className = "books-container";

  mainContainer.insertAdjacentElement('afterbegin', booksContainer)

  // Generate the HTML to display each book as an article 
  books.forEach(function(book) {
    let bookInfo = `TITLE: ${book.title} \xa0\xa0
                    AUTHOR: ${book.author} \xa0\xa0
                    PAGES: ${String(book.pages).slice(0, 4)}`;
    book.read == "true" ? bookInfo += " \xa0\xa0 READ: Yes" : bookInfo += " \xa0\xa0 READ: No";
    const node = document.createElement("article");
    const textNode = document.createTextNode(bookInfo); 
    
    // Add a delete button for each book
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteButtonClass");
    deleteBtn.innerHTML = "Delete Book";
    deleteBtn.addEventListener("click", function() {
      booksContainer.removeChild(node);
      const bookToDelete = books.indexOf(book);
      if (bookToDelete > -1) {
        books.splice(bookToDelete, 1);
      }
    })

    node.className = "book";
    node.title ="Click to toggle read/not read";                 
    node.appendChild(textNode);
    node.appendChild(deleteBtn);

    // Listener to toggle read / not read on each book 
    node.addEventListener("click", function() {
      book.toggleRead();
      render(books);
    })

    // Set a different background to each article to improve clarity
    if (books.indexOf(book) % 2 == 0) { node.style.background = "rgb(235, 233, 233)"; }
    if (books.indexOf(book) % 2 != 0) { node.style.background = "rgb(243, 248, 242)"; }

    booksContainer.appendChild(node);

  })
}

function addBook(books) {
  const title = document.getElementById("form-title").value;
  const author = document.getElementById("form-author").value; 
  const pages = document.getElementById("form-pages").value;
  let read = false;
  const readRadios = document.getElementsByName('read');

  readRadios.forEach(function(radio)  {
    if (radio.checked) {
      read = radio.value;
    }
  })

  const newBook = new Book(title, author, pages, read);
  books.push(newBook);
}

render(books);