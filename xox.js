
const boxes = document.querySelectorAll(".box");
const winnerPlace = document.querySelector(".winner");
const newbtn = document.querySelector(".new-btn");
const resetbtn = document.getElementById("reset-btn");

let turnO = true;

const winpatterns = [
  [0,1,2], [0,3,6], [0,4,8], [1,4,7],
  [2,5,8], [2,4,6], [3,4,5], [6,7,8]
];

boxes.forEach((boxEL) => {
  boxEL.addEventListener("click", () => {
    if (boxEL.innerText !== "") return;

    if (turnO) {
      boxEL.innerText = "O";
      boxEL.style.color = "green";
    } else {
      boxEL.innerText = "X";
      boxEL.style.color = "red";
    }

    turnO = !turnO;
    boxEL.disabled = true;
    resetbtn.classList.remove("hide");

    checkWinner();
  });
});

const checkWinner = () => {
  let winnerFound = false;

  for (let pattern of winpatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        winnerPlace.innerText = `Winner is ${pos1}`;
        winnerPlace.classList.remove("hide");
        newbtn.classList.remove("hide");

        boxes.forEach(box => box.disabled = true);

        boxes[pattern[0]].classList.add("add");
        boxes[pattern[1]].classList.add("add");
        boxes[pattern[2]].classList.add("add");

        winnerFound = true;
        return;
      }
    }
  }

  // ✅ TIE CHECK
  if (!winnerFound) {
    let allFilled = true;
    boxes.forEach(box => {
      if (box.innerText === "") {
        allFilled = false;
      }
    });

    if (allFilled) {
      winnerPlace.innerText = "Match Tied 🤝";
      winnerPlace.classList.remove("hide");
      newbtn.classList.remove("hide");
    }
  }
};

resetbtn.addEventListener("click", () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("add");
  });
  winnerPlace.classList.add("hide");
  newbtn.classList.add("hide");
  turnO = true;
});

newbtn.addEventListener("click", () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("add");
  });
  winnerPlace.classList.add("hide");
  newbtn.classList.add("hide");
  turnO = true;
});
