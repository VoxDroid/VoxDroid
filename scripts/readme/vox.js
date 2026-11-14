/*
 * Voxel renderer for the README art (the "voxel" variant).
 * Works as a plain script in the browser (window.Vox) and in Node (globalThis.Vox).
 * Output is deterministic: the same input always gives the same SVG.
 */
(function (root) {
  function rgb(h) {
    h = h.replace("#", "");
    return [0, 2, 4].map(function (i) {
      return parseInt(h.substr(i, 2), 16);
    });
  }
  function mix(c, t, f) {
    var a = rgb(c),
      b = rgb(t);
    return (
      "#" +
      a
        .map(function (v, i) {
          return Math.round(v + (b[i] - v) * f)
            .toString(16)
            .padStart(2, "0");
        })
        .join("")
    );
  }
  function lighten(c, f) {
    return mix(c, "#ffffff", f);
  }
  function darken(c, f) {
    return mix(c, "#05060c", f);
  }

  var THEMES = {
    light: { fg: "#1f2328", accent: "#4f46e5", rule: "#d1d9e0" },
    dark: { fg: "#f0f6fc", accent: "#8b8ffb", rule: "#3d444d" },
  };

  /* One CSS class per colour keeps the files small. */
  function Sheet() {
    this.map = new Map();
    this.css = "";
  }
  Sheet.prototype.cls = function (fill, stroke) {
    var key = fill + "/" + (stroke || "");
    if (!this.map.has(key)) {
      var name = "k" + this.map.size.toString(36);
      this.map.set(key, name);
      this.css +=
        "." +
        name +
        "{fill:" +
        fill +
        (stroke ? ";stroke:" + stroke : "") +
        "}";
    }
    return this.map.get(key);
  };

  function Model() {
    this.v = new Map();
  }
  Model.prototype.set = function (x, y, z, c, cls, glow, st) {
    this.v.set(x + "," + y + "," + z, {
      x: x,
      y: y,
      z: z,
      c: c,
      cls: cls || "",
      glow: !!glow,
      st: st || "",
    });
  };
  Model.prototype.del = function (x, y, z) {
    this.v.delete(x + "," + y + "," + z);
  };
  Model.prototype.has = function (x, y, z) {
    return this.v.has(x + "," + y + "," + z);
  };
  Model.prototype.get = function (x, y, z) {
    return this.v.get(x + "," + y + "," + z);
  };
  Model.prototype.box = function (x0, x1, y0, y1, z0, z1, c, cls, glow) {
    for (var x = x0; x <= x1; x++)
      for (var y = y0; y <= y1; y++)
        for (var z = z0; z <= z1; z++) this.set(x, y, z, c, cls, glow);
  };

  /* Projection: x runs down-right, y runs down-left, z is up. The viewer sees the top, +x and +y faces. */
  function Proj(w, h) {
    this.w = w;
    this.h = h;
    this.minX = 1e9;
    this.maxX = -1e9;
    this.minY = 1e9;
    this.maxY = -1e9;
  }
  Proj.prototype.xy = function (x, y, z) {
    return [(x - y) * this.w, ((x + y) * this.w) / 2 - z * this.h];
  };
  Proj.prototype.pt = function (x, y, z) {
    var p = this.xy(x, y, z),
      X = p[0],
      Y = p[1];
    if (X < this.minX) this.minX = X;
    if (X > this.maxX) this.maxX = X;
    if (Y < this.minY) this.minY = Y;
    if (Y > this.maxY) this.maxY = Y;
    return Math.round(X * 10) / 10 + "," + Math.round(Y * 10) / 10;
  };

  function render(m, P, sheet, opt) {
    opt = opt || {};
    var seam = opt.seam == null ? 0.07 : opt.seam,
      top = opt.top == null ? 0.2 : opt.top;
    var vs = Array.from(m.v.values()).sort(function (a, b) {
      return a.x + a.y + a.z - (b.x + b.y + b.z);
    });
    var s = "",
      glow = "";
    function face(pts, fill, v) {
      var extra = v.cls ? " " + v.cls : "",
        st = v.st ? ' style="' + v.st + '"' : "";
      s +=
        '<polygon class="' +
        sheet.cls(fill, darken(fill, seam)) +
        extra +
        '"' +
        st +
        ' points="' +
        pts +
        '"/>';
      if (v.glow)
        glow +=
          '<polygon class="' +
          sheet.cls(fill) +
          extra +
          '"' +
          st +
          ' points="' +
          pts +
          '"/>';
    }
    vs.forEach(function (v) {
      var x = v.x,
        y = v.y,
        z = v.z,
        c = v.c;
      if (!m.has(x, y + 1, z))
        face(
          P.pt(x, y + 1, z + 1) +
            " " +
            P.pt(x + 1, y + 1, z + 1) +
            " " +
            P.pt(x + 1, y + 1, z) +
            " " +
            P.pt(x, y + 1, z),
          v.glow ? c : darken(c, 0.34),
          v,
        );
      if (!m.has(x + 1, y, z))
        face(
          P.pt(x + 1, y, z + 1) +
            " " +
            P.pt(x + 1, y + 1, z + 1) +
            " " +
            P.pt(x + 1, y + 1, z) +
            " " +
            P.pt(x + 1, y, z),
          c,
          v,
        );
      if (!m.has(x, y, z + 1))
        face(
          P.pt(x, y, z + 1) +
            " " +
            P.pt(x + 1, y, z + 1) +
            " " +
            P.pt(x + 1, y + 1, z + 1) +
            " " +
            P.pt(x, y + 1, z + 1),
          lighten(c, v.glow ? 0.1 : top),
          v,
        );
    });
    return (
      s + (glow ? '<g filter="url(#glow)" opacity=".9">' + glow + "</g>" : "")
    );
  }

  /* 7-row block font with two-voxel strokes, so letters hold up in 3D. */
  var FONT = {
    A: ["011110", "110011", "110011", "111111", "110011", "110011", "110011"],
    B: ["111110", "110011", "110011", "111110", "110011", "110011", "111110"],
    C: ["011111", "110000", "110000", "110000", "110000", "110000", "011111"],
    D: ["111110", "110011", "110011", "110011", "110011", "110011", "111110"],
    E: ["111111", "110000", "110000", "111100", "110000", "110000", "111111"],
    F: ["111111", "110000", "110000", "111100", "110000", "110000", "110000"],
    G: ["011111", "110000", "110000", "110111", "110011", "110011", "011110"],
    H: ["110011", "110011", "110011", "111111", "110011", "110011", "110011"],
    I: ["11", "11", "11", "11", "11", "11", "11"],
    J: ["000011", "000011", "000011", "000011", "110011", "110011", "011110"],
    K: ["110011", "110110", "111100", "111000", "111100", "110110", "110011"],
    L: ["110000", "110000", "110000", "110000", "110000", "110000", "111111"],
    M: [
      "1100011",
      "1110111",
      "1111111",
      "1101011",
      "1100011",
      "1100011",
      "1100011",
    ],
    N: ["110011", "111011", "111011", "110111", "110111", "110011", "110011"],
    O: ["011110", "110011", "110011", "110011", "110011", "110011", "011110"],
    P: ["111110", "110011", "110011", "111110", "110000", "110000", "110000"],
    R: ["111110", "110011", "110011", "111110", "110110", "110011", "110011"],
    S: ["011111", "110000", "110000", "011110", "000011", "000011", "111110"],
    T: ["111111", "001100", "001100", "001100", "001100", "001100", "001100"],
    U: ["110011", "110011", "110011", "110011", "110011", "110011", "011110"],
    V: ["110011", "110011", "110011", "110011", "110011", "011110", "001100"],
    W: [
      "1100011",
      "1100011",
      "1100011",
      "1101011",
      "1111111",
      "1110111",
      "1100011",
    ],
    X: ["110011", "110011", "011110", "001100", "011110", "110011", "110011"],
    Y: ["110011", "110011", "011110", "001100", "001100", "001100", "001100"],
    ".": ["00", "00", "00", "00", "00", "11", "11"],
    " ": ["000", "000", "000", "000", "000", "000", "000"],
  };
  function textWidth(str) {
    var n = 0;
    for (var i = 0; i < str.length; i++)
      n += FONT[str[i]][0].length + (i ? 1 : 0);
    return n;
  }

  /* Letters stand on the plane x = x0..x0+depth-1 and read left to right as y decreases. */
  function letters(m, str, yStart, x0, z0, depth, colorAt) {
    var y = yStart;
    for (var i = 0; i < str.length; i++) {
      var g = FONT[str[i]];
      for (var r = 0; r < 7; r++)
        for (var c = 0; c < g[r].length; c++)
          if (g[r][c] === "1")
            for (var d = 0; d < depth; d++)
              m.set(x0 + d, y - c, z0 + 6 - r, colorAt(i));
      y -= g[0].length + 1;
    }
  }

  /* Flat pixel text cut from the same glyphs as the 3D letters. */
  function pixelText(str, x, y, px, fill) {
    var s = "",
      cx = x;
    for (var i = 0; i < str.length; i++) {
      var g = FONT[str[i]];
      for (var r = 0; r < 7; r++) {
        var c = 0;
        while (c < g[r].length) {
          if (g[r][c] === "1") {
            var e = c;
            while (e < g[r].length && g[r][e] === "1") e++;
            s +=
              "M" +
              Math.round((cx + c * px) * 10) / 10 +
              " " +
              Math.round((y + r * px) * 10) / 10 +
              "h" +
              (e - c) * px +
              "v" +
              px +
              "h" +
              -(e - c) * px +
              "z";
            c = e;
          } else c++;
        }
      }
      cx += (g[0].length + 1) * px;
    }
    return '<path fill="' + fill + '" d="' + s + '"/>';
  }

  var PAL = {
    indigo: "#6366f1",
    lav: "#9da0ff",
    floorA: "#30345c",
    floorB: "#2b2f54",
    under: "#1c1f3a",
    trace: "#8f93ff",
    body: "#d3d7ec",
    body2: "#b6bbd6",
    dark: "#2a2d3b",
    visor: "#141624",
    amber: "#ffb224",
    coral: "#ff6f61",
    rack: "#3b4060",
    rackFace: "#191b2b",
    green: "#3ddc84",
    bread: "#d9983a",
    leaf: "#3fae6b",
    pot: "#b9683f",
  };

  /* The diorama. Edit this function to change the scene. */
  function buildScene() {
    var floor = new Model(),
      word = new Model(),
      back = new Model(),
      droid = new Model(),
      props = new Model();
    var X0 = -6,
      X1 = 9,
      Y0 = -10,
      Y1 = 53,
      x,
      y;
    function tile(x, y) {
      return (x + y) & 1 ? PAL.floorA : PAL.floorB;
    }

    for (x = X0; x <= X1; x++)
      for (y = Y0; y <= Y1; y++) floor.set(x, y, 0, tile(x, y));
    for (x = X0 + 1; x <= X1 - 1; x++)
      for (y = Y0 + 1; y <= Y1 - 1; y++) floor.set(x, y, -1, PAL.under);
    function shadow(x0, x1, y0, y1) {
      for (var x = x0; x <= x1; x++)
        for (var y = y0; y <= y1; y++) {
          var t = floor.get(x, y, 0);
          if (t && !t.glow) t.c = darken(tile(x, y), 0.32);
        }
    }
    // a line of light in front of the wordmark, pulsing from the racks toward the droid
    for (y = 50; y >= 1; y--)
      floor.set(
        3,
        y,
        0,
        PAL.trace,
        "pulse",
        true,
        "animation-delay:" + ((50 - y) * 0.06).toFixed(2) + "s",
      );
    for (x = 4; x <= 5; x++)
      floor.set(
        x,
        1,
        0,
        PAL.trace,
        "pulse",
        true,
        "animation-delay:" + (2.94 + (x - 3) * 0.06).toFixed(2) + "s",
      );

    letters(word, "VOXDROID", 50, 0, 1, 2, function (i) {
      return i < 3 ? PAL.indigo : PAL.lav;
    });

    // homelab behind the wordmark
    function rack(x0, y0, hgt, seed) {
      back.box(x0, x0 + 3, y0, y0 + 3, 1, hgt, PAL.rack);
      back.box(x0 + 3, x0 + 3, y0 + 1, y0 + 2, 2, hgt - 1, PAL.rackFace);
      for (var z = 3; z < hgt; z += 2)
        back.set(
          x0 + 3,
          y0 + 1 + (((z + seed) >> 1) % 2),
          z,
          (z + seed) % 3 ? PAL.green : PAL.amber,
          "led" + ((z + seed) % 3),
          true,
        );
      shadow(x0, x0 + 3, y0 + 4, y0 + 5);
    }
    rack(-5, 33, 14, 0);
    rack(-5, 28, 11, 1);
    rack(-5, 14, 13, 2);
    // antenna mast with a small dish
    back.box(-4, -4, 42, 42, 1, 15, "#565b7c");
    back.box(-5, -3, 41, 43, 1, 1, PAL.rack);
    back.box(-4, -3, 41, 43, 13, 13, "#c9cde4");
    back.set(-3, 42, 14, "#c9cde4");
    back.set(-4, 42, 16, PAL.coral, "tip", true);
    // plant
    back.box(-4, -3, 7, 8, 1, 2, PAL.pot);
    back.box(-4, -3, 7, 8, 3, 5, PAL.leaf);
    back.box(-5, -2, 7, 8, 4, 4, PAL.leaf);
    back.box(-4, -3, 6, 9, 4, 4, PAL.leaf);
    back.set(-4, 8, 6, PAL.leaf);

    // the droid, facing +x
    var dx = 4,
      dy = -8;
    function D(x0, x1, y0, y1, z0, z1, c, cls, glow) {
      droid.box(dx + x0, dx + x1, dy + y0, dy + y1, z0, z1, c, cls, glow);
    }
    D(0, 4, 0, 1, 1, 2, PAL.dark);
    D(0, 4, 5, 6, 1, 2, PAL.dark); // treads
    D(4, 4, 0, 1, 2, 2, "#444860");
    D(4, 4, 5, 6, 2, 2, "#444860");
    D(1, 3, 2, 4, 2, 3, "#3b3f50"); // hip
    D(0, 3, 1, 5, 4, 8, PAL.body); // torso
    D(3, 3, 2, 4, 5, 7, PAL.indigo);
    D(3, 3, 3, 3, 6, 6, PAL.amber, "tip", true); // chest panel
    D(1, 2, 0, 0, 5, 7, PAL.body2);
    D(1, 2, 6, 6, 5, 7, PAL.body2); // arms
    D(1, 2, 0, 0, 8, 8, PAL.indigo);
    D(1, 2, 6, 6, 8, 8, PAL.indigo); // shoulders
    D(1, 2, 0, 0, 4, 4, PAL.dark);
    D(1, 2, 6, 6, 4, 4, PAL.dark); // hands
    D(1, 2, 2, 4, 9, 9, PAL.dark); // neck
    D(0, 4, 0, 6, 10, 13, PAL.body); // head
    D(4, 4, 1, 5, 11, 12, PAL.visor); // visor
    D(4, 4, 2, 2, 11, 12, PAL.amber, "eye", true);
    D(4, 4, 4, 4, 11, 12, PAL.amber, "eye", true);
    D(2, 2, -1, -1, 11, 12, PAL.indigo);
    D(2, 2, 7, 7, 11, 12, PAL.indigo); // ears
    D(2, 2, 3, 3, 14, 15, PAL.dark);
    D(2, 2, 3, 3, 16, 16, PAL.amber, "tip", true); // antenna
    shadow(dx, dx + 4, dy + 7, dy + 8);

    // a loaf of bread, because of the avatar, and a few crates
    props.box(6, 7, 14, 16, 1, 1, PAL.bread);
    props.box(6, 7, 15, 15, 2, 2, lighten(PAL.bread, 0.18));
    props.box(6, 7, 40, 41, 1, 2, "#8b6f4e");
    props.box(6, 7, 43, 44, 1, 1, "#9a7c58");
    props.set(6, 40, 3, "#a58764");

    return {
      floor: floor,
      word: word,
      back: back,
      droid: droid,
      props: props,
    };
  }

  var MOTION =
    "polygon{stroke-width:.5;stroke-linejoin:round}" +
    ".droid{animation:bob 2.8s ease-in-out infinite alternate}" +
    "@keyframes bob{to{transform:translateY(-5px)}}" +
    ".bit{animation:drift 6s ease-in-out infinite alternate}@keyframes drift{from{transform:translateY(6px)}to{transform:translateY(-8px)}}" +
    ".pulse{animation:pulse 4.2s linear infinite}@keyframes pulse{0%,12%{opacity:1}30%,100%{opacity:.28}}" +
    ".eye{animation:blink 5s steps(1,end) infinite}.led1{animation:blink 1.7s steps(1,end) infinite}.led2{animation:blink 2.9s steps(1,end) infinite}" +
    "@keyframes blink{0%,94%{opacity:1}95%,100%{opacity:.1}}" +
    ".tip{animation:tip 1.6s ease-in-out infinite alternate}@keyframes tip{to{opacity:.35}}" +
    "@media (prefers-reduced-motion:reduce){*{animation:none!important}}";

  function wrap(minX, minY, W, H, css, body, label) {
    var n = function (v) {
      return Math.round(v * 10) / 10;
    };
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' +
      [n(minX), n(minY), n(W), n(H)].join(" ") +
      '" width="' +
      Math.round(W) +
      '" height="' +
      Math.round(H) +
      '" role="img" aria-label="' +
      label +
      '">' +
      "<style>" +
      css +
      "</style>" +
      body +
      "</svg>\n"
    );
  }

  function heroSVG(theme) {
    var T = THEMES[theme],
      P = new Proj(9.3, 10.4),
      s = buildScene(),
      sheet = new Sheet();
    var body =
      "<g>" +
      render(s.floor, P, sheet, { seam: 0.12, top: 0.1 }) +
      "</g>" +
      "<g>" +
      render(s.back, P, sheet) +
      "</g>" +
      "<g>" +
      render(s.word, P, sheet) +
      "</g>" +
      "<g>" +
      render(s.props, P, sheet) +
      "</g>" +
      '<g class="droid">' +
      render(s.droid, P, sheet) +
      "</g>";
    var bits = [
      [-12, 30, 9, PAL.indigo],
      [-10, 2, 15, PAL.lav],
      [13, 44, 4, PAL.lav],
      [14, 20, 7, PAL.indigo],
      [-9, 50, 6, PAL.coral],
      [12, -6, 3, PAL.amber],
      [-13, 16, 17, PAL.indigo],
      [15, 34, 1, PAL.indigo],
    ];
    var loose = "";
    bits.forEach(function (b, i) {
      var m = new Model();
      m.set(b[0], b[1], b[2], b[3]);
      loose +=
        '<g class="bit" style="animation-delay:-' +
        (i * 0.9).toFixed(1) +
        "s;animation-duration:" +
        (5 + (i % 3)) +
        's">' +
        render(m, P, sheet) +
        "</g>";
    });
    var pad = 16,
      minX = P.minX - pad,
      minY = P.minY - pad,
      W = P.maxX - P.minX + pad * 2,
      H = P.maxY - P.minY + pad * 2;
    var cx = (P.minX + P.maxX) / 2,
      cy = (P.minY + P.maxY) / 2 + 70;
    var defs =
      '<defs><filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.2"/></filter>' +
      '<radialGradient id="under"><stop offset="0" stop-color="#6366f1" stop-opacity=".4"/><stop offset="1" stop-color="#6366f1" stop-opacity="0"/></radialGradient></defs>';
    var under =
      '<ellipse cx="' +
      cx.toFixed(1) +
      '" cy="' +
      cy.toFixed(1) +
      '" rx="' +
      (W * 0.46).toFixed(1) +
      '" ry="' +
      (W * 0.13).toFixed(1) +
      '" fill="url(#under)" transform="rotate(-26.5 ' +
      cx.toFixed(1) +
      " " +
      cy.toFixed(1) +
      ')"/>';
    var text =
      pixelText("SYSTEMS.", minX + 6, minY + 12, 3.2, T.fg) +
      pixelText("INTELLIGENCE.", minX + 6, minY + 42, 3.2, T.fg) +
      pixelText("CODE.", minX + 6, minY + 72, 3.2, T.accent);
    return wrap(
      minX,
      minY,
      W,
      H,
      MOTION + sheet.css,
      defs + under + "<g>" + loose + "</g>" + body + text,
      "VOXDROID in voxel block letters on a floating island, with a droid, server racks and an antenna mast. Systems. Intelligence. Code.",
    );
  }

  /* Section heading: a small cube, pixel text, and a dotted rule. */
  function headSVG(label, theme) {
    var T = THEMES[theme],
      w = textWidth(label) * 3,
      x0 = 34 + w + 16,
      dots = "";
    for (var x = x0; x < 843; x += 9) dots += "M" + x + " 17h3v3h-3z";
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -10 846 38" width="846" height="38" role="img" aria-label="' +
      label +
      '">' +
      '<path fill="#9da0ff" d="M11 1 22 6.5 11 12 0 6.5z"/><path fill="#4346b4" d="M0 6.5 11 12V25L0 19.5z"/><path fill="#6366f1" d="M22 6.5 11 12V25L22 19.5z"/>' +
      pixelText(label, 34, 3, 3, T.fg) +
      '<path fill="' +
      T.rule +
      '" d="' +
      dots +
      '"/></svg>\n'
    );
  }

  /* Contribution skyline: weeks is an array of 7-number arrays, oldest week first. */
  function skylineSVG(weeks, maxTower) {
    var P = new Proj(8, 5),
      m = new Model(),
      sheet = new Sheet(),
      peak = 0;
    var ramp = ["#30345c", "#4a4ea8", "#6366f1", "#8f92ff", "#c3c5ff"];
    weeks.forEach(function (wk) {
      wk.forEach(function (n) {
        if (n > peak) peak = n;
      });
    });
    maxTower = maxTower || 12;
    for (var wk = 0; wk < weeks.length; wk++)
      for (var d = 0; d < 7; d++) {
        var n = weeks[wk][d] || 0,
          y = weeks.length - 1 - wk,
          x = d;
        var t = peak ? n / peak : 0,
          hgt = n ? Math.max(1, Math.round(t * maxTower)) : 0;
        var lvl =
          n === 0 ? 0 : t <= 0.25 ? 1 : t <= 0.5 ? 2 : t <= 0.75 ? 3 : 4;
        m.set(x, y, 0, ramp[0]);
        for (var z = 1; z <= hgt; z++) m.set(x, y, z, ramp[lvl]);
      }
    var body = render(m, P, sheet, { seam: 0.12 });
    var pad = 6,
      W = P.maxX - P.minX + pad * 2,
      H = P.maxY - P.minY + pad * 2;
    return wrap(
      P.minX - pad,
      P.minY - pad,
      W,
      H,
      "polygon{stroke-width:.5;stroke-linejoin:round}" + sheet.css,
      body,
      "Contributions per day over the last " +
        weeks.length +
        " weeks, drawn as a skyline. The busiest day had " +
        peak +
        ".",
    );
  }

  root.Vox = {
    heroSVG: heroSVG,
    headSVG: headSVG,
    skylineSVG: skylineSVG,
    THEMES: THEMES,
  };
})(typeof window !== "undefined" ? window : globalThis);
