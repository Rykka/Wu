// presentation.js

(function() {

  function headerNav() {

    // Setup some variables for the function
  	var
      header              = $('.header-navigation'),
      dynamicHeightHeader = $('.navbar-dynamic'),
  	  transparent         = false,
      subNavWrapper       = $('.sub-nav-wrapper'),
      subNav              = $('.sub-nav'),
      homepageHeader      = false,

      scrollPosition      = $(document).scrollTop(),
      headerHeight        = header.height(),
      wrapperOffset       = subNavWrapper.offset().top,
      travelDistance      = wrapperOffset-headerHeight;


    // Change transparent header flag based on DOM
    if ( header.hasClass("navbar-transparent") ) {
    	transparent = true;
    }

    // Set homepage header flag
    if ( header.hasClass('navbar-homepage') ) {
      homepageHeader = true;
    }

    // Find the height of the sub-nav, and make sure its wrapper matches
    function matchHeights() {
      var subNavHeight = subNav.height();
      subNavWrapper.css('height', subNavHeight + 'px');
    }
    matchHeights();

    function refreshNav() {
      var
        scrollPosition    = $(document).scrollTop(),
        headerHeight      = dynamicHeightHeader.height(),
        wrapperOffset     = subNavWrapper.offset().top,
        travelDistance    = wrapperOffset-headerHeight;

      // Once the user has started scrolling, show the short header
      if ( scrollPosition > 5 ) {
        dynamicHeightHeader.addClass('short');
         headerHeight = dynamicHeightHeader.height(); // Updates header height after '.short' is applied
        if ( transparent ) {
        	dynamicHeightHeader.removeClass('navbar-transparent');
        }

      // If the user returns to the top of the page, bring back the initial header
      } else {
        dynamicHeightHeader.removeClass('short');
        if ( transparent ) {
        	dynamicHeightHeader.addClass('navbar-transparent');
        }
        if ( $('.sub-nav li').hasClass('active') ) {
          $('.sub-nav li').removeClass('active');
        }
      }

      // Figure out when to fix the sub-nav, and add the appropriate class at the right time
      if ( travelDistance < scrollPosition ) {
        subNav.addClass('fixed');
        subNav.css('top', headerHeight + "px");
      // Remove the fixed-position class when the condidtions are no longer met
      } else {
        subNav.removeClass('fixed');
      }
    }

    $(window).scroll(refreshNav);


    // Wait a moment for positions and sizes to be calculated before allowing 'emm to be
    // animated. This reduces the initial flash of unstyled stuff when the page is
    // loaded somewhere other than at the top.
    setTimeout(function() {
      $('.header-navigation .nav li a, .navbar-brand, .navbar-brand span').addClass('animated');
    }, 1000);
    header.addClass('loaded');

  }


  // User menu
  function userMenu() {
    var trigger = $('a#navBar')
    var shown   = false

    trigger.click(function (event) {
      event.stopPropagation()
      if ( trigger.hasClass('active') ) {
        trigger.removeClass('active')
        shown = false
      } else {
        trigger.addClass('active')
        shown = true
      }
    })

    $('body').click(function () {
      if ( shown ) {
        trigger.removeClass('active')
      }
    })

  }

  /*
  function userMenu2() {
    var trigger = $('a#navBar')

    trigger.hover(function () {
      trigger.addClass('active')
    }, function () {
      trigger.removeClass('active')
    })

  }
  */

  // Scales hero to maintain specified ratio, regardless of page width
  function heroProportions() {
    function setHeroHeight() {
      var
        hero                    = $('.dynamic-height'),
        centerVertically        = $('.center-vertically'),
        viewportWidth           = $(window).width(),
        viewportHeight          = $(window).height(),
        centVertHeight          = centerVertically.height(),
        aspectRatio             = 16 / 9,
        minHeight               = 500,
        //maxHeight               = viewportHeight - 100,
        maxHeight               = 700,
        heroHeight              = Math.round(viewportWidth / aspectRatio);

      if ( heroHeight <= maxHeight ) {
        if ( heroHeight >= minHeight ) {
          hero.height(heroHeight);
        } else {
          hero.height(minHeight);
        }

      } else {
        hero.height(maxHeight);
      }




      offsetTop = (heroHeight - centVertHeight) / 1.75;

      if ( offsetTop > 0 ) {
        centerVertically.css('margin-top', offsetTop + "px");
      }
    }

    $(window).resize(_.debounce(setHeroHeight, 50));
    setHeroHeight();
  }

  function smoothScroll() {
    $('.sub-nav a, .smoothScroll').click(function(){
      $('html, body').animate({
          scrollTop: ( $( $.attr(this, 'href') ).offset().top ) - 75
      }, { duration: 500 });
      return false;
    });

  }

  // Doc ready

  $(document).ready(function() {
    headerNav();
    heroProportions();
    $('body').addClass('loaded');
    smoothScroll();
    userMenu();
    //userMenu2();
  })

})();
