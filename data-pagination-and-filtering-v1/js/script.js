/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

let studentList = document.querySelector('ul.student-list');
let studentItem = document.createElement('li');
studentItem.innerHTML = `
            <li class="student-tem cf">
                <div class="student-details">
                    <img class="avatar" src=${data[0].picture.large} alt="Profile Picture">
                    <h3>${data[0].name.title} ${data[0].name.first} ${data[0].name.last}</h3>
                    <span class="email">${data[0].email}</span>
                </div>
                <div class="joined-details">
                    <span class="date">${data[0].registered.date}</span>
                </div>
            </li>`;
studentList.insertAdjacentHTML("beforeend", studentItem.innerHTML);


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
                    <h3>${data[i].name.title} ${data[i].name.first} ${data[i].name.last}</h3>
                    <span class="email">${data[i].email}</span>
                </div>
                <div class="joined-details">
                    <span class="date">${data[i].registered.date}</span>
                </div>
            </li>`

            console.log(studentItem.innerHTML);
            studentList.insertAdjacentHTML("beforeend", studentItem.innerHTML);
        }
    }
}

showPage(data, 1);


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



/*// Call functions*/