var $ = jQuery.noConflict();
var user_browser = "";
var browser_detected ="";
var browser_version = "";
var navigator_user = "";
var browser_sha2_compatibility = "";
var it_responsible = "";
var visited = "yes";
var pc = "";

$(document).ready(function(){
	$('#test-it').on('click', function(){
		testbrowser();
	});

	$('#test-it2').on('click', function(){
		testbrowser();
	});

	$('#dismiss').on('click', function(){
		$('#response-overlay').removeClass('show');
		location.reload();
	});
	
});
function newPopup(url) {
	popupWindow = window.open(
		url,'popUpWindow','height=500,width=500,left=50,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes')
}

function testbrowser() {
	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var browser = get_browser_info();
	var browserName  = browser.name;
	var majorVersion = browser.version;
	var fullVersion  = ''+parseFloat(navigator.appVersion); 
	var nameOffset,verOffset,ix;
	var sha2_checked = false;
	
	if (browserName == 'Chrome') {
		if (majorVersion < 26) {
			$("#sha2-content").html('<img src="/site-includes/test/norton/images/denied.png">');
		} else {
			$("#sha2-content").html('<img src="/site-includes/test/norton/images/done.png">');
			sha2_checked = true;
		}
	}

	if (browserName == 'Firefox') {
		if (majorVersion < 1.5) {
			$("#sha2-content").html('<img src="/site-includes/test/norton/images/denied.png">');
		} else {
			$("#sha2-content").html('<img src="/site-includes/test/norton/images/done.png">');
			sha2_checked = true;
		}
	}

	if (browserName == 'Mozilla') {
		if (majorVersion < 1.4) {
			$("#sha2-content").html('<img src="/site-includes/test/norton/images/denied.png">');
		} else {
			$("#sha2-content").html('<img src="/site-includes/test/norton/images/done.png">');
			sha2_checked = true;
		}
	}

	if (browserName == 'Opera') {
		if (majorVersion < 9) {
			$("#sha2-content").html('<img src="/site-includes/test/norton/images/denied.png">');
		} else {
			$("#sha2-content").html('<img src="/site-includes/test/norton/images/done.png">');
			sha2_checked = true;
		}
	}

	if (browserName == 'Safari') {
		if (majorVersion < 3) {
			$("#sha2-content").html('<img src="/site-includes/test/norton/images/denied.png">');
		} else {
			$("#sha2-content").html('<img src="/site-includes/test/norton/images/done.png">');
			sha2_checked = true;
		}
	}

	if (browserName == 'Netscape') {
		if (majorVersion < 7.1) {
			$("#sha2-content").html('<img src="/site-includes/test/norton/images/denied.png">');
		} else {
			$("#sha2-content").html('<img src="/site-includes/test/norton/images/done.png">');
			sha2_checked = true;
		}
	}

	if (browserName == 'MSIE') {
		if (majorVersion < 7) {
			$("#sha2-content").html('<img src="/site-includes/test/norton/images/denied.png">');
		} else {
			$("#sha2-content").html('<img src="/site-includes/test/norton/images/done.png">');
			sha2_checked = true;
		}
	}

	if (browserName == 'Konqueror') {
		if (fullVersion < 3.56) {
			$("#sha2-content").html('<img src="/site-includes/test/norton/images/denied.png">');
		} else {
			$("#sha2-content").html('<img src="/site-includes/test/norton/images/done.png">');
			sha2_checked = true;
		}
	}
	
	$('#pop-overlay-content').addClass('show');
	$('#pop-overlay-content').load('/site-includes/test/norton/window.html',
		function(){
			pc = navigator.platform;
			browser_detected = browserName;
			user_browser = browserName;
			browser_version = fullVersion;
			navigator_user = navigator.userAgent;
			if (sha2_checked == true) {
				browser_sha2_compatibility = "true";
			} else {
				browser_sha2_compatibility = "false";
			}
			$('#yes').on('click', function(){
				$('#pop-overlay-content').removeClass('show');
				$("#details-content").load('/site-includes/test/norton/select_yes.html',
					function(){
						$("#sha2-content").html('<img src="/site-includes/test/norton/images/done.png">');
					}
				);
			}
		);

		$('#no').on('click', function(){
			$('#pop-overlay-content').removeClass('show');
			$("#details-content").load('/site-includes/test/norton/select_no.html',
				function(){
					$("#sha2-content").html('<img src="/site-includes/test/norton/images/denied.png">');

					$('#no2').on('click', function(){
						it_responsible = "no";
						$('#proceed-content').addClass('show');
						$("#proceed-content").load('/site-includes/test/norton/proceed.html',
							function(){
								$(document).mouseup(function (e) {
								    if (!$("#pop-proceed").is(e.target) && $("#pop-proceed").has(e.target).length === 0) {
								        $('#proceed-content').removeClass('show');
								        $('#proceed-content').html('');
								    }
								    $('#next').on('click', function(){
										$('#proceed-content').removeClass('show');
										$('#proceed-content').html('');
										$("#details-content").load('/site-includes/test/norton/helping_page.html',
											function(){
												$('#yes3').on('click', function(){
													$("#details-content").load('/site-includes/test/norton/helpful.html',
														function(){}
													);
												});

												$('#no3').on('click', function(){
													$("#details-content").load('/site-includes/test/norton/not-helpful.html',
														function(){}
													);
												});
												
											}
										);
									});
								});
							}
						);
					});

					$('#yes2').on('click', function(){
						it_responsible = "yes";
						$('#proceed-content').removeClass('show');
						$('#proceed-content').html('');
						$("#details-content").load('/site-includes/test/norton/helping_page.html',
							function(){
								$('#yes3').on('click', function(){
									$("#details-content").load('/site-includes/test/norton/helpful.html',
										function(){}
									);
								});

								$('#no3').on('click', function(){
									$("#details-content").load('/site-includes/test/norton/not-helpful.html',
										function(){}
									);
								});
							}
						);
					});
				}
			);
		});
	});

}

	function submit_form_ajax() {

		$('.form-group').removeClass('has-error'); // remove the error class
		$('.form-group').removeClass('has-message');
		$('.help-block').remove(); // remove the error text
		$('#response').html('');

		// get the form data
		// there are many ways to get this data using jQuery (you can use the class or id also)
		var formData ="first_name="+ $('#first_name').val() + "&last_name=" + $('#last_name').val() + "&email=" + $('#email').val() + "&company=" + $('#company').val() + "&job_title=" + $('#job_title').val() + "&employees=" +  $('#employees').val() + "&user_browser=" + user_browser + "&browser_detected=" + browser_detected + "&browser_version=" + browser_version + "&navigator_user=" + navigator_user + "&browser_sha2_compatibility=" + browser_sha2_compatibility + "&it_responsible=" + it_responsible + "&visited=" + visited + "&pc=" + pc;
		

		// process the form
		$.ajax({
			type 		: 'GET', // define the type of HTTP verb we want to use (POST for our form)
			url 		: 'http://194.60.188.105:8080/helphub/admin/process.php?'+formData, // the url where we want to POST
			//data 		: formData, // our data object
			dataType 	: 'jsonp', // what type of data do we expect back from the server
			jsonp		: 'mycallback',
			async		: 'false',
			success		: function(response){
				// log data to the console so we can see
				//console.log(data); 

				// here we will handle errors and validation messages
				if ( !response.success) {
					
					// handle errors for name ---------------
					if (response.errors.first_name) {
						$('#firstname-group').addClass('has-error'); // add the error class to show red input
						$('#firstname-group').append('<div class="help-block">' + response.errors.first_name + '</div>'); // add the actual error message under our input
						$('#response').append('<div class="alert alert-success">' + response.errors.name_popup + '</div>');
						$('#response-overlay').addClass('show');
					}
					
					if (response.errors.last_name) {
						$('#lastname-group').addClass('has-error'); // add the error class to show red input
						$('#lastname-group').append('<div class="help-block">' + response.errors.last_name + '</div>'); // add the actual error message under our input
						$('#response').append('<div class="alert alert-success">' + response.errors.name_popup + '</div>');
						$('#response-overlay').addClass('show');
					}

					// handle errors for email ---------------
					if (response.errors.email) {
						$('#email-group').addClass('has-error'); // add the error class to show red input
						$('#email-group').append('<div class="help-block">' + response.errors.email + '</div>'); // add the actual error message under our input
						$('#response').append('<div class="alert alert-success">' + response.errors.email_popup + '</div>');
						$('#response-overlay').addClass('show');
					}

					$('#response').append('<div class="help-block">Errors!</div>');
					$('#response-overlay').addClass('show');
				
				} else {
					// ALL GOOD! just show the success message!
					$('#response').html('<div class="alert alert-success">' + response.success_message.done + '</div>');
					$('#sha2-validator .form-control').val('');
					$('#response-overlay').addClass('show');
					$("#response-content").prepend('<img style="width:50px" src="/site-includes/test/norton/images/tick.png">');
					// usually after form submission, you'll want to redirect
					// window.location = '/thank-you'; // redirect a user to another page

				}
			},
			error : function(){}
		});

		// stop the form from submitting the normal way and refreshing the page
		event.preventDefault();
}

function get_browser_info(){
    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
        return {name:'MSIE',version:(tem[1]||'')};
        }   
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR\/(\d+)/)
        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
        }   
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
      name: M[0],
      version: M[1]
    };
 }