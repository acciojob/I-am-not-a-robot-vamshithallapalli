// List of image classes (5 unique)
let imgClasses = ["img1", "img2", "img3", "img4", "img5"];

// Pick one class randomly to duplicate
const duplicateClass = imgClasses[Math.floor(Math.random() * imgClasses.length)];
imgClasses.push(duplicateClass); // Now total 6 images

// Shuffle
imgClasses.sort(() => Math.random() - 0.5);

// DOM references
const container = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const msg = document.getElementById("h");
const resultMsg = document.getElementById("para");

// Initial visibility (State 1)
resetBtn.style.display = "none";
verifyBtn.style.display = "none";
msg.textContent = "Please click on the identical tiles to verify that you are not a robot.";

// ✅ IMPORTANT FIX: Remove any images that existed in HTML
container.innerHTML = "";
container.classList.add("flex");

let selected = [];

// Create clickable image tiles
imgClasses.forEach(className => {
  let img = document.createElement("img");
  img.classList.add(className);

  img.addEventListener("click", () => {
    if (selected.length < 2 && !selected.includes(img)) {
      img.classList.add("selected");
      selected.push(img);

      resetBtn.style.display = "inline-block"; // Show reset after first click

      if (selected.length === 2) {
        verifyBtn.style.display = "inline-block"; // Show verify after second click
      }
    }
  });

  container.appendChild(img);
});

// Reset (State 1)
resetBtn.addEventListener("click", () => {
  selected.forEach(img => img.classList.remove("selected"));
  selected = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  resultMsg.textContent = "";
});

// Verify (State 4)
verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none"; // Hide verify after checking

  if (selected[0].className === selected[1].className) {
    resultMsg.textContent = "You are a human. Congratulations!";
  } else {
    resultMsg.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
});
