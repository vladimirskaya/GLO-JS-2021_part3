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
  const formsEmail = document.querySelectorAll(".form-email");
  let flag;

  //делаем поле обязательным для заполнения
  formsEmail.forEach((elem) => {
    elem.required = true;
  });

  forms.forEach((form) => {
    form.addEventListener("input", (event) => {
      let target = event.target.closest("input");
      let regEx = "";
      if (target.name === "user_name") {
        regEx = /[^а-я\ ]/gi;
      } else if (target.name === "user_message") {
        regEx = /[^а-я\s\!\.\,\:\;\?\-]/gi;
      } else if (target.name === "user_phone") {
        regEx = /[^\d\+]/g;
      } else if (target.name === "user_email") {
        regEx = /[^a-z\@\-\_\.\!\~\*\']/gi;
      }
      target.value = target.value.replace(regEx, "");

      if (target.name === "user_phone") {
        let value = target.value;
        if (value.replace(/\D/g, "").length < 6) {
          // все, что не цифра - удаляем и если цифр меньше 6, то делаем кнопку "отправить" неактивной
          target.form.querySelector("button").disabled = true;
          target.title = "Номер телефона должен содержать от 6 до 11 цифр.";
        } else {
          if (!flag) {
            target.form.querySelector("button").disabled = false;
            target.title = "";
          }
        }

        if (/^\+/.test(value)) {
          //если выражение начинается с +
          value = "+" + value.replace(/\+/g, ""); // тогда типа фиксируем + в начале, а в самом теле удаляем
          if (value[value.length - 1] === "+") {
            value.replace(/\+$/g, "");
          }
          if (/^\+\d{2}/.test(value)) {
            value = value.replace(/\)*\(*/g, "");
            value = value.slice(0, 2) + "(" + value.slice(2);
          }
          if (/^\+\d\(\d{4}/.test(value)) {
            value = value.replace(/\(*\)*/g, "");
            value =
              value.slice(0, 2) +
              "(" +
              value.slice(2, 5) +
              ")" +
              value.slice(5);
          }

          if (/^\+\d\(\d{3}\)\d{4}/.test(value)) {
            value = value.replace(/\(*\)*\-*/g, "");
            value =
              value.slice(0, 2) +
              "(" +
              value.slice(2, 5) +
              ")" +
              value.slice(5, 8) +
              "-" +
              value.slice(8);
          }

          if (/^\+\d\(\d{3}\)\d{3}\-\d{3}/.test(value)) {
            value = value.replace(/\(*\)*\-*/g, "");
            value =
              value.slice(0, 2) +
              "(" +
              value.slice(2, 5) +
              ")" +
              value.slice(5, 8) +
              "-" +
              value.slice(8, 10) +
              "-" +
              value.slice(10);
          }
          if (/^\+\d\(\d{3}\)\d{3}\-\d{2}\-\d{2}/.test(value)) {
            value = value.slice(0, 16);
          }
          target.value = value;
        } else {
          value = value.replace(/\+/g, "");
          if (/^\d{4}/.test(value)) {
            value = value.replace(/\)*\(*\-*\+*/g, "");
            value = value.slice(0, 3) + "-" + value.slice(3);
          }
          if (/^\d{3}\-\d{4}/.test(value)) {
            value = value.replace(/\(*\)*\-*\+*/g, "");
            value =
              value.slice(0, 3) +
              "-" +
              value.slice(3, 5) +
              "-" +
              value.slice(5);
          }

          if (
            /^\d{3}\-\d{2,3}\-?\d{0,2}/.test(value) &&
            value.length > 10 &&
            value.length < 14
          ) {
            value = value.replace(/\(*\)*\-*\+*/g, "");
            value =
              value[0] +
              "(" +
              value.slice(1, 4) +
              ")" +
              value.slice(4, 7) +
              "-" +
              value.slice(7);
          }

          if (value.length === 14) {
            value = value.replace(/\(*\)*\-*\+*/g, "");
            value =
              value[0] +
              "(" +
              value.slice(1, 4) +
              ")" +
              value.slice(4, 7) +
              "-" +
              value.slice(7, 9) +
              "-" +
              value.slice(9);
          }
          if (/^\d\(\d{3}\)\d{3}\-\d{2}\-\d{2}/.test(value)) {
            value = value.slice(0, 15);
          }
          target.value = value;
        }
      }

      if (target.name === "user_email" && !!/^\W/.test(target.value)) {
        target.value = "";
      }

      if (target.name === "user_name") {
        if (target.value.length < 2) {
          target.form.querySelector("button").disabled = true;
          flag = true;
          target.title = "Имя должно содержать более одной буквы.";
          return;
        } else {
          target.form.querySelector("button").disabled = false;
          target.title = "";
        }
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
              nameArr.forEach((item) => {
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
          let resultValue = "",
            value = t.value
              .replace(/\-/g, "")
              .replace(/\(/g, "")
              .replace(/\)/g, "")
              .replace(/\+/, "");
          if (!!value) {
            // если value заполнено
            if (value.length < 6 || value.length > 7) {
              // если цифр меньше 6 ил свыше 7, возврат
              return;
            }
            switch (true) {
              case value.length === 6:
                resultValue = value.slice(0, 3) + "-" + value.slice(3);
                break;
              case value.length === 7:
                resultValue =
                  value.slice(0, 3) +
                  "-" +
                  value.slice(3, 5) +
                  "-" +
                  value.slice(5);
                break;
            }
          }
          t.value = resultValue;
        }

        function validMail(t) {
          let correctValue = "",
            regExBeforeDot = /.+\./,
            regeXBeforeDog = /.+\@/,
            //удаляем сдвоенные @ и .
            value = t.value.replace(/\@{2,}/g, "@").replace(/\.{2,}/g, ".");
          //удаляем точки и собак в конце - согласно стандартам почта не может так заканчиваться
          value = value.replace(/\.$/, "").replace(/\@$/, "");
          if (value) {
            if (
              value.lastIndexOf("@") > value.lastIndexOf(".") || //если собака стоит после самой последней точки
              !value.includes("@") || //если вообще нет @
              !value.includes(".") // если вообще нет точки
            ) {
              correctValue = value;
            } else {
              // находит все символы до последней точки, т.к. жадный поиск. Полученная строка содержит этй точку.
              let before_domen2 = String(value.match(regExBeforeDot)),
                //получаем вторую часть домена - т.е. что идет после точки. Значение без точки
                domen2 = value
                  .replace(before_domen2, "")
                  .replace(/[^A-Z0-9]/gi, "");
              //получаем все символы ,что стоят перед последней собакой
              let before_domen1 = String(before_domen2.match(regeXBeforeDog)),
                // получаем первую часть домена, что обычно стоит после @ и до точки
                domen1 = before_domen2
                  .replace(before_domen1, "")
                  .replace(/[^A-Z0-9\-]/gi, "")
                  .replace(/\-{2,}/g, "");
              //удаляем символы -
              if (domen1.slice(-1) === "-") domen1 = domen1.slice(0, -1);
              if (domen1[0] === "-") domen1 = domen1.slice(1);
              // получаем логин
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
export default checkInputs;
