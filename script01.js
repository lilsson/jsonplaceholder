let mainWraper = document.getElementById('post-block');

function ajax() {
    let requist = new XMLHttpRequest();
    requist.open('GET', 'https://jsonplaceholder.typicode.com/posts');

    requist.addEventListener('load', function() {
        let data = JSON.parse(requist.responseText);

        data.forEach(element => {
            createPost(element);
        });

        console.log(data);

    });
    

    requist.send();
}

    function createPost(item) {
        let divWraper = document.createElement('div');
        divWraper.classList.add('posts');

        let h1 = document.createElement('h1');
        h1.innerText = item.id;

        let text = document.createElement('div');
        text.classList.add('title');
        text.innerText = item.title;

        let text2 = document.createElement('div');
        // text2.classList.add('title');
        text2.innerText = item.body;

        
        divWraper.appendChild(h1);
        divWraper.appendChild(text);
        divWraper.appendChild(text2);

        mainWraper.appendChild(divWraper);

    }


 ajax();