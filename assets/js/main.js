/**
 * MarveThabi Consulting Engineers, main.js v1.0.0
 * Scroll reveals, animated counters, capabilities rotator, mobile nav, header shadow.
 */
(function () {
	'use strict';

	var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	/* Header shadow on scroll */
	var nav = document.getElementById('site-nav');
	if (nav) {
		var onScroll = function () {
			nav.classList.toggle('nav-scrolled', window.scrollY > 40);
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
	}

	/* Mobile menu */
	var burger = document.getElementById('burger');
	var links = document.getElementById('nav-links');
	if (burger && links) {
		burger.addEventListener('click', function () {
			var open = links.classList.toggle('open');
			burger.setAttribute('aria-expanded', open ? 'true' : 'false');
		});
		links.addEventListener('click', function (e) {
			if (e.target.tagName === 'A') {
				links.classList.remove('open');
				burger.setAttribute('aria-expanded', 'false');
			}
		});
	}

	/* Scroll reveals */
	var reveals = document.querySelectorAll('.reveal');
	if (reveals.length && 'IntersectionObserver' in window && !reduced) {
		var ro = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('on');
					ro.unobserve(entry.target);
				}
			});
		}, { threshold: 0.15 });
		reveals.forEach(function (el) { ro.observe(el); });
	} else {
		reveals.forEach(function (el) { el.classList.add('on'); });
	}

	/* Animated counters */
	var counters = document.querySelectorAll('.stat-v[data-count]');
	var runCounter = function (el) {
		var end = parseInt(el.getAttribute('data-count'), 10);
		var suffix = el.getAttribute('data-suffix') || '';
		if (reduced) {
			el.textContent = end + suffix;
			return;
		}
		var dur = 1800;
		var t0 = performance.now();
		var tick = function (t) {
			var p = Math.min((t - t0) / dur, 1);
			el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
			if (p < 1) { requestAnimationFrame(tick); }
		};
		requestAnimationFrame(tick);
	};
	if (counters.length && 'IntersectionObserver' in window) {
		var co = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					runCounter(entry.target);
					co.unobserve(entry.target);
				}
			});
		}, { threshold: 0.4 });
		counters.forEach(function (el) { co.observe(el); });
	} else {
		counters.forEach(runCounter);
	}

	/* Capabilities rotator */
	var tabs = document.querySelectorAll('.caps-tab');
	var bodies = document.querySelectorAll('.caps-body');
	var imgs = document.querySelectorAll('.caps-img');
	var fig = document.getElementById('caps-fig');
	var current = 0;
	var timer = null;

	var setCap = function (i) {
		current = i;
		tabs.forEach(function (t) {
			var on = parseInt(t.getAttribute('data-cap'), 10) === i;
			t.classList.toggle('active', on);
			t.setAttribute('aria-selected', on ? 'true' : 'false');
		});
		bodies.forEach(function (b) {
			b.classList.toggle('active', parseInt(b.getAttribute('data-cap'), 10) === i);
		});
		imgs.forEach(function (im) {
			im.classList.toggle('active', parseInt(im.getAttribute('data-cap'), 10) === i);
		});
		if (fig) {
			var n = String(i + 1).padStart(2, '0');
			fig.textContent = 'FIG ' + n + ' \u00B7 MT-CAP-0' + n;
		}
	};

	var startTimer = function () {
		if (reduced || !tabs.length) { return; }
		timer = setInterval(function () {
			setCap((current + 1) % tabs.length);
		}, 6000);
	};

	if (tabs.length) {
		tabs.forEach(function (t) {
			t.addEventListener('click', function () {
				clearInterval(timer);
				setCap(parseInt(t.getAttribute('data-cap'), 10));
				startTimer();
			});
		});
		startTimer();
	}

	/* Services directory scroll-spy */
	var spyLinks = document.querySelectorAll('[data-spy]');
	if (spyLinks.length && 'IntersectionObserver' in window) {
		var spyMap = {};
		var targets = [];
		spyLinks.forEach(function (a) {
			var id = a.getAttribute('data-spy');
			var el = document.getElementById(id);
			if (el) { spyMap[id] = a; targets.push(el); }
		});
		var setActive = function (id) {
			spyLinks.forEach(function (a) { a.classList.remove('active'); });
			if (spyMap[id]) { spyMap[id].classList.add('active'); }
		};
		var so = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) { setActive(entry.target.id); }
			});
		}, { rootMargin: '-30% 0px -55% 0px' });
		targets.forEach(function (el) { so.observe(el); });
	}

	/* Self-drafting CAD plotter (services hero) */
	var plotter = document.getElementById('plotter');
	if (plotter && !reduced) {
		var svg = plotter.querySelector('.plotter-svg');
		var xhair = document.getElementById('xhair');
		var hudLayer = document.getElementById('hud-layer');
		var hudX = document.getElementById('hud-x');
		var hudY = document.getElementById('hud-y');
		var snap = document.getElementById('snap-pulse');
		var stamp = document.getElementById('plot-stamp');
		var layers = Array.prototype.slice.call(svg.querySelectorAll('g[data-layer]'));
		var queue = [];

		layers.forEach(function (g) {
			var stroke = g.getAttribute('data-stroke');
			var dash = g.getAttribute('data-dash');
			g.setAttribute('stroke', stroke);
			Array.prototype.slice.call(g.querySelectorAll('.plot')).forEach(function (path) {
				queue.push({ path: path, layer: g.getAttribute('data-layer'), dash: dash });
			});
		});

		var SPEED = 620; /* svg units per second */
		var idx = 0;

		var toScreen = function (pt) {
			var vb = svg.viewBox.baseVal;
			var rect = plotter.getBoundingClientRect();
			/* slice-fit mapping */
			var scale = Math.max(rect.width / vb.width, rect.height / vb.height);
			var ox = (rect.width - vb.width * scale) / 2;
			var oy = (rect.height - vb.height * scale) / 2;
			return { x: ox + pt.x * scale, y: oy + pt.y * scale };
		};

		var moveXhair = function (pt) {
			var pos = toScreen(pt);
			xhair.style.transform = 'translate(' + pos.x + 'px,' + pos.y + 'px)';
			hudX.textContent = (25.7479 + pt.y / 900000).toFixed(6) + ' S';
			hudY.textContent = (28.2293 + pt.x / 900000).toFixed(6) + ' E';
		};

		var fireSnap = function (pt) {
			if (!snap) { return; }
			var pos = toScreen(pt);
			snap.style.transform = 'translate(' + pos.x + 'px,' + pos.y + 'px)';
			snap.classList.remove('fire');
			void snap.offsetWidth;
			snap.classList.add('fire');
		};

		var drawNext = function () {
			if (idx >= queue.length) {
				/* plot complete: stamp it, hold, wipe, redraft */
				hudLayer.textContent = 'PLOT COMPLETE';
				if (stamp) { stamp.classList.remove('hide'); stamp.classList.add('show'); }
				setTimeout(function () {
					if (stamp) { stamp.classList.remove('show'); stamp.classList.add('hide'); }
					queue.forEach(function (q) { q.path.classList.remove('drawn'); });
					idx = 0;
					setTimeout(drawNext, 700);
				}, 4600);
				return;
			}
			var q = queue[idx++];
			var path = q.path;
			var len = path.getTotalLength();
			hudLayer.textContent = q.layer;
			path.classList.add('drawn');
			path.style.strokeDasharray = q.dash ? q.dash : len;
			if (!q.dash) { path.style.strokeDashoffset = len; }
			var dur = Math.max(len / SPEED * 1000, 260);
			var t0 = performance.now();
			var step = function (t) {
				var pr = Math.min((t - t0) / dur, 1);
				if (!q.dash) { path.style.strokeDashoffset = len * (1 - pr); }
				moveXhair(path.getPointAtLength(len * pr));
				if (pr < 1) {
					requestAnimationFrame(step);
				} else {
					if (q.dash) { path.style.strokeDasharray = q.dash; }
					fireSnap(path.getPointAtLength(len));
					setTimeout(drawNext, 140);
				}
			};
			requestAnimationFrame(step);
		};

		var started = false;
		var po = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting && !started) {
					started = true;
					plotter.classList.add('running');
					setTimeout(drawNext, 500);
					po.disconnect();
				}
			});
		}, { threshold: 0.2 });
		po.observe(plotter);
	}
})();