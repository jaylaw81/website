jQuery(function(){

	//region Mobile menus
	var $d = $(document);

	new MobileMenus();

	function MobileMenus(){

		var mobileMenus = [],
			settings = {
				classOpen: 'pi-menu-open',
				classParentRow: 'pi-section-header-w',
				classMenuWrapper: 'pi-section-menu-mobile-w',
				classMenu: 'pi-section-menu-mobile'
			};

		function init(){

			$('.pi-mobile-menu-toggler').each(function(){
				var $el = $(this);

				if($el.get(0).piMenuWasInitialized){
					return;
				}

				$el.get(0).piMenuWasInitialized = 1;

				var mobileMenu = {
					$toggler: $el,
					$wrapper: null,
					$menu: null,
					height: null,
					state: 0
				};

				mobileMenu.$wrapper = $(mobileMenu.$toggler.data('target'));
				mobileMenu.$menu = mobileMenu.$wrapper.find('.' + settings.classMenu);

				mobileMenu.height = mobileMenu.$menu.outerHeight();

				mobileMenu.$toggler.click(function(){
					toggleMenu(mobileMenu);
				});

				$d.bind('piBoundChanged', function(){
					if(mobileMenu.state && mobileMenu.$toggler.is(':hidden')){
						toggleMenu(mobileMenu);
					}
				});

				mobileMenus.push(mobileMenu);

			});

		};

		function toggleMenu(m){
			m.$wrapper.toggleClass(settings.classOpen);
			if(!m.$wrapper.hasClass(settings.classOpen)){
				m.$wrapper.height(0);
				m.state = 0;
			} else {
				m.$wrapper.height(m.height);
				m.state = 1;
			}
		}

		init();

		return mobileMenus;
	}
	//endregion

});