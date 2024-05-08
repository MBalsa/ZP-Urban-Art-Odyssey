document.addEventListener("DOMContentLoaded", function () {
  const postContainer = document.querySelector(".cardContainer");
  const exitBtn = document.querySelector(".exit");
  const readMoreBtn = document.getElementById("readMoreBtn");
  const artPrewiev = document.querySelector(".artPreview");
  const modalOverlay = document.querySelector(".modal-overlay");
  const checkboxes = document.querySelectorAll(
    '.filters input[type="checkbox"]'
  );
  const search = document.getElementById("search");

  let loadMoreBtn = document.querySelector(".loadMore");

  let currentItem = 3;

  //DINAMICKI GENERISANE KARTICE
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
          const formattedDate = postData.date.split("-").reverse().join("-");
          const postElement = document.createElement("div");
          postElement.classList.add("card");
          postElement.setAttribute("data-date", formattedDate);
          postElement.setAttribute("name", postData.name);
          postElement.setAttribute("location", postData.location);
          postElement.setAttribute("author", postData.author);
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

  //LOAD MORE
  let query = search.value;
  console.log(query);
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
  //READ MORE Modalni prozori
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
              <div class="mapDisplay"><iframe src="${imageData.mapsrc}" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
            </div>
          </div>`;
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  });
  //exit dugme
  document.addEventListener("click", function (event) {
    if (event.target && event.target.className === "exit") {
      artPrewiev.style.display = "none";
      modalOverlay.style.display = "none";
    }
  });
  //Esc komanda
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      artPrewiev.style.display = "none";
      modalOverlay.style.display = "none";
    }
  });
  //Samo jedan checkbox da je aktivan
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        checkboxes.forEach((check) => {
          if (check !== this) {
            check.checked = false;
          }
        });
      }
    });
  });
  // Filtriranje checkboxovima
  function reorderCardsByDate() {
    const cards = document.querySelectorAll(".card");

    const cardsArray = Array.from(cards);

    cardsArray.sort((cardA, cardB) => {
      const dateA = new Date(cardA.getAttribute("data-date"));
      const dateB = new Date(cardB.getAttribute("data-date"));
      return dateA - dateB;
    });

    cardsArray.forEach((card) => card.remove());

    const postContainer = document.querySelector(".cardContainer");
    cardsArray.forEach((card) => postContainer.appendChild(card));
  }

  document.getElementById("checkbox1").addEventListener("change", function () {
    if (this.checked) {
      reorderCardsByDate();
    }
  });
  function reorderCardsByName() {
    const cards = document.querySelectorAll(".card");

    const cardsArray = Array.from(cards);

    cardsArray.sort((cardA, cardB) => {
      const nameA = cardA.querySelector(".card-headline").textContent;
      const nameB = cardB.querySelector(".card-headline").textContent;
      return nameA.localeCompare(nameB);
    });

    cardsArray.forEach((card) => card.remove());

    const postContainer = document.querySelector(".cardContainer");
    cardsArray.forEach((card) => postContainer.appendChild(card));
  }
  document.getElementById("checkbox2").addEventListener("change", function () {
    if (this.checked) {
      reorderCardsByName();
    }
  });

  function reorderCardsByLocation() {
    console.log("Sorting cards by location...");
    const cards = document.querySelectorAll(".card");

    const cardsArray = Array.from(cards);

    cardsArray.sort((cardA, cardB) => {
      const locationA = cardA.getAttribute("location");
      const locationB = cardB.getAttribute("location");
      console.log("Location A:", locationA);
      console.log("Location B:", locationB);
      return locationA.localeCompare(locationB);
    });

    cardsArray.forEach((card) => card.remove());

    const postContainer = document.querySelector(".cardContainer");
    cardsArray.forEach((card) => postContainer.appendChild(card));
  }

  document.getElementById("checkbox3").addEventListener("change", function () {
    if (this.checked) {
      reorderCardsByLocation();
    }
  });
  //SEARCH BAR
  function filterCards() {
    const searchValue = search.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      const name = card.getAttribute("name").toLowerCase();
      const location = card.getAttribute("location").toLowerCase();
      const author = card.getAttribute("author").toLowerCase();

      if (
        name.includes(searchValue) ||
        location.includes(searchValue) ||
        author.includes(searchValue)
      ) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  search.addEventListener("input", filterCards);
});
