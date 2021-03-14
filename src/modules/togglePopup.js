const togglePopup = () => {
  const popup = document.querySelector(".popup"), // само окно
    popupBtn = document.querySelectorAll(".popup-btn"); // кнопка раскрытия окна

  popupBtn.forEach((elem) => {
    elem.addEventListener("click", () => {
      const modalWindow = popup.querySelector(".popup-content");

      let comeOn,
        count = 0, // счетчик для перемещения от границы окна
        clientWidth = document.documentElement.clientWidth,
        coordinates = modalWindow.getBoundingClientRect();
      const step = 10;
      modalWindow.setAttribute("style", "transform: translateX(0)");
      modalWindow.setAttribute("style", "-webkit-transform: translateX(0)");

      function animatePopup() {
        count += step;
        coordinates = modalWindow.getBoundingClientRect();

        modalWindow.style.left = count + "px";
        if (
          parseFloat(modalWindow.style.left) >=
          (clientWidth - coordinates.width) / 2
        ) {
          modalWindow.style.left =
            parseFloat(modalWindow.style.left) - step / 5 + "px"; // делим степ на 5 для более равномерного расчета
          clearTimeout(comeOn);
          return;
        }
        setTimeout(animatePopup, 15);
      }

      popup.style.display = "block";
      modalWindow.style.left = `-${coordinates.width}px`;
      if (clientWidth > 768) {
        comeOn = setTimeout(animatePopup, 15);
      } else {
        coordinates = modalWindow.getBoundingClientRect();
        modalWindow.style.left = `${(clientWidth - coordinates.width) / 2}px`;
      }
    });
  });

  popup.addEventListener("click", (event) => {
    let target = event.target;
    if (target.classList.contains("popup-close")) {
      popup.style.display = "none";
    } else {
      target = target.closest(".popup-content");
      if (!target) {
        popup.style.display = "none";
      }
    }
  });
};

export default togglePopup;
