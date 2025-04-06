  $(document).ready(function() {
    function Slider(container, interval) {
      this.container = $(container);
      this.slideWrapper = this.container.find('.slides');
      this.slides = this.slideWrapper.find('.slide');
      this.totalSlides = this.slides.length;
      this.currentIndex = 0;
      this.interval = interval || 3000;
      this.timer = null;

      this.init();
    }

    Slider.prototype = {
      init: function() {
        this.bindEvents();
        this.startAutoSlide();
      },

      bindEvents: function() {
        const self = this;

        this.container.find('.nav.left').on('click', function() {
          self.prevSlide();
          self.resetAutoSlide();
        });

        this.container.find('.nav.right').on('click', function() {
          self.nextSlide();
          self.resetAutoSlide();
        });
      },

      goToSlide: function(index) {
        if (index >= this.totalSlides) index = 0;
        if (index < 0) index = this.totalSlides - 1;
        this.currentIndex = index;
        const offset = -index * 100 + '%';
        this.slideWrapper.css('transform', 'translateX(' + offset + ')');
      },

      nextSlide: function() {
        this.goToSlide(this.currentIndex + 1);
      },

      prevSlide: function() {
        this.goToSlide(this.currentIndex - 1);
      },

      startAutoSlide: function() {
        const self = this;
        this.timer = setInterval(function() {
          self.nextSlide();
        }, this.interval);
      },

      resetAutoSlide: function() {
        clearInterval(this.timer);
        const self = this;
        setTimeout(function() {
          self.startAutoSlide();
        }, 5000); // resume after 5s
      }
    };

    // Initialize the slider
    new Slider('.slider-container', 3000);
  });
