console.log('this is js of notes app')
showNotes()
//if user adds note add it to local storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    let ntitle = localStorage.getItem('ntitle');
    
    if (notes == null) {
        notesObj = [];
    }
    else {
        /*When receiving data from a web server, the data is always a string.
        Parse the data with JSON.parse(), and the data becomes a JavaScript object. */
        notesObj = JSON.parse(notes);//convert to object
        console.log('this is notesobj',notesObj)
    }

    if (ntitle == null) {
        titleObj = [];
    }
    else {
        /*When receiving data from a web server, the data is always a string.
        Parse the data with JSON.parse(), and the data becomes a JavaScript object. */
        titleObj = JSON.parse(ntitle);//convert to object
        console.log('this is notesobj',titleObj)
    }



    notesObj.push(addTxt.value);
    titleObj.push(addTitle.value);
    /*hen sending data to a web server, the data has to be a string.
    Convert a JavaScript object into a string with JSON.stringify(). */
    localStorage.setItem('notes', JSON.stringify(notesObj));//convert into string
    localStorage.setItem('ntitle', JSON.stringify(titleObj));//convert into string
    
    addTxt.value = "";
    addTitle.value = "";
    console.log('after push',notesObj)
    console.log('after push',titleObj)
    showNotes()
});
function showNotes() {
    let notes = localStorage.getItem('notes');
    let ntitle = localStorage.getItem('ntitle');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    if (ntitle == null) {
        titleObj = [];
    }
    else {
        titleObj = JSON.parse(ntitle);
    }
    let html = "";

    notesObj.forEach(function(element1, index) {
        const element2 = titleObj[index];
        html += ` <div class="notecard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${element2}${index + 1}</h5>
                <!-- <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> -->
                <p class="card-text">${element1}</p>
                <button id=${index} onclick="deleteNote(this.id)" class="btn btn-primary" id="deletebtn">Delete</button>
            </div>
        </div> `;
      });






    // notesObj.forEach(function (element, index) {
    //     html += ` <div class="notecard my-2 mx-2 card" style="width: 18rem;">
    //         <div class="card-body">
    //             <h5 class="card-title">NOTE${index + 1}</h5>
    //             <!-- <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> -->
    //             <p class="card-text">${element}</p>
    //             <button id=${index} onclick="deleteNote(this.id)" class="btn btn-primary" id="deletebtn">Delete</button>
    //         </div>
    //     </div> `;
    // });


    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html
    }
    else {
        notesElm.innerHTML = `you did not create any notes in Note section pls write a note`

    }
}

function deleteNote(index) {
    // console.log('delete', index)
    let notes = localStorage.getItem('notes');
    let ntitle = localStorage.getItem('ntitle');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    if (ntitle == null) {
        titleObj = [];
    }
    else {
        titleObj = JSON.parse(ntitle);
    }
    notesObj.splice(index, 1);
    titleObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    localStorage.setItem('ntitle', JSON.stringify(titleObj));
    showNotes()
}
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase()
    // console.log('input event fire', inputVal)
    let noteCards = document.getElementsByClassName('notecard')
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText
        let cardTitle = element.getElementsByTagName('h5')[0].innerText
        // console.log(cardTxt)
        if (cardTxt.includes(inputVal) || cardTitle.includes(inputVal)) {
            element.style.display = "block"
        }
        else {
            element.style.display = "none"
        }
    })
})
 /*
 1. title
 2.mark a note as important
 3.seperate note by user
 4,dync and host
 
 
 */