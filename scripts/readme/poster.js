/*
 * "Poster" variant: a two-ink halftone of the avatar beside oversized type.
 * Browser only. Text is traced into outlines from the rendered glyphs, so the SVGs need no font on GitHub.
 */
(function (root) {
  var MONO =
    "ui-monospace,SFMono-Regular,Menlo,Consolas,'Liberation Mono',monospace";
  var FACE = "Anton, Impact, sans-serif";
  var THEMES = {
    light: {
      fg: "#1f2328",
      a: "#4338ca",
      b: "#ff5a4f",
      blend: "multiply",
      dark: false,
    },
    dark: {
      fg: "#f0f6fc",
      a: "#a5a8ff",
      b: "#ff6f61",
      blend: "screen",
      dark: true,
    },
  };
  var r2 = function (v) {
    return Math.round(v * 100) / 100;
  };
  var meas = document.createElement("canvas").getContext("2d");
  function widthOf(text, size) {
    meas.font = size + "px " + FACE;
    return meas.measureText(text).width;
  }

  /* ---- text to outlines: marching squares over the glyph coverage, then simplification ---- */
  function simplifyLoop(pts, tol) {
    var n = pts.length;
    if (n < 8) return pts;
    var far = 0,
      best = -1;
    for (var i = 1; i < n; i++) {
      var d = Math.hypot(pts[i][0] - pts[0][0], pts[i][1] - pts[0][1]);
      if (d > best) {
        best = d;
        far = i;
      }
    }
    function rdp(a, b) {
      var out = [],
        stack = [[a, b]],
        keep = {};
      keep[a] = keep[b] = true;
      while (stack.length) {
        var s = stack.pop(),
          p = pts[s[0]],
          q = pts[s[1] % n],
          dx = q[0] - p[0],
          dy = q[1] - p[1],
          len = Math.hypot(dx, dy) || 1,
          mx = 0,
          at = -1;
        for (var k = s[0] + 1; k < s[1]; k++) {
          var e =
            Math.abs(
              (pts[k % n][0] - p[0]) * dy - (pts[k % n][1] - p[1]) * dx,
            ) / len;
          if (e > mx) {
            mx = e;
            at = k;
          }
        }
        if (mx > tol) {
          keep[at] = true;
          stack.push([s[0], at], [at, s[1]]);
        }
      }
      for (var j = a; j < b; j++) if (keep[j]) out.push(pts[j % n]);
      return out;
    }
    return rdp(0, far).concat(rdp(far, n));
  }

  function outline(text, size) {
    var k = Math.max(2, Math.min(8, 900 / size)),
      pad = 6;
    meas.font = size + "px " + FACE;
    var m = meas.measureText(text),
      wNat = m.width;
    var cw = Math.ceil((wNat + pad * 2) * k),
      ch = Math.ceil((size * 1.5 + pad * 2) * k);
    var c = document.createElement("canvas");
    c.width = cw;
    c.height = ch;
    var g = c.getContext("2d");
    g.scale(k, k);
    g.font = size + "px " + FACE;
    g.textBaseline = "alphabetic";
    g.fillStyle = "#000";
    var bx = pad,
      by = pad + size * 1.2;
    g.fillText(text, bx, by);
    var data = g.getImageData(0, 0, cw, ch).data,
      a = new Float32Array(cw * ch);
    for (var i = 0; i < cw * ch; i++) a[i] = data[i * 4 + 3] / 255;
    var t = 0.5,
      pts = new Map(),
      links = new Map(),
      segs = [];
    function edge(key, x, y) {
      if (!pts.has(key)) pts.set(key, [x, y]);
      return key;
    }
    function H(x, y) {
      var p = a[y * cw + x],
        q = a[y * cw + x + 1];
      return edge((y * cw + x) * 2, x + (t - p) / (q - p), y);
    }
    function V(x, y) {
      var p = a[y * cw + x],
        q = a[(y + 1) * cw + x];
      return edge((y * cw + x) * 2 + 1, x, y + (t - p) / (q - p));
    }
    function seg(e1, e2) {
      var id = segs.length;
      segs.push([e1, e2]);
      [e1, e2].forEach(function (e) {
        if (!links.has(e)) links.set(e, []);
        links.get(e).push(id);
      });
    }
    for (var y = 0; y < ch - 1; y++)
      for (var x = 0; x < cw - 1; x++) {
        var tl = a[y * cw + x] > t,
          tr = a[y * cw + x + 1] > t,
          br = a[(y + 1) * cw + x + 1] > t,
          bl = a[(y + 1) * cw + x] > t;
        var idx = (tl ? 8 : 0) | (tr ? 4 : 0) | (br ? 2 : 0) | (bl ? 1 : 0);
        if (idx === 0 || idx === 15) continue;
        var T = function () {
            return H(x, y);
          },
          B = function () {
            return H(x, y + 1);
          },
          L = function () {
            return V(x, y);
          },
          R = function () {
            return V(x + 1, y);
          };
        var mid =
          (a[y * cw + x] +
            a[y * cw + x + 1] +
            a[(y + 1) * cw + x + 1] +
            a[(y + 1) * cw + x]) /
            4 >
          t;
        switch (idx) {
          case 1:
          case 14:
            seg(L(), B());
            break;
          case 2:
          case 13:
            seg(B(), R());
            break;
          case 3:
          case 12:
            seg(L(), R());
            break;
          case 4:
          case 11:
            seg(T(), R());
            break;
          case 6:
          case 9:
            seg(T(), B());
            break;
          case 7:
          case 8:
            seg(T(), L());
            break;
          case 5:
            if (mid) {
              seg(T(), L());
              seg(B(), R());
            } else {
              seg(T(), R());
              seg(L(), B());
            }
            break;
          case 10:
            if (mid) {
              seg(T(), R());
              seg(L(), B());
            } else {
              seg(T(), L());
              seg(B(), R());
            }
            break;
        }
      }
    var used = new Uint8Array(segs.length),
      d = "";
    for (var s = 0; s < segs.length; s++) {
      if (used[s]) continue;
      var loop = [],
        cur = s,
        from = segs[s][0];
      while (!used[cur]) {
        used[cur] = 1;
        var to = segs[cur][0] === from ? segs[cur][1] : segs[cur][0];
        loop.push(pts.get(from));
        var nb = links.get(to),
          next = nb[0] === cur ? nb[1] : nb[0];
        if (next == null) break;
        from = to;
        cur = next;
      }
      if (loop.length < 4) continue;
      loop = simplifyLoop(loop, 0.3);
      d +=
        "M" +
        loop
          .map(function (p) {
            return r2(p[0] / k - bx) + " " + r2(p[1] / k - by);
          })
          .join("L") +
        "Z";
    }
    return { d: d, w: wNat };
  }
  /* A piece of text as a path, baseline at (x, y). */
  function type(text, size, x, y, attrs) {
    var o = outline(text, size);
    return {
      w: o.w,
      svg:
        '<path fill-rule="evenodd" transform="translate(' +
        r2(x) +
        " " +
        r2(y) +
        ')" ' +
        attrs +
        ' d="' +
        o.d +
        '"/>',
    };
  }
  function fitSize(text, width) {
    return (200 * width) / widthOf(text, 200);
  }

  /* ---- two-ink halftone ---- */
  function halftone(img, S, T) {
    var N = 200,
      src = document.createElement("canvas");
    src.width = N;
    src.height = N;
    var sg = src.getContext("2d");
    sg.drawImage(img, 0, 0, N, N);
    var px = sg.getImageData(0, 0, N, N).data;
    function sample(u, v) {
      var x = Math.max(0, Math.min(N - 1, Math.round(u * (N - 1)))),
        y = Math.max(0, Math.min(N - 1, Math.round(v * (N - 1)))),
        i = (y * N + x) * 4;
      var r = px[i],
        g = px[i + 1],
        b = px[i + 2];
      return {
        lum: (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255,
        warm: Math.max(0, Math.min(1, (r - b) / 130)),
      };
    }
    function layer(angle, pitch, value, ox, oy) {
      // dots are grouped by radius and drawn as round-capped zero-length strokes, which is far smaller than one <circle> each
      var ca = Math.cos(angle),
        sa = Math.sin(angle),
        R = S / 2,
        n = Math.ceil((S * 1.5) / pitch),
        bins = {};
      for (var i = -n; i <= n; i++)
        for (var j = -n; j <= n; j++) {
          var x = R + i * pitch * ca - j * pitch * sa,
            y = R + i * pitch * sa + j * pitch * ca,
            dx = x - R,
            dy = y - R;
          if (dx * dx + dy * dy > (R - 2) * (R - 2)) continue;
          var v = value(sample(x / S, y / S));
          if (v <= 0.015) continue;
          var w = Math.round(pitch * 0.58 * Math.sqrt(v) * 2 * 8) / 8;
          if (w < 0.25) continue;
          (bins[w] = bins[w] || []).push(
            "M" +
              Math.round((x + ox) * 10) / 10 +
              " " +
              Math.round((y + oy) * 10) / 10 +
              "h.01",
          );
        }
      return Object.keys(bins)
        .map(function (w) {
          return (
            '<path stroke-width="' + w + '" d="' + bins[w].join("") + '"/>'
          );
        })
        .join("");
    }
    var warm = layer(
      0.26,
      5.4,
      function (s) {
        return (
          s.warm *
          ((T.dark ? 0.25 : 0.35) + (T.dark ? 0.75 : 0.65) * s.lum) *
          0.95
        );
      },
      3,
      2,
    );
    var key = layer(
      0.785,
      5.4,
      T.dark
        ? function (s) {
            return Math.pow(s.lum, 1.35) * 0.92;
          }
        : function (s) {
            return Math.pow(1 - s.lum, 1.15) * 0.95;
          },
      0,
      0,
    );
    return (
      '<g fill="none" stroke-linecap="round" style="mix-blend-mode:' +
      T.blend +
      '"><g stroke="' +
      T.b +
      '">' +
      warm +
      '</g><g stroke="' +
      T.a +
      '" style="mix-blend-mode:' +
      T.blend +
      '">' +
      key +
      "</g></g>"
    );
  }

  function svg(W, H, label, body) {
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' +
      W +
      " " +
      H +
      '" width="' +
      W +
      '" height="' +
      H +
      '" role="img" aria-label="' +
      label +
      '" style="isolation:isolate">' +
      body +
      "</svg>\n"
    );
  }

  function heroSVG(img, theme) {
    var T = THEMES[theme],
      x = 426,
      w = 420;
    var sV = fitSize("VOX", w),
      sD = fitSize("DROID", w),
      yV = 14 + sV * 0.86,
      yD = yV + 18 + sD * 0.86,
      H = Math.max(470, Math.ceil(yD + 64));
    var droid = outline("DROID", sD),
      place = function (dx, dy, attrs) {
        return (
          '<path fill-rule="evenodd" transform="translate(' +
          r2(x + dx) +
          " " +
          r2(yD + dy) +
          ')" ' +
          attrs +
          ' d="' +
          droid.d +
          '"/>'
        );
      };
    var mono =
      'font-family="' +
      MONO +
      '" font-size="10.5" letter-spacing="1.5" fill="' +
      T.fg +
      '"';
    return svg(
      846,
      H,
      "VOX DROID in poster type beside a two-colour halftone of the avatar. Systems. Intelligence. Code.",
      '<circle cx="230" cy="226" r="204" fill="' +
        T.b +
        '" opacity=".14"/>' +
        type("VOX", sV, x, yV, 'fill="' + T.a + '"').svg +
        place(0, 0, 'fill="' + T.b + '"') +
        place(
          6,
          5,
          'fill="none" stroke="' +
            T.a +
            '" stroke-width="2" style="mix-blend-mode:' +
            T.blend +
            '"',
        ) +
        '<g transform="translate(20 16)">' +
        halftone(img, 420, T) +
        "</g>" +
        "<text " +
        mono +
        ' x="' +
        x +
        '" y="' +
        Math.round(yD + 34) +
        '">SYSTEMS. INTELLIGENCE. CODE.</text>' +
        "<text " +
        mono +
        ' x="' +
        x +
        '" y="' +
        Math.round(yD + 52) +
        '">README / REV 1.2.0 / TWO INKS</text>' +
        '<rect fill="' +
        T.a +
        '" x="776" y="' +
        Math.round(yD + 24) +
        '" width="30" height="30"/><rect fill="' +
        T.b +
        '" x="816" y="' +
        Math.round(yD + 24) +
        '" width="30" height="30"/>' +
        '<g fill="none" stroke="' +
        T.fg +
        '" transform="translate(22 ' +
        (H - 18) +
        ')"><circle r="8"/><path d="M-14 0H14M0-14V14"/></g>' +
        "<text " +
        mono +
        ' x="46" y="' +
        (H - 14) +
        '">FIG. 1  THE DEVELOPER, REFUELING</text>',
    );
  }

  /* Section heading: the label in ink A over an offset copy in ink B, then a bar. */
  function headSVG(label, theme) {
    var T = THEMES[theme],
      o = outline(label, 46);
    var p = function (dx, dy, fill) {
      return (
        '<path fill-rule="evenodd" fill="' +
        fill +
        '" transform="translate(' +
        dx +
        " " +
        dy +
        ')" d="' +
        o.d +
        '"/>'
      );
    };
    return svg(
      846,
      68,
      label,
      p(4, 62, T.b) +
        p(0, 58, T.a) +
        '<rect fill="' +
        T.a +
        '" x="' +
        r2(o.w + 18) +
        '" y="52" width="' +
        r2(846 - o.w - 18) +
        '" height="6"/>',
    );
  }

  /* Projects billed like a festival line-up: each tier is fitted to the full width. */
  function lineupSVG(tiers, theme) {
    var T = THEMES[theme],
      y = 0,
      out = "",
      sep = "  /  ";
    tiers.forEach(function (names, i) {
      var size = (100 * 846) / widthOf(names.join(sep), 100),
        a = i % 2 ? T.b : T.a,
        b = i % 2 ? T.a : T.b,
        x = 0;
      y += size * 0.9 + (i ? 16 : 0);
      var gap = widthOf(sep, size),
        slash = widthOf("/", size);
      names.forEach(function (name, j) {
        if (j) {
          out += type(
            "/",
            size,
            x + (gap - slash) / 2,
            y,
            'fill="' + b + '"',
          ).svg;
          x += gap;
        }
        var t = type(name, size, x, y, 'fill="' + a + '"');
        out += t.svg;
        x += t.w;
      });
    });
    return svg(
      846,
      Math.ceil(y + 10),
      "Featured projects: " + [].concat.apply([], tiers).join(", "),
      out,
    );
  }

  root.Poster = {
    heroSVG: heroSVG,
    headSVG: headSVG,
    lineupSVG: lineupSVG,
    FACE: FACE,
  };
})(window);
