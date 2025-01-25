class Library {
    constructor() {
      this.books = [];
      this.initEventListeners();
    }
  
    addBook(book) {
      this.books.push(book);
      this.renderLibrary();
    }
  
    removeBook(index) {
      this.books.splice(index, 1);
      this.renderLibrary();
    }
  
    toggleReadStatus(index) {
      this.books[index].toggleReadStatus();
      this.renderLibrary();
    }
  
    renderLibrary() {
      const libraryContainer = document.querySelector(".library");
      libraryContainer.innerHTML = "";
  
      this.books.forEach((book, index) => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book");
        bookElement.innerHTML = `
          <h3>${book.title}</h3>
          <p>Author: ${book.author}</p>
          <p>Pages: ${book.pages}</p>
          <button class="toggle-read" data-index="${index}">${book.isRead ? "Read" : "unRead"}</button>
          <button class="delete" data-index="${index}">Delete</button>
        `;
        libraryContainer.appendChild(bookElement);
      });
  
      this.addEventListenersToButtons();
    }
  
    addEventListenersToButtons() {
      const deleteButtons = document.querySelectorAll(".delete");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          const index = e.target.dataset.index;
          this.removeBook(index);
        });
      });
  
      const toggleReadButtons = document.querySelectorAll(".toggle-read");
      toggleReadButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          const index = e.target.dataset.index;
          this.toggleReadStatus(index);
        });
      });
    }
  
    initEventListeners() {
      const addBookButton = document.querySelector(".add-book");
      const panel = document.querySelector(".adding-book");
      const closeButton = document.querySelector(".close");
      const form = document.querySelector(".adding-book");
  
      addBookButton.addEventListener("click", () => {
        panel.style.display = "flex";
      });
  
      closeButton.addEventListener("click", () => {
        panel.style.display = "none";
      });
  
      form.addEventListener("submit", (event) => {
        event.preventDefault();
  
        const title = document.querySelector(".title").value.trim();
        const author = document.querySelector(".autor").value.trim();
        const pages = document.querySelector(".pages").value.trim();
        const error = document.querySelector(".error");
  
        if (title === "" || author === "" || pages === "" || isNaN(pages) || pages <= 0) {
          error.textContent = "Please fill in all fields with valid data.";
          error.style.backgroundColor = "cyan";
          return;
        } else {
          error.textContent = "";
          error.style.backgroundColor = "white";
        }
  
        const newBook = new Book(title, author, Number(pages));
        this.addBook(newBook);
  
        form.reset();
        panel.style.display = "none";
      });
    }
  }