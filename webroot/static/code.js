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
    var textInputName = "input" + i;
    i++;
    var tr = document.createElement("tr");
    var tdName = document.createElement("td");
    var inputElement = document.createElement("INPUT");
    inputElement.setAttribute("type", "text");
    inputElement.setAttribute("id", textInputName);
    inputElement.setAttribute("value", service['name']);
    tdName.appendChild(inputElement);
    tr.appendChild(tdName);
    ["url","status","timestamp"].forEach(key => {
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(service[key]));
        tr.appendChild(td);
    });
    var saveButton = document.createElement("button");
    var saveButtonText = document.createTextNode("Save");
    saveButton.appendChild(saveButtonText);
    var tdSaveButton = document.createElement("td");
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

//const deleteButton = document.querySelector('#delete-service');
//deleteButton.onclick = evt => {
//    let urlName = document.querySelector('#delete-url').value;
//    fetch('/service', {
//    method: 'delete',
//    headers: {
//    'Accept': 'application/json, text/plain, */*',
//    'Content-Type': 'application/json'
//    },
//  body: JSON.stringify({url:urlName})
//})
//.then(res=> location.reload());
//}

//const renameButton = document.querySelector('#rename-service');
//renameButton.onclick = evt => {
//    let name = document.querySelector('#rename-name').value;
//    let url = document.querySelector('#rename-url').value;
//    fetch('/rename', {
//    method: 'post',
//    headers: {
//    'Accept': 'application/json, text/plain, */*',
//    'Content-Type': 'application/json'
//    },
//    body: JSON.stringify({url:url, name:name})
//})
////.then(res=> location.reload());
//}

//deleteButtonHandling(dname, durl) => {
//                                  let name = dname;
//                                  let url = durl;
//                                  fetch('/service/rename', {
//                                  method: 'post',
//                                  headers: {
//                                  'Accept': 'application/json, text/plain, */*',
//                                  'Content-Type': 'application/json'
//                                  },
//                                  body: JSON.stringify({url:url, name:name})
//                              }).then(res=> location.reload());
//                              }
