const postContainer = document.querySelector(".cardContainer");

const postMethods = () => {
  fetch("source/data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      data.images.map((postData) => {
        const postElement = document.createElement("div");
        postElement.classList.add("card");
        postElement.innerHTML = `
        <img
          class="card-img"
          src=${postData.image}
        />
        <h2 class="card-headline">${postData.name}</h2>
        <p class="card-text">${postData.description}</p>
        <h4>${postData.author}</h4>
        <input type="button" id="readMoreBtn" value="read more"/>
      `;
        postContainer.appendChild(postElement);
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

postMethods();

let loadMoreBtn = document.querySelector(".loadMore");
let currentItem = 3;

loadMoreBtn.onclick = () => {
  let cards = [...document.querySelectorAll(".card")];
  for (var i = currentItem; i < currentItem + 3; i++) {
    cards[i].style.display = "inline-block";
  }
  currentItem += 3;
  if (currentItem >= cards.length) {
    loadMoreBtn.style.display = "none";
  }
};

const readMoreBtn = document.getElementById("readMoreBtn");

const artPrewiev = document.querySelector(".artPreview");
const modalOverlay = document.querySelector(".modal-overlay");

document.addEventListener("click", function (event) {
  if (event.target && event.target.id === "readMoreBtn") {
    artPrewiev.style.display = "block";
    modalOverlay.style.display = "block";
  }
});

const exitBtn = document.querySelector(".exit");

exitBtn.addEventListener("click", function () {
  artPrewiev.style.display = "none";
  modalOverlay.style.display = "none";
});

// const readMoreBtn = document.getElementById("readMoreBtn");
// const exitBtn = document.getElementById("exit");
// const artPreview = document.querySelector(".artPreview");
// const modalOverlay = document.querySelector(".modal-overlay");

// readMoreBtn.addEventListener("click", function () {
//   artPreview.style.display = "block";
//   modalOverlay.style.display = "block";
// });
// document.addEventListener("DOMContentLoaded", function () {
//   exitBtn.addEventListener("click", function () {
//     artPreview.style.display = "none";
//     modalOverlay.style.display = "none";
//   });
// });
