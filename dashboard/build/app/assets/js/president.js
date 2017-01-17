(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/opt/decision-2016/assets/javascripts/common/Map.js":[function(require,module,exports){
function Map(options) {
  if (!options.svg) throw new Error('Must set options.svg, an SVGElement');
  if (!options.races) throw new Error('Must set options.races, an Array');
  if (!options.legendEl) throw new Error('Must set options.legendEl, an HTMLElement');
  if (!options.idAttribute) throw new Error('Must set options.idAttribute, a String like data-race-id');

  this.svg = options.svg;
  this.races = options.races;
  this.legendEl = options.legendEl;
  this.races = options.races;
  this.highlightedRaceId = null;
  this.highlightPaths = []; // <path> elements we'll add to the document
  this.idAttribute = options.idAttribute;

  // Our President/Senate/House maps have two <path>s per race: a cartogram path
  // and a geo path. That's why this is an array.
  this.idToPaths = {};
  var paths = this.svg.querySelectorAll('path[' + options.idAttribute + ']');
  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    var raceId = path.getAttribute(options.idAttribute);
    if (!this.idToPaths.hasOwnProperty(raceId)) this.idToPaths[raceId] = [];
    this.idToPaths[raceId].push(path);
  }

  this.updatePathClasses();
  this.updateLegendClass();
}

Map.prototype.updatePathClasses = function() {
  for (var i = 0; i < this.races.length; i++) {
    var race = this.races[i];
    var paths = this.idToPaths[race.id];
    if (!paths) continue;
    for (var j = 0; j < paths.length; j++) {
      paths[j].setAttribute('class', race.className);
    }
  }
};

Map.prototype.updateLegendClass = function() {
  var classNames = { 'map-legend': null };
  for (var i = 0; i < this.races.length; i++) {
    classNames['has-' + this.races[i].className] = null;
  }

  this.legendEl.className = Object.keys(classNames).join(' ');
};

Map.prototype.update = function(races) {
  this.races = races;
  this.updatePathClasses();
  this.updateLegendClass();
};

/**
 * Calls callback(this, raceId, ev) and callback(null), for all of time, depending
 * on user actions.
 *
 * The caller should be able to handle spurious calls with the same raceId (or
 * spurious `null` calls).
 */
Map.prototype.addHoverListener = function(callback) {
  var _this = this;
  var idAttribute = this.idAttribute;
  this.svg.addEventListener('mouseover', function(ev) {
    if (ev.target.hasAttribute(idAttribute)) {
      callback(_this, ev.target.getAttribute(idAttribute), ev);
    }
  });
  this.svg.addEventListener('mouseout', function(ev) {
    callback(_this, null, ev);
  });
};

/**
 * Calls callback(this, raceId, inNewWindow), depending on user actions.
 *
 * Does not call the callback on tap.
 */
Map.prototype.addMouseClickListener = function(callback) {
  var _this = this;
  var idAttribute = this.idAttribute;

  // A tap causes click, too, but we want to treat tap as hover, not click.
  // Solution: assume touchend comes before mousedown, and prevent mousedown
  // events that happen right after touchend.
  // ref: https://patrickhlauke.github.io/touch/tests/results/
  var lastTouchendDate = null;
  document.addEventListener('touchend', function(ev) {
    lastTouchendDate = new Date();
  });

  this.svg.addEventListener('click', function(ev) {
    if (ev.button !== 0 && ev.button !== 1) return;
    if (new Date() - lastTouchendDate < 2000) return; // arbitrary number
    if (ev.target.hasAttribute(idAttribute)) {
      callback(_this, ev.target.getAttribute(idAttribute), ev.button === 1 || ev.ctrlKey);
    }
  });
};

/**
 * Returns the {top,left} of where the top+left of the tooltip should go, in
 * document coordinates.
 *
 * In other words: `{top: 0, left: 0}` is the first pixel on the page.
 */
Map.prototype.getDesiredTooltipPosition = function(raceId, el, ev) {
  var tooltipBox = el.getBoundingClientRect();

  var pathBox = null;
  var paths = this.idToPaths[raceId] || [];
  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (window.getComputedStyle(path.parentNode).opacity === '0') continue;
    pathBox = path.getBoundingClientRect();
  }

  if (!pathBox) return { top: 0, left: 0 }; // should never happen

  var top = window.pageYOffset + pathBox.top - tooltipBox.height - 15;
  var left = window.pageXOffset + pathBox.left + (pathBox.width / 2) - (tooltipBox.width / 2);

  var windowRight = document.documentElement.clientWidth;
  if (left < 0) left = 0;
  if (left + tooltipBox.width > windowRight) {
    left = windowRight - tooltipBox.width;
  }

  return { top: top, left: left };
};

function highlightPaths(paths) {
  var highlightPaths = this.highlightPaths = [];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    var cities = path.parentNode.querySelector('g.cities');
    var highlightPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    highlightPath.setAttribute('class', 'highlight');
    highlightPath.setAttribute('d', path.getAttribute('d'));
    path.parentNode.insertBefore(highlightPath, cities);
    highlightPaths.push(highlightPath);
  }
}

function unhighlightPaths(paths) {
  var i;

  for (i = 0; i < this.highlightPaths.length; i++) {
    var path = this.highlightPaths[i];
    path.parentNode.removeChild(path);
  }

  this.highlightPaths = [];
}

Map.prototype.highlightRace = function(raceIdOrNull) {
  if (!this.idToPaths.hasOwnProperty(raceIdOrNull)) raceIdOrNull = null;
  if (raceIdOrNull === this.highlightedRaceId) return;
  if (this.highlightedRaceId) unhighlightPaths(this.idToPaths[this.highlightedRaceId]);
  this.highlightedRaceId = raceIdOrNull;
  if (this.highlightedRaceId) highlightPaths(this.idToPaths[this.highlightedRaceId]);
};

function loadXml(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function() {
    if (xhr.status !== 200 && xhr.status !== 304) {
      return callback(new Error('Invalid XHR response code: ' + xhr.status));
    }
    return callback(null, xhr.responseXML);
  };
  xhr.send();
}

/**
 * Calls callback with an Error or an SVGSVGElement.
 *
 * SVG doesn't permit data- attributes, but our Map library needs them. The
 * workaround: put a "class" attribute in the SVG and then match it using
 * idRegex. When the server gives us the SVG, we'll search for all <path>
 * elements with a `class` that matches options.idRegex, and we'll change it
 * from `class` to `options.idAttribute`.
 */
Map.loadSvg = function(options, callback) {
  if (!options.url) throw new Error('Must set options.url, a String');
  if (!options.idAttribute) throw new Error('Must set options.idAttribute, a String like data-race-id');
  if (!options.idRegex) throw new Error('Must set options.idRegex, a RegExp that matches "class" attributes in the SVG');

  loadXml(options.url, function(err, xml) {
    if (err) return callback(err);

    var svg = xml.documentElement;
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');

    var paths = svg.querySelectorAll('path');
    for (var i = 0; i < paths.length; i++) {
      var path = paths[i];
      var maybeRaceId = path.getAttribute('class');
      if (options.idRegex.test(maybeRaceId)) {
        path.setAttribute(options.idAttribute, maybeRaceId);
        path.removeAttribute('class');
      }
    }

    return callback(null, svg);
  });
};

