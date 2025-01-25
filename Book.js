class Book {
    constructor(title, author, pages, isRead = false) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.isRead = isRead;
    }
  
    toggleReadStatus() {
      this.isRead = !this.isRead;
    }
  }
  