window.onload = function () {
    let thisUser = localStorage.getItem('thisUser');
    let user = JSON.parse(localStorage.getItem(thisUser));
    let name = user.userName;
    document.querySelector(".userName").textContent = name + "'s Games";
}

function tableCreate() {
    let body = document.body;
    let tbl = document.createElement('table');
    tbl.style.width = '450px';
    let td;
    let tHead = tbl.createTHead();
    let tr = tHead.insertRow(0);
    let th = tr.insertCell();
    th.appendChild(document.createTextNode('success'));
    th = tr.insertCell();
    th.appendChild(document.createTextNode('level'));
    th = tr.insertCell();
    th.appendChild(document.createTextNode('time'));

    let thisUser = localStorage.getItem('thisUser');
    let user = JSON.parse(localStorage.getItem(thisUser));

    let tBody = tbl.createTBody();
    for (let i = 0; i < user.userScore.length; i++) {
        let tr = tBody.insertRow();
        td = tr.insertCell();
        td.appendChild(document.createTextNode((user.userScore[i]).success));
        td.setAttribute('data-label', 'success');
        td = tr.insertCell();
        td.appendChild(document.createTextNode((user.userScore[i]).level));
        td.setAttribute('data-label', 'level');
        td = tr.insertCell();
        td.appendChild(document.createTextNode((user.userScore[i]).time + " :seconds"));
        td.setAttribute('data-label', 'time');
    }
    body.appendChild(tbl);
}
tableCreate();
