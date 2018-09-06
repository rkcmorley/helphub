$(document).ready(function(){
	if($("#nav").length == 0){
		$(".include").each(function(i){
			var isIE6 = (navigator.userAgent.indexOf('MSIE 6') > -1) ? true : false;
			var incParent = $(this).attr('id');
			incParent = "#" + incParent;
			var incStr = $(this).attr('id') + "_func";
			var incFun = eval(incStr);
			var url = incFun('/include_path');
			var path = location.pathname.substring(1);
			var pathwithreqparams = path + location.search;
			
			if (url.match('#')){
				url = url.replace(/^\//,''); // remove leading forward slash for UK legacy server
				url = url.replace(/#/g,'/');
				url = url.replace(/\*/g,'.');
			}
			
			$.get(url, function(data){
				$(incParent).html(data);
				
				if(incParent.indexOf('spotlight_include')!='-1'){ // UK legacy fix, forces spotlight include div to redraw in ie6.
					$('.spot287Middle').css('display','none');
					$('.spot287Middle').css('display','block');
				}
				
				if(data.indexOf('id="nav"')!='-1'){ // this is only used for UK legacy to add active class after ajax loads
					if (isIE6) {
						setTimeout("ieNavFix();activePage();",2000);  // run ieNavFix() and activePage() again after navigation is loaded async
					}
					else{
						setTimeout("activePage();",2000);	
					}
				}
				else if (data.indexOf('<div class="emptyclearLeft">')!='-1'){ 
					setTimeout("activePage();",2000); // run again after nav is loaded async, give 2 seconds for data to be added to dom
				}
			});
		});
	}});