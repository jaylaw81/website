var content = document.querySelector('#content')
        , data = content.dataset
        , lessonPlan = data.lesson
        ;

var lessons = {
    gistArray: [],
    isScrolling: false,
    init: function( ){

        var def = [];
        var res = [];

        def.push($.get('/rhinocoders/lessons/lesson_plans/' + lessonPlan + '/index.html', function(data) {
            $('#content').html(data);
        }));

        $.when.apply($, def).done(function() {
            lessons.embedGists();
            lessons.getNav(lessonPlan);
        });

        lessons.events();

    },

    events: function(){

        $(window).scroll(function() {
            var height = $(window).scrollTop();
            $window = $(window);

            if(height  > 200) {
                $('.fontawesome-upload').fadeIn(200);
            } else {
                $('.fontawesome-upload').fadeOut(200);
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
                            if(elemSel != elemSel){
                                return false;
                            }

                        }
                }
            });


        });

        $('.up-circled2').on('click', function(){
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        });

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
                lessons.isScrolling = false;
            });

        });

        $('.icon-reply').on('click', function(e){
            window.location = "/rhinocoders/the-series/";
        });
    },

    getNav: function(lessonPlan){
        $.getJSON('/rhinocoders/lessons/lesson_plans/' + lessonPlan + '/sections.json', function(data){

            for(item in data.navItems){
                var navLabel = data.navItems[item].labelName;
                var navSection = data.navItems[item].section;
                var html = '<li class="shadow-radial"><span class="icon-circle blank"></span><a href="#'+navSection+'">'+navLabel+'</a></li>';
                $('#navigation ul').append(html);
            }

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
