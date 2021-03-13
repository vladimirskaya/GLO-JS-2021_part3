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

      // вызов обещания с передачей ему данных из форм
      postData(body)
        .then((response) => {
          //console.log(response);
          if (response.status !== 200) {
            throw new Error("Status network not 200");
          }
          statusMessage.textContent = successMessage;
        })
        // ловим возможную ошибку
        .catch((error) => {
          if (!!error) {
            //console.log(error);
            statusMessage.textContent = errorMessage;
          }
        });
      clearInputs();
    });

    function postData(body) {
      return fetch("../server.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    }

    function clearInputs() {
      allInputs = document.querySelectorAll("input");
      for (let input of allInputs) {
        input.value = "";
      }
    }
  });
};
