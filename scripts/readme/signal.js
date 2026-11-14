/*
 * "Voice" variant: a wordmark made of stacked signal traces that lift where they cross the letters.
 * Browser only (needs a canvas to rasterise the text into a heightmap). Deterministic.
 */
(function (root) {
  var MONO =
    "ui-monospace,SFMono-Regular,Menlo,Consolas,'Liberation Mono',monospace";
  var THEMES = {
    light: {
      fg: "#1f2328",
      muted: "#59636e",
      accent: "#4f46e5",
      hot: "#ff5a4f",
    },
    dark: {
      fg: "#f0f6fc",
      muted: "#9198a1",
      accent: "#8b8ffb",
      hot: "#ff8a7d",
    },
  };

  function prng(seed) {
    var a = seed >>> 0;
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function heightmap(text, W, H, font, size, blur, yBase) {
    var c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    var g = c.getContext("2d");
    g.fillStyle = "#000";
    g.fillRect(0, 0, W, H);
    g.filter = "blur(" + blur + "px)";
    g.fillStyle = "#fff";
    g.textBaseline = "alphabetic";
    g.textAlign = "center";
    g.font = size + "px " + font;
    var sx = (W * 0.86) / g.measureText(text).width;
    g.save();
    g.translate(W / 2, yBase);
    g.scale(sx, 1);
    g.fillText(text, 0, 0);
    g.restore();
    var d = g.getImageData(0, 0, W, H).data;
    return function (x, y) {
      x = Math.max(0, Math.min(W - 1, Math.round(x)));
      y = Math.max(0, Math.min(H - 1, Math.round(y)));
      return d[(y * W + x) * 4] / 255;
    };
  }

  /* Ramer-Douglas-Peucker on an open polyline. */
  function simplify(pts, tol) {
    if (pts.length < 3) return pts;
    var keep = new Uint8Array(pts.length);
    keep[0] = keep[pts.length - 1] = 1;
    var stack = [[0, pts.length - 1]];
    while (stack.length) {
      var seg = stack.pop(),
        a = pts[seg[0]],
        b = pts[seg[1]],
        dx = b[0] - a[0],
        dy = b[1] - a[1],
        len = Math.hypot(dx, dy) || 1,
        best = 0,
        at = -1;
      for (var i = seg[0] + 1; i < seg[1]; i++) {
        var d =
          Math.abs((pts[i][0] - a[0]) * dy - (pts[i][1] - a[1]) * dx) / len;
        if (d > best) {
          best = d;
          at = i;
        }
      }
      if (best > tol) {
        keep[at] = 1;
        stack.push([seg[0], at], [at, seg[1]]);
      }
    }
    return pts.filter(function (_, i) {
      return keep[i];
    });
  }
  function pathOf(runs) {
    return runs
      .map(function (r) {
        return (
          "M" +
          simplify(r, 0.22)
            .map(function (p) {
              return p[0] + " " + Math.round(p[1] * 10) / 10;
            })
            .join("L")
        );
      })
      .join("");
  }

  function heroSVG(theme, opt) {
    opt = opt || {};
    var T = THEMES[theme],
      W = 846,
      H = 350,
      top = 70,
      bottom = H - 34,
      n = 60,
      step = 3;
    var hm = heightmap(
      opt.text || "VOXDROID",
      W,
      H,
      opt.font || "Anton, Impact, sans-serif",
      214,
      2.6,
      282,
    );
    var lines = [],
      i,
      k;
    for (i = 0; i < n; i++) {
      var y0 = top + ((bottom - top) * i) / (n - 1),
        r = prng(1009 + i * 7919);
      var f = [0.011 + r() * 0.02, 0.04 + r() * 0.05, 0.11 + r() * 0.1],
        p = [r() * 6.28, r() * 6.28, r() * 6.28];
      var pts = [],
        hot = [];
      for (var x = 0; x <= W; x += step) {
        var edge = Math.min(1, Math.min(x, W - x) / 70),
          hgt = hm(x, y0);
        var noise =
          Math.sin(x * f[0] + p[0]) * 0.5 +
          Math.sin(x * f[1] + p[1]) * 0.32 +
          Math.sin(x * f[2] + p[2]) * 0.18;
        pts.push([
          x,
          y0 -
            hgt * 11 * edge -
            Math.abs(noise) * (0.9 + hgt * 3.2) * edge -
            noise * 0.5,
        ]);
        hot.push(hgt > 0.5);
      }
      lines.push({ pts: pts, hot: hot });
    }
    // Hidden-line removal: a trace is drawn only where nothing in front of it rises higher, so the file needs no background fill.
    var horizon = new Float32Array(lines[0].pts.length).fill(1e9),
      cool = [],
      warm = [];
    for (i = n - 1; i >= 0; i--) {
      var L = lines[i],
        runC = null,
        runH = null;
      for (k = 0; k < L.pts.length; k++) {
        var vis = L.pts[k][1] < horizon[k] - 0.25;
        if (vis && L.hot[k]) {
          if (!runH) {
            runH = k > 0 && runC ? [L.pts[k - 1]] : [];
            warm.push(runH);
          }
          runH.push(L.pts[k]);
          if (runC) {
            runC.push(L.pts[k]);
            runC = null;
          }
        } else if (vis) {
          if (!runC) {
            runC = runH ? [L.pts[k - 1]] : [];
            cool.push(runC);
          }
          runC.push(L.pts[k]);
          runH = null;
        } else {
          runC = null;
          runH = null;
        }
      }
      for (k = 0; k < L.pts.length; k++)
        if (L.pts[k][1] < horizon[k]) horizon[k] = L.pts[k][1];
    }
    cool = cool.filter(function (r) {
      return r.length > 1;
    });
    warm = warm.filter(function (r) {
      return r.length > 1;
    });
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' +
      W +
      " " +
      H +
      '" width="' +
      W +
      '" height="' +
      H +
      '" role="img" aria-label="VOXDROID, drawn as sixty signal traces that rise where they cross the letters. Systems. Intelligence. Code.">' +
      '<defs><linearGradient id="sweep" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="846" y2="0">' +
      '<stop offset="0" stop-color="' +
      T.accent +
      '"/><stop offset=".4" stop-color="' +
      T.accent +
      '"/><stop offset=".5" stop-color="' +
      T.hot +
      '"/><stop offset=".6" stop-color="' +
      T.accent +
      '"/><stop offset="1" stop-color="' +
      T.accent +
      '"/>' +
      '<animateTransform attributeName="gradientTransform" type="translate" from="-520 0" to="520 0" dur="5.5s" repeatCount="indefinite"/></linearGradient></defs>' +
      '<g font-family="' +
      MONO +
      '" font-size="11" letter-spacing="1.5" fill="' +
      T.muted +
      '"><text x="0" y="18">VOX, LAT. VOICE</text><text x="846" y="18" text-anchor="end">SYSTEMS. INTELLIGENCE. CODE.</text></g>' +
      '<path fill="none" stroke="' +
      T.fg +
      '" stroke-opacity=".36" stroke-linejoin="round" d="' +
      pathOf(cool) +
      '"/>' +
      '<path fill="none" stroke="url(#sweep)" stroke-width="1.9" stroke-linejoin="round" stroke-linecap="round" d="' +
      pathOf(warm) +
      '"/>' +
      "</svg>\n"
    );
  }

  /* Section heading: label, a short burst, then a rule. */
  function headSVG(label, theme) {
    var T = THEMES[theme],
      x = Math.round(label.length * 10.4 + 14);
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -8 846 34" width="846" height="34" role="img" aria-label="' +
      label +
      '">' +
      '<text x="0" y="18" font-family="' +
      MONO +
      '" font-size="12.5" font-weight="600" letter-spacing="2" fill="' +
      T.fg +
      '">' +
      label +
      "</text>" +
      '<path fill="none" stroke="' +
      T.accent +
      '" stroke-width="1.6" stroke-linejoin="round" d="M' +
      x +
      ' 13l5-9 5 16 5-13 5 10 5-6 4 2"/>' +
      '<path fill="none" stroke="' +
      T.fg +
      '" stroke-opacity=".36" d="M' +
      (x + 29) +
      ' 13H846"/></svg>\n'
    );
  }

  root.Signal = {
    heroSVG: heroSVG,
    headSVG: headSVG,
    THEMES: THEMES,
    MONO: MONO,
  };
})(typeof window !== "undefined" ? window : globalThis);
