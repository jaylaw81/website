<!DOCTYPE html>
<html>
    <!--#set var="pageType" value="int" -->
    <!--#set var="navActive" value="contact" -->
    <!--#set var="pageName" value="Contact RhinoCoders | RhinoCoders" -->
    <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
        <title><!--#echo var="pageName" --></title>
        <meta name="description" content="">

        <!--#include virtual="/rhinocoders/includes/preload_resources.html"-->

    </head>
    <body class="pi-bg-main-wood">

        <div id="pi-all">

            <!--#include virtual="/rhinocoders/includes/header.html"-->

            <div id="page">

                <div class="pi-section-w pi-section-white piICheck piStylishSelect piSocials">

                    <div class="pi-section">

                        <div class="pi-row">
                            <div class="pi-col-sm-8">
                                <h2 class="h4 pi-has-bg pi-weight-700 pi-uppercase pi-letter-spacing pi-margin-bottom-30">
                                    Get In Touch
                                </h2>

                                <!-- Contact form -->
                                <form role="form" action="../assets/resources/contact.php" method="post" class="pi-contact-form">
                                    <div class="pi-error-container"></div>
                                    <div class="pi-row pi-grid-small-margins">
                                        <div class="pi-col-sm-6">
                                            <div class="form-group pi-padding-bottom-10">
                                                <label for="exampleInputName1">Name *</label>
                                                <input type="text" class="form-control form-control-name" id="exampleInputName1"
                                                       placeholder="e.g. Adam Smith">
                                            </div>
                                            <div class="form-group pi-padding-bottom-10">
                                                <label for="exampleInputEmail1">Email address *</label>
                                                <input type="email" class="form-control form-control-email" id="exampleInputEmail1"
                                                       placeholder="e.g. mail@example.com">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group pi-padding-bottom-10">
                                        <label for="exampleInputMessage1">Message *</label>
                                        <textarea class="form-control form-control-comments" id="exampleInputMessage1" placeholder="How can we help?" rows="3"></textarea>
                                    </div>
                                    <p>
                                        <button class="btn pi-btn-base">
                                            Send Message<i class="icon-paper-plane pi-icon-right"></i>
                                        </button>
                                    </p>
                                </form>
                                <!-- End contact form -->

                            </div>
                            <div class="pi-col-sm-4">

                                <h2 class="h4 pi-has-bg pi-weight-700 pi-uppercase pi-letter-spacing pi-margin-bottom-30">
                                    Contact Us
                                </h2>

                                <ul class="pi-list-with-icons pi-list-big-margins pi-padding-bottom-10">
                                    <li><span class="pi-bullet-icon"><i class="icon-location"></i></span>135 N. Old Woodward<br>Birmingham MI, 48009<br>
                                    <a href="https://www.google.com/maps/place/135+N+Old+Woodward+Ave,+Birmingham,+MI+48009/@42.5471852,-83.2147467,17z/data=!3m1!4b1!4m2!3m1!1s0x8824c7076a1a2343:0x412a096fe8ec65b0" target="_blank">Get Directions</a></li>

                                    <li><span class="pi-bullet-icon"><i class="icon-mail"></i></span><a href="mailto:info@rhinocoders.com">info@rhinocoders.com</a><br><a href="mailto:registrations@rhinocoders.com">registrations@rhinocoders.com</a></li>

                                    <li><span class="pi-bullet-icon"><i class="icon-clock"></i></span>
                                    Saturday: <strong>9:00am - 11:00am</strong>

                                    </li>
                                </ul>
                                <ul class="pi-social-icons pi-small pi-jump pi-colored-bg pi-round-corners pi-padding-bottom-10">
                                    <li><a href="https://facebook.com/RhinoCoders" class="pi-social-icon-facebook"><i class="icon-facebook"></i></a></li>
                                    <li><a href="https://twitter.com/RhinoCoders" class="pi-social-icon-twitter"><i class="icon-twitter"></i></a></li>
                                </ul>

                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <!--#include virtual="/rhinocoders/includes/footer.html"-->

        </div>

        <!--#include virtual="/rhinocoders/includes/postload_resources.html"-->

    </body>
</html>
