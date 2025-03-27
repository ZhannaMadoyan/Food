document.querySelectorAll("div").forEach((div) => {
    if (!div.querySelector("img")) {
        const originalStyle = {
            fontStyle: "",
            color: "",
            textShadow: "",
            transform: ""
        };

        const clickHandler = () => {
            div.style.fontStyle = "bold";
            div.style.color = "black";
            div.style.textShadow = "2px 2px 4px rgba(18, 143, 193, 0.85)";
            div.style.transform = "scale(1.1)"; 
        };

        const mouseLeaveHandler = () => {
            div.style.fontStyle = originalStyle.fontStyle;
            div.style.color = originalStyle.color;
            div.style.textShadow = originalStyle.textShadow;
            div.style.transform = originalStyle.transform;
        };

        div.addEventListener("click", clickHandler);
        div.addEventListener("mouseleave", mouseLeaveHandler);

        div.addEventListener("blur", () => {
            div.style.fontStyle = originalStyle.fontStyle;
            div.style.color = originalStyle.color;
            div.style.textShadow = originalStyle.textShadow;
            div.style.transform = originalStyle.transform;
        });
    }
});

//ժամանակիհետհաշվարկ
const initialDays = 12;
const initialHours = 20;
const initialMinutes = 56;
const initialSeconds = 20;

const initialTime = (initialDays * 24 * 60 * 60 * 1000) + 
                   (initialHours * 60 * 60 * 1000) + 
                   (initialMinutes * 60 * 1000) + 
                   (initialSeconds * 1000);

const countDownDate = new Date().getTime() + initialTime;

const timerInterval = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    // Եթե ժամանակը ավարտվել է
    if (distance < 0) {
        clearInterval(timerInterval);
        document.querySelector(".promotion__timer .title").innerText = "Акция завершена!";
    }
}, 1000);

document.querySelector('.order__form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Շնորհակալություն պատվերի համար։ Մենք կապ կհաստատենք Ձեզ հետ։');
});

document.querySelector('.modal__content form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Շնորհակալություն։ Մենք կապ կհաստատենք Ձեզ հետ։');});
const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('.modal__close');

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

document.querySelectorAll('.btn_white, .btn_dark').forEach(button => {
    button.addEventListener('click', openModal);
});

closeModalButton.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
});

let slideIndex = 0;
const slides = document.querySelectorAll('.offer__slide');
const totalSlides = slides.length;
const currentSlide = document.getElementById('current');
const totalSlidesElement = document.getElementById('total');

totalSlidesElement.textContent = totalSlides.toString().padStart(2, '0');

function showSlide(index) {
    if (index >= totalSlides) slideIndex = 0;
    if (index < 0) slideIndex = totalSlides - 1;

    slides.forEach((slide, i) => {
        slide.style.display = i === slideIndex ? 'block' : 'none';
    });

    currentSlide.textContent = (slideIndex + 1).toString().padStart(2, '0');
}

document.querySelector('.offer__slider-prev').addEventListener('click', () => {
    showSlide(--slideIndex);
});

document.querySelector('.offer__slider-next').addEventListener('click', () => {
    showSlide(++slideIndex);
});

showSlide(slideIndex);


const genderButtons = document.querySelectorAll('#gender .calculating__choose-item');
const activityButtons = document.querySelectorAll('.calculating__choose_big .calculating__choose-item');
const inputs = document.querySelectorAll('.calculating__choose_medium input');
const resultElement = document.querySelector('.calculating__result span');

let gender = 'female';
let activity = 1.375;

genderButtons.forEach(button => {
    button.addEventListener('click', () => {
        genderButtons.forEach(b => b.classList.remove('calculating__choose-item_active'));
        button.classList.add('calculating__choose-item_active');
        gender = button.textContent.toLowerCase();
        calculateCalories();
    });
});

activityButtons.forEach(button => {
    button.addEventListener('click', () => {
        activityButtons.forEach(b => b.classList.remove('calculating__choose-item_active'));
        button.classList.add('calculating__choose-item_active');
        activity = parseFloat(button.getAttribute('data-ratio'));
        calculateCalories();
    });
});

inputs.forEach(input => {
    input.addEventListener('input', () => {
        calculateCalories();
    });
});

function calculateCalories() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const age = parseFloat(document.getElementById('age').value);

    if (!height || !weight || !age) return;

    let calories;
    if (gender === 'female') {
        calories = (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activity;
    } else {
        calories = (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activity;
    }

    resultElement.textContent = Math.round(calories);
}

calculateCalories();

//class for menu card - start
class MenuCard{
    constructor(img, alt, title, descr, price,parentSelector){
      this.img = img;
      this.alt = alt;
      this.title = title;
      this.descr = descr; 
      this.price  = price;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH()
    }
    changeToUAH(){
        this.price = this.price * this.transfer;
       }
      render(){
        const {img, alt, title, descr, price} = this
        const element = document.createElement("div");
        element.classList.add("menu__item");
        element.innerHTML = `
                         <img src=${img} alt=${alt}>
                          <h3 class="menu__item-subtitle">${title}</h3>
                          <div class="menu__item-descr">${descr}</div>
                          <div class="menu__item-divider"></div>
                          <div class="menu__item-price">
                              <div class="menu__item-cost">Цена:</div>
                              <div class="menu__item-total"><span></span>${price}грн/день</div>
        `;
      this.parent.append(element);
      }
      };
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
       " Меню \"Фитнес\"",
       "Меню \"Фитнес\" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
       8.5,
       ".menu .container",
    ).render();
    new MenuCard(
        "img/tabs/elite.jpg",
        "vegy",
       " Меню \“Премиум\”",
       "Меню \“Премиум\" - В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
       21,
       ".menu .container",
    ).render();
    new MenuCard(
        "img/tabs/post.jpg",
        "vegy",
       "Меню \"Постное\"",
       "Меню \"Постное\" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
       16,
       ".menu .container",
    ).render();
    //   end

   //  we are creating post request to server -start

const forms = document.querySelectorAll("form");

const messages = {
  success: "Thank you! We will contact you soon",
  failure: "Sorry, something went wrong"
}

const {success,failure} = messages;

forms.forEach(form => postData(form))

function postData(form){
  form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const request = new XMLHttpRequest();

    request.open("POST", "server.php");

    const formData = new FormData(form);

    request.send(formData);

    request.addEventListener("load",() => {
      if(request.status=== 200){
        console.log(request.response);
        form.reset();
        messagesModal(success);
      }else{
        console.log("error",request.status);
        messagesModal(failure);
      }
    })
  })
}

function messagesModal(message){
  const prevModalDialog = document.querySelector(".modal__dialog");
  prevModalDialog.classList.add("hide");
  openModal();

  const messageModal = document.createElement("div");
  messageModal.classList.add("modal__dialog");
  messageModal.innerHTML = `
  <div class="modal__content">
  <div data-close class="modal-close"></div>
  <div class="modal__title">${message}</div>
  `
  document.querySelector(".modal").append(messageModal);
  setTimeout(()=>{
    messageModal.remove();
    prevModalDialog.classList.add("show");
    prevModalDialog.classList.remove("hide");
  },2000)
}

//  we are creating post request to server -end