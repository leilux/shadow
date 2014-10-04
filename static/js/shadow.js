jQuery.extend(jQuery.easing, {
	easeOutQuint: function(x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
        return c*(t/=d)*t*t + b;
    },
	easeOutCubic: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    },
})

/*
 * get window information
 */
function getWindowInfo() {
	// browes informatino
	var window_w = $(window).width(); //window.innerWidth;
	var window_h = $(window).height(); //window.innerHeight;
	return Scale(window_w, window_h);
}
/*
 * create scale
 */
function Scale(x, y) {
	var size = Object();
	if (typeof x != 'number' || typeof y != 'number') {
		x = parseFloat(x);
		y = parseFloat(y);
	}
	if (isNaN(x) || isNaN(y)) 
		throw('error : Scale(x,y); x y must a number or number of string');
	size.x = parseInt(x); 
	size.y = parseInt(y);
	return size;
}
/*************************************************************************\
 *                       FOR	THE		POISSON                          *
\*************************************************************************/ 
/* 
 * create poisson
 */
function createPoisson() {
	var poisson = $('<img>', {
		id:'poisson', 
		class:'poisson',
		src: "static/img/poisson.png",
	}).css({
		top: '1px',
		left: '1px'
	}); 
	
	// add eventlistener
	poisson
	//.on('mousedown', function(){ 
	//	if(event.shiftKey || true) {
	//		drag($(this)[0], event);
	//	}
	//})
	//.on('mouseout',  function(){ 
	//	var $e = $(this);
	//	var wSize = getWindowInfo();
	//	var start = Scale($e[0].style.left, $e[0].style.top);
	//	//var elementSize = Scale(element.width, element.height);

	//	var end = Scale(100, 0);
	//	// set end left position
	//	var state_x_num = parseInt((start.x + $e.width() / 2) / (wSize.x / 3));
	//	switch (state_x_num) {
	//		case 0 /*L*/: end.x = 1; break; 
	//		case 1 /*M*/: end.x = wSize.x / 2 - $e.width(); break; 
	//		case 2 /*R*/: end.x = wSize.x - $e.width(); 
	//			// - the scroll bar.width
	//			if(document.body.scrollHeight > window.innerHeight) end.x -= 17;
	//			break;
	//		default : end.x = wSize.x - $e.width();
	//	}
	//	
	//	// set end top position
	//	var state_y_num = parseInt((start.y + $e.height() / 2) / (wSize.y / 3));
	//	switch (state_y_num) {
	//		case 0 /*H*/: end.y = 0; break;
	//		case 1 /*M*/: end.y = wSize.y / 2 - $e.height(); break;
	//		case 2 /*B*/: end.y = wSize.y - $e.height(); 
	//			if(document.body.scrollWidth > window.innerWidth) end.y -= 17;
	//			break;
	//		default : end.y = wSize.y - $e.height();
	//	}
	//	// ensure not in the center of screen
	//	if (state_x_num==1 && state_y_num==1) {end.y = wSize.y - $e.height();}
	//	// go to the position with animate
	//	//setTimeout(function(){$e.css('opacity',0.7);}, 1000);
	//	$e.animate({
	//		left: end.x,
	//		top: end.y,
	//	}, 
	//	Math.sqrt(Math.pow(start.x-end.x, 2)+Math.pow(start.y-end.y, 2)), 
	//	function() {
	//	  	$e.css('opacity',0.7);
	//	});
	//})
	.on('mouseover', function(){ 
		//$(this).css('opacity', 0.9);/*poisson.style.opacity = 0.9;*/
	})
	.on('click',  clickpoisson);

	poisson.draggable({
		start: function(event, ui) {
			console.info('drag start');
			$(event.target).off('click', clickpoisson);
		},
		stop: function(event, ui) {
			console.info('drag stop');
			var $e = $(event.target);
			ui.helper.css('position', 'fixed');
			checkposition($e);
			setTimeout(function(){$e.on('click', clickpoisson);}, 200);
		},
	});
	poisson.css('position', 'fixed');
	return poisson;
}

/*
 * check position
 */
