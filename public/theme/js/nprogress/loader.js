var loadRequests = 0;
var timer;
document.addEventListener('loadingStart', function() {
	if(!(loadRequests++)) {
		NProgress.start();
		timer = setInterval(function() {
			NProgress.inc(0.05);
		}, 1000);
	}
});
document.addEventListener('loadingComplete', function() {
	loadRequests--;
	if (!loadRequests) {
		NProgress.done();
		clearInterval(timer);
	}
});
