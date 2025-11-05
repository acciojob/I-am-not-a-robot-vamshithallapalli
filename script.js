// List of image classes (5 unique)
let imgClasses = ["img1", "img2", "img3", "img4", "img5"];

// Pick one class randomly to duplicate
const duplicateClass = imgClasses[Math.floor(Math.random() * imgClasses.length)];
imgClasses.push(duplicateClass); // Now we have 6, including 1 duplicate

// Shuffle image classes
imgClasses.sort(() => Math.random() - 0.5);

// DOM references
const container = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const msg = document.getElementById("h");
const resultMsg = document.getElementById("para");

// Initial message (State 1)
msg.textContent = "Please click on the identical tiles to verify that you are not a robot.";

let selected = [];

// Create and display 6 images
imgClasses.forEach(className => {
  let img = document.createElement("img");
  img.classList.add(className);

  img.addEventListener("click", () => {
    if (selected.length < 2 && !selected.includes(img)) {
      img.classList.add("selected");
      selected.push(img);

      // Show Reset Button after first click (State 2)
      resetBtn.style.display = "inline-block";

      // Show Verify Button after second click (State 3)
      if (selected.length === 2) {
        verifyBtn.style.display = "inline-block";
      }
    }
  });

  container.classList.add("flex");
  container.appendChild(img);
});

// Reset button (State 1)
resetBtn.addEventListener("click", () => {
  selected.forEach(img => img.classList.remove("selected"));
  selected = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  resultMsg.textContent = "";
});

// Verify button (State 4)
verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none"; // Remove verify button after click

  if (selected[0].className === selected[1].className) {
    resultMsg.textContent = "You are a human. Congratulations!";
  } else {
    resultMsg.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
});