function checkposition($e){ 
		var wSize = getWindowInfo();
		var start = Scale($e[0].style.left, $e[0].style.top);
		//var elementSize = Scale(element.width, element.height);

		var end = Scale(100, 0);
		// set end left position
		var state_x_num = parseInt((start.x + $e.width() / 2) / (wSize.x / 3));
		switch (state_x_num) {
			case 0 /*L*/: end.x = 1; break; 
			case 1 /*M*/: end.x = (wSize.x - $e.width()) / 2; break; 
			case 2 /*R*/: end.x = wSize.x - $e.width(); 
				// - the scroll bar.width
				if(document.body.scrollHeight > window.innerHeight) end.x -= 17;
				break;
			default : end.x = wSize.x - $e.width();
		}
		
		// set end top position
		var state_y_num = parseInt((start.y + $e.height() / 2) / (wSize.y / 3));
		switch (state_y_num) {
			case 0 /*H*/: end.y = 0; break;
			case 1 /*M*/: end.y = wSize.y / 2 - $e.height(); break;
			case 2 /*B*/: end.y = wSize.y - $e.height(); 
				if(document.body.scrollWidth > window.innerWidth) end.y -= 17;
				break;
			default : end.y = wSize.y - $e.height();
		}
		// ensure not in the center of screen
		if (state_x_num==1 && state_y_num==1) {end.y = wSize.y - $e.height();}
		// go to the position with animate
		//setTimeout(function(){$e.css('opacity',0.7);}, 1000);
		$e.animate({
			left: end.x,
			top: end.y,
		}, 
		Math.sqrt(Math.pow(start.x-end.x, 2)+Math.pow(start.y-end.y, 2)), 
		function() {
		  	//$e.css('opacity',0.7);
		});
	}
function clickpoisson() { 
	var poisson = $('#poisson');
	var winSize = getWindowInfo();
	var scale = 0.2;
	// 1 init maingridpad.
	var mainpad = createGridPad_3x3('main');
	var start = Scale(poisson.offset().left, poisson.offset().top);
	var width = 270;
	var height = 270;
	mainpad.css({
		width: width*scale,
		height: height*scale,
		left: start.x,
		top: start.y,
	});
	// 2 display poisson none.
	$('#poisson').css('display', 'none'); //visibleElement('poisson', 'none');
	// 3 add maingridpad to webpage.
	$('body').append(mainpad);

	var end = Scale((winSize.x-width)/2, (winSize.y-height)/2);
	// 4 move mainpad to end and play animate.
	mainpad.animate({
		width: width,
		height: height,
		left: end.x,
		top: end.y,
	}, 
	Math.min(Math.sqrt(Math.pow(start.x-width/2-end.x, 2)+Math.pow(start.y-height/2-end.y, 2)), 400), 
	'easeOutCubic',
	function() {
		mainpad.css({left:end.x, top:end.y}); //moveElement(maingrid, end.x, end.y);
	});
}
/*************************************************************************\
 *                       FOR	THE		GRID    PAD                      *
\*************************************************************************/
/*
 * interface
 * @ {'aa':'','ab':'','ac':'','ba':'','bb':'','bc':'','ca':'','cb':'','cc':''};
 */
var PadLayout = {
	main :{
		'aa':' ',       'ab':'gesture','ac':' ',
		'ba':'favorite','bb':'back',   'bc':'device',
		'ca':' ',       'cb':'home',   'cc':' '
	},
	gesture :{
		'aa':'', 'ab':'zoom-in',	  'ac':'move', 
		'ba':'left', 'bb':'back2parent', 'bc':'right',
		'ca':'', 'cb':'zoom-out', 'cc':''
	},
	device : {
		'aa':'add','ab':'filelist','ac':'move',
		'ba':'','bb':'back2parent','bc':'',
		'ca':'backward','cb':'play','cc':'forward'
	},
};
/*
 * create grid pad 3x3
 */
function createGridPad_3x3(id) {
	var dict = PadLayout[id];
	var gridpad3x3 = $('<div>', {
		id:id+'pad', 
		class:'grid3x3',
		zoom: 1
	}); 
	for(i in dict) {
		gridpad3x3.append(creategrid(i[0], i[1], dict[i]));
	}
	/* change the opacity */
	//gridpad3x3.on('mouseover', function() {gridpad3x3.css('opacity', 0.9);});
	//gridpad3x3.on('mouseout',  function() {gridpad3x3.css('opacity', 0.4);});

	return gridpad3x3;
}
/*
 * create child grid pad
 */
