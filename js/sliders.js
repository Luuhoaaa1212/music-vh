//slider 1
function slider1() {
    const items = document.querySelectorAll(".container__slider-item");
    const totalItems = items.length;
    let currentIndex = 0;
    updateClasses();
    function updateClasses() {
      const activeIndex1 = currentIndex % totalItems;
      const activeIndex2 = (currentIndex + 1) % totalItems;
      const activeIndex3 = (currentIndex + 2) % totalItems;
  
      items[activeIndex1].classList.add("active-2");
      items[activeIndex2].classList.add("active-1");
  
      items[activeIndex1].classList.remove("active-2");
      items[activeIndex2].classList.replace("active-1", "active-2");
      items[activeIndex3].classList.add("active-1");
    }
    function next() {
      currentIndex++;
      updateClasses();
    }
    setInterval(next, 3000);
    //
  }
  slider1();
  
   //slider 2
   function slider2() {
    const items2 = document.querySelectorAll(".container__slider-item2");
    const prev = document.querySelector(".container__slider-icon--left");
    const next = document.querySelector(".container__slider-icon--right");
  
    let index = 0;
    let intervalId = null;
    let intervalMs = 3000;
  
    const lengthItems = items2.length;
  
    updateSlider();
    function updateSlider(acction) {
      let index1 = index;
      let index2 = (index + 1) % lengthItems;
      let index3 = (index + 2) % lengthItems;
      let index4 = (index + 3) % lengthItems;
      if (acction) {
        let index5 = (index2 + 1) % lengthItems;
        let index6 = (index2 + 2) % lengthItems;
        let index7 = (index2 + 3) % lengthItems;
        items2[index7].classList.remove("container__slider-item2--active1");
        items2[index6].classList.replace(
          "container__slider-item2--active2",
          "container__slider-item2--active1"
        );
        items2[index5].classList.replace(
          "container__slider-item2--active3",
          "container__slider-item2--active2"
        );
        items2[index2].classList.add("container__slider-item2--active3");
      } else {
        items2[index1].classList.add("container__slider-item2--active3");
        items2[index2].classList.add("container__slider-item2--active2");
        items2[index3].classList.add("container__slider-item2--active1");
  
        items2[index1].classList.remove("container__slider-item2--active3");
        items2[index2].classList.replace(
          "container__slider-item2--active2",
          "container__slider-item2--active3"
        );
        items2[index3].classList.replace(
          "container__slider-item2--active1",
          "container__slider-item2--active2"
        );
        items2[index4].classList.add("container__slider-item2--active1");
      }
    }
  
    function nextIndex() {
      index++;
      if (index >= lengthItems) {
        index = 0;
      }
      updateSlider();
    }
  
    function prevIndex() {
      index--;
      if (index < 0) {
        index = lengthItems - 1;
      }
      const text = "prev";
      updateSlider(text);
    }
    prev.onclick = function () {
      clearInterval(intervalId);
      prevIndex();
      intervalId = setInterval(nextIndex, intervalMs);
    };
  
    next.onclick = function () {
      clearInterval(intervalId);
      nextIndex();
      intervalId = setInterval(nextIndex, intervalMs);
    };
  
    intervalId = setInterval(nextIndex, intervalMs);
  }
  slider2();
   