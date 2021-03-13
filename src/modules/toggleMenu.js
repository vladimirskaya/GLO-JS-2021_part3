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

export default toggleMenu;
