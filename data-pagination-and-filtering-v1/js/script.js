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
    let studentList = document.querySelector('ul.student-list');

    studentList.innerHTML = '';

    for (i = 0; i < list.length; i++) {
        if (i >= startIndex && i < endIndex) {
            let studentItem = document.createElement('li');
            studentItem.innerHTML = `<li class="student-item cf">
                <div class="student-details">
                    <img class="avatar" src=${data[i].picture.large} alt="Profile Picture">
                    <h3>${data[i].name.first} ${data[i].name.last}</h3>
                    <span class="email">${data[i].email}</span>
                </div>
                <div class="joined-details">
                    <span class="date">Joined: ${data[i].registered.date}</span>
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

    linkList.innerHTML = '';

    for (i = 1; i <= numOfPages; i++) {
        let button = document.createElement('li');
        button.innerHTML =
            `<li>
                <button type="button">${i}</button>
            </li>`;

        linkList.insertAdjacentHTML('beforeend', button.innerHTML);
    }

    const firstPage = document.querySelector('button');
    firstPage.className = "active";

    linkList.addEventListener("click", (e) => {
        console.log(e.target);
        if (e.target.type === 'button') {
            let activeBtn = document.querySelector('.active');
            activeBtn.className = '';
            e.target.className = 'active';
            showPage(list, e.target.textContent);
        }
    })
}

/* filterData function uses the string typed into the 
 * search box to filter the data that will be displayed */
function filterData(data, searchText) {
    let filteredList;

    for (i = 0; i < data.length; i++) {
        let firstName = data[i].name.first.toLowerCase();
        let lastName = data[i].name.last.toLowerCase();
        if (firstName.indexOf(searchText.toLowerCase()) !== -1 || lastName.indexOf(searchText.toLowerCase()) !== -1) {
            console.log("yo");
        }
    }
}


//call showPage for initial view
showPage(data, 1);

//create page buttons
addPagination(data);

let header = document.querySelector('header');
let searchForm = document.createElement('form');
searchForm.innerHTML = `
    <form>
        <label for="search" class="student-search">
            <span>Search by name</span>
            <input id="search" placeholder="Search by name...">
                <button id="search-button" type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
        </label>
    </form>`;
header.insertAdjacentHTML('beforeend', searchForm.innerHTML);

let searchInput = document.getElementById('search');
searchInput.addEventListener('keyup', (e) => {
    let searchText = searchInput.value;
    if (searchText !== '') {
        filterData(data, searchText);
    }
});

let searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', (e) => {
    let searchText = searchInput.value;
    if (searchText !== '') {
        filterData(data, searchText);
    }
});



