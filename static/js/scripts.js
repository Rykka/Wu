jQuery(function($) {
    /* ============================================================ */
    /* Header Nav */
    /* ============================================================ */
    function headerNav() {
        var header = $('.header'),
            curPos = $(document).scrollTop(),
            prevPos = curPos;

        function refreshNav() {
            curPos = $(document).scrollTop();
            if (curPos > 10) {
                if (header.hasClass('transparent')) {
                    header.removeClass('transparent');
                }
            }
            if (curPos < 10) {
                header.addClass('transparent');
                if (header.hasClass('dynamic')) {
                    header.removeClass('dynamic');
                }
                prevPos = curPos;
            }
            else if (curPos - prevPos > 50) {
                if (!header.hasClass('dynamic')) {
                    header.addClass('dynamic');
                }
                prevPos = curPos;
            } else if (curPos - prevPos < -50) {
                if (header.hasClass('dynamic')) {
                    header.removeClass('dynamic');
                }
                prevPos = curPos;
            }
        }

        refreshNav();

        $(window).scroll(refreshNav);
    }


    /* ============================================================ */
    /* Ajax Loading */
    /* ============================================================ */
    function loadTheme(html) {
      var tag, theme, href,
          $css_theme = $('#css_theme');
      if (html) {
         tag = $('#tag-theme', html);
      } else {
         tag = $('#tag-theme');
      }


      if (tag.length == 1) {
        theme  = tag.attr('data-theme');
        href = '/theme/css/theme.'+theme+'.css';
      } else {
        href = '/theme/css/theme.gray.css';
      }
      if ($css_theme.attr('href') !== href ) {
          $css_theme.attr('href', href);
      }
    }

    function ajaxLoad() {
        var History = window.History;
        var loading = false;
        var $ajaxContainer = $('#ajax-container');


        // Check if history is enabled for the browser
        if (!History.enabled) {
            return false;
        }

        History.Adapter.bind(window, 'statechange', function() {
            var State = History.getState();

            // Get the requested url and replace the current content
            // with the loaded content
            $.get(State.url, function(result) {
                var $html = $(result);
                var $newContent = $('#ajax-container', $html).contents();



                // Set the title to the requested urls document title
                document.title = $html.filter('title').text();

                $('html, body').animate({
                    'scrollTop': 0
                });

                $ajaxContainer.fadeOut(500, function() {

                    // Re run fitvid.js
                    $newContent.fitVids();


                    $ajaxContainer.html($newContent);
                    loadTheme($newContent);

                    $ajaxContainer.fadeIn(500,function(){


                    });

                    NProgress.done();

                    loading = false;
                });
            });
        });

        $('body').on('click', '.js-ajax-link, .pagination a, .detail a, .tags a, .navigation a, .header a', function(e) {
            e.preventDefault();

            if (loading === false) {
                var currentState = History.getState();
                // When href is relative, we should add current domain.
                var url = $(this).attr('href');


                if (!url.match(/^http/)) {
                    url = window.location.protocol + '//' + window.location.host + url;
                }

                var title = $(this).attr('title') || null;

                // If the requested url is not the current states url push
                // the new state and make the ajax call.
                if (url !== currentState.url) {
                    loading = true;


                    NProgress.start();

                    History.pushState({}, title, url);
                } else {
                    // Swap in the latest post or post index as needed
                    if ($(this).hasClass('js-show-index')) {

                        NProgress.start();
                        $('html, body').animate({
                                'scrollTop': 0
                            },
                            function() {
                                NProgress.done();
                            });
                    } else {
                        NProgress.start();

                        $('html, body').animate({
                                'scrollTop': 0
                            },
                            function() {
                                NProgress.done();
                            });

                    }
                }
            }
        });
    }


    $(document).ready(function() {
        $(".body").fitVids();
        ajaxLoad();
        headerNav();
        loadTheme();
        // $('#history-back').on('click',function(e){
        //     e.preventDefault();
        //     window.History.back();
        //     return false;
        // });
        $('.scroll.top').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0,
            }, {
                duration: 500
            });
            return false;
        });

    });

});
