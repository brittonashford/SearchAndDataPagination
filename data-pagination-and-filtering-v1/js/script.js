/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


/*
Create the `showPage` function
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





showPage(data, 1);
addPagination(data);


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



/*// Call functions*/