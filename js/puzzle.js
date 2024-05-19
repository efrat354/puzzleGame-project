let rows;
let columns;
let count1;
let boardMatrix;
let source;
let level;
let i;
let success;
let time;
let levelScore;
let timeLevel;

window.onload = init();

function init() {
    level = JSON.parse(localStorage.getItem('level'));
    if (level == 1) {
        rows = 3;
        columns = 3;
        count1 = 3;
        source = 'puzzle1';
        boardMatrix = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        addClass(1);
        i = 100;
        timeLevel = 100;
    } else {
        if (level == 2) {
            rows = 4;
            columns = 4;
            count1 = 4;
            source = 'puzzle2';
            boardMatrix = [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]

            ];
            addClass(2);
            i = 150;
            timeLevel = 150;

        } else {
            rows = 5;
            columns = 5;
            count1 = 5;
            source = 'puzzle3';
            boardMatrix = [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ];
            addClass(3);
            i = 180;
            timeLevel = 180;
        }
    }

    for (let r = 0; r < rows; r++) {//build the board.
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = "../images/white.jpg";

            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragend", dragEnd);

            document.querySelector(".board").appendChild(tile);
            boardMatrix[r][c] = tile;

        }
    }
}

function addClass(num) {
    document.querySelector('.board').classList.add('level' + num + 'Board');
    document.querySelector('.pieces').classList.add('level' + num + 'Pieces');
    document.querySelector('.containerImage').classList.add('level' + num + 'containerImage');
}

let currTile;//the current image
let otherTile;//the other image
let flag = true;

let pieces = [];
for (let i = 1; i <= rows * columns; i++) {
    pieces.push(i.toString());
}

pieces.reverse();
for (let i = 0; i < pieces.length; i++) {
    let j = Math.floor(Math.random() * pieces.length);
    let tmp = pieces[i];
    pieces[i] = pieces[j];
    pieces[j] = tmp;
}

for (let i = 0; i < pieces.length; i++) {
    let tile = document.createElement("img");
    tile.src = "../images/" + source + "/" + pieces[i] + ".jpg";
    tile.classList.add(pieces[i]);

    tile.addEventListener("dragover", dragOver);
    tile.addEventListener("dragenter", dragEnter);
    tile.addEventListener("drop", dragDrop);
    tile.addEventListener("dragend", dragEnd);

    document.querySelector(".pieces").appendChild(tile);
}


function dragOver(e) {
    e.preventDefault();//מאפשר החלפה
}

function dragEnter(e) {
    e.preventDefault();
}

function dragDrop() {
    otherTile = this;//לבן
}

function dragEnd() {
    if (this.src.includes("white")) {//כדי לא לאפשר החלפת לבן עם לבן
        return;
    }
    //otherTile מה שלקחתי מהקופסא למטה
    if (otherTile == undefined || otherTile.src == this.src) {//לא לאפשר זריקה באוויר והחלפה עצמית
        return;
    }
    let currImg = this.src; //צבעוני
    let otherImg = otherTile.src; //לבן
    this.src = otherImg; //ביצוע ההחלפה
    otherTile.src = currImg;
    if (otherTile.src.includes("puzzle") && this.src.includes("puzzle")) {
        //על מנת שלכל תמונה ישאר הקלאס שלה
        let thisClass = this.className;
        let otherClass = otherTile.className;
        otherTile.classList.add(thisClass);
        otherTile.classList.remove(otherClass);
        this.classList.add(otherClass);
        this.classList.remove(thisClass);

    } else {
        //מחזיר את הקלאס המקורי של התמונה הצבעונית
        otherTile.classList.add(this.className);
        this.classList.remove(this.className);
    }

    flag = true;
    count1 = level + 2;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let stringClass = count1.toString();
            if (!(boardMatrix[r][c]).classList.contains(stringClass) || (boardMatrix[r][c]).src.includes("white")) {
                flag = false;
            }
            count1--;
        }
        count1 += (level + 2) * 2;
    }

    otherTile = undefined;//כדי למנוע החלפות עם התמונה הקודמת כאשר זורקים לאוויר
    if (flag) {
        levelScore = level;
        time = timeLevel - i;
        success = flag;

        const score = {
            level: levelScore,
            time: time,
            success: success
        }

        let thisUser = localStorage.getItem('thisUser');
        let user = JSON.parse(localStorage.getItem(thisUser));
        user.userScore.push(score);
        localStorage.setItem(user.email, JSON.stringify(user));
        window.location = "../html/win.html";
    }
}


let o = setInterval("go()", 1000);

function go() {
    if (i < 0) {
        clearInterval(o);
        document.querySelector(".timer").textContent = "The time is up";
        levelScore = level;
        time = timeLevel;
        success = false;

        const score = {
            level: levelScore,
            time: time,
            success: success
        }

        let thisUser = localStorage.getItem('thisUser');
        let user = JSON.parse(localStorage.getItem(thisUser));
        user.userScore.push(score);
        localStorage.setItem(user.email, JSON.stringify(user));
        window.location = "../html/fail.html";
    } else {
        document.getElementById("timerP").textContent = "⏳Your left time: " + i + "s";
        i--;
    }
}

let buttonEye = document.querySelector(".eye");
buttonEye.addEventListener('click', eye);

function eye() {
    changeVisibilty(document.querySelector(".containerImage"), "visible", "hide");
    changeVisibilty(document.querySelector(".board"), "hide", "visibleFlex");
    changeVisibilty(document.querySelector(".pieces"), "hide", "visibleGrid");
    changeVisibilty(document.querySelector(".eye"), "hide", "visible");
    changeVisibilty(document.querySelector(".eyeHide"), "visible", "hide");
}

let buttonEyeHide = document.querySelector(".eyeHide");
buttonEyeHide.addEventListener('click', eyeHide);

function eyeHide() {
    changeVisibilty(document.querySelector(".containerImage"), "hide", "visible");
    changeVisibilty(document.querySelector(".board"), "visibleFlex", "hide");
    changeVisibilty(document.querySelector(".pieces"), "visibleGrid", "hide");
    changeVisibilty(document.querySelector(".eye"), "visible", "hide");
    changeVisibilty(document.querySelector(".eyeHide"), "hide", "visible");
}

function changeVisibilty(element, classToAdd, classToRemove) {

    if (element.classList.contains(classToRemove)) {
        element.classList.remove(classToRemove);
    }
    element.classList.add(classToAdd);
}