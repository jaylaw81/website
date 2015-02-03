
var rc = {
    init: function(){
        this.loadTweets();
    },
    loadTweets: function(){
        var url = '/includes/twitter_feed.php';

        $.getJSON(url, function(data){
            var html = '';
            for(i in data){
                var tweetDate = data[i].created_at;
                var newDate = rc.parseTwitterDate(tweetDate);
                html += '<li><span class="pi-bullet-icon"><i class="icon-twitter"></i></span><a href="http://twitter.com/RhinoCoders" target="_blank">@rhinocoders:</a>';
                html += ' ' + data[i].text + '<br>';
                html += '<span class="pi-smaller-text pi-italic pi-text-opacity-50">'+newDate+'</span>';
            }

            $('.twitter-feed').prepend(html);

        })
    },
    parseTwitterDate: function (tdate) {
        var system_date = new Date(Date.parse(tdate));
        var user_date = new Date();
        if (rc.ieAgent.ie) {
            system_date = Date.parse(tdate.replace(/( \+)/, ' UTC$1'))
        }
        var diff = Math.floor((user_date - system_date) / 1000);
        if (diff <= 1) {return "just now";}
        if (diff < 20) {return diff + " seconds ago";}
        if (diff < 40) {return "half a minute ago";}
        if (diff < 60) {return "less than a minute ago";}
        if (diff <= 90) {return "one minute ago";}
        if (diff <= 3540) {return Math.round(diff / 60) + " minutes ago";}
        if (diff <= 5400) {return "1 hour ago";}
        if (diff <= 86400) {return Math.round(diff / 3600) + " hours ago";}
        if (diff <= 129600) {return "1 day ago";}
        if (diff < 604800) {return Math.round(diff / 86400) + " days ago";}
        if (diff <= 777600) {return "1 week ago";}
        return "on " + system_date;
    },
    ieAgent: function(){
        var a = navigator.userAgent;
        return {
            ie: a.match(/MSIE\s([^;]*)/)
        }
    }
}

$(document).ready(function(){
    rc.init();

    $("#send-contact, #contact-footer").on("click", function(){
        var name = $("#rc-contact-form .form-control-name, .pi-footer-form .form-control-name").val();
        var email = $("#rc-contact-form .form-control-email, .pi-footer-form .form-control-email").val();
        var mess = $("#rc-contact-form .form-control-message, .pi-footer-form .form-control-message").val();
        var valid = $("#rc-contact-form .form-control-valid").val();

        if(name == "" || email == "" || mess == "" || valid == "" || valid != "5") {

            $(".pi-contact-form .error-message, .pi-footer-form .error-message").slideDown(700).delay(2000).slideUp(300);

        } else {
            $.post(

                "/assets/resources/contact.php", {
                    name: name,
                    email: email,
                    mess: mess,
                    valid: valid
                },

                function(response) {

                    $(".pi-contact-form .success-message, .pi-footer-form .success-message").slideDown(700).delay(2000).slideUp(300);

                }
            )
            return false;
        }
    })
});

/*

<li>
    <span class="pi-bullet-icon"><i class="icon-twitter"></i></span>
    <a href="http://twitter.com/RhinoCoders" target="_blank">@rhinocoders:</a> Neque porro quisquam est, qui dolorem ipsum quia <a href="#">goo.gl/5GlsEZ</a> numquam eius.<br>
    <span class="pi-smaller-text pi-italic pi-text-opacity-50">04 Feb</span>
</li>
*/
