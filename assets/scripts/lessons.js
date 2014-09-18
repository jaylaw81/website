var content = document.querySelector('#content')
        , data = content.dataset
        , lessonPlan = data.lesson
        ;

var lessons = {
    gistArray: [],
    isScrolling: false,
    activeSection: '',
    init: function( ){

        var def = [];
        var res = [];

        def.push($.get('/lessons/lesson_plans/' + lessonPlan + '/index.html', function(data) {
            $('#content').html(data);
        }));

        $.when.apply($, def).done(function() {
            lessons.embedGists();
            lessons.getNav(lessonPlan);
            lessons.sections();
            lessons.glossary();
        });

        lessons.events();
    },

    sections: function(){

        $('article#content section:not(:first)').hide();

    },

    glossary: function(){
        var terms = $('dl.definition');
        var elem;
        $.each(terms, function(i, el){
            elem = $(el);
            $(elem).clone().appendTo('.glossary');
        });

        $('div.glossary dl').tsort('dt' , {order:'asc'} );
    },

    handleScroll: function(){
        var height = $(window).scrollTop();
        $window = $(window);
        var speed = 200;

        if(height > 20) {
            $('.pi-section-header').parent().animate({
                top: '-80px'
            }, speed);
            $('#header').animate({
                top: '-40px'
            }, speed);
            $('#navigation').animate({
                top: '0px'
            }, speed);
        } else {
            $('.pi-section-header').parent().animate({
                top: '0px'
            }, speed);
            $('#header').animate({
                top: '48px'
            }, speed);
            $('#navigation').animate({
                top: '92px'
            }, speed);
        }


    },

    events: function(){


        var scrollTimer = null;
        $(window).scroll(function () {
            if (scrollTimer) {
                clearTimeout(scrollTimer);   // clear any previous pending timer
            }
            scrollTimer = setTimeout(lessons.handleScroll, 100);   // set new timer
        });


        $('.icon-up-circled2').on('click', function(){
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        });

        $(document).on('click', 'a.next-step', function(e){
            e.preventDefault();
            var nextNavSection = $('li.highlighted').next().data('section');
            var nextContentSection = $('#content section.section-open').next();

            $('li.highlighted').removeClass('highlighted').hide();
            $('li[data-section="'+nextNavSection+'"]').addClass('highlighted').show();

            $('#content section.section-open').removeClass('section-open').hide();
            nextContentSection.addClass('section-open').show();
            window.scrollTo(0, 0);
            //console.log(nextSection);
        });

        $(document).on('click', 'a.prev-step', function(e){
            e.preventDefault();
            var prevNavSection = $('li.highlighted').prev().data('section');
            var prevContentSection = $('#content section.section-open').prev();

            $('li.highlighted').removeClass('highlighted').hide();
            $('li[data-section="'+prevNavSection+'"]').addClass('highlighted').show();

            $('#content section.section-open').removeClass('section-open').hide();
            prevContentSection.addClass('section-open').show();
            window.scrollTo(0, 0);
            //console.log(nextSection);
        });




        /*
        $(document).on('click', '#navigation li', function(e){
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            lessons.isScrolling = true;

            $('#navigation li').removeClass('active');
            $('span[class="icon-circle"]').attr('class', 'icon-circle blank');
            $('span', this).attr('class', 'icon-circle');
            $(this).addClass('active');

            var anchor = $('a', this).attr("href");

            $("html, body").animate({ scrollTop: $(anchor).offset().top - 50 }, "slow", function(){
                lessons.activeSection = anchor;
                lessons.isScrolling = false;
            });

        });
*/

        $('.icon-reply').on('click', function(e){
            window.location = '/the-series/' + parentTrack + '/';
        });
    },

    getNav: function(lessonPlan){

        $.getJSON('/lessons/lesson_plans/' + lessonPlan + '/sections.json', function(json){

            for(item in json.navItems){
                var navLabel = json.navItems[item].labelName;
                var navSection = json.navItems[item].section;
                var navSource = json.navItems[item].source;

                var html = '<li data-section="'+navSection+'" class="shadow-radial"><span class="icon-circle blank"></span><a class="nav-title" href="#'+navSection+'">'+navLabel+'</a>';
                html += '<span class="steps"><a href="#" class="prev-step"><i class="icon-left-open"></i> <span class="steps-text">Previous Step</span></a> <a href="#" class="next-step"><span class="steps-text">Next Step</span> <i class="icon-right-open"></i></a>';

                if(navSource != undefined){
                    html += '<span class="source-code"><a href="#'+navSource+'"><i class="icon-code"></i> View Source Code <i class="icon-code"></i></a></span></span></li>';
                } else {
                    html += '</span></li>';
                }

                $('#navigation ul').append(html);
            }

            $('section#navigation li:not(:first-of-type)').hide();
            $('#content section:first-of-type').addClass('section-open');
            $('section#navigation li:first-of-type').addClass('highlighted');


            $('span.source-code a').on('mfpBeforeOpen', function(e){
                e.preventDefault();
                var dataSource = $(this).attr('href');
                $(dataSource).show();
            });

            $('span.source-code a').magnificPopup({
              type:'inline',
              midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
            });

        });
    },

    embedGists: function(){

        var gists = $('.gist-code');
        var scripts = [];

        $.each(gists, function(i, el){
            var gistData = el;
            var gistId = $(el).attr('data-gist');
            var callbackName = "lessons.gistData";
            var script = document.createElement("script");
            script.setAttribute('data-gist-class', gistId);
            script.setAttribute("src", "https://gist.github.com/" + gistId + ".json?callback=" + callbackName);
            $.getJSON("https://gist.github.com/" + gistId + ".json?callback=?", function(data){

                var cssId = 'gistCSS';  // you could encode the css path itself to generate id..
                if ($('#'+cssId).length <= 0){
                    var head  = document.getElementsByTagName( "head" )[0];
                    var link  = document.createElement('link');
                    link.id   = cssId;
                    link.rel  = 'stylesheet';
                    link.type = 'text/css';
                    link.href = data.stylesheet;
                    link.media = 'all';
                    head.appendChild(link);
                }
                $(el).append(data.div);
            });

        })
    },

    gistData: function(){

        lessons.gistArray.push(arguments);

    }

}

$(document).ready(function(){
    lessons.init();
});
