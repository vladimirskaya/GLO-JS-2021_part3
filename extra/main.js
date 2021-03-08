<<<<<<< HEAD
'use strict';

let greeting = document.querySelector('.greeting'),
	weekDay = document.querySelector('#week-day'),
	timeNow = document.querySelector('#time-now'),
	daysAmount = document.querySelector('#days-amount');
	
let today = new Date();
	
	function getCorrectGreeting(hour){
		if (hour > 6 && hour < 12) {
				return ' Доброе утро!';
			} else  if (12 <= hour && hour < 17){
				return 'Добрый день!'
			} else if (17 <= hour && hour < 21){
				return 'Добрый вечер!'
			} else {
				return 'Доброй ночи!'
			}
	}
	
	function correctWeekDay(wDay){
		const weekDays = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
		for (let i = 0; i < weekDays.length;  i++) {
			if (wDay === i){
				return weekDays[i];
			}
		} 
	}
	
	function myTimer(){
		today = new Date();
		timeNow.textContent =  today.toLocaleTimeString('en-US');
	}
	
	function getCorrectDays(amount){
		if (amount % 10 === 1){
			return amount + ' день.';
		}else if (amount % 10 === 2 || amount % 10 === 3 || amount % 10 === 4){
			return amount + ' дня.';
		}else {
			return amount + ' дней.';
		}
	}

	greeting.textContent = getCorrectGreeting(today.getHours());
	weekDay.textContent = correctWeekDay(today.getDay());
	let countTime = setInterval(myTimer,1000);
	
	let	newYearDay = new Date(`01,01, ${today.getFullYear() + 1}`),
		amountDiffDays = Math.floor((newYearDay.getTime() - today.getTime()) / 1000 / 60 / 60 / 24);
	daysAmount.textContent = getCorrectDays(amountDiffDays);
	
	
	
=======
'use strict';

let greeting = document.querySelector('.greeting'),
	weekDay = document.querySelector('#week-day'),
	timeNow = document.querySelector('#time-now'),
	daysAmount = document.querySelector('#days-amount');
	
let today = new Date();
	
	function getCorrectGreeting(hour){
		if (hour > 6 && hour < 12) {
				return ' Доброе утро!';
			} else  if (12 <= hour && hour < 17){
				return 'Добрый день!'
			} else if (17 <= hour && hour < 21){
				return 'Добрый вечер!'
			} else {
				return 'Доброй ночи!'
			}
	}
	
	function correctWeekDay(wDay){
		const weekDays = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
		for (let i = 0; i < weekDays.length;  i++) {
			if (wDay === i){
				return weekDays[i];
			}
		} 
	}
	
	function myTimer(){
		today = new Date();
		timeNow.textContent =  today.toLocaleTimeString('en-US');
	}
	
	function getCorrectDays(amount){
		if (amount % 10 === 1){
			return amount + ' день.'
		}else if (amount % 10 === 2 || amount % 10 === 3 || amount % 10 === 4){
			return amount + ' дня.'
		}else {
			return amount + ' дней.'
		}
	}

	greeting.textContent = getCorrectGreeting(today.getHours());
	weekDay.textContent = correctWeekDay(today.getDay());
	let countTime = setInterval(myTimer,1000);
	
	let	newYearDay = new Date(`01,01, ${today.getFullYear() + 1}`),
		amountDiffDays = Math.floor((newYearDay.getTime() - today.getTime()) / 1000 / 60 / 60 / 24);
	daysAmount.textContent = getCorrectDays(amountDiffDays);
	
	
	
			
>>>>>>> 0992b5cdf1d955c65d16e8402095bf3f86185197
