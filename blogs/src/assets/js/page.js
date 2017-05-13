//<![CDATA[

/**
 * Functionality specific to Suits.
 *
 * Provides helper functions to enhance the theme experience.
 */

 (function($) {
    var body = $('body'),
    _window = $(window);

    /**
     * Enables menu toggle for small screens.
     */
     (function() {
        var nav = $('#site-navigationbwrap'),
        button, menu;
        if (!nav)
            return;

        button = nav.find('.menu-togglebwrap');
        if (!button)
            return;

        // Hide button if menu is missing or empty.
        menu = nav.find('.nav-menuul');
        if (!menu || !menu.children().length) {
            button.hide();
            return;
        }

        $('.menu-togglebwrap').on('click.suits', function() {
            nav.toggleClass('toggled-on');
        });
    })();
})(jQuery);

//]]>