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

export default toggleCommandPhoto;
