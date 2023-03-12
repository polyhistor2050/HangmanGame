const game = { cur: "", solution: "", puzz: [], total: 0};
const myWords = ["learn html", "learn css", "learn javasript"];
const score = document.querySelector(".score");
const puzzle = document.querySelector(".puzzle");
const letters = document.querySelector(".letters");
const btn = document.querySelector("button");
btn.addEventListener("click", startGame);

function startGame() {
    if(myWords.length > 0) {
        btn.style.display = "none";
        game.puzz = [];
        game.total = 0;
        game.cur = myWords.shift();
        game.solution = game.cur.split();
        builder();
    }else {
        score.textContent = "No more words.";
    }
}

function createElements(elType, parentEle, output, cla) {
    const temp = document.createElement(elType);
    temp.classList.add("boxE");
    parentEle.append(temp);
    temp.textContent = output;
    return temp;
}

function updateScore() {
    score.textContent = `Total Letters Left: ${game.total}`;
    if (game.total <= 0) {
        console.log("game over");
        score.textContent = "Game Over";
        btn.style.display = "block";
        }
}

function builder() {
    letters.innerHTML = "";
    puzzle.innerHTML = "";
    game.solution.forEach((lett) => {
        let  div = createElements("div", puzzle, "-", "boxE");
        if(lett = " ") {
            div.style.borderColor = "white";
            div.textContent = " ";
        }else {
            game.total++;
        }
        game.puzz.push(div);
        updateScore();   
    })

    for (let i = 0; i < 26; i++) {
        let temp = String.fromCharCode(65 + i);
        let div = createElements("div", letters, temp, "box");

        let checker = function (e) {
            div.style.backgroundColor = "#ddd";
            div.classList.remove = "box";
            div.classList.add = "boxD";
            div.removeEventListener("click", checker);
            checkLetter(temp);     
        }
        div.addEventListener("click", checker);
    }
}

function checkLetter(letter) {
    console.log(letter);
    game.solution.forEach((ele, index) => {
        if(ele.toUpperCase() == letter) {
            game.puzz[index].textContent = letter;
            game.total--;
            updateScore();
        };
    });
}