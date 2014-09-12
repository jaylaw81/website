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
        });

        lessons.events();
    },

    sections: function(){

        $('article#content section:not(:first)').hide();


    },

    handleScroll: function(){
        var height = $(window).scrollTop();
        $window = $(window);

        if(height > 200) {
            $('.icon-up-circled2').fadeIn(200);
        } else {
            $('.icon-up-circled2').fadeOut(200);
        }

        $('.section').each(function(){
            if(lessons.isScrolling == false){
                var topPos = $(this).offset().top - $(window).scrollTop();
                var elemSel = ''
                if(topPos <= 50){
                    elemSel = $(this).attr('id');
                    $('#navigation li').removeClass('active');
                    $('span[class="icon-circle"]').attr('class', 'icon-circle blank');
                    $('a[href="#'+elemSel+'"]').parent().find('span').attr('class', 'icon-circle')
                    $('a[href="#'+elemSel+'"]').parent().addClass('active');
                }
            }
        });
    },

    events: function(){

        /*
        var scrollTimer = null;
        $(window).scroll(function () {
            if (scrollTimer) {
                clearTimeout(scrollTimer);   // clear any previous pending timer
            }
            scrollTimer = setTimeout(lessons.handleScroll, 100);   // set new timer
        });
*/

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
                var navDesc = json.navItems[item].description;
                var html = '<li data-section="'+navSection+'" class="shadow-radial"><span class="icon-circle blank"></span><a href="#'+navSection+'">'+navLabel+'</a> <span class="nav-desc">'+navDesc+'</span>';
                html += '<a href="#" class="prev-step">Previous Step</a> <a href="#" class="next-step">Next Step</a></li>';
                $('#navigation ul').append(html);
            }

            $('section#navigation li:not(:first-of-type)').hide();
            $('#content section:first-of-type').addClass('section-open');
            $('section#navigation li:first-of-type').addClass('highlighted');
            $('section#navigation li:first-of-type a.prev-step').hide();
            $('section#navigation li:last-of-type a.next-step').hide();

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