function createChildGridPad_3x3(id, $parent) {
	var gridPad = createGridPad_3x3(id).css({
		left: $parent.offset().left,
		top: $parent.offset().top,
	});
	$parent.css('display', 'none');
	$('body').append(gridPad);
	gridPad.attr('parentid', $parent.attr('id'));
}
/*
 * create grid
 */
function creategrid(x, y, action) {
	var className = 'grid'+' '+x+y+' '+action;
	var grid = $('<div>', {id:action, class:className}); //createElementByTIC('div', action, className);
	grid.on('click', function() {
		grid_action[action](grid);
		//switch (action) {
		//	case 'right': grid_right(grid); break;
		//	case 'left': grid_left(grid);  break;
		//	case 'zoom-in': grid_zoom_in(grid); break;
		//	case 'zoom-out': grid_zoom_out(grid); break;
		//	case 'play' : grid_play(grid); break;
		//	case 'pause' : grid_play(grid); break;
		//	case 'forward' : grid_forward(grid); break;
		//	case 'backward' : grid_backward(grid); break;
		//	case 'add' : grid_media_add(grid); break;
		//	case 'filelist' : grid_filelist(grid); break;
		//	default : alert(action + ' not supporst.');
		//}
	});
	grid.on('mouseover', function() {grid.css('backgroundColor', '#555555');});
	grid.on('mouseout',  function() {grid.css('backgroundColor', '#000');});
	return grid;
}
/*************************************************************************\
 *                       ACTION	  OF   GRID                              *
\*************************************************************************/
var grid_action = {
	/* create pad */
	device: function(grid) {
		createChildGridPad_3x3('device', grid.parent());
	},
	gesture: function(grid) {
		createChildGridPad_3x3('gesture', grid.parent());
	},
	/* action */
	back: function(grid) {
		var elem = grid.parent();
		var poisson = $('#poisson');
		var start = Scale(elem[0].style.left, elem[0].style.top);
		var end = Scale(poisson[0].style.left, poisson[0].style.top);

		// zoom out animation
		elem.animate({
			width: poisson.width(),
			height: poisson.height(),
			left: end.x,
			top: end.y,
		},
		Math.min(Math.sqrt(Math.pow(start.x+elem.width()/2-end.x, 2)+Math.pow(start.y+elem.height()/2-end.y, 2)), 300), 
		function() {
			elem.remove()
			if($('#poisson')) $('#poisson').css('display', 'block'); //visibleElement('poisson', 'block');
			else $('body').append(createPoisson()); //addPoisson();
		});
	},
	move: function(grid) {
		grid.on('mousedown', function(){drag(grid.parent()[0], event);});
	},
	back2parent: function(grid) {
		var pad = grid.parent();
		pad.remove()
		$('#'+pad.attr('parentid')).css('display', 'block');
	},
}

/* get media */
function getMedia() {
	if(!(media = document.querySelector('audio'))) 
		media=document.querySelector('video');
	return media;
}

/* play */
function grid_play(grid) {
	var media = getMedia();
	if (media.paused == true) {
		media.play();
		grid.className = grid.className.replace('play', 'pause');
	}
	else {
		media.pause();
		grid.className = grid.className.replace('pause', 'play');
	}
}

/* forward */
function grid_forward(grid) {
	var media = getMedia();
	media.currentTime += 3;
}

/* backward */
function grid_backward(grid) {
	var media = getMedia();
	media.currentTime -= 3;
}

