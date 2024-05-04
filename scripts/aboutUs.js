const accordionIcons = document.querySelectorAll(".accordion .item .icon");

accordionIcons.forEach((icon) => {
  icon.addEventListener("click", function (event) {
    event.stopPropagation();

    const item = this.closest(".item");
    const isOpen = item.classList.contains("open");

    document
      .querySelectorAll(".accordion .item")
      .forEach((el) => el.classList.remove("open"));

    if (!isOpen) {
      item.classList.add("open");
    }
  });
});
