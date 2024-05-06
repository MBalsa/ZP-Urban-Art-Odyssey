// document.addEventListener("DOMContentLoaded", function () {
//   fetch("../json/data.json") // Fetch the local JSON file
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data); // Log the fetched data to inspect its structure

//       // Get the container element
//       const imageContainer = document.getElementById("imageContainer");

//       // Access the images array inside the data object
//       const images = data.images;

//       // Loop through the images array and create HTML elements for each image
//       images.forEach((image) => {
//         // Create image element
//         const img = document.createElement("img");
//         img.src = image.image;
//         img.alt = image.name;

//         // Append image to container
//         imageContainer.appendChild(img);
//       });
//     })
//     .catch((error) => console.error("Error:", error));
// });

// ----------------ISPROBAVANJE API-a----------------------IGNORISATI !

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
        <input type="button" id="card-button" name="readMore" value="Read more"/>
      `;
        postContainer.appendChild(postElement);
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

postMethods();
