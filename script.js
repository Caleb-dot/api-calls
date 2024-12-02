ocument.getElementById('fetchFetch').addEventListener('click', () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch data');
            return response.json();
        })
        .then(data => {
            displayData(`Title: ${data.title} <br> Body: ${data.body}`);
        })
        .catch(error => {
            displayError(error.message);
        });
});

document.getElementById('fetchXHR').addEventListener('click', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2');
    xhr.onload = () => {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            displayData(`Title: ${data.title} <br> Body: ${data.body}`);
        } else {
            displayError('Failed to fetch data');
        }
    };
    xhr.onerror = () => displayError('Network error');
    xhr.send();
});

document.getElementById('postForm').addEventListener('submit', event => {
    event.preventDefault();
    const title = document.getElementById('postTitle').value;
    const body = document.getElementById('postBody').value;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body })
    })
        .then(response => response.json())
        .then(data => {
            displayData(`Post Created! ID: ${data.id} <br> Title: ${data.title} <br> Body: ${data.body}`);
        })
        .catch(error => {
            displayError(error.message);
        });
});

document.getElementById('putForm').addEventListener('submit', event => {
    event.preventDefault();
    const id = document.getElementById('postId').value;
    const title = document.getElementById('updateTitle').value;
    const body = document.getElementById('updateBody').value;

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `https://jsonplaceholder.typicode.com/posts/${id}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            displayData(`Post Updated! ID: ${data.id} <br> Title: ${data.title} <br> Body: ${data.body}`);
        } else {
            displayError('Failed to update data');
        }
    };
    xhr.onerror = () => displayError('Network error');
    xhr.send(JSON.stringify({ title, body }));
});


function displayData(content) {
    const display = document.getElementById('displayData');
    display.innerHTML = `<p>${content}</p>`;
}

function displayError(message) {
    const display = document.getElementById('displayData');
    display.innerHTML = `<p style="color: red;">Error: ${message}</p>`;
}

if (error.message.includes('NetworkError')) {
    displayError('Network error. Please check your connection.');
}
