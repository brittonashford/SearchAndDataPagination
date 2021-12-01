/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


/*
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
    const itemsPerPage = 9;
    let startIndex = (page * itemsPerPage) - itemsPerPage;
    let endIndex = (page * itemsPerPage);
    

    studentList.innerHTML = '';
    let studentItem = '';

    for (i = 0; i < list.length; i++) {
        if (i >= startIndex && i < endIndex) {
            studentItem = document.createElement('li');
            studentItem.innerHTML = `<li class="student-item cf">
                <div class="student-details">
                    <img class="avatar" src=${list[i].picture.large} alt="Profile Picture">
                    <h3>${list[i].name.first} ${list[i].name.last}</h3>
                    <span class="email">${list[i].email}</span>
                </div>
                <div class="joined-details">
                    <span class="date">Joined: ${list[i].registered.date}</span>
                </div>
            </li>`

            studentList.insertAdjacentHTML("beforeend", studentItem.innerHTML);
        }
    }
}

/*
 * `addPagination function creates page buttons at the bottom of the page
 * calls show page when a button is cliked
 */
function addPagination(list) {
    let linkList = document.querySelector('ul.link-list');
    const numOfPages = Math.ceil(list.length / 9);
    const firstPage = document.querySelector('button');

    linkList.innerHTML = '';

    for (i = 1; i <= numOfPages; i++) {
        let button = document.createElement('li');
        button.innerHTML =
            `<li>
                <button type="button">${i}</button>
            </li>`;

        linkList.insertAdjacentHTML('beforeend', button.innerHTML);
    }
  
    firstPage.className = "active";

/* retrieves additional pages of data when the user clicks a page button */
    linkList.addEventListener("click", (e) => {
        console.log(e.target);
        if (e.target.type === 'button') {
            let activeBtn = document.querySelector('.active');
            activeBtn.className = '';
            e.target.className = 'active';

            if (filtered) {
                showPage(filteredList, e.target.textContent);
            } else {
                showPage(list, e.target.textContent);
            }
        }
    })
}

/* filterData function uses the string typed into the 
 * search box to filter the data that will be displayed */
function filterData(data, searchText) {
    filteredList = [];
    for (i = 0; i < data.length; i++) {
        let firstName = data[i].name.first.toLowerCase();
        let lastName = data[i].name.last.toLowerCase();
        if (firstName.indexOf(searchText.toLowerCase()) !== -1 || lastName.indexOf(searchText.toLowerCase()) !== -1) {
            filteredList.push(data[i]);          
        }
    }
    showPage(filteredList, 1);
    addPagination(filteredList);
    filtered = true;
}

/*global variables*/
let filteredList = new Array();
let filtered = false;
const header = document.querySelector('header');
const searchForm = document.createElement('form');
let studentList = document.querySelector('ul.student-list');

/*This inserts the HTML for the search bar*/
searchForm.innerHTML = `
    <form>
        <label for="search" class="student-search">
            <span>Search by name</span>
            <input id="search" placeholder="Search by name...">
                <button id="search-button" type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
        </label>
    </form>`;
header.insertAdjacentHTML('beforeend', searchForm.innerHTML);

/*event listener that reacts to the user typing */
let searchInput = document.getElementById('search');

searchInput.addEventListener('keyup', (e) => {
    let searchText = searchInput.value;

    if (searchText !== '') {
        filterData(data, searchText);
        if (filteredList.length === 0) {
            studentList.innerHTML = "<h2>No results match your search criteria</h2>";
        } else {
            showPage(filteredList, 1);
            addPagination(filteredList);
            
        }
    } else if (searchText === '') {
        showPage(data, 1);
        addPagination(data);
        filtered = false;
    }  
});

/*event listener in case text is copy/pasted and then 'search' is clicked*/
let searchButton = document.getElementById('search-button');
const noResultsHTML = "<h2>No results match your search criteria</h2>";
searchButton.addEventListener('click', (e) => {
    let searchText = searchInput.value;

    if (searchText !== '') {
        filterData(data, searchText);
        if (filteredList.length === 0) {
            studentList.insertAdjacentHTML("afterbegin", noResultsHTML);
        } else {
            showPage(filteredList, 1);
            addPagination(filteredList);

        }
    } else if (searchText === '') {
        showPage(data, 1);
        addPagination(data);
    }
});

//call showPage for initial view
showPage(data, 1);

//create page buttons
addPagination(data);


