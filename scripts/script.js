window.addEventListener("DOMContentLoaded", function () {
  ("use strict");

  // Timer
  function countTimer(deadline) {
    let timeHours = document.querySelector("#timer-hours"),
      timeMinutes = document.querySelector("#timer-minutes"),
      timeSeconds = document.querySelector("#timer-seconds");

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        timeData = {
          timeRemaining,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };

      if (timeRemaining > 0) {
        (timeData.seconds = Math.floor(timeRemaining % 60)),
          (timeData.minutes = Math.floor((timeRemaining / 60) % 60)),
          (timeData.hours = Math.floor(timeRemaining / 60 / 60) % 24),
          (timeData.days = Math.floor(timeRemaining / 60 / 60) / 24);
      }
      return timeData;
    }

    function correctTimeView(timeNumber) {
      return timeNumber < 10 ? "0" + timeNumber : timeNumber;
    }

    function updateClock() {
      let timer = getTimeRemaining();
      // console.log(timer);
      if (timer.timeRemaining < 0) {
        document.querySelector(".timer-numbers").style.color = "red";
        clearTimeout(updateClock);
      } else {
        setTimeout(updateClock, 1000);
      }

      timeHours.textContent = correctTimeView(timer.hours);
      timeMinutes.textContent = correctTimeView(timer.minutes);
      timeSeconds.textContent = correctTimeView(timer.seconds);
    }

    let comeOn = setTimeout(updateClock, 1000);
  }

  countTimer("31 july 2021");

  //menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector(".menu"),
      menu = document.querySelector("menu");

    const handlerMenu = function () {
      menu.classList.toggle("active-menu");
    };

    //первый обработчик, через делегирование
    menu.addEventListener("click", (event) => {
      let target = event.target;
      //console.log('target1: ', target);
      target = target.closest("a"); // найдет ближайшую ссылку
      //console.log('target2: ', target);*/
      if (target) {
        //console.log('зашло в условие, причем таргет сейчас: ', target);
        handlerMenu();
      }
    });

    // второй обработчик без делегирования (сделать один общий для двух <- услож.)
    btnMenu.addEventListener("click", handlerMenu);
  };

  toggleMenu();

  //popup
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
        // console.log('ширина онка clientWidth', clientWidth);

        function animatePopup() {
          count += 20;
          modalWindow.style.left = count + "px";
          if (
            parseFloat(modalWindow.style.left) >
            (clientWidth - coordinates.width) / 2
          ) {
            // console.log('comodalWindow.style.left = ', modalWindow.style.left);
            // console.log((clientWidth - coordinates.width) / 2);
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

  togglePopup();

  //табы
  const tabs = () => {
    const tabHeader = document.querySelector(".service-header"),
      tab = tabHeader.querySelectorAll(".service-header-tab"),
      tabContent = document.querySelectorAll(".service-tab");

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add("active");
          tabContent[i].classList.remove("d-none");
        } else {
          tab[i].classList.remove("active");
          tabContent[i].classList.add("d-none");
        }
      }
    };

    tabHeader.addEventListener("click", (event) => {
      let target = event.target;
      //console.log('target1: ', target);
      target = target.closest(".service-header-tab");
      //console.log('target2: ', target);
      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  tabs();

  //cslider
  const slider = () => {
    const slide = document.querySelectorAll(".portfolio-item"),
      btn = document.querySelectorAll(".portfolio-btn"),
      portfolioDots = document.querySelector(".portfolio-dots"),
      slider = document.querySelector(".portfolio-content");

    for (let i = 0; i < slide.length; i++) {
      let dot = document.createElement("li");
      if (i === 0) dot.className = "dot dot-active";
      else dot.className = "dot";
      portfolioDots.append(dot);
    }

    const dot = portfolioDots.querySelectorAll(".dot");

    let currentSlide = 0,
      interval;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    };
    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };
    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener("click", (event) => {
      event.preventDefault();
      let target = event.target;

      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");
      // if(!target.matches('.portfolio-btn, .dot')){
      //     return;
      // }

      if (target.matches("#arrow-right")) {
        currentSlide++;
      } else if (target.matches("#arrow-left")) {
        currentSlide--;
      } else if (target.matches(".dot")) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    });

    //обработчик события на весь слайдер
    slider.addEventListener("mouseover", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        stopSlide();
      }
    });
    slider.addEventListener("mouseout", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        startSlide();
      }
    });

    startSlide(1500);
  };

  slider();

  //Block Our Team
  const toggleCommandPhoto = () => {
    let targetSrcMain;
    const command = document.querySelector("#command");

    command.addEventListener("mouseover", (event) => {
      let target = event.target.closest("img");
      if (target !== null) {
        // console.log(target.src);
        targetSrcMain = target.src;
        target.src = target.dataset.img;
        // console.log(target.src);
      }
    });

    command.addEventListener("mouseout", (event) => {
      let target = event.target.closest("img");
      if (target !== null) {
        target.src = targetSrcMain;
      }
    });
  };
  toggleCommandPhoto();

  //block check validation Connection
  const checkInputs = () => {
    //part 1. Проверка калькулятора
    //Ф. обеспечивает ввод только цифр в калькуляторе в калькуляторе
    const validCalcNumber = () => {
      const inputsCalcBlock = document.querySelectorAll(".calc-block > input");
      inputsCalcBlock.forEach((item) => {
        item.value = "";
      });
      // console.log(inputsCalcBlock);
      inputsCalcBlock.forEach((item) => {
        item.addEventListener("input", (event) => {
          event.target.value = event.target.value.replace(/\D/g, "");
        });
      });
    };
    validCalcNumber();

    //Часть 2. Проверка форм отправки сообщений
    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {
      form.addEventListener("input", (event) => {
        let target = event.target.closest("input");
        let regEx = "";
        if (target.name === "user_name") {
          regEx = /[^а-я\ ]/gi;
        } else if (target.name === "user_message") {
          regEx = /[^а-я0-9\s\!\.\,\:\;\?\-]/gi;
        } else if (target.name === "user_phone") {
          regEx = /[^\d\+]/g;
        } else if (target.name === "user_email") {
          regEx = /[^a-z\@\-\_\.\!\~\*\']/gi;
        }
        target.value = target.value.replace(regEx, "");

        if (target.name === "user_phone") {
          if (/^\+/.test(target.value))
            target.value = "+" + target.value.replace(/\+/g, "");
          //else if (/^[\(\)\-]/.test(target.value)) target.value = "";
          else target.value = target.value.replace(/\+/g, "");
        }
        if (target.name === "user_email" && !!/^\W/.test(target.value)) {
          target.value = "";
        }
      });

      let inputs = form.querySelectorAll("input");
      inputs.forEach((inputItem) => {
        inputItem.addEventListener("blur", (event) => {
          let target = event.target;
          if (target.name === "user_name" || target.name === "user_message") {
            validAlpha(target);
          } else if (target.name === "user_phone") {
            validPhone(target);
          } else if (target.name === "user_email") {
            validMail(target);
          }

          function validAlpha(t) {
            let value = t.value
                .replace(/\ {2,}/, " ")
                .replace(/\-{2,}/, "-")
                .trim(),
              correctValue = "";
            if (!!value) {
              if (t.name === "user_name") {
                let nameArr = value.split(" ");
                nameArr.forEach((item, i) => {
                  correctValue +=
                    item[0].toUpperCase() + item.slice(1).toLowerCase() + " ";
                });
              } else {
                correctValue =
                  value[0].toUpperCase() + value.slice(1).toLowerCase();
              }
              t.value = correctValue;
            }
          }

          function validPhone(t) {
            let correctValue = "",
              value = t.value;
            // if (!!value) {
            //   if (
            //     !(
            //       value.includes(")") ||
            //       value.includes("(") ||
            //       value.includes("-")
            //     )
            //   ) {
            //     correctValue = value;
            //   } else {
            //     value = value
            //       .replace(/\-/g, "")
            //       .replace(/\(/g, "")
            //       .replace(/\)/g, "")
            //       .replace(/\+/, "");
            if (value[0] === "+") value = value.slice(1);
            switch (true) {
              case 1 <= value.length && value.length <= 5:
                correctValue = value;
                break;
              case 6 <= value.length && value.length <= 8:
                correctValue =
                  value[0] + "(" + value.slice(1, 4) + ")" + value.slice(4);
                break;
              default:
                correctValue =
                  value[0] +
                  "(" +
                  value.slice(1, 4) +
                  ")" +
                  value.slice(4, 7) +
                  "-" +
                  value.slice(7);
            }
            //}
            console.log(value[0]);
            t.value = "+" + correctValue;
          }

          function validMail(t) {
            let correctValue = "",
              regExBeforeDot = /.+\./,
              regeXBeforeDog = /.+\@/,
              value = t.value.replace(/\@{2,}/g, "@").replace(/\.{2,}/g, ".");
            value = value.replace(/\.$/, "").replace(/\@$/, "");
            if (value) {
              if (
                value.lastIndexOf("@") > value.lastIndexOf(".") ||
                !value.includes("@") ||
                !value.includes(".")
              ) {
                correctValue = value;
              } else {
                let before_domen2 = String(value.match(regExBeforeDot)),
                  domen2 = value
                    .replace(before_domen2, "")
                    .replace(/[^A-Z0-9]/gi, "");
                let before_domen1 = String(before_domen2.match(regeXBeforeDog)),
                  domen1 = before_domen2
                    .replace(before_domen1, "")
                    .replace(/[^A-Z0-9\-]/gi, "")
                    .replace(/\-{2,}/g, "");
                if (domen1.slice(-1) === "-") domen1 = domen1.slice(0, -1);
                if (domen1[0] === "-") domen1 = domen1.slice(1);
                let login = before_domen1.replace(/\@/g, "");
                correctValue = login + "@" + domen1 + "." + domen2;
              }
            }
            t.value = correctValue;
          }
        });
      });
    });
  };
  checkInputs();

  //calculator

  const calc = (price = 100) => {
    const calcBlock = document.querySelector(".calc-block"),
      calcType = document.querySelector(".calc-type"),
      calcSquare = document.querySelector(".calc-square"),
      calcDay = document.querySelector(".calc-day"),
      calcCount = document.querySelector(".calc-count"),
      totalValue = document.getElementById("total");
    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }
      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      } else {
        total = 0;
      }
      // console.log('countSum: total = ',total);
      totalValue.textContent = total;
    };

    calcBlock.addEventListener("change", (event) => {
      const target = event.target;

      //Первый способ
      if (
        target.matches(".calc-block") ||
        target.matches(".calc-type") ||
        target.matches(".calc-day") ||
        target.matches(".calc-count")
      ) {
        // console.log(1);
        countSum();
      }

      // Второй способ
      // if (target === calcType || target === calcSquare ||
      //     target === calcDay || target === calcCount){}

      //Третий способ
      // if (target.matches('select') || target.matches('input')){}
      //
    });
  };
  calc(100);

  const sendForm = () => {
    const errorMessage = "Что-то пошло не так...",
      loadMessage = "Передача данных...",
      successMessage = "Спасибо! Мы скоро с Вами свяжемся!";
    statusMessage = document.createElement("div"); // сюда выводится одно из трех сообщений выше
    statusMessage.style.cssText = "font-size: 2rem;";
    let forms = [...document.forms];

    forms.forEach((form, index) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        form.appendChild(statusMessage);
        if (index === 2) {
          statusMessage.style.color = "#fff";
        }
        statusMessage.textContent = loadMessage;
        const formData = new FormData(form);
        let body = {};
        formData.forEach((val, key) => {
          body[key] = val;
        });
        postData(
          body,
          () => {
            statusMessage.textContent = successMessage;
          },
          (error) => {
            statusMessage.textContent = errorMessage;
          }
        );
        clearInputs();
      });

      function postData(body, outputData, errorData) {
        const request = new XMLHttpRequest();
        request.addEventListener("readystatechange", () => {
          if (request.readyState !== 4) return;
          if (request.status === 200) {
            outputData();
            //alert("Yeah! Data sent and response loaded.");
          } else errorData(request.status);
        });
        request.open("POST", "../server.php");
        request.setRequestHeader("Content-Type", "application/json");

        request.send(JSON.stringify(body));
      }

      function clearInputs() {
        allInputs = document.querySelectorAll("input");
        for (let input of allInputs) {
          input.value = "";
        }
      }
    });
  };
  sendForm();
});
