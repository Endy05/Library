const myLibrary = [
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      pages: 281,
      isRead: true,
    },
    {
      title: "1984",
      author: "George Orwell",
      pages: 328,
      isRead: true,
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      pages: 180,
      isRead: false,
    },
  ];
  
  function Book(title, author, pages, isRead = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
  
  function renderLibrary() {
    const libraryContainer = document.querySelector("#library");
    libraryContainer.innerHTML = ""; 
  
    myLibrary.forEach((book, index) => {
      const bookElement = document.createElement("div");
      bookElement.classList.add("book");
  
      bookElement.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <button class="delete" data-index="${index}">Delete</button>
        <button class="toggle-read" data-index="${index}">
          ${book.isRead ? "Read" : "Not Read"}
        </button>
      `;
  
      libraryContainer.appendChild(bookElement);
    });

    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        myLibrary.splice(index, 1);
        renderLibrary();
      });
    });
  
    const toggleReadButtons = document.querySelectorAll(".toggle-read");
    toggleReadButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        myLibrary[index].isRead = !myLibrary[index].isRead; 
        renderLibrary();
      });
    });
  }
  
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
    myLibrary.push(newBook);
  
    // Очищення форми
    form.reset();
    panel.style.display = "none";
  
    renderLibrary();
  });

  renderLibrary();
  