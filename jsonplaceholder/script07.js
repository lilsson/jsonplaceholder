let mainWraper = document.getElementById('post-block');
let overlay = document.getElementById('overlay');
let close = document.getElementById('close');
let content = document.getElementById('content');
let addPost = document.getElementById('add');
let postOverlay = document.getElementById('postOverlay');

// https://jsonplaceholder.typicode.com/posts

function ajax(url,callback) {
    let requist = new XMLHttpRequest();
    requist.open('GET', url);

    requist.addEventListener('load', function() {
       let data = JSON.parse(requist.responseText);
       callback(data);  
    });
    requist.send();
}

ajax('https://jsonplaceholder.typicode.com/posts',function(data) {
    printData(data);
});

function printData(data) {
    data.forEach(element => {
        createPost(element);
    });
}


function createPost(item) {
    let divWraper = document.createElement('div');
    divWraper.classList.add('posts');
    divWraper.setAttribute('data-id', item.id);

    let deleteButton = document.createElement('button');
    deleteButton.setAttribute('data-id', item.id);
    deleteButton.innerText = 'Delete';

    let h1 = document.createElement('h1');
    h1.innerText = item.id;

    let text = document.createElement('div');
    text.classList.add('title');
    text.innerText = item.title;

    divWraper.appendChild(h1);
    divWraper.appendChild(text);
    divWraper.appendChild(deleteButton);

    deleteButton.addEventListener('click', function(event) {
        event.stopPropagation();
        let id = event.target.getAttribute('data-id');
        deletePost(id);
    });

    divWraper.addEventListener('click', function(event) {
        let id = event.target.getAttribute('data-id');
        openOverlay(id);
    });

    mainWraper.appendChild(divWraper);
}

function openOverlay(id) {
    overlay.classList.add('active');
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    ajax(url, function(data) {
        overlayFunction(data);
    })
    // console.log(id);
}

function deletePost(id) {
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    fetch(url, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
}

function overlayFunction(item) {
    let spanUserId = document.createElement('span');
    spanUserId.innerText = item.userId;

    let pId = document.createElement('p');
    pId.innerText = item.id;

    let title = document.createElement('h2');
    title.innerText = item.title;

    let description = document.createElement('p');
    description.innerText = item.body;

    content.appendChild(spanUserId);
    content.appendChild(pId);
    content.appendChild(title);
    content.appendChild(description);
}


close.addEventListener('click', function() {
    overlay.classList.remove('active');
    content.innerHTML = ' ';
})

addPost.addEventListener('click', function() {
    postOverlay.classList.add('active');
})
