const listContainer = document.querySelector('#service-list');
let servicesRequest = new Request('http://127.0.0.1:8080/service');
let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin','http://localhost:8080');
    fetch('http://127.0.0.1:8080/service', {
                               mode: 'cors',
                               headers: headers
                           })
.then(function(response) { return response.json(); })
.then(function(serviceList) {
var i = 0;
serviceList.forEach(service => {
    let textInputName = "input" + i;
    i++;
    let tr = document.createElement("tr");
    let tdName = document.createElement("td");
    let inputElement = document.createElement("INPUT");
    inputElement.setAttribute("type", "text");
    inputElement.setAttribute("id", textInputName);
    inputElement.setAttribute("value", service['name']);
    tdName.appendChild(inputElement);
    tr.appendChild(tdName);
    ["url","status","timestamp"].forEach(key => {
        let td = document.createElement("td");
        td.appendChild(document.createTextNode(service[key]));
        tr.appendChild(td);
    });
    let saveButton = document.createElement("button");
    let saveButtonText = document.createTextNode("Save");
    saveButton.appendChild(saveButtonText);
    let tdSaveButton = document.createElement("td");
    tdSaveButton.appendChild(saveButton);
    tr.appendChild(tdSaveButton);

    saveButton.onclick = evt => {
        let name = document.querySelector("#"+textInputName).value;
        let url = service['url'];
        fetch('/rename', {
            method: 'post',
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({url:url, name:name})
        }).then(res=> location.reload());
    }
    var deleteButton = document.createElement("button");
    var deleteButtonText = document.createTextNode("Delete");
    deleteButton.appendChild(deleteButtonText);
    deleteButton.onclick = evt => {
    let name = service['name'];
    let urlName = service['url'];
    fetch('/service', {
            method: 'delete',
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            },
          body: JSON.stringify({url:urlName})
        }).then(res=> location.reload());
    }
    var tdDeleteButton = document.createElement("td");
    tdDeleteButton.appendChild(deleteButton);
    tr.appendChild(tdDeleteButton);
    listContainer.appendChild(tr);
  });
});

const saveButton = document.querySelector('#post-service');
saveButton.onclick = evt => {
    let urlName = document.querySelector('#url-name').value;
    let name = document.querySelector('#name').value;
    fetch('http://127.0.0.1:8080/service', {
        method: 'post',
        headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({url:urlName, name: name})
    }).then(res=> location.reload());
}
