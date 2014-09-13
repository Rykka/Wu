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
            if (curPos - prevPos > 50) {
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

        $(window).scroll(refreshNav);
    }


    /* ============================================================ */
    /* Ajax Loading */
    /* ============================================================ */
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
                    $ajaxContainer.fadeIn(500);

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
