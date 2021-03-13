"use strict";

import countTimer from "../modules/countTimer";
import toggleMenu from "../modules/toggleMenu";
import togglePopup from "../modules/togglePopup";
import tabs from "../modules/tabs";
import slider from "../modules/slider";
import toggleCommandPhoto from "../modules/toggleCommandPhoto";
import checkInputs from "../modules/checkInputs";
import calc from "../modules/calc";
import sendForm from "../modules/sendForm";

// Timer
countTimer("31 july 2021");

//menu
toggleMenu();

//popup
togglePopup();

//табы
tabs();

//cslider
slider();

//Block Our Team
toggleCommandPhoto();

//block check validation Connection
checkInputs();

//calculator
calc(100);

//send-form
sendForm();
