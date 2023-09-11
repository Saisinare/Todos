//----------------VARIABLES--------------------//
const input = document.getElementById('input')
const button = document.getElementById('button-submit')
const todolist = document.getElementById('to-do-list');
const input_value = document.getElementById('input').value;
const deletedone = document.getElementsByClassName('done')
const donetask_container = document.getElementById('done_task')
const done_container = document.getElementById('done_task')
let i = 0;
let j = 0;
let k = 0;
let TaskArr = new Array(100);
let count = 0;
let localstoragelength = localStorage.length
let donetask = [];
donetask.push('sai')

//-------------FUNCTIONS---------------------------//
//CHECK OLD TASKS AND IMPORT IT-----------------

if (localstoragelength != 0) {
    for (i = 0; i < localstoragelength; i++) {
        if (localStorage.key(i) == "doneitem") {
            continue;
        }
        else {
            const to_to_div = document.createElement('div');
            to_to_div.classList.add('todo');

            const newtodo = document.createElement('li');
            newtodo.innerText = localStorage.key(i);
            newtodo.classList.add('task');
            to_to_div.appendChild(newtodo);
            //--------DONE BUTTON ------------------------------------------
            const done_button = document.createElement('button');
            done_button.innerHTML = '<i class="sai"></i>';
            done_button.classList.add('done-button');
            to_to_div.appendChild(done_button);
            done_button.innerText = "Done";
            //---------DELETE BUTTON----------------------------------------
            const delete_button = document.createElement('button');
            delete_button.innerHTML = '<i class="sai"></i>';
            delete_button.classList.add('delete-button');
            to_to_div.appendChild(delete_button);
            delete_button.innerText = "Delete";
            //APPEND TO THE LIST-----------------------------------------------
            todolist.appendChild(to_to_div);
        }
    }
}

if (localStorage.doneitem!=undefined) {
    console.log('done task is here')
    donetask =JSON.parse(localStorage.doneitem)
    console.log(donetask)
    for (let c = 1; c < donetask.length; c++) {
        let inner = c-1;
        let done = document.createElement('div')
        done.classList.add('done')
        done_container.appendChild(done);
        console.log(done_container.children[inner])
        done_container.children[inner].innerText = donetask[c]
        console.log(donetask[c])
        inner++;
    }
}
else if(localStorage.doneitem==undefined){
    console.log("done task is not here")
}
window.addEventListener('keypress', (event) => {
    if (event.key == 'Enter') {
        button.click();

    };
})
button.addEventListener('click', (event) => {
    if (document.getElementById('input').value == "") {
        alert("Please Enter The Task");
    }
    else if (i <= 6) {
        localStorage.setItem(input.value, input.value)

        const to_to_div = document.createElement('div');
        to_to_div.classList.add('todo');

        const newtodo = document.createElement('li');
        newtodo.innerText = document.getElementById('input').value;
        newtodo.classList.add('task');
        to_to_div.appendChild(newtodo);
        //--------DONE BUTTON ------------------------------------------
        const done_button = document.createElement('button');
        done_button.innerHTML = '<i class="sai"></i>';
        done_button.classList.add('done-button');
        to_to_div.appendChild(done_button);
        done_button.innerText = "Done";
        //---------DELETE BUTTON----------------------------------------
        const delete_button = document.createElement('button');
        delete_button.innerHTML = '<i class="sai"></i>';
        delete_button.classList.add('delete-button');
        to_to_div.appendChild(delete_button);
        delete_button.innerText = "Delete";
        //APPEND TO THE LIST-----------------------------------------------
        todolist.appendChild(to_to_div);
        i++;
        input.value = "";
    }
    else {
        alert("All Tasks is Full");
        document.getElementById('input').value = "";
    }
})
//DELETE THE TASK-------------------------------------------------
let names = [];
todolist.addEventListener('click', (e) => {

    const item = e.target;

    if (item.classList[0] === 'delete-button') {
        if (confirm("Are You Want To Delete The Task")) {
            let remove_item = item.parentElement;
            let remove_itemchild = remove_item.childNodes
            localStorage.removeItem(remove_itemchild[0].innerText)
            remove_item.remove();
            i--;
        }

    }
    //--ADD THE TASK IN DONE SECTION----------------------------------------------------

    else if (item.classList[0] === 'done-button') {
        let parent = item.parentElement;
        let child = parent.childNodes;
        parent.remove();

        let done = document.createElement('div')
        done.classList.add('done')
        done_container.appendChild(done);
        done.innerText = child[0].innerText
        donetask.push(child[0].innerText)
        console.log(donetask)
        localStorage.setItem('doneitem', JSON.stringify(donetask))
        console.log(JSON.parse(localStorage.doneitem))
        localStorage.removeItem(child[0].innerText)
        i--;

        if (document.getElementById('done_task').innerHTML != "") {
            done.addEventListener('mouseover', () => {
                document.getElementById('message').style.display = 'flex'
            })
            done.addEventListener('mouseout', () => {
                document.getElementById('message').style.display = 'none'
            })

        }
        done_container.addEventListener('mouseout', () => {
            document.getElementById('message').style.display = 'none'
        })

        if (j == 0) {
            alert("To Remove Completed Task Double Click On It")
            j++;
        }
    }
})
//------DLETE DONE TASK AS ONE BY ONE--------------------------
donetask_container.addEventListener('dblclick', (e) => {
    let done_item = e.target;
    done_item.remove();
})
//------CLEAR ALL DONE TASK---------------------------------------------
document.getElementById('cleardone').addEventListener('click', () => {
    document.getElementById('done_task').innerHTML = ""
    localStorage.removeItem('doneitem')
})