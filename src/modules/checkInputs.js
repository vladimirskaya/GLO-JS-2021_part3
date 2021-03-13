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
        let value = target.value;
        if (value.replace(/\D/g, "").length < 6) {
          target.form.querySelector("button").disabled = true;
          target.title = "Номер телефона должен содержать от 6 до 11 цифр.";
        } else {
          target.form.querySelector("button").disabled = false;
          target.title = "";
        }

        if (/^\+/.test(value)) {
          target.value = "+" + target.value.replace(/\+/g, "");
          if (value[-1] === "+") value.replace(-1, "");
          if (/^\+\d{2}/.test(value)) {
            value = value.replace(/\)*\(*/g, "");
            value = value.slice(0, 2) + "(" + value.slice(2);
            target.value = value;
          }
          if (/^\+\d\(\d{4}/.test(value)) {
            value = value.replace(/\(*\)*/g, "");
            value =
              value.slice(0, 2) +
              "(" +
              value.slice(2, 5) +
              ")" +
              value.slice(5);
            target.value = value;
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
            target.value = value;
          }
        } else {
          if (/^\d{4}/.test(value)) {
            value = value.replace(/\)*\(*\-*/g, "");
            value = value.slice(0, 3) + "-" + value.slice(3);
            target.value = value;
          }
          if (/^\d{3}\-\d{4}/.test(value)) {
            value = value.replace(/\(*\)*\-*/g, "");
            value =
              value.slice(0, 3) +
              "-" +
              value.slice(3, 5) +
              "-" +
              value.slice(5);
            target.value = value;
          }

          if (
            /^\d{3}\-\d{2,3}\-?\d{0,2}/.test(value) &&
            value.length > 10 &&
            value.length < 14
          ) {
            value = value.replace(/\(*\)*\-*/g, "");
            value =
              value[0] +
              "(" +
              value.slice(1, 4) +
              ")" +
              value.slice(4, 7) +
              "-" +
              value.slice(7);
            target.value = value;
          }

          if (value.length === 14) {
            value = value.replace(/\(*\)*\-*/g, "");
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
            target.value = value;
          }
          if (/^\d\(\d{3}\)\d{3}\-\d{2}\-\d{2}/.test(value)) {
            value = value.slice(0, 15);
            target.value = value;
          }
        }
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
          let resultValue = "",
            value = t.value;
          if (!!value) {
            value = value
              .replace(/\-/g, "")
              .replace(/\(/g, "")
              .replace(/\)/g, "")
              .replace(/\+/, "");
            if (value.length < 6) {
              resultValue = value;
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
              case value.length === 8:
                resultValue =
                  value.slice(0, 4) +
                  "-" +
                  value.slice(4, 7) +
                  "-" +
                  value.slice(7);
                break;
              case 9 === value.length || value.length === 10:
                resultValue =
                  value[0] +
                  "(" +
                  value.slice(1, 4) +
                  ")" +
                  value.slice(4, 7) +
                  "-" +
                  value.slice(7);
                break;
              case 11 === value.length:
                resultValue =
                  value[0] +
                  "(" +
                  value.slice(1, 4) +
                  ")" +
                  value.slice(4, 7) +
                  "-" +
                  value.slice(7, 9) +
                  "-" +
                  value.slice(9);
                break;
            }
            if (t.value === "+") resultValue = "+" + resultValue;
          }
          t.value = resultValue;
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
export default checkInputs;