/* create add media div */
function createAddMedia() {
	var div = $('<div>', {id:'addmedia', class:'addmedia'}); //createElementByTIC('div', 'addmedia', 'addmedia');
	div.style.width  = 260;
	div.style.height = 150; 
	var br = document.createElement('br');

	var label = document.createElement('label');
	label.textContent = 'path ';

	var input = $('<input>', {id:'media_path'}); //createElementByTIC('input', 'media_path', '');
	input.type = 'text';

	var cancel = $('<input>', {id:'cancel',class:'addmedia_cancel'}); //createElementByTIC('input', 'cancel', 'addmedia_cancel');
	cancel.type = 'button'; cancel.value = 'cancel';
	cancel.onclick = addmedia_cancel;

	var ok = $('<input>', {id:'ok', class:'addmedia_ok'}); //createElementByTIC('input', 'ok', 'addmedia_ok');
	ok.type = 'button'; ok.value = 'ok';
	ok.onclick = addmedia_ok;

	var list = [br, label, input, cancel, ok];
	for(i in list) {div.appendChild(list[i]);}
	return div;
}
/* addmedia_cancel */
function addmedia_cancel() {
	// animate
	var addmediaDlg = this.parentNode;
	var windowInfo = getWindowInfo();
	var addmediaWH = Scale(addmediaDlg.style.width, addmediaDlg.style.height);
	var x = (windowInfo.x - addmediaWH.x) / 2;
	var y = 0;
	var delta = 3;
	function animate(n) {
		if(n == 0) { /* aniamte over */
			document.body.removeChild($('#cancel').parentNode);
		}
		else {		 // animate loop
			y -= delta;
			$('#'+addmediaDlg).css({left:x, top:y}); //moveElement(addmediaDlg, x, y);
			setTimeout(function(){animate(n-1);}, 5);
		}
	}
	animate(parseInt(addmediaWH.y/delta));
}
/* addmedia_ok */
function addmedia_ok() {
	var src = $('#media_path').value;
	var player = createMPlayer('mplayer', src);
	document.body.removeChild($('#ok').parentNode);
	document.body.appendChild(player);
}
/* create Media Player */
function createMPlayer(id, src) {
	var format = src.split('.').pop();
	var main = $('<div>', {id:id, class:'mplayer'}); //createElementByTIC('div', id, 'mplayer');
	var source = $('<source>', {id:'mediasrc'}); //createElementByTIC('source', 'mediasrc', '');
	source.src = src;

	if (format == 'mp3' || format == 'm4a') {
		var media = document.createElement('audio');
		source.type = 'audio/mpeg';
	}
	else if (format == 'mp4') {
		var media = document.createElement('video');
		source.type = 'video/mp4';
	}
	else {alert (format + ' not supporst')}

	media.appendChild(source);
	media.id = 'media';
	media.controls = true;
	//media.autobuffer = true;
	main.appendChild(media);
	return main;
}
/* add media */
function grid_media_add(grid) {
	var addmediaDlg = createAddMedia();
	document.body.appendChild(addmediaDlg);
	var windowInfo = getWindowInfo();
	var addmediaWH = Scale(addmediaDlg.style.width, addmediaDlg.style.height);
	var x = (windowInfo.x - addmediaWH.x) / 2;
	var y = - addmediaWH.y;
	var delta = 3;
	// animate
	function animate(n) {
		if(n == 0) { /*aniamte over */ 
			$('#media_path').autocomplete = 'off';
		}
		else {		 // animate loop
			y += delta;
			$('#'+addmediaDlg).css({left:x, top:y}); //moveElement(addmediaDlg, x, y);
			setTimeout(function(){animate(n-1);}, 5);
		}
	}
	animate(parseInt(addmediaWH.y/delta));
}
/* create file list */
function createFileList(pl_name) {
	var filelistdiv = $('<div>', {id:pl_name+'_div', class:'filelistdiv'}); //createElementByTIC('div', pl_name+'_div', 'filelistdiv');
	filelistdiv.style.height = 0;
	var filelistitle = $('<div>', {id:pl_name+'_title', class:'filelistitle'}); //createElementByTIC('div', pl_name+'_title', 'filelistitle');
	filelistitle.style.height = 20;
//	var close = createElementByTIC('div', 'filelist_close', 'icon_close');
	var filelistcontent = $('<div>', {id:pl_name, class:'filelistcontent'}); //createElementByTIC('div', pl_name, 'filelistcontent');
	filelistdiv.appendChild(filelistitle);
//	filelistdiv.appendChild(close);
	filelistdiv.appendChild(filelistcontent);
	return filelistdiv;
}
meidaformatdict = {'mp3':'audio', 'm4a':'audio', 'mp4':'video'};
/* create filelemt cell */
function createfilelemtcell(color, path, filename, discript) {
	var filelemtcell = $('<div>', {class:'filelemtcell'+color}); //createElementByTIC('div', '', 'filelemtcell'+' '+color);
	filelemtcell.style.height = 25;
	var fileinfo = $('<div>', {class:'fileinfo'}); //createElementByTIC('div', '', 'fileinfo');
	fileinfo.textContent = filename + ': ' + discript;
	var icon_play = $('<div>', {class:'icon_play'}); //createElementByTIC('div', '', 'icon_play');
	icon_play.value = filename;
	var format = filename.split('.').pop();
	icon_play.onclick = function(){
		if(document.querySelector(meidaformatdict[format]))
			document.body.removeChild(document.querySelector(meidaformatdict[format]).parentNode);
		document.body.appendChild(createMPlayer('mplayer', path+'/'+this.value));
	};
	filelemtcell.appendChild(fileinfo);
	filelemtcell.appendChild(icon_play);
	return filelemtcell;
}
/* filelist */
function grid_filelist(grid) {
	var pl_name = 'icsp';
	var filelistdiv = createFileList(pl_name);
	document.body.appendChild(filelistdiv);
	var filelistcontent = $('#'+pl_name);
	var filelistitle = $('#'+pl_name+'_title');
	filelistitle.textContent = pl_name.toUpperCase();
	var icsp = filelist.icsp;
	var path = icsp.path;
	var allfilename = icsp.listdir;
	var discript = icsp.discript;
	for (i in allfilename) {
		var filelemtcell = createfilelemtcell(['white','blue'][i%2], path, allfilename[i], discript[i]);
		filelistcontent.appendChild(filelemtcell);
	}
	var filelistdiv_width =  allfilename.length*parseInt(filelemtcell.style.height)
							   + parseInt(filelistitle.style.height)
							   + 10;
	filelistdiv.style.height = filelistdiv_width;
	filelistitle.onclick = function() {
		var x = 0;
		var delta = 10;
		function animate(n) {
			if(n == 0) { /*aniamte over */ 
				document.body.removeChild($('#'+pl_name+'_div'));
			}
			else {		 // animate loop
				x -= delta;
				$('#'+filelistdiv).css({left:x, top:10}); //moveElement(filelistdiv, x, 10);
				setTimeout(function(){animate(n-1);}, 3);
			}
		}
		animate(parseInt(filelistdiv_width/delta));
	}

	/* animate */
	var x = - filelistdiv_width;
	var delta = 10;
	function animate(n) {
		if(n == 0) { /*aniamte over */ 
			$('#'+filelistdiv).css({left:0, top:10}); //moveElement(filelistdiv, 0, 10);
		}
		else {		 // animate loop
			x += delta;
			$('#'+filelistdiv).css({left:x, top:10}); //moveElement(filelistdiv, x, 10);
			setTimeout(function(){animate(n-1);}, 3);
		}
	}
	animate(parseInt(filelistdiv_width/delta));
}
/* left */
function grid_left(grid) {
	current_img = current_img.previousSibling;
	while ((current_img != null) && (current_img.nodeName != 'IMG')) {
		current_img = current_img.previousSibling;
	}
	$('#showimg').src = current_img.src.replace('thumb_', '');
	$('#showimg').style.zoom = 1;
}
/* right */
function grid_right(grid) {
	current_img = current_img.nextSibling;
	while ((current_img != null) && (current_img.nodeName != 'IMG')) {
		current_img = current_img.nextSibling;
	}
	$('#showimg').src = current_img.src.replace('thumb_', '');
	$('#showimg').style.zoom = 1;
}
/* zoom-in */
function grid_zoom_in(grid) {
	var img = $('#showimg');
	img.style.zoom = parseFloat(img.style.zoom) + 0.1;
}
/* zoom-out */
function grid_zoom_out(grid) {
	var img = $('#showimg');
	img.style.zoom = parseFloat(img.style.zoom) - 0.1;
}

// for web usage.
//addPoisson();
$('body').append(createPoisson());


/**********************************************************************************\
 *                                        Tips                                    *
setTimeout with arguments 3 ways:
	setTimeout('aa(' + x + ',' + y + ')', 1000);  // number arguments
	setTimeout('aa(\"'+ x+'\",\"'+y+ '\")',1000); // str arguments
	setTimeout(function() {aa(x,y);},1000);       // any
\**********************************************************************************/
