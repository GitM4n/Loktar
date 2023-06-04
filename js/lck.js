window.addEventListener('load', function () {
  const page = this.document.querySelector('.page-load');

  this.document.documentElement.style.overflow = 'visible';
  page.classList.add('hide');
 

})


const slider = document.querySelector('.slider__container');
const slides = document.querySelectorAll('.slide');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const pagination = document.querySelector('.slider-pagination')

let slideI = 0;
let slidePag = 1;
let slideWidth;
setTimeout(()=>{
    slideWidth = slides[0].clientWidth + 26;
}, 1000)

function nextSlide(){
    slideI++;
    slidePag++;
    if (slideI > slides.length - 1){
        slideI = 0;
        slidePag =  1;
    }
    pagination.innerHTML = `${slidePag}/${slides.length}`
    slider.style.transform = `translateX(-${slideWidth * slideI}px)`;
    
}

function prevSlide(){
    slideI--;
    slidePag--;
    if (slideI < 0 ){
        slideI = slides.length - 1;
        slidePag = slides.length;
    }
    pagination.innerHTML = `${slidePag}/${slides.length}`
    slider.style.transform = `translateX(-${slideWidth * slideI}px)`;
    
}

window.addEventListener('resize', () => {
  slideWidth = slides[0].clientWidth + 26;
  slider.style.transform = `translateX(-${slideI * slideWidth}px)`;


})






prev.addEventListener('click', prevSlide)
next.addEventListener('click', nextSlide)


////////////////////////////////TABS///////////////////////////////////


// Получаем все табы и контент
const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");

// Добавляем обработчик событий для всех табов
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // Удаляем класс active со всех табов и контента
    tabs.forEach(tab => tab.classList.remove("active"));
    tabContents.forEach(content => content.classList.remove("active"));
    
    // Включаем класс active для текущего таба и соответствующего контента
    const tabId = tab.getAttribute("data-tab");
    const tabContent = document.getElementById(tabId);
    tab.classList.add("active");
    tabContent.classList.add("active");
  });
});





const sliders = document.querySelectorAll('.slider-s');



  sliders.forEach( slider =>{
    const container =  slider.querySelector('.slides-s');
    const slides = container.querySelectorAll('.slide-s')
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');
    const pagination = slider.querySelector('.slider-s__pagination')
    let dot;

    for (let index = 0; index < slides.length; index++) {
        dot = document.createElement('span');
        dot.className = 'dot';
        pagination.appendChild(dot);
        
    }
    const dots = slider.querySelectorAll('.dot');
    dots.forEach(()=>{
      dots[0].classList.add('active');
    })
    

    setTimeout(()=>{
      let slideIndex = 0;
      let slideWidth = slides[0].clientWidth;
     
    function showPrevSlide() {
      slideIndex--;
        if (slideIndex < 0) {
          slideIndex = slides.length - 1;
         
        }

        dots.forEach(e => {
            e.classList.remove('active');
            dots[slideIndex].classList.add('active')
          })
        container.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
         
      }
      
      function showNextSlide() {

        slideIndex++;
        if (slideIndex > slides.length - 1) {
          slideIndex = 0;
        }

        dots.forEach(e => {
            e.classList.remove('active');
            dots[slideIndex].classList.add('active')
          })
        container.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
      }

    prevBtn.addEventListener('click', ()=>{
      showPrevSlide();
    })

    nextBtn.addEventListener('click', ()=>{
      showNextSlide();

    })
    window.addEventListener('resize', () => {
          slideWidth = slides[0].clientWidth;
          container.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
      
        
    })


  },500);
  
})


/////////////////////INPUT RANGE////////////////////////////////////
const ranges = document.querySelectorAll('.form-calc__input-range');

ranges.forEach(range => {
  function rangeValue(){
    range.nextElementSibling.innerHTML = range.value;
  }

  range.addEventListener('input', function() {
    const thumbWidth = 14;
    const value = range.value;
    const total = range.max - range.min;
    const perc = (value - range.min) / total;
    const offset = ((thumbWidth / 2) / 2) - (thumbWidth * perc); 
    // const width = ((value / range.max)) * 100;
    range.nextElementSibling.style.left = `calc(${perc * 100}% + ${offset}px)`;

    rangeValue();
  });
  rangeValue();
})














//////////////////////////Animate ProgBar///////////////////////////////////

const barValue = document.querySelector('.calc-bar__value');
const barPicture = document.querySelector('.calc-bar__picture-dyn');

const arrow = document.querySelector('.arrow');

function runCounter() {
  barValue.innerHTML = '';
  let counter = 1;
  let interval = setInterval(function() {
    barValue.innerHTML = `${counter}%`;
    barPicture.style.width = '100%';
    counter++;
    if (counter > 30) {
      clearInterval(interval);
    }
  }, 100);
}

const target = document.querySelector(".calculator__bar");

let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  let observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        if (!entry.target.classList.contains('triggered')) {  
            entry.target.classList.add('triggered');// добавляем класс, чтобы пометить, что функция уже была вызвана
             // здесь можно выполнить нужный скрипт
            arrow.style.height = '142px';
            runCounter(); 
        }
      }
    });
  }, options);   
  observer.observe(target);   



  ////////////////PayButton animate////////////////////////

  const btnMonth = document.querySelector('.payment__btn-month ');
  const btnYear = document.querySelector('.payment__btn-year');
  const btnSwitch = document.querySelector('.button-switch');

  btnYear.addEventListener('click', ()=>{
    if (!btnYear.classList.contains('active')){
      btnMonth.classList.remove('active');
      btnYear.classList.add('active');
      btnSwitch.classList.add('active');
    }
  })

  btnMonth.addEventListener('click', ()=>{
    if (!btnMonth.classList.contains('active')){
      btnYear.classList.remove('active');
      btnMonth.classList.add('active');
      btnSwitch.classList.remove('active');
    }
  })




///////////////////SPOILER FAQ////////////////////////

const faqs = document.querySelectorAll('.faq__questions');

faqs.forEach(faq => {
  faq.addEventListener('click', ()=>{
    
    if(faq.classList.contains('_open')){
       faq.classList.remove('_open')
    }else{
      faqs.forEach(s => {
        s.classList.remove('_open')
      })
      faq.classList.add('_open')
    }
    
  })
})

///////////////MENU MOBILE///////////////////////////

const mobMenu = document.querySelector('.mob-menu'); 
const menuMobTitle = document.querySelector('.mob-menu__title');
const menu = document.querySelector('.header__menu-title');

menu.addEventListener('click', ()=>{ 
  mobMenu.classList.add('active');
  document.body.classList.add('_lock');
})

menuMobTitle.addEventListener('click', ()=>{ 
  mobMenu.classList.remove('active');
  document.body.classList.remove('_lock');
})


const links = mobMenu.querySelectorAll('a');

// перебираем все ссылки
links.forEach(link => {
  // проверяем, если ссылка якорь (то есть начинается с #)
  if (link.getAttribute('href').startsWith('#')) {
    // убираем мобильное меню по клику на якорь
    link.addEventListener('click', () => {
      // выбираем мобильное меню

      // скрываем мобильное меню
      mobMenu.classList.remove('active');
      document.body.classList.remove('_lock');
    });
  }
});
