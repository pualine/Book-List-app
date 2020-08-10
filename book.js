// Book class
class Books {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
// User interface. class
class UserInt {
  static displayBooks() {
    const myBooks = BookStore.getBooks();

    myBooks.forEach((book) => UserInt.addBook(book)); //this loops through the bookstore
  }
  static addBook(book) {
    const LIST = document.getElementById("bookLists");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td <a href="#" class="btn btn-danger btn-sm delete">Del</a></td>
    `; //This adds the colomns
    LIST.appendChild(row);
  }
  static deleteBk(element) {
    if (element.classList.contains("delete")) {
      element.parentElement.parentElement.removeChild(element.parentElement);
    }
  }

  // Display Alert with background color using bootsrap className
  static displayAlert(msg, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector(".container");
    const form = document.getElementById("bookForm");
    container.insertBefore(div, form);

    //   clear after 3sec.
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }
  static clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// Storing Books class---localStorage
class BookStore {
  // Get books

  static getBooks() {
    let buuks;
    if (localStorage.getItem("buuks") === null) {
      buuks = [];
    } else {
      buuks = JSON.parse(localStorage.getItem("buuks"));
    }
    return buuks;
  }

  // Add Books
  static addBK(book) {
    const buuks = BookStore.getBooks();
    buuks.push(book);
    localStorage.setItem("buuks", JSON.stringify(buuks));
  }

  // Remove book
  static deletBook(isbn) {
    const buuks = BookStore.getBooks();
    buuks.forEach((book, index) => {
      if (book.isbn === isbn) {
        buuks.splice(index, 1);
      }
    });
    localStorage.setItem("buuks", JSON.stringify(buuks));
  }
}
// Event to Display books
document.addEventListener("DOMContentLoaded", UserInt.displayBooks);
// Event to Add a Book to the lists
document.getElementById("bookForm").addEventListener("submit", (event) => {
  // prevent default submit setting
  //   event.preventDefault();

  //Get form values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  // Form validation
  if (title == "" || author == "" || isbn == "") {
    UserInt.displayAlert("Please fill all fields", "danger");
  } else {
    //Create new instances of the Books class(This happens when the user add a book)
    const BOOK = new Books(title, author, isbn);

    // Add book tot the User Interface
    UserInt.addBook(BOOK);

    //   Add item to localstorage
    BookStore.addBK(BOOK);

    //   Display a successfull mesg
    UserInt.displayAlert("Book Added!", "success");

    // Clear field of inputs
    UserInt.clearFields();
  }
});

// Event to remove a Book from the  user interface
document.getElementById("bookLists").addEventListener("click", (event) => {
  UserInt.deleteBk(event.target);

  // Delete item from localstorage
  BookStore.deletBook(
    event.target.parentElement.previousElementSibling.textContent
  );

  // Display a delete msg
  UserInt.displayAlert("Book Deleted!", "secondary");
});
