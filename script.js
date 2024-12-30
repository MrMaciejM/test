import { content } from "./content.js";

const container = document.querySelector(".container");
const divs = Array.from(container.children);
const untouchedDiv = divs.find((div) => div.dataset.index === "2");

const contentBox = document.getElementById("contentBox");

const isMobile = () => window.innerWidth <= 425;

contentBox.innerHTML = content[1];

// contentBox fade-in/out animation
function fadeAnim() {
  contentBox.style.opacity = 0;
  contentBox.style.transition = "all 0s";
  setTimeout(() => {
    contentBox.style.transition = "all 1s";
    contentBox.style.opacity = 1;
  }, 700);
}

function displayContent(index) {
  switch (index) {
    case "1":
      contentBox.style.opacity = 0;
      fadeAnim();
      contentBox.innerHTML = content[1];
      break;

    case "3":
      contentBox.style.opacity = 0;
      fadeAnim();
      contentBox.innerHTML = "";
      contentBox.innerHTML = content[2];
      break;
    case "4":
      contentBox.style.opacity = 0;
      fadeAnim();
      contentBox.innerHTML = "";
      contentBox.innerHTML = content[3];
      break;
    case "5":
      contentBox.style.opacity = 0;
      fadeAnim();
      contentBox.innerHTML = "";
      contentBox.innerHTML = content[4];
      break;

    default:
      break;
  }
}

divs.forEach((div) => {
  // Display content based on click

  if (div !== untouchedDiv) {
    div.addEventListener("click", (e) => {
      // display content
      //console.log(e.target.dataset.index); // string
      let index = e.target.dataset.index;

      displayContent(index);

      const indexOfUntouched = divs.indexOf(untouchedDiv);
      const divAboveUntouched = divs[indexOfUntouched - 1];

      if (divAboveUntouched && divAboveUntouched !== div) {
        // Get the positions of the divs for the animation
        const div1Rect = div.getBoundingClientRect();
        const div3Rect = divAboveUntouched.getBoundingClientRect();

        // Apply the correct animation based on screen size
        const transformProperty = isMobile() ? "translateY" : "translateX";

        // Apply the translate animations
        div.style.transition = "transform 0.7s ease"; // Adding smooth transition
        divAboveUntouched.style.transition = "transform 0.7s ease"; // Adding smooth transition

        let indexForMobile = e.target.dataset.index;
        if (isMobile()) {
          //let index = e.target.dataset.index;
          //console.log(indexForMobile);
          displayContent(indexForMobile);

          // Mobile: Apply translateY for vertical movement
          div.style.transform = `translateY(${div3Rect.top - div1Rect.top}px)`;
          divAboveUntouched.style.transform = `translateY(${
            div1Rect.top - div3Rect.top
          }px)`;
        } else {
          // Desktop: Apply translateX for horizontal movement
          div.style.transform = `translateX(${
            div3Rect.left - div1Rect.left
          }px)`;
          divAboveUntouched.style.transform = `translateX(${
            div1Rect.left - div3Rect.left
          }px)`;
        }

        // After animation finishes, actually swap the divs in the DOM
        setTimeout(() => {
          // Perform the swap in the array
          const clickedIndex = divs.indexOf(div);
          divs[indexOfUntouched - 1] = div;
          divs[clickedIndex] = divAboveUntouched;

          // Rebuild the DOM after the animation
          container.innerHTML = "";
          divs.forEach((div) => container.appendChild(div));

          // Reset the transform after the swap
          div.style.transform = "";
          divAboveUntouched.style.transform = "";
        }, 600); // 600ms timeout to wait for the animation to complete
      }
    });
  }
});
