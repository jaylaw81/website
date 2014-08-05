jQuery(function(){

	//region colorbox
	if($.fn.colorbox){
		$('.pi-colorbox').each(function(){
			var $el = $(this),
				groupFromData = $el.data('colorboxGroup'),
				group = groupFromData ? groupFromData : 'pi-group';
			$el.colorbox({rel:group});
		});
	}
	//endregion

});