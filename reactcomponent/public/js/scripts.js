(function($){
	$(document).ready(function() {	

		// Scroll to Top
		jQuery('.scrolltotop').click(function(){
			jQuery('html').animate({'scrollTop' : '0px'}, 400);
			return false;
		});
		
		jQuery(window).scroll(function(){
			var upto = jQuery(window).scrollTop();
			if(upto > 500) {
				jQuery('.scrolltotop').fadeIn();
			} else {
				jQuery('.scrolltotop').fadeOut();
			}
		});



		
		$("#owl-csel1").owlCarousel({
			    items: 1,
				autoplay: true,
				autoplayTimeout: 3000,
				startPosition: 0,
				rtl: false,
				loop: true,
				margin: 15,
				dots: true,
				nav: true,
				animateOut: 'fadeOut',
				animateIn: 'fadeIn',   // Only fade-in effect
				smartSpeed: 1000,      // Controls fade speed
				navText: [
					'<i class="fa fa-angle-left" aria-hidden="true"></i>',
					'<i class="fa fa-angle-right" aria-hidden="true"></i>'
				],
				navContainer: '.main-content .custom-nav',
				responsive: {
					0: { items: 1 },
					767: { items: 1 },
					1200: { items: 1 }
				}
		});

		jQuery('.tabs .tab-links a').on('click', function(e)  {
            		var currentAttrValue = jQuery(this).attr('href'); 
            		// Show/Hide Tabs
            		// Show/Hide Tabs
            	jQuery('.tabs ' + currentAttrValue).siblings().hide();
            	jQuery('.tabs ' + currentAttrValue).delay().show();             
            		// Change/remove current tab to active
            		jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
            		e.preventDefault();
            	});
		

 			$("#owl-csel2").owlCarousel({
					items:3,
					autoplay: true,
					autoplayTimeout: 3000,
					startPosition: 0,
					rtl: true,
					loop: true,
					margin: 15,
					dots: true,
					nav: true,
					navText: [
								'<i class="fa fa-angle-left" aria-hidden="true"></i>',
								'<i class="fa fa-angle-right" aria-hidden="true"></i>'
							],
					navContainer: '.main-content2 .custom-nav',
					responsive:{
						0: {
							items: 1,						
						},
						767: {
							items: 3,						
						},
						1200: {
							items: 4,						
						}
					}

				});



				






		
		
	});
})(jQuery);

AOS.init({
	duration: 1900,
})






// // bouncingCanvas start
// const canvas = document.getElementById("bouncingCanvas");
// const ctx = canvas.getContext("2d");

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// window.addEventListener("resize", () => {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// });

// const colors = ["#ff69b4", "#ffeb3b", "#00bcd4", "#ff5252", "#c084fc"]; // green removed
// const circles = [];

// for (let i = 0; i < 6; i++) {
//   circles.push({
//     x: Math.random() * (canvas.width - 500) + 150,
//     y: Math.random() * (canvas.height - 500) + 150,
//     radius: 150, // since width = 300px
//     dx: (Math.random() - 0.5) * 2,
//     dy: (Math.random() - 0.5) * 2,
//     color: colors[i % colors.length],
//   });
// }

// function animate() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   for (let circle of circles) {
//     ctx.beginPath();
//     ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
//     ctx.fillStyle = circle.color;
//     ctx.fill();

//     circle.x += circle.dx;
//     circle.y += circle.dy;

//     // Bounce
//     if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
//       circle.dx *= -1;
//     }
//     if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
//       circle.dy *= -1;
//     }
//   }
//   requestAnimationFrame(animate);
// }

// animate();
// bouncingCanvas end

// accordion

  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach(item => {
    const header = item.querySelector(".accordion-header");

    header.addEventListener("click", () => {
      accordionItems.forEach(i => {
        if (i !== item) {
          i.classList.remove("active");
        }
      });

      item.classList.toggle("active");
    });
  });



// =================

const swiper = new Swiper(".swiper", {
  speed: 5000,
  direction: "horizontal",
  loop: true,
  freeMode: true,
  zoom: true,
  keyboard: true,
  pagination: false,
  navigation: false,

  autoplay: {
    delay: 0
  },

  breakpoints: {
    0: {
      slidesPerView: 2.8
    },
	 550: {
    	slidesPerView: 2
    },
    1000: {
      slidesPerView: 9
    },
    1200: {
      slidesPerView: 9
    }
  },
          

});
