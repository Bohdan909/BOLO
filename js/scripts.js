document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/g, '');

(function($){
    $(document).ready(function() {
        
        animate();

        // classList for IE
        if ( /MSIE 9/i.test(navigator.userAgent) ) include("./js/classList.min.js");

        // Header Scroll
        (function(){
            var $header = $("#header");
            var top = $header.offset().top - parseFloat($header.css('margin-top').replace(/auto/, 1));
            
            if ( $header.is(".animated") )  $header.addClass("is-animate");

            $(window).on("scroll", function(){
                var y = $(this).scrollTop();

                if (!$header.parents("body").is(".prod-card-page")){
                    (y > 10) ? $header.addClass("is-slide") : $header.removeClass("is-slide")
                }
                
            });
        }());

        // Menu Mobile
        (function(){
            var $menuWrap = $(".menu-wrap");
            var $btn      = document.getElementById("btn-menu");
            var $html     = document.querySelector("html");
            
            $btn.addEventListener("click", function(){

                $menuWrap.fadeToggle(450);
                $("#header").toggleClass("shadow");

                ($html.className.match(/\bmenu-open\b/)) ? menuClose() : menuOpen()

            });

            $menuWrap.on("click", function(e){
                if ($(e.target).closest($(".menu-mobile")).length) return;
                $menuWrap.fadeOut(450);
                $("#header").addClass("shadow");
                menuClose();
            });

            function menuOpen(){
                $html.classList.remove("menu-close");
                $html.classList.add("menu-open");
            };  

            function menuClose(){
                $html.classList.remove("menu-open");
                $html.classList.add("menu-close");
            };  

        }());

        // Tell Drop
        $(".drop-item > span em").on("click", function(){
            $(this).parents(".drop-item").toggleClass("is-open");
        });

        $(document).on("click", function(event) {
            if ($(event.target).closest(".drop-item").length) return;
            $(".drop-item").removeClass("is-open");
            event.stopPropagation();
        });

        // Switch
        var $sLabel = $(".switch label");

        $sLabel.on("click", function(){
            var $this = $(this);

            $sLabel.removeClass("is-active");
            $this.toggleClass("is-active");

            if ( $this.is(":last-child") ) {
                $this.parent().addClass("other");
                $("#ios").hide();
                $("#other").show().perfectScrollbar("update");
            }  else { 
                $this.parent().removeClass("other");
                $("#ios").show();
                $("#other").hide();
            }
        });

        // Category BG
        $(".category-item").each(function(){
            var color = $(this).data("color");

            $(this).find(".image").css("background", color);
        });

        // Placeholder Hide
        $(".search-input input").focus(function(){
            $(this).data("placeholder", $(this).attr("placeholder")).attr("placeholder","");
        }).blur(function(){
            $(this).attr("placeholder", $(this).data("placeholder"));
        });

        // Input Label Fly Up
        var $formLabel = document.querySelectorAll(".form-input-r label");

        $formLabel.forEach(function(elem){
            elem.addEventListener("click", function(){
                var inputWrap = this.parentNode;

                inputWrap.classList.add("is-active");
                inputWrap.querySelector("input").focus();
            });

            elem.nextElementSibling.addEventListener("blur", function(){
                if ( !this.value.length ) this.parentNode.classList.remove("is-active");
            });
        });

        // Tel Input Mask 
        if ($(".mask").length) $(".mask").mask("+38 (099) 999-99-99");

        // Basket Items PLus / Minus
        (function(){
           var $prodItems = document.querySelectorAll(".product-items");

            $prodItems.forEach(function(elem){
                var btn = elem.querySelectorAll(".circ"),
                    input = elem.querySelector("input");

                for (var i = 0; i < btn.length; i++) {

                    btn[i].addEventListener("click", function(){
                        var btnClass = this.className.split(" ");

                        for (var i = 0; i < btnClass.length; i++ ){
                            switch (btnClass[i]){
                                case "plus":
                                    input.value = parseInt(input.value) + 1; 
                                break;

                                case "minus":
                                    if (input.value != 1) input.value = parseInt(input.value) - 1;                  
                                break;    
                            }
                        }
                        
                    }); 
                }  
            })    
        }());

        // Tabs Radiobox
        (function(){
            var radioTab = document.querySelectorAll(".radio-tab input");

            function changeHandler(event) {
                var attr = this.getAttribute("data-id");
                var tab = this.parentNode.parentNode.parentNode.querySelectorAll(".tab");

                Array.prototype.forEach.call(tab, function(elem){
                    elem.parentNode.classList.add("is-open");
                    if (elem.classList.contains("is-show")) elem.classList.remove("is-show");
                });    

                document.getElementById(attr).classList.add("is-show");
            }

            Array.prototype.forEach.call(radioTab, function(radio) {
                radio.addEventListener("change", changeHandler);
            });
        }());   
        
        // Select Model Phone
        (function(){
            var $select = $(".select-t");

            $(".select-t-lbl").on("click", function(){
                $(this).parent().toggleClass("is-open");
            });

            $(".select-t-item").on("click", function(){
                var $this = $(this),
                    value = $(this).text();

                $select.find(".select-t-item").removeClass("is-active");        
                        
                $this
                    .addClass("is-active")
                    .parents(".select-t")
                    .find(".val")
                    .attr("value", value);  

                setTimeout(selectClose, 200);         
            });

            function selectClose(){
                $select.removeClass("is-open");
            };

        }());
        
       
        
        // Add To Favorite and Basket
        (function(){

            // Favorite
            var $btn = $(".btn-i-b.fav"),
                $fav = $(".items.fav"),
                $favCount = $(".header-fav .count-items");
                
            $btn.on("click", function(){

                var $heart = $(this).find(".fav"),
                    clone  = $heart.clone();

                if (!$(this).hasClass("in-fav")){
                    
                    $(this).addClass("in-fav");
                    tooltipsRem($(this)); 
                    
                    clone
                        .offset({
                            "top": $heart.offset().top,
                            "left": $heart.offset().left
                        })
                        .css({
                            "position": "absolute",
                            "z-index": "1000",
                            "background-position": "-76px -25px"      
                        })
                        .appendTo( $("body") )
                        .animate({
                            "top": $fav.offset().top + 3,
                            "left": $fav.offset().left
                        }, 1000, function(){
                            $(this).fadeOut(500, function(){ $(this).remove() });

                            changeItems.fav("plus");   
                        });

                } else {
                    $(this).removeClass("in-fav");

                    changeItems.fav("minus");   
                }
            });

            // Header Basket
            $("#basket-drop").on("show.bs.modal", function(e){
                var $this = $(this);
                var basketProd = $(".basket-block .basket-product").not(".place").clone(true);
                
                $this.next(".header-items-drop").fadeToggle(200).toggleClass("is-open");
                
                $this.find(".header-drop-products").html(basketProd).promise().done(function(){
                    setHold();
                });
            });

            // Header Fav    
            // $("#fav-drop").on("show.bs.modal", function(e){
            //     var $this = $(this);
            //     var basketProd = $(".basket-block .basket-product").not(".place").clone(true);
                
            //     $this.next(".header-items-drop").fadeToggle(200).toggleClass("is-open");
                
            //     $this.find(".header-drop-products").html(basketProd).promise().done(function(){
            //         setHold();
            //     });
            // });

            // Basket
            var $btnBasket = $(".btn-i-b.bkt"),
                $btnAdd = $(".btn-i-b"),
                $basketSum = $(".count-price"),
                $basketItems = $(".basket-items .count-items, .header-basket .count-items");  
                
            $basketSum.length 
                && 
            $btnBasket.on("click", function(){

                var $prodBlock = $(this).parents(".product-block"),
                    $img = $prodBlock.find(".img img:first-child"),
                    $basketImg = $(".basket-block .basket-product.place .img"),
                    imgClone = $img.clone(),
                    id = $prodBlock.data("id"),
                    name = $prodBlock.find(".prod-name").text(),
                    price = $prodBlock.find(".price").text();

                        
                if (!$(this).hasClass("in-bkt")){
                     $(this).addClass("in-bkt");
                     tooltipsRem($(this));

                     if ( !$(".basket-block").is(".is-open") ){
                           $(".basket-block").addClass("is-open");
                           $("#footer").css("margin-bottom", 110);
                     }

                     // Fly Image To Basket
                     setTimeout(imgFly, 300);

                     function imgFly(){
                        setTimeout(createPlace, 0);

                        $(".basket-product-wrap").scrollLeft(10000);

                        imgClone
                            .offset({
                                "top": $img.offset().top,
                                "left": $img.offset().left
                            })
                            .css({
                                "height": 92,
                                "position": "absolute",
                                "z-index": "1000"
                            })
                            .appendTo( $("body") )
                            .animate({
                                "top": $basketImg.offset().top,
                                "left": $basketImg.offset().left
                            }, 500, function(){
                                
                                imgClone
                                    .clone()
                                    .attr("style","")
                                    .css({"position": "static"})
                                    .appendTo($basketImg)
                                    .show();

                                $(this).remove();    

                                $(".basket-product:last-child")
                                    .prev()
                                    .attr("data-id", id)
                                    .find(".basket-product-name")
                                    .text(name)
                                    .end()
                                    .find(".basket-product-price")
                                    .text(price)
                                    .end()
                                    .find(".hide-item")
                                    .addClass("show");    

                            }); 
                            
                            changeBasket.plus(price);
                            changeItems.basket("plus");   
                    }
                } else {
                    $(this).removeClass("in-bkt");
                    removeProd(id);
                }
            });


            $(document).on("click", ".basket-product .remove", function(){
                var id = $(this).parents(".basket-product").data("id");

                $(this).fadeOut(250);
                removeProd(id);
            });

            function createPlace(){
                var placeNew = "";

                placeNew += "<div class='basket-product place'>";
                placeNew += "<div class='img'><i class='remove hide-item'></i></div>";
                placeNew += "<div class='basket-product-name hide-item'></div>";
                placeNew += "<div class='basket-product-price hide-item'></div>";
                placeNew += "</div>";

                $(".basket-product.place").removeClass("place"); 
                $(".basket-product-wrap").append(placeNew); 
            };

            function removeProd(id, callback){
                var $basketProd = $(".basket-product[data-id='" + id + "'"),
                    delPrice = parseInt( $basketProd.find(".basket-product-price").text() ),
                    delId = $basketProd.data("id");

                $basketProd.addClass("is-remove");  
                changeBasket.minus(delPrice);
                changeItems.basket("minus");    

                $(".product-block")
                    .filter(
                        function(){
                            return $(this).data("id") == delId
                        }
                    ).find(".in-bkt").removeClass("in-bkt");

                setTimeout(function(){ 
                    $basketProd.remove();
                    setHold();
                }, 600);
            };

            function setHold(){
                var items = $(".header-drop-products .basket-product").length;
                (items > 0) ? $(".header-drop-hold").hide() : $(".header-drop-hold").show()
            };

            var changeBasket = {

                plus: function(price){

                    $basketSum.each(function(){
                        $(this).text( parseInt( $(this).text() ) + parseInt(price) );
                    });

                    $basketItems.each(function(){ 
                        $(this).text( parseInt( $(this).text() ) + 1 ); 
                    });
                },

                minus: function(delPrice){

                    $basketSum.each(function(){
                        $(this).text( parseInt( $(this).text() ) - delPrice );
                    });
                    
                    $basketItems.each(function(){
                        $(this).text( parseInt( $(this).text() ) - 1 );
                    });
                }
            };

            var changeItems = {

                basket: function(op){
                    var $basketCount = $(".items.bkt").find("div"),
                        basketItems = parseInt($basketCount.text());

                    switch(op){
                        case "plus":
                            $basketCount.text(parseInt(basketItems + 1));
                        break;

                        case "minus":
                            $basketCount.text(parseInt(basketItems - 1));
                        break;
                    }        
                },

                fav: function(op){
                    var $favCount = $(".count-items-fav"),
                        favItems  = 0;

                    $favCount.each(function(){
                       favItems = parseInt($(this).text());
                    });

                    switch(op){
                        case "plus":
                            $favCount.text(parseInt(favItems + 1));
                        break;

                        case "minus":
                            $favCount.text(parseInt(favItems - 1));
                        break;
                    }     
                }
            };

        }()); // End Fav and Basket


        // Filter Desktop
        (function (){
            var $del = $(".filter-item-head .delete"),
                $bg  = $(".filter-drop-bg"),
                ttlHeight = $(".filter-wrap .title-ico").innerHeight();

            // Drop Position
            $(".filter-item-drop").each(function (){
                var items = $(this).children().length,
                    itemsHeight = items * 57;

                $(this).css({ "top": - ( (itemsHeight - 68) / 2) }); 
            }); 

            // Hover        
            $(".filter-item").on({
                mouseenter: function(){  

                    var $drop = $(this).find(".filter-item-drop"),
                        posTop = $drop.position().top,
                        dropHeight = $(this).find(".filter-option").length * 57,
                        index = $(this).index();

                    if (window.innerWidth > 1024){
                        $(this).addClass("is-open");
                        
                        $bg.css({
                            "opacity": 1,
                            "height": dropHeight,
                            "top": posTop + ttlHeight + ( index * 68 ) + 1
                        }); 
                    }     
                    
                },

                mouseleave: function (){
                    if (window.innerWidth > 1024){
                        $(this).removeClass("is-open");
                    }   
                }
            });

            $(".filter-block").on("mouseleave", function(){
                $bg.attr("style","opacity: 0");
            });

            // Click Option
            $(".filter-option").on("click", function(e){
                var $this      = $(this);
                var indexItem  = $this.index();
                var filterItem = $this.parents(".filter-item");

                if ($this.hasClass("is-active")){
                    $this.removeClass("is-active");
                    removeSelectOption(indexItem, $this);

                    filterCheck($this);
                } else {
                    $this.addClass("is-active");
                    addSelectOption(indexItem, $this);
                } 

                // filterItem.removeClass("is-open");
                // $bg.attr("style", "opacity: 0");
            });

            $del.on("click", function (){
                var indexItem = $(this).parent().index() - 1;

                $(this)
                    .parent()
                    .removeClass("is-show animate")
                    .parents(".filter-item")
                    .find(".filter-option")
                    .eq(indexItem)
                    .removeClass("is-active");

                filterCheck($(this));   
            });

            function addSelectOption(index, this_){
                var filterItem = this_.parents(".filter-item");
                var selectItem = filterItem.find(".filter-select").eq(index);

                selectItem
                    .addClass("is-show")
                    .parent()
                    .find(".filter-name").hide();

                setTimeout(function(){ selectItem.addClass("animate") }, 200);    
            }   

            function removeSelectOption(index, this_){
                this_.parents(".filter-item")
                    .find(".filter-select")
                    .eq(index)
                    .removeClass("is-show animate")
            } 

            function filterCheck(this_){
                var filterItem = this_.parents(".filter-item");

                if (!filterItem.find(".filter-item-drop .filter-option").is(".is-active")){
                    filterItem.find(".filter-name").fadeIn(400);
                }
            }
        }());

        // Filter Mobile
        (function(){

            $(".filter-top .filter-button").on("click", function(){
                var id = $(this).data("id");

                if ($(this).is(".is-active")){
                    $(".filter-drop-wrap").slideUp(200);
                    $(this).removeClass("is-active");
                } else {
                    $(".filter-drop-wrap").slideUp(400);
                    $(".filter-top .filter-button").removeClass("is-active");
                    $(".filter-drop-wrap" + "#" + id).delay(400).slideDown(400);
                    $(this).addClass("is-active");
                }
            });

            $(".filter-item-head").on("click", function(e){
                var $this        = $(this);
                var $filterPoint = $this.parent();
                var $filterDrop  = $this.next();
                var target = $(e.target);

                if (window.innerWidth < 1025){
                    if ($filterPoint.is(".is-open")){
                        $filterPoint.removeClass("is-open");
                        $filterDrop.slideUp(150);
                    } else {
                        if (!target.hasClass("delete")){
                            $(".filter-item").removeClass("is-open");
                            $(".filter-item-drop").slideUp(150);
                            $filterPoint.addClass("is-open");
                            $filterDrop.slideDown(200);
                        }
                    } 
                }

                               
            });

        }());


        // Popup Side
        (function(){
            var $wrap      = $(".popup-side-wrap"),
                $wrapAsk   = $(".popup-ask"),
                $wrapDesk  = $(".popup-desc"),
                $close     = $wrap.find(".popup-close"),
                $pointWrap = $(".point-wrap"),
                $point     = $pointWrap.find(".point"),
                pointActInt;

            $(".go-to-popup").on("click", function(){
                setTimeout(function(){
                    runPoints.start(4000);
                }, 1200);

                popupSideOpen("desc");
            });

            $(".go-to-ask").on("click", function(e){
                popupSideOpen("ask");

                e.preventDefault();
            });

            $(".popup-close").on("click", function(){
                popupSideClose();
            });

            $(".popup-bg").on("click", function(){
                $(this).parent().removeClass("is-open");
                popupSideClose();
            });


            function popupSideOpen(popup){
                var popupWrap; 

                switch(popup){
                    case "ask":
                        popupWrap = $wrapAsk;
                    break;
                    
                    case "desc":
                        popupWrap = $wrapDesk;
                    break;        
                }

                popupWrap.fadeIn(400).addClass("is-open");
                pageOverflow();

                setTimeout(
                    function(){
                        $close.addClass("is-open");
                }, 1100);    
            };

            function popupSideClose(){
                $wrap.removeClass("is-open").delay(700).fadeOut(200);
                $close.removeClass("is-open"); 
                $point.removeClass("is-active");  

                setTimeout(pageOverflow, 1100);
                
                runPoints.stop();
            };


            var pointBlink;
            var runPoints = {
                start: function(interval){
                    $point.first().addClass("is-active");

                    pointBlink = setInterval(function(){
                        var currentActive = $(".point.is-active");
                        var _target = currentActive.is(":last-child") ? $point.first() : currentActive.next();

                        $point.removeClass("is-active")
                        _target.addClass("is-active");

                    }, interval);
                },

                stop: function(){
                    clearInterval(pointBlink);
                    $(".point.is-active").removeClass("is-active");
                }
            };
            

        }());     

        // Popup Quick
        (function(){
            var $popup = $(".popup-quick"),
                $btnQuick = $(".go-to-quick"),
                $btnClose = $popup.find(".close");
            
            // Open
            $popup.length 
                && 
            $btnQuick.on("click", function(){ 
                var $prodBlock = $(this).parents(".product-block"),
                      prodName = $prodBlock.find(".prod-name").text(),
                     prodPrice = $prodBlock.find(".price").text(),
                        prdImg = $prodBlock.attr("data-main-img");

                $popup
                    .fadeIn(200)
                    .addClass("is-open")
                    .find(".img img")
                    .attr("src", prdImg)
                    .end()
                    .find(".prod-name")
                    .text(prodName)
                    .end()
                    .find(".price")
                    .text(prodPrice);

                pageOverflow();
            });

            // Close
            $btnClose.on("click", function(){
                $popup.removeClass("is-open");
                setTimeout(function(){ $popup.fadeOut() }, 400);
                pageOverflow();
            });

        }());   

        // FAQ
        $(".faq-head").on("click", function(){
            var $this = $(this).parent();
            
            if ($this.is(".is-open")){
                $this.removeClass("is-open").find(".faq-drop").slideUp(400);
            } else {
                $(".faq-block").removeClass("is-open");
                $(".faq-drop").slideUp(400);
                $this.addClass("is-open").find(".faq-drop").slideDown(400);
            }
        });

        // Tabs FAQ
        // (function(){
        //     var $tab = document.querySelectorAll(".faq-tab");

        //     $tab.forEach(function(item){

        //         item.addEventListener("click", function(){
        //             var id = this.getAttribute("data-tab");
        //             var $tabContent = document.querySelectorAll(".tab-block");

        //             for ( var i = 0; i < $tabContent.length; i++ ){
        //                 $tabContent[i].classList.remove("is-show");
        //                 $tab[i].classList.remove("is-current");
        //             };

        //             item.classList.add("is-current");
        //             document.getElementById(id).classList.add("is-show");
        //         });
        //     });

        // }());

        // Cabinet
        if (window.location.hash != "") {
            $('a[href="' + window.location.hash + '"]').click();
        }
        

        // Color Select
        (function(){
            var $phone = $(".phone-mdl"),
                $text = $("#phone-text");

            $(".color-select input").on("change", function(){

                $phone.removeClass("is-active");
                setActive( $(this), "#c-" );

            }).each(function(){
                if ( $(this).is(":checked") ) setActive( $(this), "#c-" )
            });

            function setActive(elem, preId){
                $( preId + elem.attr("data-val") ).addClass("is-active");
                
                if ($text.length){
                    $(".phone-mdl-wrap").attr("data-color", elem.attr("data-val"));
                }
            }
        }());

        // History Toggle
        (function(){
            $(".history-row-toggle").on("click", function(){
                var $wrap = $(this).parents(".history-row-wrap");

                $wrap.toggleClass("is-open").find(".history-row-drop").slideToggle(250);
            });
        }());


        windowSize();   
        $(window).resize(windowSize); 
    });
    
    var cachedWidth = window.innerWidth;

    function windowSize(){
        var winWidth = window.innerWidth;

        // Resize Mobile
        if (winWidth !== cachedWidth){
            $(".filter-item-drop").attr("style","");

            cachedWidth = winWidth;
        } 
    };

    $(window).on("scroll", animate);

    // Animate
    function animate(){
        $.fn.isOnScreen = function(x, y){
            if(x == null || typeof x == 'undefined') x = 1;
            if(y == null || typeof y == 'undefined') y = 1;

            var win = $(window);

            var viewport = {
                top : win.scrollTop(),
                left : win.scrollLeft()
            };
            viewport.right = viewport.left + win.width();
            viewport.bottom = viewport.top + win.height();

            var height = this.outerHeight();
            var width = this.outerWidth();

            if(!width || !height){
                return false;
            }

            var bounds = this.offset();
            bounds.right = bounds.left + width;
            bounds.bottom = bounds.top + height;

            var visible = (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

            if(!visible){
                return false;
            }

            var deltas = {
                top : Math.min( 1, ( bounds.bottom - viewport.top ) / height),
                bottom : Math.min(1, ( viewport.bottom - bounds.top ) / height),
                left : Math.min(1, ( bounds.right - viewport.left ) / width),
                right : Math.min(1, ( viewport.right - bounds.left ) / width)
            };

            return (deltas.left * deltas.right) >= x && (deltas.top * deltas.bottom) >= y;
        };

        $(".animate-item").each(function(){
            if (!$(this).hasClass("animate")){
                var screen = $(this).attr("data-screen") || 0.5;  

                if ($(this).isOnScreen(0, screen)){                 
                    $(this).addClass("animate");
                }

                prevAnimate();
            } 
        });
    }

    function prevAnimate(){
        $(".animate").each(function(){
            $(this).prevAll(".animate-item").addClass("animate");
            $(this).closest(".animate-item").addClass("animate");
        });
    }
    
    // Tooltips Remove 
    function tooltipsRem(this_){
        //this_.removeClass("tooltip");
        //$("[id*="+"tooltipsy"+"]").remove();
    }

    // Body Oveflow
    function pageOverflow(){
        var $body = $("body");

        if ( $body.is(".popup-open") ){
             $body.removeClass("popup-open");
        } else {
             $body.addClass("popup-open");
        }        
    }

    // Include File
    function include(url) {
        var script = document.createElement("script");
        script.src = url;

        document.getElementsByTagName("body")[0].appendChild(script);
    }

     // Click Out
    function ClickOut(element){
        this.element = element;
        
        this.removeClass = function(class_){
            $(document).on("click", function(event) {
                if ($(event.target).closest(element).length) return;
                $(element).removeClass(class_);
                event.stopPropagation();
            });
        };
    };
}(jQuery));

