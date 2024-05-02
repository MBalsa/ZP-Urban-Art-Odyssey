const modal = document.querySelector(".modal");
const btnSubmit = document.querySelector(".btn-submit");
const btnOk = document.querySelector(".btn--ok-modal");
const overlay = document.querySelector(".overlay");

// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  window.location.href = "index.html";
};

btnSubmit.addEventListener("click", openModal);

btnOk.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