module.exports = Map;

},{}],"/opt/decision-2016/assets/javascripts/common/MapSwitcher.js":[function(require,module,exports){
var TransitDuration = 200; // ms

/**
 * Allows toggling between "geography" and "cartogram" classes, with animation
 * in between.
 *
 * The transition, e.g. from "geography" to "cartogram", goes like this:
 *
 * 1. Change options.el class from "geography" to "cartogram".
 * 2. Animate one frame in a <canvas> we've inserted into options.mapContainerEl.
 * 3. Remove "geography" class from options.mapContainerEl.
 * 4. Animate all the other frames in the <canvas>.
 * 5. Add "cartogram" class to options.mapContainerEl.
 *
 * (This ordering is important if you're considering adding "transition" in
 * CSS -- which looks really cool.)
 *
 * During animation, we ignore all attempts to toggle.
 */
function MapSwitcher(options) {
  if (!options.map) throw new Error('Must set options.map, a Map');
  if (!options.el) throw new Error('Must set options.el, an HTMLElement');
  if (!options.mapContainerEl) throw new Error('Must set options.mapContainerEl, an HTMLElement');

  this.el = options.el;
  this.mapContainerEl = options.mapContainerEl;
  var map = options.map;

  // Add a <canvas> to animate switches
  var canvas = document.createElement('canvas');
  canvas.className = 'animation';
  var viewBox = map.svg.getAttribute('viewBox').split(/\s+/);
  canvas.setAttribute('width', viewBox[2]);
  canvas.setAttribute('height', viewBox[3]);
  this.mapContainerEl.insertBefore(canvas, map.svg);
  this.ctx = canvas.getContext('2d');

  var transits = [];
  var raceIds = Object.keys(map.idToPaths);
  for (var i = 0; i < raceIds.length; i++) {
    var raceId = raceIds[i];
    var paths = map.idToPaths[raceId];
    if (paths.length !== 2) continue; // ME1, NE2, etc: we don't animate
    var geographyD = paths[0].getAttribute('d');
    var cartogramD = paths[1].getAttribute('d');
    var transit = new Transit(geographyD, cartogramD, paths[1]);
    transits.push(transit);
  }

  this.transits = transits;

  var _this = this;
  this.el.addEventListener('click', function(ev) {
    ev.preventDefault();
    if (_this.el.classList.contains('geography')) {
      _this.transition('geography', 'cartogram');
    } else {
      _this.transition('cartogram', 'geography');
    }
  });
}

function Point(x, y, len) {
  this.x = x;
  this.y = y;
  this.len = len; // Euclidian distance along loop
}

/**
 * Returns the "best" Loop -- that is, the longest one.
 */
function bestLoop(d) {
  var loop = null;

  var re = /(M[^M]+)/g;
  var m;
  while ((m = re.exec(d)) !== null) {
    var loop2 = Loop.fromPathD(m[1]);
    if (loop === null || (loop2.len > loop.len && loop2.points.length > 5)) {
      loop = loop2;
    }
  }

  return loop;
}

/**
 * Contains an Array of `points` that start and end at the same (x,y).
 */
function Loop(points) {
  this.points = points;
  this.len = points[points.length - 1].len;
}

Loop.fromPathD = function(d) {
  var len = 0;

  // IE<=11 regexes don't seem to greedy-match as much as they should. That's
  // why we're stuck with "pos" parsing.
  var pos = 0;
  var intRe = /[, ]*(-?\d+)[, ]*/g;
  function nextInt() {
    intRe.lastIndex = pos;
    var m = intRe.exec(d);
    pos += m[0].length;
    return parseInt(m[1], 10);
  }

  var x = null;
  var y = null;
  var m = null;
  var dx = null;
  var dy = null;
  var points = [];
  while (pos < d.length) {
    var op = d[pos];
    pos += 1;

    // Don't animate holes, multiple polygons, etc. It's not worth the effort.
    if (op === 'M' && x !== null) throw new Error('Called with more than a loop path description');
    switch (op) {
      case 'M':
        x = nextInt(); y = nextInt();
        points.push(new Point(x, y, len));
        break;
      case 'h':
        dx = nextInt();
        x += dx;
        len += Math.abs(dx);
        points.push(new Point(x, y, len));
        break;
      case 'v':
        dy = nextInt();
        y += dy;
        len += Math.abs(dy);
        points.push(new Point(x, y, len));
        break;
      case 'l':
        dx = nextInt(); dy = nextInt();
        x += dx;
        y += dy;
        len += Math.sqrt(dx * dx + dy * dy);
        points.push(new Point(x, y, len));
        break;
      case 'Z':
        dx = points[0].x - x;
        dy = points[0].y - y;
        x = points[0].x;
        y = points[0].y;
        len += Math.sqrt(dx * dx + dy * dy);
        points.push(new Point(x, y, len));
        break;
      default:
        throw new Error('Unexpected op "' + op + '" in <path> d="' + d + '"');
    }
    while (pos < d.length && d[pos] === ' ') pos++;
  }

  return new Loop(points);
}

Loop.prototype.rotateSoTopLeftPointIsFirst = function() {
  // 1. Find top-left bounding box
  var i, point;
  var left = this.points[0].x;
  var top = this.points[0].y;
  for (i = 1; i < this.points.length; i++) {
    point = this.points[i];
    if (point.x < left) left = point.x;
    if (point.y < top) top = point.y;
  }

  // 2. Find closest point: smallest Euclidean distance
  var bestD2 = null;
  var bestI = null;
  for (i = 0; i < this.points.length; i++) {
    point = this.points[i];
    var dx = point.x - left;
    var dy = point.y - top;
    var d2 = dx * dx + dy * dy;
    if (bestD2 === null || d2 < bestD2) {
      bestD2 = d2;
      bestI = i;
    }
  }

  // 3. Fashion new Loop starting at this point.
  // 3a. top-left point to end of original loop
  var startLen = this.points[bestI].len;
  var points = [];
  for (i = bestI; i < this.points.length; i++) {
    point = this.points[i];
    points.push(new Point(point.x, point.y, point.len - startLen));
  }
  // the last point is at the same (x,y) as this.points[0].
  // 3b. all the points, ending at the top-left point we started at
  var lenAt0 = this.len - startLen;
  for (i = 1; i <= bestI; i++) {
    point = this.points[i];
    points.push(new Point(point.x, point.y, point.len + lenAt0));
  }

  return new Loop(points);
};

/**
 * Returns a Point between point1 and point2, with the given `len`.
 */
function interpolate(point1, point2, len) {
  if (len < point1.len || len > point2.len) throw new Error('Invalid input');
  var x1 = point1.x;
  var x2 = point2.x;
  var y1 = point1.y;
  var y2 = point2.y;

  var f = (len - point1.len) / (point2.len - point1.len);

  return new Point(
    x1 * (1 - f) + x2 * f,
    y1 * (1 - f) + y2 * f,
    len
  );
}

/**
 * Returns an Array of {x1,x2,y1,y2} Points for all the distinct `len` values
 * of the input Loops.
 *
 * In other words, x1 "aligns" along loop1 the same way x2 "aligns" along loop2.
 * We'll animate each point from (x1,y1) to (x2,y2).
 */
function zipLoops(loop1, loop2) {
  var Epsilon = 1e-6;

  var i = 0;
  var j = 0;
  var scale1 = 1 / loop1.len;
  var scale2 = 1 / loop2.len;
  var ret = [];
  while (i < loop1.points.length && j < loop2.points.length) {
    var p1 = loop1.points[i];
    var p2 = loop2.points[j];
    var f1 = p1.len * scale1; // fraction we are along loop1, [0,1]
    var f2 = p2.len * scale2; // fraction we are along loop2, [0,1]
    if (Math.abs(f1 - f2) < Epsilon) {
      // p1 and p2 are both aligned.
      i += 1;
      j += 1;
    } else {
      if (f1 < f2) {
        // p2 is too far ahead. Fake a p2 by interpolating.
        p2 = interpolate(loop2.points[j - 1], loop2.points[j], f1 * loop2.len);
        i += 1;
      } else {
        // p1 is too far ahead. Fake a p1 by interpolating.
        p1 = interpolate(loop1.points[i - 1], loop1.points[i], f2 * loop1.len);
        j += 1;
      }
    }
    ret.push({ x1: p1.x, x2: p2.x, y1: p1.y, y2: p2.y });
  }

  return ret;
}

function Transit(d1, d2, path1) {
  var loop1 = bestLoop(d1).rotateSoTopLeftPointIsFirst();
  var loop2 = bestLoop(d2).rotateSoTopLeftPointIsFirst();

  var points = zipLoops(loop1, loop2);
  this.points = points;
  this.path = path1;
}

function ease(t) {
  t *= 2;
  if (t < 1) return 1/2 * t * t * t;
  t -= 2;
  return 1/2 * t * t * t + 1;
}

function traceTransitPathAtFraction(ctx, transit, fraction) {
  ctx.beginPath();

  var points = transit.points;
  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var x = pt.x1 * (1 - fraction) + pt.x2 * fraction;
    var y = pt.y1 * (1 - fraction) + pt.y2 * fraction;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.closePath();
}

function drawTransitAtFraction(ctx, transit, fraction) {
  ctx.fillStyle = transit.fill;
  ctx.strokeStyle = transit.stroke;
  ctx.lineWidth = transit.strokeWidth;
  traceTransitPathAtFraction(ctx, transit, fraction);
  ctx.fill();
  ctx.stroke();
}

function drawFrame(ctx, isForward, transits, t0, t, callback) {
  var f = Math.min(1, ease((t - t0) / TransitDuration));

  var fraction = isForward ? f : (1 - f);

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  for (var i = 0; i < transits.length; i++) {
    var transit = transits[i];
    drawTransitAtFraction(ctx, transit, fraction);
  }

  if (f === 1) return callback();

  window.requestAnimationFrame(function(t1) {
    drawFrame(ctx, isForward, transits, t0, t1, callback);
  });
};

MapSwitcher.prototype.transition = function(fromClass, toClass) {
  if (!this.mapContainerEl.classList.contains(fromClass)) return; // never double-animate

  for (var i = 0; i < this.transits.length; i++) {
    var transit = this.transits[i];
    var style = window.getComputedStyle(transit.path);
    transit.fill = style.fill;
    // TK programmatic way of pulling stroke from mesh?
    transit.stroke = 'white';
    // Set lineWidth halfway between 0 (what we want on coastline) and the
    // mesh width (what we want between states).
    transit.strokeWidth = 1.5;
  }

  this.el.classList.remove(fromClass);
  this.el.classList.add(toClass);

  var _this = this;
  window.requestAnimationFrame(function(t0) {
    // Draw first frame before removing the mapContainerEl's class. That way,
    // when the <g> goes display:none, there'll be a <canvas> underneath that
    // looks the same.
    drawFrame(_this.ctx, toClass === 'cartogram', _this.transits, t0, t0, function() {
      _this.mapContainerEl.classList.add(toClass);
    });
    _this.mapContainerEl.classList.remove(fromClass);
  });
}

module.exports = MapSwitcher;

},{}],"/opt/decision-2016/assets/javascripts/dashboard/_nav.js":[function(require,module,exports){
function setWidth(el, numerator, denominator) {
  el.style.width = (100 * numerator / denominator) + '%';
}

function refreshEls(els, summaries) {
  var bars;
  var summary;

  // TK images
  bars = els.president.bars;
  summary = summaries.president;
  setWidth(bars.clinton, summary.nClintonElectoralVotes, summary.nElectoralVotes);
  setWidth(bars.trump, summary.nTrumpElectoralVotes, summary.nElectoralVotes);
  setWidth(bars.tossup, summary.nTossupElectoralVotes, summary.nElectoralVotes);
  els.president.image.className = 'image ' + summary.className;

  bars = els.senate.bars;
  summary = summaries.senate;
  setWidth(bars.dem, summary.totals.dem, summary.n);
  setWidth(bars.gop, summary.totals.gop, summary.n);
  setWidth(bars.tossup, summary.tossup, summary.n);
  els.senate.image.className = 'image ' + summary.className;

  bars = els.house.bars;
  summary = summaries.house;
  setWidth(bars.dem, summary.wins.dem, summary.total);
  setWidth(bars.gop, summary.wins.gop, summary.total);
  setWidth(bars.tossup, summary.total - summary.wins.dem - summary.wins.gop, summary.total);
  els.house.image.className = 'image ' + summary.className;
}

/**
 * Returns a function to refresh the <nav> that's passed in as `el`.
 */
module.exports = function nav(el) {
  var els = {
    president: {
      bars: {
        clinton: el.querySelector('li.president .clinton'),
        trump: el.querySelector('li.president .trump'),
        tossup: el.querySelector('li.president .tossup'),
      },
      image: el.querySelector('li.president .image')
    },
    senate: {
      bars: {
        dem: el.querySelector('li.senate .dem'),
        gop: el.querySelector('li.senate .gop'),
        tossup: el.querySelector('li.senate .tossup'),
      },
      image: el.querySelector('li.senate .image')
    },
    house: {
      bars: {
        dem: el.querySelector('li.house .dem'),
        gop: el.querySelector('li.house .gop'),
        tossup: el.querySelector('li.house .tossup'),
      },
      image: el.querySelector('li.house .image')
    }
  };

  return function(data) { return refreshEls(els, data); };
};

},{}],"/opt/decision-2016/assets/javascripts/dashboard/TitleUpdater.js":[function(require,module,exports){
var WhiteHBase64 = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF////////VXz1bAAAAAJ0Uk5T/wDltzBKAAAAPUlEQVR42mJgJAAYho4CBihgxOQRqQAiiGQugseAJIaigHGoKkABZCkYHuGAL7pR0wiWBENQwRDPWQABBgDKKwNKfc9NNgAAAABJRU5ErkJggg==';

function TitleUpdater(demIcon, gopIcon, maxNForFavicon) {
  this.originalTitle = document.title;
  this.demIcon = demIcon;
  this.gopIcon = gopIcon;
  this.canvas = document.createElement('canvas');
  this.canvas.width = 32;
  this.canvas.height = 32;
  this.ctx = this.canvas.getContext('2d');
  this.maxNForFavicon = maxNForFavicon;

  this.linkEl = document.querySelector('link[rel="shortcut icon"]');
}

TitleUpdater.prototype.updateFaviconWeNeverTestedThisCrossBrowser = function(demN, gopN) {
  var image = new Image();
  var _this = this;
  image.onload = function() {
    var ctx = _this.ctx;

    // background (gray)
    ctx.fillStyle = '#9a9999';
    ctx.rect(0, 0, 32, 32);
    ctx.fill();

    var demPx = Math.min(32, Math.round(demN / _this.maxNForFavicon * 32));
    var gopPx = Math.min(32, Math.round(gopN / _this.maxNForFavicon * 32));

    // Dem
    ctx.fillStyle = '#4c7de0';
    ctx.beginPath();
    ctx.rect(0, 32 - demPx, 12, demPx);
    ctx.fill();

    // GOP
    ctx.fillStyle = '#e52426';
    ctx.beginPath();
    ctx.rect(20, 32 - gopPx, 12, gopPx);
    ctx.fill();

    // white H
    ctx.drawImage(image, 0, 0);

    var png = _this.canvas.toDataURL('image/png');
    _this.linkEl.setAttribute('href', png);
  };
  image.src = 'data:image/png;base64,' + WhiteHBase64;
}

TitleUpdater.prototype.update = function(className, demN, gopN) {
  if (demN === 0 && gopN === 0) {
    document.title = this.originalTitle;
  } else {
    var demWin = className === 'dem-win' ? '✔' : ' ';
    var gopWin = className === 'gop-win' ? '✔' : ' ';
    document.title = demN + demWin + this.demIcon + '–' + gopN + gopWin + this.gopIcon + ' - ' + this.originalTitle;
  }

  try {
    this.updateFaviconWeNeverTestedThisCrossBrowser(demN, gopN);
  } catch (e) {
    console.warn(e);
  }
};

module.exports = TitleUpdater;

},{}],"/opt/decision-2016/assets/javascripts/common/_refresh.js":[function(require,module,exports){
var MaxCountdown = 30000; // ms we start with
var i18n;

function countdownText(ms, error) {
  var s = Math.ceil(ms / 1000);

  if (i18n != null) {
    return error ? i18n.t('refresh.error countdown', s) : i18n.t('refresh.countdown', s);
  } else {
    var prefix = error ? 'Failed last refresh. ' : '';

    if (s === 1) {
      return prefix + 'Refreshing in 1 second';
    } else {
      return prefix + 'Refreshing in ' + s + ' seconds';
    }
  }
}

function refreshText() {
  return (i18n != null) ? i18n.t('refresh.refreshing') : 'Refreshing…';
}

function elOrElsToArrayLike(elOrEls) {
  switch (Object.prototype.toString.apply(elOrEls)) {
    case '[object Array]':
    case '[object NodeList]':
      return elOrEls;
    default: return [ elOrEls ];
  }
}

/**
 * Maintains the "#refresh" div.
 *
 * The "#refresh" div consists of a `button.refresh` and a `span.countdown`.
 * This JS (and _only_ this JS) sets the `span.countdown` text. The user may
 * click on the `button.refresh` _or_ we can "click" it automatically, once
 * the countdown hits 0. Either way, the button becomes disabled until the
 * XHR request completes.
 *
 * If the XHR request gives an error, we set the `.error` class on
 * `span.countdown` and change its text; otherwise, the logic continues as
 * usual.
 *
 * Every time we get new data, we call setData(json).
 */
module.exports = function(elOrEls, url, setData, _options) {
  var i;
  var els = elOrElsToArrayLike(elOrEls);

  var options = _options || {};
  i18n = (options.hasOwnProperty('i18n')) ? options.i18n : null;

  var buttons = [];
  var countdowns = [];
  for (i = 0; i < els.length; i++) {
    var button = els[i].querySelector('button.refresh');
    if (button) buttons.push(button);
    var countdown = els[i].querySelector('span.countdown');
    if (countdown) countdowns.push(countdown);
  }

  if (buttons.length === 0 && countdowns.length === 0) return;

  // Invariant:
  // (xhr === null && countdownEnd !== null && countdownTimer !== null)
  // || (xhr !== null && countdownEnd === null && countdownTimer === null)
  var xhr = null;
  var countdownEnd = null;
  var countdownTimer = null;
  var lastRequestFailed = false;

  function startXhr() {
    lastRequestFailed = false;
    for (var i = 0; i < els.length; i++) els[i].classList.add('loading');
    countdown.textContent = refreshText();

    xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.timeout = 10000;
    xhr.responseType = 'text'; // IE <= 11 doesn't support "json"
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200 || xhr.status === 304) {
        var json = JSON.parse(xhr.responseText);
        setData(json);
      } else {
        lastRequestFailed = true;
      }

      xhr = null;
      for (var i = 0; i < els.length; i++) els[i].classList.remove('loading');
      startCountdown();
    };
    xhr.send();
  }

  function tick() {
    var d = new Date().valueOf();
    if (d >= countdownEnd) {
      countdownEnd = null;
      countdownTimer = null;
      startXhr();
    } else {
      var text = countdownText(countdownEnd - d, lastRequestFailed);
      for (var i = 0; i < countdowns.length; i++) countdowns[i].textContent = text;
      countdownTimer = setTimeout(tick, (1000 + (countdownEnd - d)) % 1000);
    }
  }

  function startCountdown() {
    if (countdownTimer !== null) return;

    countdownEnd = new Date().valueOf() + MaxCountdown;
    var text = countdownText(MaxCountdown, lastRequestFailed);
    for (var i = 0; i < countdowns.length; i++) countdowns[i].textContent = text;
    countdownTimer = setTimeout(tick, 1000);
  }

  function onClick(ev) {
    if (xhr !== null) return;

    // transition: countdown => xhr
    countdownEnd = null;
    clearTimeout(countdownTimer);
    countdownTimer = null;
    startXhr();
  }

  for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', onClick);
  }
  for (i = 0; i < countdowns.length; i++) {
    countdowns[i].addEventListener('click', onClick);
  }

  startCountdown();
}

},{}],"/opt/decision-2016/assets/javascripts/dashboard/ChangelogEntry.js":[function(require,module,exports){
function readInt(s) { return s === '' ? null : parseInt(s, 10); }
function writeInt(i) { return i === null ? '' : String(i); }
var IntType = { read: readInt, write: writeInt };

function readDouble(s) { return s === '' ? null : parseFloat(s); }
function writeDouble(d) { return d === null ? '' : String(d); }
var DoubleType = { read: readDouble, write: writeDouble };

function readDate(s) { return new Date(Date.parse(s)); }
function writeDate(d) { return d.toISOString(); }
var DateType = { read: readDate, write: writeDate };

function readString(s) { return s === '' ? null : s; }
function writeString(s) { return s || ''; }
var StringType = { read: readString, write: writeString };

var Fields = [
  { key: 'id', type: IntType },
  { key: 'date', type: DateType },
  { key: 'changeType', type: StringType },
  { key: 'stateId', type: StringType },
  { key: 'raceType', type: StringType },
  { key: 'raceId', type: StringType },
  { key: 'candidateName', type: StringType },
  { key: 'partyId', type: StringType },
  { key: 'fractionReporting', type: DoubleType }
];

/**
 * Constructs a ChangelogEntry, from an Array or a Hash of parameters.
 */
function ChangelogEntry() {
  var i;

  if (Object.prototype.toString.apply(arguments[0]) === '[object Array]') {
    var arr = arguments[0];
    for (i = 0; i < Fields.length; i++) {
      const field = Fields[i];
      this[field.key] = field.type.read(arr[i]);
    }
  } else {
    var o = arguments[0];
    for (i = 0; i < Fields.length; i++) {
      const field = Fields[i];
      this[field.key] = o[field.key] || null;
    }
  }
}

ChangelogEntry.fromTsvLine = function(tsv) {
  return new ChangelogEntry(tsv.split(/\t/));
};

ChangelogEntry.parseAll = function(text) {
  return text
    .split(/\r?\n/)
    .filter(function(s) { return s.length > 0; })
    .map(ChangelogEntry.fromTsvLine);
};

ChangelogEntry.prototype.toTsvLine = function() {
  var _this = this;
  return Fields
    .map(function(field) { return field.type.write(_this[field.key]); })
    .join('\t');
};

module.exports = ChangelogEntry;

},{}],"/opt/decision-2016/assets/javascripts/dashboard/_changelog.js":[function(require,module,exports){
var ChangelogEntry = require('./ChangelogEntry');

function getSystemTimeZoneAbbreviation() {
  var s = new Date().toString();
  var m = /\(([^)]+)\)/.exec(s);
  return m ? m[1] : '';
}

var tz = getSystemTimeZoneAbbreviation();

function dateHtml(date) {
  var h = date.getHours();
  var ampm;
  if (h < 12) {
    ampm = 'AM';
    h = h === 0 ? '12' : String(h);
  } else {
    ampm = 'PM';
    h = h === 12 ? '12' : String(h - 12);
  }
  var mm = String(100 + date.getMinutes()).slice(1);
  return '<time datetime="' + date.toISOString() + '">' + h + ':' + mm + ' ' + ampm + ' ' + tz + '</time>';
}

function raceHtml(entry) {
  return '<span class="race" data-race-id="' + entry.raceId + '">' + entry.raceName + '</span>';
}

function stateHtml(entry) {
  return '<span class="state" data-state-id="' + entry.stateId + '"></span>';
}

function buildLi(entry, contents) {
  var li = document.createElement('li');
  li.setAttribute('id', 'change-' + entry.id);
  li.setAttribute('class', entry.partyId ? (entry.partyId + '-' + entry.changeType) : 'start');
  li.innerHTML = stateHtml(entry) + contents.join('') + dateHtml(entry.date);
  return li;
}

function startLi(entry) {
  return buildLi(entry, [ stateHtml(entry), entry.stateName, ' began counting votes' ]);
}

function leaderHtml(entry) {
  return '<span class="leader ' + entry.partyId + '-' + entry.changeType + '">' + entry.candidateName + '</span>';
}

function percentHtml(entry) {
  return Math.round(100 * entry.fractionReporting) + '%';
}

function leadLi(entry) {
  return buildLi(entry, [ leaderHtml(entry) + ' led ', raceHtml(entry) + ' after ', percentHtml(entry), ' of votes were counted' ]);
}

function winLi(entry) {
  return buildLi(entry, [ leaderHtml(entry) , ' <span class="won">won</span> ', raceHtml(entry) ]);
}

function entryLi(entry) {
  switch (entry.changeType) {
    case 'start': return startLi(entry);
    case 'lead': return leadLi(entry);
    case 'win': return winLi(entry);
  }
}

function jsonToChangelogEntries(json) {
  var i;

  var stateIdToName = {};
  var raceIdToName = {};
  for (i = 0; i < json.races.length; i++) {
    var race = json.races[i];
    stateIdToName[race.id.slice(0, 2)] = race.stateName;
    raceIdToName[race.id] = race.name;
  }

  var ret = ChangelogEntry.parseAll(json.changelog);
  for (i = 0; i < ret.length; i++) {
    var entry = ret[i];
    entry.stateName = stateIdToName[entry.stateId];
    if (entry.raceId) entry.raceName = raceIdToName[entry.raceId];
  }

  return ret;
}

function Changelog(el, initialJson) {
  this.el = el;
  this.ol = document.createElement('ol');

  var entries = jsonToChangelogEntries(initialJson);
  for (var i = 0; i < entries.length; i++) {
    this.ol.appendChild(entryLi(entries[i]));
  }

  this.topEntryId = entries.length > 0 ? entries[0].id : null;

  if (entries.length === 0) {
    this.ol.innerHTML = '<li class="placeholder">Come back at 7 p.m. EST for live updates.</li>';
  }

  el.appendChild(this.ol);
}

Changelog.prototype.update = function(json) {
  var entries = jsonToChangelogEntries(json);
  var i;
  if (entries.length === 0) return;

  this.maxNEntries = entries.length;

  var added = [];

  for (i = 0; i < entries.length; i++) {
    var entry = entries[i];
    if (this.topEntryId === entry.id) break;

    var li = entryLi(entry);
    li.classList.add('new-change');
    this.ol.insertBefore(li, this.ol.childNodes[0]);
    added.push(li);
  }

  for (i = this.ol.childNodes.length - 1; i >= this.maxNEntries; i--) {
    this.ol.removeChild(this.ol.childNodes[i]);
  }

  window.setTimeout(function() {
    for (var i = 0; i < added.length; i++) {
      added[i].classList.remove('new-change');
    }
  }, 100);

  this.topEntryId = entries[0].id;
};

module.exports = Changelog;

},{"./ChangelogEntry":"/opt/decision-2016/assets/javascripts/dashboard/ChangelogEntry.js"}],"/opt/decision-2016/assets/javascripts/common/formatInt.js":[function(require,module,exports){
/**
 * Converts 1234567 to "1,234,567".
 *
 * TK i18n
 */
module.exports = function formatInt(n) {
  return n.toFixed(0)
    .replace(/(\d)(?=(\d{3})+$)/g, '$1,');
};

},{}],"/opt/decision-2016/assets/javascripts/common/buildCandidateTableHTML.js":[function(require,module,exports){
//  check race.id to decide which race we are dealing with
var isPresidentRace = /^[A-Z][A-Z][0-9]?$/;
var isSenateRace = /^[A-Z][A-Z]S[123]$/;
var isSeat3Race = /^[A-Z][A-Z]S3$/;
var isHouseRace = /^[A-Z][A-Z][0-9][0-9]$/;

function formatPercentForIE10(number) {
  return Math.round(number*100) + '%';
}

var EnglishI18n = {
  locale: 'en',
  t: function(s, o) {
    switch (s) {
      case 'tooltip.n Electoral Votes':
        return o === 1 ? 'Winner gets 1 electoral vote' : ('Winner gets ' + o + ' electoral votes');
      case 'tooltip.clinton':
        return 'Clinton'
      case 'tooltip.trump':
        return 'Trump'
      case 'tooltip.mcmullin':
        return 'McMullin'
      case 'tooltip.Percent counted':
        return o.percent + ' of precincts reporting';
      default:
        if (/^state\./.test(s)) return s.slice(6);
        return s;
    }
  }
};

function raceToCandidateType(race) {
  if (isHouseRace.test(race.id)) return 'HOUSE REP.';
  if (isPresidentRace.test(race.id)) return 'PRESIDENT';
  if (isSenateRace.test(race.id)) return 'SENATOR';
  if ([ 'Clinton', 'Trump', 'McMullin', 'Johnson', 'Stein' ].indexOf(race.candidates[0].name) === -1) return 'SENATOR';
  return 'PRESIDENT';
}

var setText = function(race, i18n) {
  var parts = [
    '<div class="inner">',
    '<h3 class="state-name">' + i18n.t('state.' + race.name) + '</h3>',
  ];

  if (race.nElectoralVotes) {
    parts.push('<p class="state-summary">');
    parts.push(i18n.t('tooltip.n Electoral Votes', race.nElectoralVotes).replace(/\d+/, '<strong>$&</strong>'));
    parts.push('</p>');
  }

  parts.push('</div>');
  return parts;
}

var setFooterText = function(race, i18n, promptUrl) {
  var summaryFigure = race.fractionReporting;

  var formatPercent = typeof Intl === 'object' ? new Intl.NumberFormat(i18n.locale, { style: 'percent' }).format : formatPercentForIE10;

  var htmlInject = [
    '<p class="fraction-reporting">',
      i18n.t('tooltip.Percent counted', { percent: formatPercent(race.fractionReporting) }),
    '</p>'
  ];

  if (promptUrl) {
    htmlInject.push('<p class="state-click only-touch"><a href="' + promptUrl + '">Full results »</a></p>');
    htmlInject.push('<p class="state-click except-touch">Click state for full results</a></p>');
  }

  return htmlInject.join('');
}

function buildSingleCandidateRace(race) {
  var distName = race.name;
  var candidate = race.candidates[0];
  var partyIdToPartyString = {dem: 'Democrat', gop: 'Republican', ind: 'Independent'};
  var injectHtml = [
    '<h3>' + race.name + '</h3>',
    '<p>' + '<span class="' + candidate.partyId + '">' + partyIdToPartyString[candidate.partyId] + '</span> ' + candidate.fullName + ' was uncontested and will be the House Representative</p>'
  ]
  return injectHtml.join('');
}

function buildSenateNonRace(race) {
  var candidate = race.candidates[0];
  var partyIdToPartyString = {dem: 'Democrat', gop: 'Republican', ind: 'Independent'};
  var seatPartyToYear = {3: 'this year:', 1: 'in 2018.', 2: 'in 2020.'};
  var partyIdToCaucusParticipant = race.candidates[0].partyId === 'ind' ? 'Independent, caucuses as a ' : '';
  var injectHtml = [
    '<h3>' + race.name + '</h3>',
    '<p>' + race.candidates[0].fullName + ' (' + partyIdToCaucusParticipant + '<strong class="' + race.className + '">' + partyIdToPartyString[race.winner] + '</strong>) has a term ending ' + seatPartyToYear[race.seatClass] + '</p>'
  ]
  return injectHtml.join('');
}

var buildTable = function(race, targetEl, options) {
  var i18n = options && options.i18n || EnglishI18n;
  var promptUrl = options && options.urlTemplate && options.urlTemplate.replace('XX', race.id.slice(0, 2)) || null;

  //  only summaries for tooltip tables. use targetEl(ev.target) to check.
  var textSummary = !targetEl ? [] : setText(race, i18n);
  var textFooter = setFooterText(race, i18n, promptUrl);
  var candidates = race.candidates;
  var votesTotal = race.nVotes;

  if (isHouseRace.test(race.id) && candidates.length === 1) {
    return buildSingleCandidateRace(race);
  }

  if (isSenateRace.test(race.id) && !isSeat3Race.test(race.id)) {
    return buildSenateNonRace(race);
  }

  var cdType = raceToCandidateType(race);
  var leadingCount = Math.max.apply(null, candidates.map(function(d) { return d.n; }));

  var htmlInject = ['<table class="' + race.className + '">',
    '<thead>', '<tr>',
    '<th class="name">' + cdType + '</th>',
    '<th class="votes">VOTES</th>',
    '<th class="percent"></th>',
    '</tr>', '</thead><tbody>'];

  var numberFormat = typeof Intl === 'object' ? new Intl.NumberFormat(i18n.locale).format : String;

  for (var i = 0; i < candidates.length; i++) {
    var candidate = candidates[i];
    var candidateWon = candidate.winner ? 'winner' : '';
    var cdName = candidate.name;
    var i18nName = { 'Clinton': i18n.t('tooltip.clinton'), 'Trump': i18n.t('tooltip.trump'), 'McMullin': i18n.t('tooltip.mcmullin') }[cdName] || cdName;
    var incumbentSpan = candidate.incumbent === true ? ' <span class="incumbent">i</span>' : '';
    var cdVotes = candidate.n;
    var cdVotesPct = votesTotal === 0 ? 0 : 100 * (cdVotes / votesTotal)
    var voteBarWidth = votesTotal === 0 ? 0 : 100 * (cdVotes / leadingCount);
    htmlInject.push(['<tr class="', candidateWon, ' ', candidate.partyId, '">',
      '<td class="name">', i18nName, incumbentSpan,  '</td>',
      '<td class="vote-count">', numberFormat(cdVotes), '</td>',
      '<td class="votes">',
        '<div class="vote-bar ', candidate.partyId, '" style="width: ', voteBarWidth, '%;"></div>',
      '</td>',
      '<td class="percent">', Math.round(cdVotesPct), '%</td>',
      '</tr>'].join(''));
  }
  htmlInject.push('</tbody></table>');
  for (var i = 0; i < htmlInject.length; i++) {
    textSummary.push(htmlInject[i])
  }
  textSummary.push(textFooter);
  return textSummary.join('');
}

module.exports = buildTable;

},{}],"/opt/decision-2016/assets/javascripts/common/Tooltip.js":[function(require,module,exports){

var formatInt = require('../common/formatInt');
var buildCandidateTableHTML = require('../common/buildCandidateTableHTML')

function hasClass (el, checkClass) {
  return !!el.className.match( checkClass ) //match returns null, return true/false;
}

function Tooltip(options) {
  if (!options.el) throw new Error('Must set options.el, an HTMLElement');
  if (!options.views) throw new Error('Must set options.views, an Array of Objects');
  if (!options.races) throw new Error('Must set options.races, the initial races JSON');

  this.views = options.views;
  this.el = options.el;
  this.mapType = options.mapType;
  this.i18n = options.i18n || null;
  this.urlTemplate = options.urlTemplate || null;

  var _this = this;

  function goToStatePage(stateCode, inNewWindow) {
    var url = _this.urlTemplate.replace('XX', stateCode);
    inNewWindow = inNewWindow || /^http:\/\//.test(url); //On splash? Open in a new tab, always
    if (inNewWindow) {
      var win = window.open(url, '_blank');
      win.focus();
    } else {
      window.top.location = url;
    }
  }

  function onMouseClick(_, raceId, inNewWindow) {
    goToStatePage(raceId.slice(0, 2), inNewWindow);
  }

  this.setData = function(data) {
    _this.raceData = {};
    for (var i = 0; i < data.length; i++) {
      _this.raceData[data[i].id] = data[i];
    }
  }

  function raceIdIsValid(raceId) {
    return _this.raceData.hasOwnProperty(raceId);
  }

  function canTouch() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  }

  function highlightRace(raceId, originView, ev) {
    for (var i = 0; i < _this.views.length; i++) {
      _this.views[i].highlightRace(raceId);
    }

    if (canTouch()) {
      _this.el.classList.add('on-touch-device');
    } else {
      _this.el.classList.remove('on-touch-device');
    }

    var race = _this.raceData[raceId];
    _this.el.innerHTML = '<div class="candidate-table"><a href="#" class="close only-touch">×</a>' + buildCandidateTableHTML(race, ev.target, { i18n: _this.i18n, urlTemplate: _this.urlTemplate }) + '</div>';

    _this.el.style.visibility = 'hidden';
    _this.el.style.display = 'block'; // so we can set position
    var position = originView.getDesiredTooltipPosition(raceId, _this.el, ev);
    _this.el.style.top = position.top + 'px';
    _this.el.style.left = position.left + 'px';
    _this.el.style.visibility = 'visible';
  }

  function unhighlightRace() {
    for (var i = 0; i < _this.views.length; i++) {
      _this.views[i].highlightRace(null);
    }
    _this.el.style.display = 'none';
  }

  this.setData(options.races);

  function isMouseoutReallyTouchstartOnTooltipA(ev) {
    // If we're touching a <a> within the tooltip, ignore the "Un-highlight"
    // event because we want the tooltip to stay up while we touch it.
    if (!canTouch()) return false;

    var node = ev.relatedTarget;
    console.log(ev, ev.relatedTarget, node.tagName);
    if (node.tagName !== 'A') return false;

    while (node !== null) {
      console.log(node);
      if (node === _this.el) return true;
      node = node.parentNode;
    }

    return false;
  }

  function onHover(view, raceIdOrNull, ev) {
    if (ev.type === 'mouseout' && isMouseoutReallyTouchstartOnTooltipA(ev)) {
      return;
    }

    if (!raceIdIsValid(raceIdOrNull)) raceIdOrNull = null;

    // Now adjust the actual tooltip
    if (raceIdOrNull) {
      highlightRace(raceIdOrNull, view, ev);
    } else {
      unhighlightRace();
    }
  }

  // Close the popup when touching "a.close"
  this.el.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'A' && ev.target.classList.contains('close')) {
      ev.preventDefault();
      unhighlightRace();
    }
  });

  for (var i = 0; i < this.views.length; i++) {
    this.views[i].addHoverListener(onHover);

    if (this.urlTemplate) {
      this.views[i].addMouseClickListener(onMouseClick);
    }
  }
}

