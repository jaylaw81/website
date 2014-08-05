jQuery(function(){

	//region Fixed header
	var $w = $(window),
		$d = $(document),
		$b = $('body'),
		$all = $('#pi-all'),
		$hrW = $('.pi-main-header-w'),
		$fixedHrRows = $('.pi-header-row-fixed'),
		headerHeight = 0 ,
		fixedHeaderTreshold = 300,
		classDuplication = 'pi-row-duplication',
		сlassDuplicationShown = 'pi-fixed-header-rows-shown',
		сlassDuplicationReduced = 'pi-header-row-reduced',
		duplicationRowSize = 'lg',
		scrollCheckTmt,
		isFixedRowScrollEventListenerAttached = 0;

	headerHeight += $hrW.height();

	if($fixedHrRows.length){
		PI_attachFixedRowScrollEventListener();
		PI_duplicateFixedRows();
		fixActiveRow();
	}

	function PI_attachFixedRowScrollEventListener(){
		if(!isFixedRowScrollEventListenerAttached) {
			$w.scroll(function(){
				clearTimeout(scrollCheckTmt);
				scrollCheckTmt = setTimeout(function(){
					fixActiveRow();
				}, 100);
			});
			isFixedRowScrollEventListenerAttached = 1;
		}
	}

	function PI_duplicateFixedRows(){

		var $duplication;

		$fixedHrRows = $('.pi-header-row-fixed').eq(0);

		$fixedHrRows.each(function(){
			var $curRow = $(this);
			if($curRow[0].piDuplication === undefined){
				$duplication = $curRow.clone();

				if($duplication.hasClass('pi-section-header-sm-w')){
					duplicationRowSize = 'sm';
				} else if($duplication.hasClass('pi-section-header-md-w')) {
					duplicationRowSize = 'md';
				}

				classDuplication = classDuplication + ' ' + classDuplication + '-' + duplicationRowSize;

				if(duplicationRowSize == 'lg') {
					classDuplication += ' ' + сlassDuplicationReduced;
				}

				$duplication = $duplication.wrap('<div class="' + classDuplication + ' pi-hidden-md"></div>');
				$duplication = $duplication.parent();
				modifyCloneIDS($duplication);

				$curRow[0].piDuplication = $duplication;
				$all.append($duplication);

			}
		});
	}

	function fixActiveRow(){
		var scrollTop = $w.scrollTop();
		if(scrollTop >= headerHeight + fixedHeaderTreshold){
			$b.addClass(сlassDuplicationShown);
		} else {
			$b.removeClass(сlassDuplicationShown);
		}
	}

	function modifyCloneIDS($el){
		var id = $el.attr('id'),
			newIdPostfix = '_copy';

		if(id){
			$el.attr('id', id + newIdPostfix);
		}

		$el.children().each(function(){
			modifyCloneIDS($(this));
		});
	}
	//endregion

});