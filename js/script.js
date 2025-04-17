"use strict"

window.addEventListener("DOMContentLoaded", function () {
  // Tab logic start
  const tabsHeaders = document.querySelectorAll(".tabheader__item");
  const tabsContents = document.querySelectorAll(".tabcontent");
  const tabsHeadersParent = document.querySelector(".tabheader__items");



  hideTabContent();
  showTabContent();

  function hideTabContent() {
    tabsContents.forEach(tabContent => {
      tabContent.classList.add("hide");
      tabContent.classList.remove("show");
    });
    tabsHeaders.forEach(tabHeader => tabHeader.classList.remove("tabheader__item_active"));
  }

  function showTabContent(i = 0) {
    tabsContents[i].classList.add("show");
    tabsContents[i].classList.remove("hide");
    tabsHeaders[i].classList.add("tabheader__item_active");
  }

  tabsHeadersParent.addEventListener("click", (e) => {
    if (e.target && e.target.matches(".tabheader__item")) {
      tabsHeaders.forEach((tabHeader, index) => {
        if (e.target === tabHeader) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });
  // tab logic end 

  // timer logic start
  const deadline = "2025-03-17"
  function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor(total / (1000 * 60 * 60) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const secunds = Math.floor((total / 1000) % 60);
    return {
      total,
      days,
      hours,
      minutes,
      secunds,
    }
  }
  function setZero(n) {
    return n >= 0 && n < 10 ? `0${n}` : n
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const daysBlock = document.querySelector("#days");
    const hoursBlock = document.querySelector("#hours");
    const minutesBlock = document.querySelector("#minutes");
    const secundsBlock = document.querySelector("#seconds");

    const timerId = setInterval(upDateClock, 1000)

    function upDateClock() {
      const { total, days, hours, minutes, secunds } = getTimeRemaining(endtime)

      daysBlock.textContent = setZero(days)
      hoursBlock.textContent = setZero(hours)
      minutesBlock.textContent = setZero(minutes)
      secundsBlock.textContent = setZero(secunds)

      if (total <= 0) {
        clearInterval(timerId)
      }
    }
    upDateClock()

  }
  setClock(".timer", deadline)
  // timer logic end


  // modal loggic start 
  const modalTrigger = document.querySelectorAll("[data-modal]");
  const modal = document.querySelector(".modal");
  const modalClose = document.querySelector("[data-close]");

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.removeAttribute("style");
  }

  modalTrigger.forEach(btn => btn.addEventListener("click", openModal))
  modalClose.addEventListener("click", closeModal)

  modal.addEventListener("click", (e) => {
    if (e.target && e.target === modal) {
      modal.classList.add("hide");
      modal.classList.remove("show");
      document.body.removeAttribute("style");
    }

  })

  // modal logic end



  //class for menu card - start
  class MenuCard {
    constructor(img, alt, title, descr, price, parentSelector) {
      this.img = img;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH()
    }
    changeToUAH() {
      this.price = this.price * this.transfer;
    }
    render() {
      const { img, alt, title, descr, price } = this
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
    'Меню “Премиум”',
    ' Меню "Фитнес"',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    8.5,
    ".menu .container",
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    'Меню “Премиум”',
    ' Меню \"Фитнес\"',
    'Меню \"Фитнес\" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    8.5,
    '.menu .container',
  ).render();





  // cllas for menu card - end


  // post request with PHP-start

  const forms = document.querySelectorAll("form");

  const messages = {
    success: "Thank you! We will contact you soon",
    failure: "Sorry, something went wrong"
  };

  const { success, failure } = messages;

  forms.forEach(form => postData(form));

  function postData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      fetch("server.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok');
        })
        .then(data => {
          console.log(data);
          form.reset();
          messagesModal(success);
        })
        .catch(error => {
          console.error("Error:", error);
          messagesModal(failure);
        });
    });
  }

  function messagesModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    const modal = document.querySelector(".modal");

    prevModalDialog.classList.add("hide");

    const messageModal = document.createElement("div");
    messageModal.classList.add("modal__dialog");
    messageModal.innerHTML = `
    <div class="modal__content">
      <div data-close class="modal-close">×</div>
      <div class="modal__title">${message}</div>
    </div>
  `;

    modal.append(messageModal);

    setTimeout(() => {
      messageModal.remove();
      prevModalDialog.classList.remove("hide");
      prevModalDialog.classList.add("show");
    }, 2000);
  }
})
// post request with PHP-end
// slayderi skizb
const slides = document.querySelectorAll(".offer__slide");
const prev = document.querySelector(".offer__slider-prev");
const next = document.querySelector(".offer__slider-next");
const current = document.querySelector("#current");
const total = document.querySelector("#total");

let slideIndex = 1;

showSlides(slideIndex);

total.textContent = slides.length < 10 ? `0${slides.length}` : slides.length;

prev.addEventListener("click", () => slideState(-1));
next.addEventListener("click", () => slideState(1));

function showSlides(n) {
  slideIndex = n > slides.length ? 1 : n < 1 ? slides.length : n;
  slides.forEach(slide => slide.style.display = "none");
  slides[slideIndex - 1].style.display = "block";
  current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;
}

function slideState(n) {
  showSlides(slideIndex += n);
}
// slayderi verj
const result = document.querySelector('.calculating__result span');

let gender, height, weight, age, ratio;

function calcTotal() {
  if (!gender || !height || !weight || !age || !ratio) {
    result.textContent = "__";
    return;
  }

  if (gender === "male") {
    result.textContent = Math.round(
      (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
    );
  } else if (gender === "female") {
    result.textContent = Math.round(
      (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
    );
  } else {
    result.textContent = "__";
  }
}

calcTotal();

function getStaticInformation(selector, activeClass) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      if (e.target.dataset.ratio) {
        ratio = parseFloat(e.target.dataset.ratio);
      } else {
        gender = e.target.getAttribute("id");
      }
      elements.forEach((elem) => elem.classList.remove(activeClass));
      e.target.classList.add(activeClass);
      calcTotal();
    });
  });
}

getStaticInformation("#gender div", "calculating__choose-item_active");
getStaticInformation(
  ".calculating__choose_big div",
  "calculating__choose-item_active"
);