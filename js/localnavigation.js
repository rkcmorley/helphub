$(document).ready(function() {
	activePage();
	var isIE6 = (navigator.userAgent.indexOf('MSIE 6') > -1) ? true : false;
	if (isIE6) {
		ieNavFix();
	}
});

function setPageSection(){
var pageSection = $("#nav > li[class='active'] > a").html();
	if(pageSection != undefined){
		pageSection = pageSection.replace("<br>","_");
		pageSection = pageSection.replace(" ","_");
		pageSection = pageSection.toLowerCase(); 
	}
	else{
		pageSection = "not_defined";
	}
	pageUrl.section = pageSection; 
}

function activePage(){
	jQuery.fn.activeGroup = function(){
		var groupClass = $(this).attr('class');
		var groupLabel = groupClass.replace(/^grp_/,"");
		groupLabel = groupLabel.replace(/_/g," ");
		groupLabel = groupLabel.replace(/\b[a-z]/g,capLtr);
		
		if($(".grp_business_services").length >= 1){
			groupLabel = "Business Services";
		}
		
		$("#globalNav li a:contains("+groupLabel+")").parents('li').addClass('active');
		$("#globalNav li a:contains("+groupLabel+")").parents('li').prev('li').css({'background':'none','padding-right':'0'});
	};
	
	function capLtr(){
		return arguments[0].toUpperCase();
	}
	
	if ($("#navGrp[class^='grp']").length >= 1){
		$("#navGrp[class^='grp']").activeGroup();
	}
	
	/*function addActiveClass(){
		var path = location.pathname.substring(1)+location.search; // includes request param if available
		var pathWithOutSendParam = path.split(/\??&?send/g); // splits url from ?send or &send req params used during form submit
		$('#nav li a[href$="' + path + '"]').parents("li").addClass('active');
		if (path){
			$('#nav li a[href$="' + path + '"]').parents("li").addClass('active');
			// add active class to leftnav level 1 if match
			$('#leftnav200 li a[href$="' + pathWithOutSendParam[0] + '"]').parents("li").attr('class', 'active');
			
			// check to see if nav level 1 matches
			if($('#nav li a[href$="' + pathWithOutSendParam[0] + '"]').length > 0){
				$('#nav li a[href$="' + pathWithOutSendParam[0] + '"]').parents("li").attr('class', 'active');
			}
			
			// else loop through nav level 2 and leftnav level 2 for matches
			else if($("#leftnav_inc > ul li[class='active'] a").length > 0){
				$('#nav ul li a').each(function(){
					var thisTopLink = $(this);
					var thisTopLinkHref = $(this).attr("href");
					$("#leftnav_inc > ul li[class='active'] a").each(function(){
						if($(this).attr("href").indexOf(thisTopLinkHref) != -1){ // use indexOf to resolve ie6/ie7 issue
							thisTopLink.parents("li").attr('class','active');
						}		
					});	
				});
			}
		}
		return false;
	} */
	
		function addActiveClass(){
		var path;
		var pathname = location.pathname;
		var expver, regForPath, regForNavComp, regForNavComp2;
		
		if(location.search.match(/expver=.*/i)){
			for(i=0;i<pageUrl.paramArray.length;i++){
				expver=pageUrl.paramArray[i].split("=");
				if(expver[0] == 'expver'){
					expver='-'+expver[1]+'.';
				    reg = new RegExp(expver, 'gi');
                }
			}
			pathname = pathname.replace(reg,'.'); 
		} 
		
		if(location.search.match(/cat[1|2]/)){
			var parms = location.search;
			for(i=0;i<pageUrl.paramArray.length;i++){
				if(!pageUrl.paramArray[i].match(/cat[1|2]/gi)){  
					parms = parms.replace('&' + pageUrl.paramArray[i],''); 
				}
				path = pathname.substring(1)+parms; // includes request params for cat1 or cat2 only
			}
		}
		
		else{
			path = pathname.substring(1); // ignore req parameters
		}
		if (path.search(/(\.html|\.jsp)/gi) > 0){
			regForPath = path+"$"; // end of line
			regForPath = new RegExp(regForPath, 'i');
				
			matchTopNavByRecursion = function(){
				var thisTopLink, thisTopLinkHref, thisLeftLinkHref;
				var activateTopNavCounter = 0;
				$('#nav li > a').each(function(){
					if(activateTopNavCounter < 1){
						thisTopLink = $(this);
						thisTopLinkHref = $(this).attr("href");
						thisTopLinkHref2 = thisTopLinkHref.split("?")[0];
						
						$("#leftnav200 ul li[class='active'] > a").each(function(){
							if(activateTopNavCounter < 1){
								thisLeftLinkHref = $(this).attr("href");
								
								if(typeof thisLeftLinkHref != "undefined"){
										regForNavComp = thisTopLinkHref+"$"; // end of line
										regForNavComp = new RegExp(regForNavComp, 'i');
										
										regForNavComp2 = thisTopLinkHref2+"$"; // end of line
										regForNavComp2 = new RegExp(regForNavComp2, 'i');
										
										
										if(thisLeftLinkHref.match(regForNavComp)){
											thisTopLink.parents("li").addClass('active');
											activateTopNavCounter++;
										}
										else if(thisLeftLinkHref.split("?")[0].match(regForNavComp)){	
											thisTopLink.parents("li").addClass('active');
											activateTopNavCounter++;
										}
										else if(thisLeftLinkHref.match(regForNavComp2)){
											thisTopLink.parents("li").addClass('active');
											activateTopNavCounter++;
										}
										else if(thisLeftLinkHref.split("?")[0].match(regForNavComp2)){	
											thisTopLink.parents("li").addClass('active');
											activateTopNavCounter++;
										}	
								}
							}
						});
					}	
				});
			}
			
			matchTopNavOnlyByRecursion = function(){
				var thisTopLink, thisTopLinkHref;
				var activateTopNavCounter = 0;
				$('#nav li > a').each(function(){
					if(activateTopNavCounter < 1){
						thisTopLink = $(this);
						thisTopLinkHref = $(this).attr("href");
						
						if(thisTopLinkHref.match(regForPath)){
							thisTopLink.parents("li").addClass('active');
							activateTopNavCounter++;
						}
						else if(thisTopLinkHref.split("?")[0].match(regForPath)){	
							thisTopLink.parents("li").addClass('active');
							activateTopNavCounter++;
						}
					}	
				});
			}
			
			matchLeftNavByRecursion = function(){
				var thisLeftLink, thisLeftLinkHref;
				var activateLeftNavCounter = 0;
					$("#leftnav200 li > a").each(function(){
							if(activateLeftNavCounter < 1){
								thisLeftLink = $(this);
								thisLeftLinkHref = $(this).attr("href");
								
								if(typeof thisLeftLinkHref != "undefined" ){
									if(thisLeftLinkHref.match(regForPath)){
										thisLeftLink.parents("li").addClass('active');
										activateLeftNavCounter++;
									}
									else if(thisLeftLinkHref.split("?")[0].match(regForPath)){	
										thisLeftLink.parents("li").addClass('active');
										activateLeftNavCounter++;
									}		
								}
							}		
					});	
			}
			
			// TRY MATCH BY SELECTION FIRST (most of the time this will be enough, otherwise, the use of req params may require match by recursion)
			// -- add active class to topnav if match
			$('#nav li a[href$="' + path + '"]').parents("li").addClass('active');
			// --- add active class to leftnav if match
			$('#leftnav200 li a[href$="' + path + '"]').parents("li").addClass('active');
			// --- add active class to nav level 1 if match
			if($("#leftnav200 li[class='active'] a").length > 0 && $("#nav li[class='active'] a").length < 1){
				matchTopNavByRecursion();
			}
			else if($("#leftnav200 li").length > 0 && $("#leftnav200 li[class='active'] a").length < 1){
				matchLeftNavByRecursion();
				matchTopNavByRecursion();
			}
			else if($("#leftnav200 li").length < 1){ // no left nav, match top nav only
				matchTopNavOnlyByRecursion();	
			}
			if(window.location.toString().indexOf("marketing-services") != -1){
				if($('.subnav subnavext li').hasClass('subnavcol active')){
			$('#nav li').addClass('active')}
			else{
			return false;}	
			}
			
		}
		setPageSection(); // sets pageId.section for site catalyst
		
		return false;
	}
	
	if(location.search.match(/^\?cat1=/g)){ // swaps left nav on product pages that have req params
		var reqParamSplit = location.search.split(/&/g);
		var cat1 = reqParamSplit[0].substring(6);
		var leftNavURL = "/site-includes/business-services/"+cat1+"/"+cat1+"-left-navigation.html";
		
		$.get(leftNavURL, function(data){
			$('#leftnav_inc').html(data);
			addActiveClass();
		});
	}
	else {
		addActiveClass();
	}
}

