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
      console.log("coordinates.width", coordinates);
      const paddLeft = parseFloat(getComputedStyle(modalWindow).paddingLeft);
      console.log("paddLeft", paddLeft);
      // console.log("ширина онка clientWidth", clientWidth);
      console.log("csss", getComputedStyle(modalWindow).position);
      const step = 20;
      function animatePopup() {
        count += step;
        coordinates = modalWindow.getBoundingClientRect();
        console.log("coordinates.width", coordinates);
        modalWindow.style.left = count + "px";
        if (
          parseFloat(modalWindow.style.left) >=
          (clientWidth - coordinates.width) / 2 + paddLeft
        ) {
          console.log((clientWidth - coordinates.width) / 2);
          console.log(clientWidth, "середина окна ", clientWidth / 2);
          console.log(
            "середина формы ",
            parseFloat(modalWindow.style.left) + coordinates.width / 2,
            "a x = ",
            coordinates.x
          );
          // console.log(
          //   "modalWindow.getBoundingClientRect() = ",
          //   modalWindow.getBoundingClientRect()
          // );
          modalWindow.style.left =
            parseFloat(modalWindow.style.left) - step + "px";
          clearTimeout(comeOn);
          return;
        }
        setTimeout(animatePopup, 15);
      }

      // popup.style.position = 'relative';
      popup.style.display = "block";
      modalWindow.style.left = `-${coordinates.width}px`;
      if (clientWidth > 768) {
        comeOn = setTimeout(animatePopup, 15);
      } else {
        modalWindow.style.left = `${coordinates.x}px`;
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
