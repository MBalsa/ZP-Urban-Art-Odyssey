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
