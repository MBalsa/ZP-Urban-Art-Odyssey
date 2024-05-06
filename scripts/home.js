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
        <input type="button" id="card-button" name="readMore" value="read more"/>
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
