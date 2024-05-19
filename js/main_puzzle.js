let level;
document.querySelector("#level1").addEventListener('click', sendLevel1);

function sendLevel1(e) {
    level=1;
    localStorage.setItem('level', level);
    window.location = "../html/puzzle.html";
}

document.querySelector("#level2").addEventListener('click', sendLevel2);

function sendLevel2(e) {
    level=2;
    localStorage.setItem('level', level);
    window.location = "../html/puzzle.html";
}
document.querySelector("#level3").addEventListener('click', sendLevel3);

function sendLevel3(e) {
    level=3;
    localStorage.setItem('level', level);
    window.location = "../html/puzzle.html";
}