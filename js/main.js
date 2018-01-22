var audio;

$('#pause').hide();

function initAudio(element) {
	var song   = element.attr('song');
	var title  = element.text();
	var cover  = element.attr('cover');
	var artist = element.attr('artist');
	
	audio = new Audio('media/' + song);

	if (!audio.currentTime) {
		$('#duration').html('0:00');
	}

	$('#audio-player .title').text(title);
	$('#audio-player .artist').text(artist);
	$('img.cover').attr('src', 'images/covers/' + cover);
	$('#playlist li').removeClass('active');
	$(element).addClass('active');
}

function showDuration() {
	$(audio).on('timeupdate', function() {
		var s = parseInt(audio.currentTime % 60);
		var m = parseInt((audio.currentTime / 60) % 60);
		if (s < 10) {
			s = '0' + s;
		}
		$('#duration').html(m + ':' + s);
		var value = 0;
		if (audio.currentTime > 0) {
			value = Math.floor((100 / audio.duration) * audio.currentTime);
		}
		$('#progress').css('width', value + '%');
	});
}

initAudio($('li').first());

$('#play').click(function() {
	audio.play();
	$(this).hide();
	$('#pause').show();
	$('#duration').fadeIn(400);
	showDuration();
});

$('#pause').click(function() {
	audio.pause();
	$(this).hide();
	$('#play').show();
});

$('#stop').click(function() {
	audio.pause();
	audio.currentTime = 0;
	$('#pause').hide();
	$('#play').show();
	$('#duration').fadeOut(400);
});

$('#next').click(function() {
	audio.pause();
	var next = $('#playlist li.active').next();
	if (next.length === 0) {
		next = $('#playlist li').first();
	}
	if($('#play').is(':visible')) {
        $('#play').hide();
        $('#pause').show();
	}
	$('#duration').fadeIn(400);
	initAudio(next);
	audio.play();
	showDuration();
});

$('#prev').click(function() {
	audio.pause();
	var prev = $('#playlist li.active').prev();
	if (prev.length === 0) {
		prev = $('#playlist li').last();
	}
	if($('#play').is(':visible')) {
        $('#play').hide();
        $('#pause').show();
	}
	$('#duration').fadeIn(400);
	initAudio(prev);
	audio.play();
	showDuration();
});

$('#volume').change(function() {
	audio.volume = parseFloat(this.value / 10);
});

$(audio).on("ended", function() {
    audio.pause();
    var next = $('#playlist li.active').next();
    if (next.length === 0) {
        next = $('#playlist li:first-child');
    }
    initAudio(next);
 	audio.play();
 	showDuration();
});

$("#progress-bar").mouseup(function(e){
    var leftOffset    = e.pageX - $(this).offset().left - 10;
    var songPercents  = leftOffset / $('#progress-bar').width();
 	audio.currentTime = songPercents * audio.duration;
});

$('#playlist li').click(function() {
	audio.pause();
	if($('#play').is(':visible')) {
        $('#play').hide();
        $('#pause').show();
	}
	$('#duration').fadeIn(400);
	initAudio($(this));
	audio.play();
	showDuration();
});