module.exports = Tooltip;

},{"../common/buildCandidateTableHTML":"/opt/decision-2016/assets/javascripts/common/buildCandidateTableHTML.js","../common/formatInt":"/opt/decision-2016/assets/javascripts/common/formatInt.js"}],"/opt/decision-2016/assets/javascripts/dashboard/Summary.js":[function(require,module,exports){
var formatInt = require('../common/formatInt');

function Summary(els) {
  this.els = els;

  this.raceIdToLi = {};
  var lis = els.races.childNodes;
  for (var i = 0; i < lis.length; i++) {
    var li = lis[i];
    this.raceIdToLi[li.getAttribute('data-race-id')] = li;
  }

  this.highlightedRaceId = null;
}

Summary.prototype.refreshCounts = function(demScore, gopScore, demVotes, gopVotes) {
  this.els.demScore.textContent = formatInt(demScore);
  this.els.gopScore.textContent = formatInt(gopScore);
  this.els.demVotes.textContent = formatInt(demVotes);
  this.els.gopVotes.textContent = formatInt(gopVotes);
};

/**
 * Calls callback(this, raceId, ev) and callback(this, null, ev), for all of
 * time, depending on user actions.
 *
 * The caller should be able to handle spurious calls with the same raceId (or
 * spurious `null` calls).
 */
Summary.prototype.addHoverListener = function(callback) {
  var _this = this;
  var ol = this.els.races;
  ol.addEventListener('mouseover', function(ev) {
    if (ev.target.hasAttribute('data-race-id')) {
      callback(_this, ev.target.getAttribute('data-race-id'), ev);
    }
  });
  ol.addEventListener('mouseout', function(ev) {
    callback(_this, null, ev);
  });
};

/**
 * Calls callback(this, raceId, inNewWindow), depending on user actions.
 *
 * Does not call the callback on tap.
 */
Summary.prototype.addMouseClickListener = function(callback) {
  var _this = this;

  // A tap causes click, too, but we want to treat tap as hover, not click.
  // Solution: assume touchend comes before mousedown, and prevent mousedown
  // events that happen right after touchend.
  // ref: https://patrickhlauke.github.io/touch/tests/results/
  var lastTouchendDate = null;
  document.addEventListener('touchend', function(ev) {
    lastTouchendDate = new Date();
  });

  this.els.races.addEventListener('click', function(ev) {
    if (ev.button !== 0 && ev.button !== 1) return;
    if (new Date() - lastTouchendDate < 2000) return; // arbitrary number
    if (ev.target.hasAttribute('data-race-id')) {
      callback(_this, ev.target.getAttribute('data-race-id'), ev.button === 1 || ev.ctrlKey);
    }
  });
};

/**
 * Returns the {top,left} of where the top+left of the tooltip should go, in
 * document coordinates.
 *
 * In other words: `{top: 0, left: 0}` is the first pixel on the page.
 */
Summary.prototype.getDesiredTooltipPosition = function(raceId, el, ev) {
  var tooltipBox = el.getBoundingClientRect();
  var li = this.raceIdToLi[raceId] || this.els.races;
  var liBox = li.getBoundingClientRect();

  var top = window.pageYOffset + liBox.bottom + 10;
  var left = window.pageXOffset + liBox.left + (liBox.width / 2) - (tooltipBox.width / 2);

  var windowRight = document.documentElement.clientWidth;
  if (left < 0) left = 0;
  if (left + tooltipBox.width > windowRight) {
    left = windowRight - tooltipBox.width;
  }

  return { top: top, left: left };
};

Summary.prototype.highlightRace = function(raceIdOrNull) {
  if (!this.raceIdToLi.hasOwnProperty(raceIdOrNull)) raceId = null;
  if (raceIdOrNull === this.highlightedRaceId) return;
  if (this.highlightedRaceId) this.raceIdToLi[this.highlightedRaceId].classList.remove('highlight');
  this.highlightedRaceId = raceIdOrNull;
  if (this.highlightedRaceId) this.raceIdToLi[this.highlightedRaceId].classList.add('highlight');
};

Summary.prototype.refreshRaces = function(races) {
  for (i = 0; i < races.length; i++) {
    var race = races[i];
    var li = this.raceIdToLi[race.id];

    var highlighted = li.classList.contains('highlight');
    li.className = race.className;
    if (highlighted) li.classList.add('highlight');

    // We'll _move_ <li>s instead of repainting them. That way, when somebody
    // hovers over a <li> during a refresh, and the refresh doesn't change
    // anything, the user stays hovering.
    li.style.order = i;
    li.style._webkitOrder = i;
  }
};

module.exports = Summary;

},{"../common/formatInt":"/opt/decision-2016/assets/javascripts/common/formatInt.js"}],"/opt/decision-2016/assets/javascripts/president/_summary.js":[function(require,module,exports){
var Summary = require('../dashboard/Summary');

/**
 * Returns a function to refresh the <div#president-summary> that's passed
 * in as `el`.
 */
module.exports = function presidentSummary(el, initialJson) {
  var summary = new Summary({
    demScore: el.querySelector('.total-clinton strong'),
    gopScore: el.querySelector('.total-trump strong'),
    demVotes: el.querySelector('.clinton-popular-votes strong'),
    gopVotes: el.querySelector('.trump-popular-votes strong'),
    races: el.querySelector('ol.races')
  });

  summary.update = function(data) {
    var s = data.summaries.president;

    summary.refreshCounts(
      s.nClintonElectoralVotes,
      s.nTrumpElectoralVotes,
      s.nClinton,
      s.nTrump
    );
    summary.refreshRaces(data.races);
  };

  summary.update(initialJson);

  return summary;
};

},{"../dashboard/Summary":"/opt/decision-2016/assets/javascripts/dashboard/Summary.js"}],"/opt/decision-2016/assets/javascripts/president.js":[function(require,module,exports){
var Changelog = require('./dashboard/_changelog');
var Map = require('./common/Map');
var MapSwitcher = require('./common/MapSwitcher');
var nav = require('./dashboard/_nav');
var Tooltip = require('./common/Tooltip');
var TitleUpdater = require('./dashboard/TitleUpdater');
var refresh = require('./common/_refresh');
var Summary = require('./president/_summary');

var initialJson = JSON.parse(document.querySelector('script[data-json]').getAttribute('data-json'));

var summaryEl = document.getElementById('president-summary');
var summary = Summary(summaryEl, initialJson);

var mapContainerEl = document.getElementById('map');
var map = null;
var tooltip = null;
Map.loadSvg({
  url: mapContainerEl.getAttribute('data-src'),
  idAttribute: 'data-race-id',
  idRegex: /^[A-Z][A-Z].?.?$/
}, function(err, svg) {
  if (err) throw err;

  mapContainerEl.appendChild(svg);

  map = new Map({
    svg: svg,
    idAttribute: 'data-race-id',
    races: initialJson.races,
    legendEl: document.querySelector('.map-legend')
  });

  tooltip = new Tooltip({
    el: document.getElementById('tooltip'),
    views: [ map, summary ],
    races: initialJson.races,
    urlTemplate: mapContainerEl.getAttribute('data-url-template'),
    raceType: 'president',
    mapType: 'state'
  });

  new MapSwitcher({
    el: document.getElementById('map-switcher'),
    map: map,
    mapContainerEl: mapContainerEl
  });

  mapContainerEl.classList.remove('loading');
});

var originalTitle = document.title;

var navEl = document.querySelector('nav');
var updateNav = nav(navEl);
updateNav(initialJson.summaries);

var changelogEl = document.getElementById('changelog');
var changelog = new Changelog(changelogEl, initialJson);

var titleUpdater = new TitleUpdater('C', 'T', 270);
function updateTitle(json) {
  var race = json.summaries.president;
  titleUpdater.update(race.className, race.nClintonElectoralVotes, race.nTrumpElectoralVotes);
}
updateTitle(initialJson);

function doRefresh(json) {
  if (map) map.update(json.races);
  if (tooltip) tooltip.setData(json.races);
  changelog.update(json);
  updateNav(json.summaries);
  summary.update(json);
  updateTitle(json);

  initialJson = json; // in case "map" and "tooltip" aren't loaded yet
}

var refreshEl = document.getElementById('refresh');
refresh(refreshEl, '/2016/results/president.json', doRefresh);

},{"./common/Map":"/opt/decision-2016/assets/javascripts/common/Map.js","./common/MapSwitcher":"/opt/decision-2016/assets/javascripts/common/MapSwitcher.js","./common/Tooltip":"/opt/decision-2016/assets/javascripts/common/Tooltip.js","./common/_refresh":"/opt/decision-2016/assets/javascripts/common/_refresh.js","./dashboard/TitleUpdater":"/opt/decision-2016/assets/javascripts/dashboard/TitleUpdater.js","./dashboard/_changelog":"/opt/decision-2016/assets/javascripts/dashboard/_changelog.js","./dashboard/_nav":"/opt/decision-2016/assets/javascripts/dashboard/_nav.js","./president/_summary":"/opt/decision-2016/assets/javascripts/president/_summary.js"}]},{},["/opt/decision-2016/assets/javascripts/president.js"]);