function ieNavFix(){
	$("#nav > li[class!=active]").hover(function(){
		$('.active .subnav').css({'display':'none'});
		$(this).css({'background':'url(/global-images/nav_tab_active_right.gif) right top no-repeat'});
		$(this).children('a').css({'background':'url(/global-images/nav_tab_active_left.gif) left top no-repeat','color':'#595959'});
		$(this).children('.subnav').css({'display':'block'});
		$(this).children('.subnav li a').css({'background':'none'});
	}, function() {
		$(this).css({'background':'none'});
		$('.active .subnav').css({'display':'block'});
		$(this).children('a').css({'background':'none','color':'#fefefe'});
		$(this).children('.subnav').css({'display':'none'});
	});
}

function UrlObj(){    
    if(document.URL.indexOf('?') > 0) {
		this.urlArray = document.URL.split('?');
		this.paramString = this.urlArray[1];	
		this.paramArray = this.paramString.split('&');

		for(var i=0; i < this.paramArray.length; i++) {
			var pair = this.paramArray[i].split('=');
			var urlkey = pair[0].toLowerCase();	
			switch(urlkey){
				case "cat1":
					this.cat1 = pair[1];
					break;
				case "cat2":
					this.cat2 = pair[1];
					break;
				case "intcmp":
					this.intcmp = pair[1];
					break;
				case "wt.srch":
					this.wtsrch = pair[1];
					break;
				case "lname":
					this.lname = pair[1];
					break;
				case "fname":
					this.fname = pair[1];
					break;
				case "company":
					this.company = pair[1];
					break;
				case "email":
					this.email = pair[1];
					break;	
					
			}
		}
    }
}

function ReferUrlObj(){
	var rawpathname = document.referrer;
 	
  if(rawpathname.indexOf('?') > 0) {
		this.urlArray = rawpathname.split('?');
		this.paramString = this.urlArray[1];	
		this.paramArray = this.paramString.split('&');

		for(var i=0; i < this.paramArray.length; i++) {
			var pair = this.paramArray[i].split('=');
			var urlkey = pair[0].toLowerCase();	
			switch(urlkey){		
				case "q":
					this.q = pair[1];
					break;			
			}
		}
 }
}

var pageUrl = new UrlObj(); // create pageUrl instance
var referUrl = new ReferUrlObj(); // create refer url instance