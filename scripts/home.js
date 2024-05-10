document.addEventListener("DOMContentLoaded", function () {
  const postContainer = document.querySelector(".cardContainer");
  const exitBtn = document.querySelector(".exit");
  const readMoreBtn = document.getElementById("readMoreBtn");
  const artPrewiev = document.querySelector(".artPreview");
  const modalOverlay = document.querySelector(".modal-overlay");

  let loadMoreBtn = document.querySelector(".loadMore");

  let currentItem = 3;

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
          <input type="button" id="readMoreBtn" data-value ='${postData.id}'value="read more"/>
        `;
          postContainer.appendChild(postElement);
        });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  postMethods();

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

  document.addEventListener("click", function (event) {
    if (event.target && event.target.id === "readMoreBtn") {
      artPrewiev.style.display = "block";
      modalOverlay.style.display = "block";
      let dataValue = event.target.getAttribute("data-value");
      let index = parseInt(dataValue) - 1;
      console.log("Index:", index);

      fetch("source/data.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          let imageData = data.images[index];
          console.log("Image data:", imageData);
          artPrewiev.innerHTML = `<span class="exit">&times;</span>
          <div class="preview">
            <img src="${imageData.image}" alt="" class="popup-image" />
            <div class="details">
              <div>
                <h4 class="name">Name: ${imageData.name}</h4>
                <h4 class="location">Location: ${imageData.location}</h4>
                <h4 class="date">Date: ${imageData.date}</h4>
                <h4 class="artist">Artist: ${imageData.author}</h4>
              </div>
              <div class="mapDisplay">Location</div>
            </div>
          </div>`;
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  });

  document.addEventListener("click", function (event) {
    if (event.target && event.target.className === "exit") {
      artPrewiev.style.display = "none";
      modalOverlay.style.display = "none";
    }
  });
});
