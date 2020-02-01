( function( $ ) {

//Aside
function getSiteMainHeight(){
	if( $(window).width() > 1023 ){
		var sidebarHeight = $('.sidebar').height();
		$('.site-main').css('min-height', sidebarHeight)
	}
}

$(document).ready(function(){
	getSiteMainHeight();
})
$(window).resize(function(){
	getSiteMainHeight();
})

//Cart	
function addProcuctDesktop(){
	$('.product').each(function(i, el){					
		// Lift card and show stats on Mouseover
		$(el).find('.make3D').hover(function(){
				var productMeta = 	$(this).find('.stats').height();
				$(this).parent().css('z-index', "20");
				$(this).addClass('animate');
				$(this).css({'padding-bottom': productMeta});
				$(this).find('.stats').css({'margin-top': -productMeta});			
			 }, function(){
				$(this).removeClass('animate');			
				$(this).parent().css('z-index', "1");
				$(this).css({'padding-bottom':0});
				$(this).find('.stats').css({'margin-top': 0});
		});	
	});

	$('.add_to_cart').click(function(){
		var productCard = $(this).parent();
		$('.size-box__wrap').hide();
		$('.stats').show();

		productCard.find('.size-box__wrap').show();
		productCard.find('.stats').hide();
	})

	$('.select-size__container').change(function(){
		var productCard = $(this).closest('.product-front');
		var position = productCard.offset();
		var productImage = $(productCard).find('img').get(0).src;
		var productName = $(productCard).find('.product_name').get(0).innerHTML;
		var productPrice = $(productCard).find('.product_price .price').get(0).innerHTML;
		var productSize = $(productCard).find(".select-size:checked").val(); 	


		$("body").append('<div class="floating-cart"></div>');		
		var cart = $('div.floating-cart');		
		productCard.clone().appendTo(cart);
		$(cart).css({'top' : position.top + 'px', "left" : position.left + 'px'}).fadeIn("slow").addClass('moveToCart');		
		setTimeout(function(){$("body").addClass("MakeFloatingCart");}, 800);
		setTimeout(function(){
			$('div.floating-cart').remove();
			$("body").removeClass("MakeFloatingCart");


			var cartItem = "<div class='cart-item'><div class='img-wrap'><img src='"+productImage+"' alt='' /></div><div class='meta-wrap'><h5>"+productName+", "+productSize+"</h5><span>"+productPrice+" сум</span></div><div class='cart-item-border'></div><div class='delete-item'></div></div>";			

			$("#cart .empty").hide();			
			$("#cart").append(cartItem);
			$("#checkout").fadeIn(500);
			
			$("#cart .cart-item").last()
				.addClass("flash")
				.find(".delete-item").click(function(){
					$(this).parent().fadeOut(300, function(){
						$(this).remove();
						if($("#cart .cart-item").size() == 0){
							$("#cart .empty").fadeIn(500);
							$("#checkout").fadeOut(500);
						}
					})
				});
 		    setTimeout(function(){
				$("#cart .cart-item").last().removeClass("flash");
			}, 10 );
			
		}, 1000);
	});
}	
	
function addProcuctMobile(){
	$('.product').each(function(i, el){					
		// Lift card and show stats on Mouseover
		$(el).find('.make3D').hover(function(){
				var productMeta = 	$(this).find('.stats').height();
				$(this).parent().css('z-index', "20");
				$(this).addClass('animate');
				$(this).css({'padding-bottom': productMeta});
				$(this).find('.stats').css({'margin-top': -productMeta});			
			 }, function(){
				$(this).removeClass('animate');			
				$(this).parent().css('z-index', "1");
				$(this).css({'padding-bottom':0});
				$(this).find('.stats').css({'margin-top': 0});
		});	
	});

	$('.add_to_cart').click(function(){
		var productCard = $(this).parent();
		$('.size-box__wrap').hide();
		$('.stats').show();

		productCard.find('.size-box__wrap').show();
		productCard.find('.stats').hide();
	})

	var priceTotal = 0;
	$('.select-size__container').change(function(){
		var productCard = $(this).closest('.product-front');
		var productPrice = $(productCard).find('.product_price .price').text();
		var newProductPrice = productPrice.replace(/ /g,'');
		newProductPrice = parseInt(newProductPrice);

		priceTotal = newProductPrice + priceTotal;
		var newpriceTotal = priceTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g,  ' ')
		$('#checkout').fadeIn(500);
		$('.price-total').text( newpriceTotal  + ' сум' );
	})
}
	
	
$(document).ready(function(){	
	if( $(window).width()>=1024 ){
		addProcuctDesktop()
	}
	else{
		addProcuctMobile()
	}
	
});

$(document).ready(function(){

	$('.price').each(function(){
		$(this).text( $(this).text().replace(/\B(?=(\d{3})+(?!\d))/g,  ' ') ); 
	})

	$('.offer-item__title').each(function(){
		if( $(this).text().length > 9 ){
			$(this).text($(this).text().substr(0, 9)+'...');
		}
		
	})
	
});

// Mobile sidebar
$(document).ready(function(){
	$('.menu-show-btn').click(function(){
		$('.mobile-sidebar-box').addClass('open')
	})
});

$(document).click(function(event) {
  if (!$(event.target).closest('.mobile-sidebar-box.open, .menu-show-btn').length) {
   	$('.mobile-sidebar-box').removeClass('open');
  }
});

// Mobile filter
$(document).ready(function(){
	$('.mobile-filter-box__btn').click(function(){
		$('.mobile-filter-box__filter-list').toggle();
	})
});
$(document).click(function(event) {
  if (!$(event.target).closest('.mobile-filter-box__btn, .mobile-filter-box__filter-list').length) {
   	$('.mobile-filter-box__filter-list').hide();
  }
});

//Checkout

function getCheckoutHright(){
	var contentHeight = $('.content-area').height();
	var footerHeight = $('.site-footer').height();
	var mobileHeaderHeight = $('.logo-bar').height();
	var checkoutHeight;

	if( $(window).width() > 1023 ){
		checkoutHeight = $(window).height() - contentHeight - footerHeight;
		$('.checkout-box').css('min-height', checkoutHeight)
	}
	else{
		checkoutHeight = $(window).height() - mobileHeaderHeight - footerHeight;
		$('.checkout-box').css('min-height', checkoutHeight)
	}
}
$(document).ready(function(){
	getCheckoutHright();
})
$(window).resize(function(){
	getCheckoutHright();
})
} )( jQuery );