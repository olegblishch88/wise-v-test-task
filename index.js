document.getElementById('btn').addEventListener('click', getData);

let receiveData;
function getData() {
    const inputText = document.getElementById('inputText').value;
    fetch(`https://api.github.com/search/repositories?q=${inputText}`)
        .then(res => res.json())
        .then(data => {
            receiveData = data.items.reduce((accum, item) => ({
                ...accum,
                [item.id]: item
            }), {});

            let table = `<table>
                            <tr>
                            <th>Id:</th>
                            <th>Name:</th>
                            <th>Language:</th>
                            <th>Description:</th>
                            <th></th>
                            </tr>`;
            data.items.forEach(item => {
                table += `<tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.language}</td>
                    <td>${item.description}</td>
                    <td><i id='save' data-itemId='${item.id}' class="fas fa-save"></i></td>
                </tr>`;
            });
            document.getElementById('field').innerHTML = table;
            Array.from(document.getElementsByClassName('fas')).forEach(el => el.addEventListener('click', saveToLocalStorage));
        });
}

function saveToLocalStorage() {
    const itemId = parseInt(this.dataset.itemid);
    if (!itemId)  return; 
    const item = receiveData[itemId];
    localStorage.setItem(itemId, item.name,  JSON.stringify(item));


    displayLocalStorage(itemId);
}

function displayLocalStorage(itemId) {
    const data = Object.values(localStorage);
    data.forEach(x => {
        let ul = document.createElement('ul');
        let li = document.createElement('li');
        li.innerHTML = x;
        ul.appendChild(li);
        document.getElementById('field').appendChild(ul);
    })

}








