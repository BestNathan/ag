function h6h(C57) {
    return (h6h = "function" == typeof Symbol && "symbol" == typeof Symbol["iterator"] ? function(O57) {
        return typeof O57;
    }
    : function(V57) {
        return V57 && "function" == typeof Symbol && V57["constructor"] === Symbol && V57 !== Symbol["prototype"] ? "symbol" : typeof V57;
    }
    )(C57);
}
var y1h = function(b57) {
    b57 = void 0 !== (b57 = b57 || {}) ? b57 : {};
    var N77, V77 = {};
    for (N77 in b57)
        b57.hasOwnProperty(N77) && (V77[N77] = b57[N77]);
    b57.arguments = [],
    b57.thisProgram = "./this.program",
    b57.quit = function(m47, s47) {
        throw s47;
    }
    ,
    b57.preRun = [],
    b57.postRun = [];
    var D77, Y77, c77, C77 = !1;
    if (D77 = "object" === ("undefined" == typeof window ? "undefined" : h6h(window)),
    Y77 = "function" == typeof importScripts,
    C77 = "object" === ("undefined" == typeof process ? "undefined" : h6h(process)) && "function" == typeof require && !D77 && !Y77,
    c77 = !D77 && !C77 && !Y77,
    b57.ENVIRONMENT)
        throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)");
    S57(void 0 === b57.memoryInitializerPrefixURL, "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead"),
    S57(void 0 === b57.pthreadMainPrefixURL, "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead"),
    S57(void 0 === b57.cdInitializerPrefixURL, "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead"),
    S57(void 0 === b57.filePackagePrefixURL, "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
    var f77, b77, h57 = "";
    if (C77)
        h57 = __dirname + "/",
        b57.read = function(z47, e47) {
            var o47;
            return (o47 = w77(z47)) || (f77 || (f77 = require("fs")),
            b77 || (b77 = require("path")),
            z47 = b77.normalize(z47),
            o47 = f77.readFileSync(z47)),
            e47 ? o47 : o47.toString();
        }
        ,
        b57.readBinary = function(H47) {
            var Q47 = b57.read(H47, !0);
            return Q47.buffer || (Q47 = new Uint8Array(Q47)),
            S57(Q47.buffer),
            Q47;
        }
        ,
        process.argv.length > 1 && (b57.thisProgram = process.argv[1].replace(/\\/g, "/")),
        b57.arguments = process.argv.slice(2),
        process.on("uncaughtException", function(c47) {
            if (!(c47 instanceof t77))
                throw c47;
        }),
        process.on("unhandledRejection", q57),
        b57.quit = function(X47) {
            process.exit(X47);
        }
        ,
        b57.inspect = function() {
            return "[Emscripten Module object]";
        }
        ;
    else if (c77)
        "undefined" != typeof read && (b57.read = function(f47) {
            var Z47 = w77(f47);
            return Z47 ? A77(Z47) : read(f47);
        }
        ),
        b57.readBinary = function(l47) {
            var g47;
            return (g47 = w77(l47)) ? g47 : "function" == typeof readbuffer ? new Uint8Array(readbuffer(l47)) : (S57("object" === h6h(g47 = read(l47, "binary"))),
            g47);
        }
        ,
        "undefined" != typeof scriptArgs ? b57.arguments = scriptArgs : void 0 !== arguments && (b57.arguments = arguments),
        "function" == typeof quit && (b57.quit = function(b47) {
            quit(b47);
        }
        );
    else {
        if (!D77 && !Y77)
            throw new Error("environment detection error");
        Y77 ? h57 = self.location.href : document.currentScript && (h57 = document.currentScript.src),
        h57 = 0 !== h57.indexOf("blob:") ? h57.substr(0, h57.lastIndexOf("/") + 1) : "",
        b57.read = function(W47) {
            try {
                var q47 = new XMLHttpRequest();
                return q47.open("GET", W47, !1),
                q47.send(null),
                q47.responseText;
            } catch (d47) {
                var S47 = w77(W47);
                if (S47)
                    return A77(S47);
                throw d47;
            }
        }
        ,
        Y77 && (b57.readBinary = function(G47) {
            try {
                var y47 = new XMLHttpRequest();
                return y47.open("GET", G47, !1),
                y47.responseType = "arraybuffer",
                y47.send(null),
                new Uint8Array(y47.response);
            } catch (F47) {
                var A47 = w77(G47);
                if (A47)
                    return A47;
                throw F47;
            }
        }
        ),
        b57.readAsync = function(J47, v47, L47) {
            var i47 = new XMLHttpRequest();
            i47.open("GET", J47, !0),
            i47.responseType = "arraybuffer",
            i47.onload = function() {
                if (200 == i47.status || 0 == i47.status && i47.response)
                    v47(i47.response);
                else {
                    var h47 = w77(J47);
                    h47 ? v47(h47.buffer) : L47();
                }
            }
            ,
            i47.onerror = L47,
            i47.send(null);
        }
        ,
        b57.setWindowTitle = function(p47) {
            document.title = p47;
        }
        ;
    }
    var K77 = b57.print || ("undefined" != typeof console ? console.log.bind(console) : "undefined" != typeof print ? print : null)
      , G57 = b57.printErr || ("undefined" != typeof printErr ? printErr : "undefined" != typeof console && console.warn.bind(console) || K77);
    for (N77 in V77)
        V77.hasOwnProperty(N77) && (b57[N77] = V77[N77]);
    V77 = void 0;
    var i77 = 16;
    function j47(r07, x07) {
        return x07 || (x07 = i77),
        r07 = Math.ceil(r07 / x07) * x07;
    }
    U77 = O77 = T77 = function() {
        q57("cannot use the stack before compiled code is ready to run, and has provided stack access");
    }
    ;
    var R77 = !1;
    function S57(w07, I07) {
        w07 || q57("Assertion failed: " + I07);
    }
    var o77 = {
        stackSave: function() {
            U77();
        },
        stackRestore: function() {
            O77();
        },
        arrayToC: function(N07) {
            var U07, M07, a07 = T77(N07.length);
            return M07 = a07,
            S57((U07 = N07).length >= 0, "writeArrayToMemory array must have a length (should be an array or typed array)"),
            P47.set(U07, M07),
            a07;
        },
        stringToC: function(C07) {
            var O07 = 0;
            if (null != C07 && 0 !== C07) {
                var V07 = 1 + (C07.length << 2);
                (function(j07, B07, Y07) {
                    S57("number" == typeof Y07, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"),
                    function(u07, k07, t07, n07) {
                        if (!(n07 > 0))
                            return 0;
                        for (var E07 = t07, K07 = t07 + n07 - 1, T07 = 0; T07 < u07.length; ++T07) {
                            var D07 = u07.charCodeAt(T07);
                            if (D07 >= 55296 && D07 <= 57343) {
                                var P07 = u07.charCodeAt(++T07);
                                D07 = 65536 + ((1023 & D07) << 10) | 1023 & P07;
                            }
                            if (D07 <= 127) {
                                if (t07 >= K07)
                                    break;
                                k07[t07++] = D07;
                            } else if (D07 <= 2047) {
                                if (t07 + 1 >= K07)
                                    break;
                                k07[t07++] = 192 | D07 >> 6,
                                k07[t07++] = 128 | 63 & D07;
                            } else if (D07 <= 65535) {
                                if (t07 + 2 >= K07)
                                    break;
                                k07[t07++] = 224 | D07 >> 12,
                                k07[t07++] = 128 | D07 >> 6 & 63,
                                k07[t07++] = 128 | 63 & D07;
                            } else if (D07 <= 2097151) {
                                if (t07 + 3 >= K07)
                                    break;
                                k07[t07++] = 240 | D07 >> 18,
                                k07[t07++] = 128 | D07 >> 12 & 63,
                                k07[t07++] = 128 | D07 >> 6 & 63,
                                k07[t07++] = 128 | 63 & D07;
                            } else if (D07 <= 67108863) {
                                if (t07 + 4 >= K07)
                                    break;
                                k07[t07++] = 248 | D07 >> 24,
                                k07[t07++] = 128 | D07 >> 18 & 63,
                                k07[t07++] = 128 | D07 >> 12 & 63,
                                k07[t07++] = 128 | D07 >> 6 & 63,
                                k07[t07++] = 128 | 63 & D07;
                            } else {
                                if (t07 + 5 >= K07)
                                    break;
                                k07[t07++] = 252 | D07 >> 30,
                                k07[t07++] = 128 | D07 >> 24 & 63,
                                k07[t07++] = 128 | D07 >> 18 & 63,
                                k07[t07++] = 128 | D07 >> 12 & 63,
                                k07[t07++] = 128 | D07 >> 6 & 63,
                                k07[t07++] = 128 | 63 & D07;
                            }
                        }
                        k07[t07] = 0;
                    }(j07, i57, B07, Y07);
                }(C07, O07 = T77(V07), V07));
            }
            return O07;
        }
    }
      , B47 = {
        string: o77.stringToC,
        array: o77.arrayToC
    };
    function Y47(s07, R07) {
        if (0 === R07 || !s07)
            return "";
        for (var Q07, o07 = 0, m07 = 0; S57(s07 + m07 < J57),
        o07 |= Q07 = i57[s07 + m07 >> 0],
        (0 != Q07 || R07) && (m07++,
        !R07 || m07 != R07); )
            ;
        R07 || (R07 = m07);
        var z07 = "";
        if (o07 < 128) {
            for (var e07; R07 > 0; )
                e07 = String.fromCharCode.apply(String, i57.subarray(s07, s07 + Math.min(R07, 1024))),
                z07 = z07 ? z07 + e07 : e07,
                s07 += 1024,
                R07 -= 1024;
            return z07;
        }
        return function(H07) {
            return n47(i57, H07);
        }(s07);
    }
    var z77 = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
    function n47(Z07, X07) {
        for (var l07 = X07; Z07[l07]; )
            ++l07;
        if (l07 - X07 > 16 && Z07.subarray && z77)
            return z77.decode(Z07.subarray(X07, l07));
        for (var c07, f07, b07, q07, S07, g07 = ""; ; ) {
            if (!(c07 = Z07[X07++]))
                return g07;
            if (128 & c07)
                if (f07 = 63 & Z07[X07++],
                192 != (224 & c07))
                    if (b07 = 63 & Z07[X07++],
                    224 == (240 & c07) ? c07 = (15 & c07) << 12 | f07 << 6 | b07 : (q07 = 63 & Z07[X07++],
                    240 == (248 & c07) ? c07 = (7 & c07) << 18 | f07 << 12 | b07 << 6 | q07 : (S07 = 63 & Z07[X07++],
                    c07 = 248 == (252 & c07) ? (3 & c07) << 24 | f07 << 18 | b07 << 12 | q07 << 6 | S07 : (1 & c07) << 30 | f07 << 24 | b07 << 18 | q07 << 12 | S07 << 6 | 63 & Z07[X07++])),
                    c07 < 65536)
                        g07 += String.fromCharCode(c07);
                    else {
                        var W07 = c07 - 65536;
                        g07 += String.fromCharCode(55296 | W07 >> 10, 56320 | 1023 & W07);
                    }
                else
                    g07 += String.fromCharCode((31 & c07) << 6 | f07);
            else
                g07 += String.fromCharCode(c07);
        }
    }
    var F57, P47, i57, u47, p57, M77, a77, y77, F77, D47, L57, e77, S77;
    "undefined" != typeof TextDecoder && new TextDecoder("utf-16le");
    function R47(d07) {
        return function y07(A07) {
            y07.shown || (y07.shown = {}),
            y07.shown[A07] || (y07.shown[A07] = 1,
            G57(A07));
        }("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling"),
        d07;
    }
    function E47() {
        var G07 = function() {
            var F07 = new Error();
            if (!F07.stack) {
                try {
                    throw new Error(0);
                } catch (i07) {
                    F07 = i07;
                }
                if (!F07.stack)
                    return "(no stack trace available)";
            }
            return F07.stack.toString();
        }();
        return b57.extraStackTrace && (G07 += "\n" + b57.extraStackTrace()),
        G07.replace(/__Z[\w\d_]+/g, function(J07) {
            var v07 = R47(J07);
            return J07 === v07 ? J07 : v07 + " [" + J07 + "]";
        });
    }
    function u77() {
        if (34821223 == M77[(L57 >> 2) - 1] && 2310721022 == M77[(L57 >> 2) - 2] || q57("Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x02135467, but received 0x" + M77[(L57 >> 2) - 2].toString(16) + " " + M77[(L57 >> 2) - 1].toString(16)),
        1668509029 !== p57[0])
            throw "Runtime error: The application has corrupted its heap memory area (address zero)!";
    }
    function t47() {
        q57("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + J57 + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or (4) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ");
    }
    a77 = L57 = 0,
    y77 = !1;
    var n77 = b57.TOTAL_STACK || 5242880
      , J57 = b57.TOTAL_MEMORY || 16777216;
    if (J57 < n77 && G57("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + J57 + "! (TOTAL_STACK=" + n77 + ")"),
    S57("undefined" != typeof Int32Array && "undefined" != typeof Float64Array && void 0 !== Int32Array.prototype.subarray && void 0 !== Int32Array.prototype.set, "JS engine does not provide full typed array support"),
    b57.buffer ? S57((F57 = b57.buffer).byteLength === J57, "provided buffer should be " + J57 + " bytes, but it is " + F57.byteLength) : (S57((F57 = new ArrayBuffer(J57)).byteLength === J57),
    b57.buffer = F57),
    b57.HEAP8 = P47 = new Int8Array(F57),
    b57.HEAP16 = u47 = new Int16Array(F57),
    b57.HEAP32 = p57 = new Int32Array(F57),
    b57.HEAPU8 = i57 = new Uint8Array(F57),
    b57.HEAPU16 = new Uint16Array(F57),
    b57.HEAPU32 = M77 = new Uint32Array(F57),
    b57.HEAPF32 = new Float32Array(F57),
    b57.HEAPF64 = new Float64Array(F57),
    p57[0] = 1668509029,
    u47[1] = 25459,
    115 !== i57[2] || 99 !== i57[3])
        throw "Runtime error: expected the system to be little-endian!";
    function P77(p07) {
        for (; p07.length > 0; ) {
            var L07 = p07.shift();
            if ("function" != typeof L07) {
                var h07 = L07.func;
                "number" == typeof h07 ? void 0 === L07.arg ? b57.dynCall_v(h07) : b57.dynCall_vi(h07, L07.arg) : h07(void 0 === L07.arg ? null : L07.arg);
            } else
                L07();
        }
    }
    var Z77 = []
      , X77 = []
      , K47 = []
      , Q77 = []
      , A57 = !1;
    Math.imul && -5 === Math.imul(4294967295, 5) || (Math.imul = function(w37, I37) {
        var x37 = 65535 & w37
          , r37 = 65535 & I37;
        return x37 * r37 + ((w37 >>> 16) * r37 + x37 * (I37 >>> 16) << 16) | 0;
    }
    ),
    Math.imul = Math.imul,
    Math.clz32 || (Math.clz32 = function(a37) {
        var U37 = 32
          , N37 = a37 >> 16;
        return N37 && (U37 -= 16,
        a37 = N37),
        (N37 = a37 >> 8) && (U37 -= 8,
        a37 = N37),
        (N37 = a37 >> 4) && (U37 -= 4,
        a37 = N37),
        (N37 = a37 >> 2) && (U37 -= 2,
        a37 = N37),
        (N37 = a37 >> 1) ? U37 - 2 : U37 - a37;
    }
    ),
    Math.clz32 = Math.clz32,
    Math.trunc || (Math.trunc = function(M37) {
        return M37 < 0 ? Math.ceil(M37) : Math.floor(M37);
    }
    ),
    Math.trunc = Math.trunc;
    var r77 = 0
      , x77 = null
      , j77 = null
      , B77 = {};
    b57.preloadedImages = {},
    b57.preloadedAudios = {};
    var v57 = null
      , d57 = {
        error: function() {
            q57("Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with  -s FORCE_FILESYSTEM=1");
        },
        init: function() {
            d57.error();
        },
        createDataFile: function() {
            d57.error();
        },
        createPreloadedFile: function() {
            d57.error();
        },
        createLazyFile: function() {
            d57.error();
        },
        open: function() {
            d57.error();
        },
        mkdev: function() {
            d57.error();
        },
        registerDevice: function() {
            d57.error();
        },
        analyzePath: function() {
            d57.error();
        },
        loadFilesFromDB: function() {
            d57.error();
        },
        ErrnoError: function() {
            d57.error();
        }
    };
    b57.FS_createDataFile = d57.createDataFile,
    b57.FS_createPreloadedFile = d57.createPreloadedFile;
    var s77 = "data:application/octet-stream;base64,";
    function T47(C37) {
        return String.prototype.startsWith ? C37.startsWith(s77) : 0 === C37.indexOf(s77);
    }
    a77 = 2280,
    X77.push(),
    v57 = "data:application/octet-stream;base64,AAAAAAAAAADR9pHS0HD42vi+FPcO90nKJTc38G4uORF5QRi+uu8oM1dfafp+3+4u6OtGtJII+F4YsybxMhbkoqmLG+XO9PsN6/ntEW2IiygKN/cnY35bEpo4gM8u+CYAZjD3Lmz3MacO3luOYlLC+DI8OLEc55ia+nP1v+YtndfjiW8ZPZ7kvGy0R5g66l5RlteOWXUgb5EiZGi9PoJktrmIlNF8taAq5iae5cC48JVagS53oTkX7h7vTiFgqhvBi7UbHvwYRgAP57jKldKS6lWa2dpsg0hOBb/5CbeLpX2rF3WgeIpqLXEwUQxAFlbbUlC6tnattWdGBNHE9obmiR1Us6nNK0Ei7CiwWNV5cG/B/n7Jcy83ueQYT8c2OhkxWfi0BkOAd4U0iBvxA4I//PocjpAUAKdjodg9R5emEzz3S5/ocgHQYf+PmJu+y0qUlvJFINdg+1qEXSMmwwJ8CGniGvCvqJ3FEv0hZgdJTSkuX4GHCtwOLD5ome1/Km1b6SfdFVMeEfU4k8KMZOverFzT9G7W7jLOkeWeOaNC1OGuyBCNqjvvnMzjV2JEH2XgpN8zwLw1JLsLe8/zxkx6XqKxdLINayW9eAVI7Tyj5u/A8oGJb9DGKu7qvUP91eMPlNcnJKfIsik7fRAwV1WE94932aYAqiOR4WkOpBFlCxU/7NMIZ1DNuRRYiJ6wDNKCQmxJCjdLTtjWL03fagZ+F7jdFs62+Sva8PiaWbec6aH0h7/zLEd5Yhn+1HygqIv8lmjnky3RugMFAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAANgCAAAABAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAK/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAI=";
    var H77 = a77;
    a77 += 16,
    S57(H77 % 8 == 0);
    var y57 = {
        varargs: 0,
        get: function(O37) {
            return y57.varargs += 4,
            p57[y57.varargs - 4 >> 2];
        },
        getStr: function() {
            return Y47(y57.get());
        },
        get64: function() {
            var V37 = y57.get()
              , Y37 = y57.get();
            return S57(V37 >= 0 ? 0 === Y37 : -1 === Y37),
            V37;
        },
        getZero: function() {
            S57(0 === y57.get());
        }
    };
    function I77(P37, n37) {
        y57.varargs = n37;
        try {
            var T37 = y57.get()
              , t37 = y57.get()
              , u37 = y57.get()
              , k37 = 0;
            I77.buffers || (I77.buffers = [null, [], []],
            I77.printChar = function(s37, R37) {
                var E37 = I77.buffers[s37];
                S57(E37),
                0 === R37 || 10 === R37 ? ((1 === s37 ? K77 : G57)(n47(E37, 0)),
                E37.length = 0) : E37.push(R37);
            }
            );
            for (var j37 = 0; j37 < u37; j37++) {
                for (var K37 = p57[t37 + 8 * j37 >> 2], D37 = p57[t37 + (8 * j37 + 4) >> 2], B37 = 0; B37 < D37; B37++)
                    I77.printChar(T37, i57[K37 + B37]);
                k37 += D37;
            }
            return k37;
        } catch (m37) {
            return void 0 !== d57 && m37 instanceof d57.ErrnoError || q57(m37),
            -m37.errno;
        }
    }
    function A77(Q37) {
        for (var e37 = [], o37 = 0; o37 < Q37.length; o37++) {
            var z37 = Q37[o37];
            z37 > 255 && (S57(!1, "Character code " + z37 + " (" + String.fromCharCode(z37) + ")  at offset " + o37 + " not in 0x00-0xFF."),
            z37 &= 255),
            e37.push(String.fromCharCode(z37));
        }
        return e37.join("");
    }
    S77 = function(c37) {
        S57(!y77);
        var H37 = a77;
        return S57((a77 = a77 + c37 + 15 & -16) < J57, "not enough memory for static allocation - increase TOTAL_MEMORY"),
        H37;
    }(4),
    F77 = D47 = j47(a77),
    e77 = j47(L57 = F77 + n77),
    p57[S77 >> 2] = e77,
    y77 = !0,
    S57(e77 < J57, "TOTAL_MEMORY not big enough for stack");
    var G77 = "function" == typeof atob ? atob : function(X37) {
        var q37, W37, d37, b37, l37, S37, f37 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", g37 = "", Z37 = 0;
        X37 = X37.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        do {
            q37 = f37.indexOf(X37.charAt(Z37++)) << 2 | (b37 = f37.indexOf(X37.charAt(Z37++))) >> 4,
            W37 = (15 & b37) << 4 | (l37 = f37.indexOf(X37.charAt(Z37++))) >> 2,
            d37 = (3 & l37) << 6 | (S37 = f37.indexOf(X37.charAt(Z37++))),
            g37 += String.fromCharCode(q37),
            64 !== l37 && (g37 += String.fromCharCode(W37)),
            64 !== S37 && (g37 += String.fromCharCode(d37));
        } while (Z37 < X37.length);return g37;
    }
    ;
    function w77(y37) {
        if (T47(y37))
            return function(i37) {
                if ("boolean" == typeof C77 && C77) {
                    var A37;
                    try {
                        A37 = Buffer.from(i37, "base64");
                    } catch (v37) {
                        A37 = new Buffer(i37,"base64");
                    }
                    return new Uint8Array(A37.buffer,A37.byteOffset,A37.byteLength);
                }
                try {
                    for (var F37 = G77(i37), J37 = new Uint8Array(F37.length), G37 = 0; G37 < F37.length; ++G37)
                        J37[G37] = F37.charCodeAt(G37);
                    return J37;
                } catch (L37) {
                    throw new Error("Converting base64 string to bytes failed.");
                }
            }(y37.slice(s77.length));
    }
    b57.asmGlobalArg = {
        Math: Math,
        Int8Array: Int8Array,
        Int16Array: Int16Array,
        Int32Array: Int32Array,
        Uint8Array: Uint8Array,
        Uint16Array: Uint16Array,
        Uint32Array: Uint32Array,
        Float32Array: Float32Array,
        Float64Array: Float64Array,
        NaN: NaN,
        Infinity: 1 / 0
    },
    b57.asmLibraryArg = {
        abort: q57,
        assert: S57,
        enlargeMemory: function() {
            t47();
        },
        getTotalMemory: function() {
            return J57;
        },
        abortOnCannotGrowMemory: t47,
        abortStackOverflow: function(h37) {
            q57("Stack overflow! Attempted to allocate " + h37 + " bytes on the stack, but stack has only " + (L57 - U77() + h37) + " bytes available!");
        },
        nullFunc_ii: function(p37) {
            G57("Invalid function pointer called with signature 'ii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"),
            G57("Build with ASSERTIONS=2 for more info."),
            q57(p37);
        },
        nullFunc_iiii: function(x17) {
            G57("Invalid function pointer called with signature 'iiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"),
            G57("Build with ASSERTIONS=2 for more info."),
            q57(x17);
        },
        invoke_ii: function(w17, I17) {
            var r17 = U77();
            try {
                return b57.dynCall_ii(w17, I17);
            } catch (a17) {
                if (O77(r17),
                "number" != typeof a17 && "longjmp" !== a17)
                    throw a17;
                b57.setThrew(1, 0);
            }
        },
        invoke_iiii: function(U17, M17, C17, O17) {
            var N17 = U77();
            try {
                return b57.dynCall_iiii(U17, M17, C17, O17);
            } catch (V17) {
                if (O77(N17),
                "number" != typeof V17 && "longjmp" !== V17)
                    throw V17;
                b57.setThrew(1, 0);
            }
        },
        ___lock: function() {},
        ___setErrNo: function(Y17) {
            return b57.___errno_location ? p57[b57.___errno_location() >> 2] = Y17 : G57("failed to set errno from JS"),
            Y17;
        },
        ___syscall140: function(T17, K17) {
            y57.varargs = K17;
            try {
                var j17 = y57.getStreamFromFD()
                  , t17 = (y57.get(),
                y57.get())
                  , k17 = y57.get()
                  , B17 = y57.get()
                  , D17 = t17;
                return d57.llseek(j17, D17, B17),
                p57[k17 >> 2] = j17.position,
                j17.getdents && 0 === D17 && 0 === B17 && (j17.getdents = null),
                0;
            } catch (u17) {
                return void 0 !== d57 && u17 instanceof d57.ErrnoError || q57(u17),
                -u17.errno;
            }
        },
        ___syscall146: I77,
        ___syscall54: function(P17, n17) {
            y57.varargs = n17;
            try {
                return 0;
            } catch (E17) {
                return void 0 !== d57 && E17 instanceof d57.ErrnoError || q57(E17),
                -E17.errno;
            }
        },
        ___syscall6: function(m17, s17) {
            y57.varargs = s17;
            try {
                var R17 = y57.getStreamFromFD();
                return d57.close(R17),
                0;
            } catch (z17) {
                return void 0 !== d57 && z17 instanceof d57.ErrnoError || q57(z17),
                -z17.errno;
            }
        },
        ___unlock: function() {},
        _emscripten_memcpy_big: function(o17, e17, Q17) {
            return i57.set(i57.subarray(e17, e17 + Q17), o17),
            o17;
        },
        flush_NO_FILESYSTEM: function() {
            var c17 = b57._fflush;
            c17 && c17(0);
            var H17 = I77.printChar;
            if (H17) {
                var X17 = I77.buffers;
                X17[1].length && H17(1, 10),
                X17[2].length && H17(2, 10);
            }
        },
        DYNAMICTOP_PTR: S77,
        tempDoublePtr: H77,
        STACKTOP: D47,
        STACK_MAX: L57
    };
    var W57 = function(l17, q17, d17) {
        "use asm";
        var f17 = new l17.Int8Array(d17);
        var s97 = new l17.Int16Array(d17);
        var Z17 = new l17.Int32Array(d17);
        var A17 = new l17.Uint8Array(d17);
        var m97 = new l17.Uint16Array(d17);
        var Q97 = new l17.Uint32Array(d17);
        var n97 = new l17.Float32Array(d17);
        var P97 = new l17.Float64Array(d17);
        var G17 = q17.DYNAMICTOP_PTR | 0;
        var R97 = q17.tempDoublePtr | 0;
        var g17 = q17.STACKTOP | 0;
        var S17 = q17.STACK_MAX | 0;
        var o97 = l17.NaN
          , e97 = l17.Infinity;
        var v17 = 0;
        var H97 = l17.Math.floor;
        var c97 = l17.Math.abs;
        var X97 = l17.Math.sqrt;
        var Z97 = l17.Math.pow;
        var f97 = l17.Math.cos;
        var g97 = l17.Math.sin;
        var L97 = l17.Math.tan;
        var p97 = l17.Math.acos;
        var x67 = l17.Math.asin;
        var N67 = l17.Math.atan;
        var U67 = l17.Math.atan2;
        var M67 = l17.Math.exp;
        var V67 = l17.Math.log;
        var Y67 = l17.Math.ceil;
        var j67 = l17.Math.imul;
        var D67 = l17.Math.min;
        var u67 = l17.Math.max;
        var K97 = l17.Math.clz32;
        var T97 = q17.abort;
        var u97 = q17.assert;
        var t97 = q17.enlargeMemory;
        var Y97 = q17.getTotalMemory;
        var V97 = q17.abortOnCannotGrowMemory;
        var W17 = q17.abortStackOverflow;
        var x97 = q17.nullFunc_ii;
        var M97 = q17.nullFunc_iiii;
        var z97 = q17.invoke_ii;
        var E97 = q17.invoke_iiii;
        var C97 = q17.___lock;
        var p17 = q17.___setErrNo;
        var r97 = q17.___syscall140;
        var h17 = q17.___syscall146;
        var w97 = q17.___syscall54;
        var I97 = q17.___syscall6;
        var a97 = q17.___unlock;
        var N97 = q17._emscripten_memcpy_big;
        var l97 = q17.flush_NO_FILESYSTEM;
        function b97(n67) {
            n67 = n67 | 0;
            var P67 = 0;
            P67 = g17;
            g17 = g17 + n67 | 0;
            g17 = g17 + 15 & -16;
            if ((g17 | 0) >= (S17 | 0))
                W17(n67 | 0);
            return P67 | 0;
        }
        function q97() {
            return g17 | 0;
        }
        function S97(E67) {
            E67 = E67 | 0;
            g17 = E67;
        }
        function W97(R67, s67) {
            R67 = R67 | 0;
            s67 = s67 | 0;
            g17 = R67;
            S17 = s67;
        }
        function d97(m67, z67) {
            m67 = m67 | 0;
            z67 = z67 | 0;
        }
        function y97(o67) {
            o67 = o67 | 0;
            v17 = o67;
        }
        function A97() {
            return v17 | 0;
        }
        function G97(e67, l67, X67, c67, g67, f67) {
            e67 = e67 | 0;
            l67 = l67 | 0;
            X67 = X67 | 0;
            c67 = c67 | 0;
            g67 = g67 | 0;
            f67 = f67 | 0;
            var H67 = 0
              , Z67 = 0
              , Q67 = 0
              , q67 = 0
              , b67 = 0
              , S67 = 0;
            S67 = g17;
            g17 = g17 + 80 | 0;
            if ((g17 | 0) >= (S17 | 0))
                W17(80);
            b67 = S67 + 68 | 0;
            q67 = S67 + 64 | 0;
            Q67 = S67;
            if (X67 >>> 0 < 12) {
                b67 = -1;
                g17 = S67;
                return b67 | 0;
            }
            H67 = Z17[l67 >> 2] | 0;
            e67 = b17(H67) | 0;
            switch (e67 | 0) {
            case 301825:
                {
                    e67 = l67 + 12 | 0;
                    b67 = f17[e67 >> 0] | 0;
                    H67 = l67 + 13 | 0;
                    H67 = b17(A17[H67 >> 0] | A17[H67 + 1 >> 0] << 8 | A17[H67 + 2 >> 0] << 16 | A17[H67 + 3 >> 0] << 24) | 0;
                    if (!(b67 << 24 >> 24)) {
                        Z17[l67 >> 2] = b17(301826) | 0;
                        Z17[l67 + 4 >> 2] = b17(16) | 0;
                        Z17[l67 + 8 >> 2] = b17(1) | 0;
                        Z17[e67 >> 2] = b17(H67 ^ c67) | 0;
                        Z17[l67 + 16 >> 2] = b17(H67) | 0;
                        b67 = 2;
                        g17 = S67;
                        return b67 | 0;
                    } else {
                        Z17[l67 >> 2] = b17(H67) | 0;
                        b67 = 3;
                        g17 = S67;
                        return b67 | 0;
                    }
                }
            case 301569:
                {
                    Z17[l67 >> 2] = b17(b17(Z17[l67 + 12 >> 2] | 0) | 0) | 0;
                    b67 = 4;
                    g17 = S67;
                    return b67 | 0;
                }
            case 301840:
            case 301584:
                {
                    c67 = b17(Z17[l67 + 8 >> 2] | 0) | 0;
                    switch (e67 | 0) {
                    case 301584:
                        {
                            e67 = f67;
                            Z67 = 9;
                            break;
                        }
                    case 301840:
                        {
                            e67 = g67;
                            Z67 = 9;
                            break;
                        }
                    default:
                        {
                            g67 = 0;
                            H67 = 0;
                            f67 = 0;
                            e67 = 0;
                        }
                    }
                    if ((Z67 | 0) == 9) {
                        e67 = b17(e67) | 0;
                        Z17[q67 >> 2] = e67;
                        g67 = e67 & 255;
                        H67 = e67 >>> 8 & 255;
                        f67 = e67 >>> 16 & 255;
                        e67 = e67 >>> 24 & 255;
                    }
                    if (((c67 >>> 0) % 7 | 0) >>> 0 > 3) {
                        g67 = g67 ^ f17[16 + (c67 & 63) >> 0];
                        f17[q67 >> 0] = g67;
                        H67 = H67 ^ f17[16 + (c67 + 1 & 63) >> 0];
                        f17[q67 + 1 >> 0] = H67;
                        f67 = f67 ^ f17[16 + (c67 + 2 & 63) >> 0];
                        f17[q67 + 2 >> 0] = f67;
                        e67 = e67 ^ f17[16 + (c67 + 3 & 63) >> 0];
                        f17[q67 + 3 >> 0] = e67;
                    }
                    do {
                        if ((c67 + -200 | 0) >>> 0 < 100) {
                            if (X67 >>> 0 > 12) {
                                e67 = 12;
                                do {
                                    Z67 = e67 + -12 | 0;
                                    Q67 = l67 + e67 | 0;
                                    f17[Q67 >> 0] = f17[80 + ((Z67 >>> 0) % 67 | 0) >> 0] ^ (f17[Q67 >> 0] ^ f17[q67 + (Z67 & 3) >> 0]);
                                    e67 = e67 + 1 | 0;
                                } while ((e67 | 0) != (X67 | 0));
                            }
                            Z67 = l67 + 12 | 0;
                            c67 = X67 + -12 | 0;
                            g67 = b17(1522487922) | 0;
                            Z17[b67 >> 2] = g67;
                            f67 = c67 >>> 2;
                            if (!f67)
                                e67 = 0;
                            else {
                                H67 = 0;
                                e67 = 0;
                                while (1) {
                                    e67 = Z67 + e67 | 0;
                                    Z17[e67 >> 2] = Z17[e67 >> 2] ^ g67;
                                    e67 = H67 + 1 | 0;
                                    if ((e67 | 0) == (f67 | 0))
                                        break;
                                    else {
                                        H67 = e67;
                                        e67 = e67 << 2;
                                    }
                                }
                                e67 = c67 & -4;
                            }
                            if (e67 >>> 0 < c67 >>> 0)
                                do {
                                    X67 = Z67 + e67 | 0;
                                    f17[X67 >> 0] = f17[X67 >> 0] ^ f17[b67 + (e67 & 3) >> 0];
                                    e67 = e67 + 1 | 0;
                                } while ((e67 | 0) != (c67 | 0));
                        } else {
                            if ((c67 + -300 | 0) >>> 0 < 100) {
                                if (X67 >>> 0 > 12) {
                                    e67 = 12;
                                    do {
                                        Q67 = l67 + e67 | 0;
                                        f17[Q67 >> 0] = f17[208 + ((f17[q67 + (e67 & 3) >> 0] ^ f17[Q67 >> 0]) & 255) >> 0] | 0;
                                        e67 = e67 + 1 | 0;
                                    } while ((e67 | 0) != (X67 | 0));
                                }
                                Z67 = l67 + 12 | 0;
                                c67 = X67 + -12 | 0;
                                g67 = b17(1522487922) | 0;
                                Z17[b67 >> 2] = g67;
                                f67 = c67 >>> 2;
                                if (!f67)
                                    e67 = 0;
                                else {
                                    H67 = 0;
                                    e67 = 0;
                                    while (1) {
                                        e67 = Z67 + e67 | 0;
                                        Z17[e67 >> 2] = Z17[e67 >> 2] ^ g67;
                                        e67 = H67 + 1 | 0;
                                        if ((e67 | 0) == (f67 | 0))
                                            break;
                                        else {
                                            H67 = e67;
                                            e67 = e67 << 2;
                                        }
                                    }
                                    e67 = c67 & -4;
                                }
                                if (e67 >>> 0 < c67 >>> 0)
                                    do {
                                        X67 = Z67 + e67 | 0;
                                        f17[X67 >> 0] = f17[X67 >> 0] ^ f17[b67 + (e67 & 3) >> 0];
                                        e67 = e67 + 1 | 0;
                                    } while ((e67 | 0) != (c67 | 0));break;
                            }
                            if ((c67 + -400 | 0) >>> 0 < 100) {
                                H67 = (c67 >>> 0) % 31 | 0;
                                if (X67 >>> 0 > 12) {
                                    e67 = 12;
                                    do {
                                        Z67 = e67 + -12 | 0;
                                        Q67 = l67 + e67 | 0;
                                        f17[Q67 >> 0] = f17[80 + ((Z67 >>> 0) % 67 | 0) >> 0] ^ (f17[Q67 >> 0] ^ f17[q67 + (Z67 + H67 & 3) >> 0]);
                                        e67 = e67 + 1 | 0;
                                    } while ((e67 | 0) != (X67 | 0));
                                }
                                Z67 = l67 + 12 | 0;
                                c67 = X67 + -12 | 0;
                                g67 = b17(1522487922) | 0;
                                Z17[b67 >> 2] = g67;
                                f67 = c67 >>> 2;
                                if (!f67)
                                    e67 = 0;
                                else {
                                    H67 = 0;
                                    e67 = 0;
                                    while (1) {
                                        e67 = Z67 + e67 | 0;
                                        Z17[e67 >> 2] = Z17[e67 >> 2] ^ g67;
                                        e67 = H67 + 1 | 0;
                                        if ((e67 | 0) == (f67 | 0))
                                            break;
                                        else {
                                            H67 = e67;
                                            e67 = e67 << 2;
                                        }
                                    }
                                    e67 = c67 & -4;
                                }
                                if (e67 >>> 0 < c67 >>> 0)
                                    do {
                                        X67 = Z67 + e67 | 0;
                                        f17[X67 >> 0] = f17[X67 >> 0] ^ f17[b67 + (e67 & 3) >> 0];
                                        e67 = e67 + 1 | 0;
                                    } while ((e67 | 0) != (c67 | 0));break;
                            }
                            if ((c67 + -800 | 0) >>> 0 < 78) {
                                H67 = (c67 >>> 0) % 80 | 0;
                                if (X67 >>> 0 > 12) {
                                    e67 = 12;
                                    do {
                                        Z67 = e67 + -12 | 0;
                                        Q67 = l67 + e67 | 0;
                                        f17[Q67 >> 0] = f17[80 + ((((Z67 + c67 | 0) >>> 0) % 47 | 0) + H67) >> 0] ^ (f17[Q67 >> 0] ^ f17[q67 + (Z67 & 3) >> 0]);
                                        e67 = e67 + 1 | 0;
                                    } while ((e67 | 0) != (X67 | 0));
                                }
                                Z67 = l67 + 12 | 0;
                                c67 = X67 + -12 | 0;
                                g67 = b17(1522487922) | 0;
                                Z17[b67 >> 2] = g67;
                                f67 = c67 >>> 2;
                                if (!f67)
                                    e67 = 0;
                                else {
                                    H67 = 0;
                                    e67 = 0;
                                    while (1) {
                                        e67 = Z67 + e67 | 0;
                                        Z17[e67 >> 2] = Z17[e67 >> 2] ^ g67;
                                        e67 = H67 + 1 | 0;
                                        if ((e67 | 0) == (f67 | 0))
                                            break;
                                        else {
                                            H67 = e67;
                                            e67 = e67 << 2;
                                        }
                                    }
                                    e67 = c67 & -4;
                                }
                                if (e67 >>> 0 < c67 >>> 0)
                                    do {
                                        X67 = Z67 + e67 | 0;
                                        f17[X67 >> 0] = f17[X67 >> 0] ^ f17[b67 + (e67 & 3) >> 0];
                                        e67 = e67 + 1 | 0;
                                    } while ((e67 | 0) != (c67 | 0));break;
                            }
                            if ((c67 + -900 | 0) >>> 0 < 54) {
                                if (X67 >>> 0 > 12) {
                                    e67 = ((((((g67 * 131 & 255) + (f67 & 255) & 255) * 13 | 0) + (H67 & 255) & 255) * 23 | 0) + (e67 & 255) & 255) * 41 & 255;
                                    H67 = 12;
                                    do {
                                        Q67 = l67 + H67 | 0;
                                        Z67 = e67;
                                        e67 = f17[Q67 >> 0] | 0;
                                        f17[Q67 >> 0] = e67 ^ Z67 ^ f17[464 + (((c67 + (A17[q67 + (H67 & 3) >> 0] | 0) | 0) >>> 0) % 113 | 0) >> 0];
                                        H67 = H67 + 1 | 0;
                                    } while ((H67 | 0) != (X67 | 0));
                                }
                                Z67 = l67 + 12 | 0;
                                c67 = X67 + -12 | 0;
                                g67 = b17(1522487922) | 0;
                                Z17[b67 >> 2] = g67;
                                f67 = c67 >>> 2;
                                if (!f67)
                                    e67 = 0;
                                else {
                                    H67 = 0;
                                    e67 = 0;
                                    while (1) {
                                        e67 = Z67 + e67 | 0;
                                        Z17[e67 >> 2] = Z17[e67 >> 2] ^ g67;
                                        e67 = H67 + 1 | 0;
                                        if ((e67 | 0) == (f67 | 0))
                                            break;
                                        else {
                                            H67 = e67;
                                            e67 = e67 << 2;
                                        }
                                    }
                                    e67 = c67 & -4;
                                }
                                if (e67 >>> 0 < c67 >>> 0)
                                    do {
                                        X67 = Z67 + e67 | 0;
                                        f17[X67 >> 0] = f17[X67 >> 0] ^ f17[b67 + (e67 & 3) >> 0];
                                        e67 = e67 + 1 | 0;
                                    } while ((e67 | 0) != (c67 | 0));break;
                            }
                            if ((c67 + -954 | 0) >>> 0 < 56) {
                                e67 = Z17[q67 >> 2] | 0;
                                Z17[Q67 >> 2] = e67;
                                Z17[Q67 + 4 >> 2] = e67;
                                Z17[Q67 + 8 >> 2] = e67;
                                Z17[Q67 + 12 >> 2] = e67;
                                Z17[Q67 + 16 >> 2] = e67;
                                Z17[Q67 + 20 >> 2] = e67;
                                Z17[Q67 + 24 >> 2] = e67;
                                Z17[Q67 + 28 >> 2] = e67;
                                Z17[Q67 + 32 >> 2] = e67;
                                Z17[Q67 + 36 >> 2] = e67;
                                Z17[Q67 + 40 >> 2] = e67;
                                Z17[Q67 + 44 >> 2] = e67;
                                Z17[Q67 + 48 >> 2] = e67;
                                Z17[Q67 + 52 >> 2] = e67;
                                Z17[Q67 + 56 >> 2] = e67;
                                Z17[Q67 + 60 >> 2] = e67;
                                Z17[Q67 + 64 >> 2] = e67;
                                Z17[Q67 + 68 >> 2] = e67;
                                Z17[Q67 + 72 >> 2] = e67;
                                Z17[Q67 + 76 >> 2] = e67;
                                Z17[Q67 + 80 >> 2] = e67;
                                Z17[Q67 + 84 >> 2] = e67;
                                Z17[Q67 + 88 >> 2] = e67;
                                Z17[Q67 + 92 >> 2] = e67;
                                Z17[Q67 + 96 >> 2] = e67;
                                Z17[Q67 + 100 >> 2] = e67;
                                Z17[Q67 + 104 >> 2] = e67;
                                Z17[Q67 + 108 >> 2] = e67;
                                Z17[Q67 + 112 >> 2] = e67;
                                Z17[Q67 + 116 >> 2] = e67;
                                Z17[Q67 + 120 >> 2] = e67;
                                Z17[Q67 + 124 >> 2] = e67;
                                Z17[Q67 + 128 >> 2] = e67;
                                Z17[Q67 + 132 >> 2] = e67;
                                Z17[Q67 + 136 >> 2] = e67;
                                Z17[Q67 + 140 >> 2] = e67;
                                Z17[Q67 + 144 >> 2] = e67;
                                Z17[Q67 + 148 >> 2] = e67;
                                Z17[Q67 + 152 >> 2] = e67;
                                Z17[Q67 + 156 >> 2] = e67;
                                Z17[Q67 + 160 >> 2] = e67;
                                Z17[Q67 + 164 >> 2] = e67;
                                Z17[Q67 + 168 >> 2] = e67;
                                Z17[Q67 + 172 >> 2] = e67;
                                Z17[Q67 + 176 >> 2] = e67;
                                Z17[Q67 + 180 >> 2] = e67;
                                Z17[Q67 + 184 >> 2] = e67;
                                Z17[Q67 + 188 >> 2] = e67;
                                Z17[Q67 + 192 >> 2] = e67;
                                Z17[Q67 + 196 >> 2] = e67;
                                Z17[Q67 + 200 >> 2] = e67;
                                Z17[Q67 + 204 >> 2] = e67;
                                Z17[Q67 + 208 >> 2] = e67;
                                Z17[Q67 + 212 >> 2] = e67;
                                Z17[Q67 + 216 >> 2] = e67;
                                Z17[Q67 + 220 >> 2] = e67;
                                Z17[Q67 + 224 >> 2] = e67;
                                Z17[Q67 + 228 >> 2] = e67;
                                Z17[Q67 + 232 >> 2] = e67;
                                Z17[Q67 + 236 >> 2] = e67;
                                Z17[Q67 + 240 >> 2] = e67;
                                Z17[Q67 + 244 >> 2] = e67;
                                Z17[Q67 + 248 >> 2] = e67;
                                Z17[Q67 + 252 >> 2] = e67;
                                e67 = 0;
                                H67 = c67;
                                do {
                                    f67 = Q67 + e67 | 0;
                                    Z67 = f17[f67 >> 0] | 0;
                                    q67 = Q67 + (H67 & 63) | 0;
                                    f17[f67 >> 0] = f17[q67 >> 0] | 0;
                                    f17[q67 >> 0] = Z67;
                                    H67 = ((H67 & 16777215) * 131 | 0) + e67 | 0;
                                    e67 = e67 + 1 | 0;
                                } while ((e67 | 0) != 64);if (X67 >>> 0 > 12) {
                                    H67 = c67 + -12 | 0;
                                    e67 = 12;
                                    do {
                                        q67 = l67 + e67 | 0;
                                        f17[q67 >> 0] = f17[q67 >> 0] ^ f17[Q67 + (((H67 + e67 | 0) >>> 0) % 53 | 0) >> 0];
                                        e67 = e67 + 1 | 0;
                                    } while ((e67 | 0) != (X67 | 0));
                                }
                                Z67 = l67 + 12 | 0;
                                c67 = X67 + -12 | 0;
                                g67 = b17(1522487922) | 0;
                                Z17[b67 >> 2] = g67;
                                f67 = c67 >>> 2;
                                if (!f67)
                                    e67 = 0;
                                else {
                                    H67 = 0;
                                    e67 = 0;
                                    while (1) {
                                        e67 = Z67 + e67 | 0;
                                        Z17[e67 >> 2] = Z17[e67 >> 2] ^ g67;
                                        e67 = H67 + 1 | 0;
                                        if ((e67 | 0) == (f67 | 0))
                                            break;
                                        else {
                                            H67 = e67;
                                            e67 = e67 << 2;
                                        }
                                    }
                                    e67 = c67 & -4;
                                }
                                if (e67 >>> 0 < c67 >>> 0)
                                    do {
                                        X67 = Z67 + e67 | 0;
                                        f17[X67 >> 0] = f17[X67 >> 0] ^ f17[b67 + (e67 & 3) >> 0];
                                        e67 = e67 + 1 | 0;
                                    } while ((e67 | 0) != (c67 | 0));break;
                            }
                            H67 = X67 >>> 2;
                            if (X67 >>> 0 > 15) {
                                g67 = Z17[q67 >> 2] | 0;
                                e67 = 3;
                                do {
                                    Q67 = l67 + (e67 << 2) | 0;
                                    Z17[Q67 >> 2] = Z17[Q67 >> 2] ^ g67;
                                    e67 = e67 + 1 | 0;
                                } while (e67 >>> 0 < H67 >>> 0);e67 = e67 << 2;
                            } else
                                e67 = 12;
                            if (e67 >>> 0 < X67 >>> 0)
                                do {
                                    Q67 = l67 + e67 | 0;
                                    f17[Q67 >> 0] = f17[Q67 >> 0] ^ f17[q67 + (e67 & 3) >> 0];
                                    e67 = e67 + 1 | 0;
                                } while ((e67 | 0) != (X67 | 0));Z67 = l67 + 12 | 0;
                            c67 = X67 + -12 | 0;
                            g67 = b17(1522487922) | 0;
                            Z17[b67 >> 2] = g67;
                            f67 = c67 >>> 2;
                            if (!f67)
                                e67 = 0;
                            else {
                                H67 = 0;
                                e67 = 0;
                                while (1) {
                                    e67 = Z67 + e67 | 0;
                                    Z17[e67 >> 2] = Z17[e67 >> 2] ^ g67;
                                    e67 = H67 + 1 | 0;
                                    if ((e67 | 0) == (f67 | 0))
                                        break;
                                    else {
                                        H67 = e67;
                                        e67 = e67 << 2;
                                    }
                                }
                                e67 = c67 & -4;
                            }
                            if (e67 >>> 0 < c67 >>> 0)
                                do {
                                    X67 = Z67 + e67 | 0;
                                    f17[X67 >> 0] = f17[X67 >> 0] ^ f17[b67 + (e67 & 3) >> 0];
                                    e67 = e67 + 1 | 0;
                                } while ((e67 | 0) != (c67 | 0));
                        }
                    } while (0);b67 = 1;
                    g17 = S67;
                    return b67 | 0;
                }
            default:
                {
                    g67 = b17(1522487922) | 0;
                    Z17[b67 >> 2] = g67;
                    f67 = X67 >>> 2;
                    if (!f67)
                        e67 = 0;
                    else {
                        Z17[l67 >> 2] = H67 ^ g67;
                        if ((f67 | 0) != 1) {
                            H67 = 4;
                            e67 = 1;
                            while (1) {
                                Z17[l67 + H67 >> 2] = Z17[l67 + H67 >> 2] ^ g67;
                                e67 = e67 + 1 | 0;
                                if ((e67 | 0) == (f67 | 0))
                                    break;
                                else
                                    H67 = e67 << 2;
                            }
                        }
                        e67 = X67 & -4;
                    }
                    if (e67 >>> 0 < X67 >>> 0)
                        do {
                            q67 = l67 + e67 | 0;
                            f17[q67 >> 0] = f17[q67 >> 0] ^ f17[b67 + (e67 & 3) >> 0];
                            e67 = e67 + 1 | 0;
                        } while ((e67 | 0) != (X67 | 0));b67 = 0;
                    g17 = S67;
                    return b67 | 0;
                }
            }
            return 0;
        }
        function F97(W67, y67, d67, G67, A67, i67, J67) {
            W67 = W67 | 0;
            y67 = y67 | 0;
            d67 = d67 | 0;
            G67 = G67 | 0;
            A67 = A67 | 0;
            i67 = i67 | 0;
            J67 = J67 | 0;
            var L67 = 0
              , v67 = 0
              , F67 = 0;
            F67 = g17;
            g17 = g17 + 16 | 0;
            if ((g17 | 0) >= (S17 | 0))
                W17(16);
            L67 = F67;
            v67 = d67 + 12 | 0;
            if (v67 >>> 0 > G67 >>> 0) {
                d67 = -1;
                g17 = F67;
                return d67 | 0;
            }
            J67 = b17(A67) | 0;
            Z17[L67 >> 2] = J67;
            D97(y67 + 12 | 0, y67 | 0, d67 | 0) | 0;
            Z17[y67 >> 2] = b17(301840) | 0;
            Z17[y67 + 4 >> 2] = b17(v67) | 0;
            Z17[y67 + 8 >> 2] = b17(1) | 0;
            G67 = d67 >>> 2;
            if (!G67)
                W67 = 0;
            else {
                i67 = 0;
                W67 = 0;
                while (1) {
                    W67 = y67 + (W67 + 12) | 0;
                    Z17[W67 >> 2] = Z17[W67 >> 2] ^ J67;
                    W67 = i67 + 1 | 0;
                    if ((W67 | 0) == (G67 | 0))
                        break;
                    else {
                        i67 = W67;
                        W67 = W67 << 2;
                    }
                }
                W67 = d67 & -4;
            }
            if (W67 >>> 0 < d67 >>> 0)
                do {
                    A67 = y67 + (W67 + 12) | 0;
                    f17[A67 >> 0] = f17[A67 >> 0] ^ f17[L67 + (W67 & 3) >> 0];
                    W67 = W67 + 1 | 0;
                } while ((W67 | 0) != (d67 | 0));d67 = v67;
            g17 = F67;
            return d67 | 0;
        }
        function i97(p67) {
            p67 = p67 | 0;
            var h67 = 0
              , x2j = 0
              , w2j = 0
              , C2j = 0
              , I2j = 0
              , M2j = 0
              , N2j = 0
              , a2j = 0
              , U2j = 0
              , Y2j = 0
              , O2j = 0
              , t2j = 0
              , K2j = 0
              , k2j = 0
              , B2j = 0
              , T2j = 0
              , u2j = 0
              , V2j = 0
              , j2j = 0
              , r2j = 0
              , D2j = 0;
            D2j = g17;
            g17 = g17 + 16 | 0;
            if ((g17 | 0) >= (S17 | 0))
                W17(16);
            t2j = D2j;
            do {
                if (p67 >>> 0 < 245) {
                    U2j = p67 >>> 0 < 11 ? 16 : p67 + 11 & -8;
                    p67 = U2j >>> 3;
                    O2j = Z17[440] | 0;
                    x2j = O2j >>> p67;
                    if (x2j & 3 | 0) {
                        h67 = (x2j & 1 ^ 1) + p67 | 0;
                        p67 = 1800 + (h67 << 1 << 2) | 0;
                        x2j = p67 + 8 | 0;
                        w2j = Z17[x2j >> 2] | 0;
                        C2j = w2j + 8 | 0;
                        I2j = Z17[C2j >> 2] | 0;
                        if ((I2j | 0) == (p67 | 0))
                            Z17[440] = O2j & ~(1 << h67);
                        else {
                            Z17[I2j + 12 >> 2] = p67;
                            Z17[x2j >> 2] = I2j;
                        }
                        r2j = h67 << 3;
                        Z17[w2j + 4 >> 2] = r2j | 3;
                        r2j = w2j + r2j + 4 | 0;
                        Z17[r2j >> 2] = Z17[r2j >> 2] | 1;
                        r2j = C2j;
                        g17 = D2j;
                        return r2j | 0;
                    }
                    Y2j = Z17[442] | 0;
                    if (U2j >>> 0 > Y2j >>> 0) {
                        if (x2j | 0) {
                            h67 = 2 << p67;
                            h67 = x2j << p67 & (h67 | 0 - h67);
                            h67 = (h67 & 0 - h67) + -1 | 0;
                            N2j = h67 >>> 12 & 16;
                            h67 = h67 >>> N2j;
                            x2j = h67 >>> 5 & 8;
                            h67 = h67 >>> x2j;
                            I2j = h67 >>> 2 & 4;
                            h67 = h67 >>> I2j;
                            p67 = h67 >>> 1 & 2;
                            h67 = h67 >>> p67;
                            w2j = h67 >>> 1 & 1;
                            w2j = (x2j | N2j | I2j | p67 | w2j) + (h67 >>> w2j) | 0;
                            h67 = 1800 + (w2j << 1 << 2) | 0;
                            p67 = h67 + 8 | 0;
                            I2j = Z17[p67 >> 2] | 0;
                            N2j = I2j + 8 | 0;
                            x2j = Z17[N2j >> 2] | 0;
                            if ((x2j | 0) == (h67 | 0)) {
                                p67 = O2j & ~(1 << w2j);
                                Z17[440] = p67;
                            } else {
                                Z17[x2j + 12 >> 2] = h67;
                                Z17[p67 >> 2] = x2j;
                                p67 = O2j;
                            }
                            r2j = w2j << 3;
                            M2j = r2j - U2j | 0;
                            Z17[I2j + 4 >> 2] = U2j | 3;
                            C2j = I2j + U2j | 0;
                            Z17[C2j + 4 >> 2] = M2j | 1;
                            Z17[I2j + r2j >> 2] = M2j;
                            if (Y2j | 0) {
                                w2j = Z17[445] | 0;
                                h67 = Y2j >>> 3;
                                x2j = 1800 + (h67 << 1 << 2) | 0;
                                h67 = 1 << h67;
                                if (!(p67 & h67)) {
                                    Z17[440] = p67 | h67;
                                    h67 = x2j;
                                    p67 = x2j + 8 | 0;
                                } else {
                                    p67 = x2j + 8 | 0;
                                    h67 = Z17[p67 >> 2] | 0;
                                }
                                Z17[p67 >> 2] = w2j;
                                Z17[h67 + 12 >> 2] = w2j;
                                Z17[w2j + 8 >> 2] = h67;
                                Z17[w2j + 12 >> 2] = x2j;
                            }
                            Z17[442] = M2j;
                            Z17[445] = C2j;
                            r2j = N2j;
                            g17 = D2j;
                            return r2j | 0;
                        }
                        I2j = Z17[441] | 0;
                        if (I2j) {
                            x2j = (I2j & 0 - I2j) + -1 | 0;
                            C2j = x2j >>> 12 & 16;
                            x2j = x2j >>> C2j;
                            w2j = x2j >>> 5 & 8;
                            x2j = x2j >>> w2j;
                            M2j = x2j >>> 2 & 4;
                            x2j = x2j >>> M2j;
                            N2j = x2j >>> 1 & 2;
                            x2j = x2j >>> N2j;
                            a2j = x2j >>> 1 & 1;
                            a2j = Z17[2064 + ((w2j | C2j | M2j | N2j | a2j) + (x2j >>> a2j) << 2) >> 2] | 0;
                            x2j = a2j;
                            N2j = a2j;
                            a2j = (Z17[a2j + 4 >> 2] & -8) - U2j | 0;
                            while (1) {
                                p67 = Z17[x2j + 16 >> 2] | 0;
                                if (!p67) {
                                    p67 = Z17[x2j + 20 >> 2] | 0;
                                    if (!p67)
                                        break;
                                }
                                M2j = (Z17[p67 + 4 >> 2] & -8) - U2j | 0;
                                C2j = M2j >>> 0 < a2j >>> 0;
                                x2j = p67;
                                N2j = C2j ? p67 : N2j;
                                a2j = C2j ? M2j : a2j;
                            }
                            M2j = N2j + U2j | 0;
                            if (M2j >>> 0 > N2j >>> 0) {
                                C2j = Z17[N2j + 24 >> 2] | 0;
                                h67 = Z17[N2j + 12 >> 2] | 0;
                                do {
                                    if ((h67 | 0) == (N2j | 0)) {
                                        p67 = N2j + 20 | 0;
                                        h67 = Z17[p67 >> 2] | 0;
                                        if (!h67) {
                                            p67 = N2j + 16 | 0;
                                            h67 = Z17[p67 >> 2] | 0;
                                            if (!h67) {
                                                x2j = 0;
                                                break;
                                            }
                                        }
                                        while (1) {
                                            w2j = h67 + 20 | 0;
                                            x2j = Z17[w2j >> 2] | 0;
                                            if (!x2j) {
                                                w2j = h67 + 16 | 0;
                                                x2j = Z17[w2j >> 2] | 0;
                                                if (!x2j)
                                                    break;
                                                else {
                                                    h67 = x2j;
                                                    p67 = w2j;
                                                }
                                            } else {
                                                h67 = x2j;
                                                p67 = w2j;
                                            }
                                        }
                                        Z17[p67 >> 2] = 0;
                                        x2j = h67;
                                    } else {
                                        x2j = Z17[N2j + 8 >> 2] | 0;
                                        Z17[x2j + 12 >> 2] = h67;
                                        Z17[h67 + 8 >> 2] = x2j;
                                        x2j = h67;
                                    }
                                } while (0);do {
                                    if (C2j | 0) {
                                        h67 = Z17[N2j + 28 >> 2] | 0;
                                        p67 = 2064 + (h67 << 2) | 0;
                                        if ((N2j | 0) == (Z17[p67 >> 2] | 0)) {
                                            Z17[p67 >> 2] = x2j;
                                            if (!x2j) {
                                                Z17[441] = I2j & ~(1 << h67);
                                                break;
                                            }
                                        } else {
                                            r2j = C2j + 16 | 0;
                                            Z17[((Z17[r2j >> 2] | 0) == (N2j | 0) ? r2j : C2j + 20 | 0) >> 2] = x2j;
                                            if (!x2j)
                                                break;
                                        }
                                        Z17[x2j + 24 >> 2] = C2j;
                                        h67 = Z17[N2j + 16 >> 2] | 0;
                                        if (h67 | 0) {
                                            Z17[x2j + 16 >> 2] = h67;
                                            Z17[h67 + 24 >> 2] = x2j;
                                        }
                                        h67 = Z17[N2j + 20 >> 2] | 0;
                                        if (h67 | 0) {
                                            Z17[x2j + 20 >> 2] = h67;
                                            Z17[h67 + 24 >> 2] = x2j;
                                        }
                                    }
                                } while (0);if (a2j >>> 0 < 16) {
                                    r2j = a2j + U2j | 0;
                                    Z17[N2j + 4 >> 2] = r2j | 3;
                                    r2j = N2j + r2j + 4 | 0;
                                    Z17[r2j >> 2] = Z17[r2j >> 2] | 1;
                                } else {
                                    Z17[N2j + 4 >> 2] = U2j | 3;
                                    Z17[M2j + 4 >> 2] = a2j | 1;
                                    Z17[M2j + a2j >> 2] = a2j;
                                    if (Y2j | 0) {
                                        w2j = Z17[445] | 0;
                                        h67 = Y2j >>> 3;
                                        x2j = 1800 + (h67 << 1 << 2) | 0;
                                        h67 = 1 << h67;
                                        if (!(h67 & O2j)) {
                                            Z17[440] = h67 | O2j;
                                            h67 = x2j;
                                            p67 = x2j + 8 | 0;
                                        } else {
                                            p67 = x2j + 8 | 0;
                                            h67 = Z17[p67 >> 2] | 0;
                                        }
                                        Z17[p67 >> 2] = w2j;
                                        Z17[h67 + 12 >> 2] = w2j;
                                        Z17[w2j + 8 >> 2] = h67;
                                        Z17[w2j + 12 >> 2] = x2j;
                                    }
                                    Z17[442] = a2j;
                                    Z17[445] = M2j;
                                }
                                r2j = N2j + 8 | 0;
                                g17 = D2j;
                                return r2j | 0;
                            } else
                                O2j = U2j;
                        } else
                            O2j = U2j;
                    } else
                        O2j = U2j;
                } else if (p67 >>> 0 <= 4294967231) {
                    p67 = p67 + 11 | 0;
                    U2j = p67 & -8;
                    w2j = Z17[441] | 0;
                    if (w2j) {
                        C2j = 0 - U2j | 0;
                        p67 = p67 >>> 8;
                        if (p67) {
                            if (U2j >>> 0 > 16777215)
                                a2j = 31;
                            else {
                                O2j = (p67 + 1048320 | 0) >>> 16 & 8;
                                B2j = p67 << O2j;
                                N2j = (B2j + 520192 | 0) >>> 16 & 4;
                                B2j = B2j << N2j;
                                a2j = (B2j + 245760 | 0) >>> 16 & 2;
                                a2j = 14 - (N2j | O2j | a2j) + (B2j << a2j >>> 15) | 0;
                                a2j = U2j >>> (a2j + 7 | 0) & 1 | a2j << 1;
                            }
                        } else
                            a2j = 0;
                        x2j = Z17[2064 + (a2j << 2) >> 2] | 0;
                        a: do {
                            if (!x2j) {
                                x2j = 0;
                                p67 = 0;
                                B2j = 61;
                            } else {
                                p67 = 0;
                                N2j = U2j << ((a2j | 0) == 31 ? 0 : 25 - (a2j >>> 1) | 0);
                                I2j = 0;
                                while (1) {
                                    M2j = (Z17[x2j + 4 >> 2] & -8) - U2j | 0;
                                    if (M2j >>> 0 < C2j >>> 0)
                                        if (!M2j) {
                                            p67 = x2j;
                                            C2j = 0;
                                            B2j = 65;
                                            break a;
                                        } else {
                                            p67 = x2j;
                                            C2j = M2j;
                                        }
                                    B2j = Z17[x2j + 20 >> 2] | 0;
                                    x2j = Z17[x2j + 16 + (N2j >>> 31 << 2) >> 2] | 0;
                                    I2j = (B2j | 0) == 0 | (B2j | 0) == (x2j | 0) ? I2j : B2j;
                                    if (!x2j) {
                                        x2j = I2j;
                                        B2j = 61;
                                        break;
                                    } else
                                        N2j = N2j << 1;
                                }
                            }
                        } while (0);if ((B2j | 0) == 61) {
                            if ((x2j | 0) == 0 & (p67 | 0) == 0) {
                                p67 = 2 << a2j;
                                p67 = (p67 | 0 - p67) & w2j;
                                if (!p67) {
                                    O2j = U2j;
                                    break;
                                }
                                O2j = (p67 & 0 - p67) + -1 | 0;
                                M2j = O2j >>> 12 & 16;
                                O2j = O2j >>> M2j;
                                I2j = O2j >>> 5 & 8;
                                O2j = O2j >>> I2j;
                                N2j = O2j >>> 2 & 4;
                                O2j = O2j >>> N2j;
                                a2j = O2j >>> 1 & 2;
                                O2j = O2j >>> a2j;
                                x2j = O2j >>> 1 & 1;
                                p67 = 0;
                                x2j = Z17[2064 + ((I2j | M2j | N2j | a2j | x2j) + (O2j >>> x2j) << 2) >> 2] | 0;
                            }
                            if (!x2j) {
                                N2j = p67;
                                M2j = C2j;
                            } else
                                B2j = 65;
                        }
                        if ((B2j | 0) == 65) {
                            I2j = x2j;
                            while (1) {
                                O2j = (Z17[I2j + 4 >> 2] & -8) - U2j | 0;
                                x2j = O2j >>> 0 < C2j >>> 0;
                                C2j = x2j ? O2j : C2j;
                                p67 = x2j ? I2j : p67;
                                x2j = Z17[I2j + 16 >> 2] | 0;
                                if (!x2j)
                                    x2j = Z17[I2j + 20 >> 2] | 0;
                                if (!x2j) {
                                    N2j = p67;
                                    M2j = C2j;
                                    break;
                                } else
                                    I2j = x2j;
                            }
                        }
                        if (((N2j | 0) != 0 ? M2j >>> 0 < ((Z17[442] | 0) - U2j | 0) >>> 0 : 0) ? (Y2j = N2j + U2j | 0,
                        Y2j >>> 0 > N2j >>> 0) : 0) {
                            I2j = Z17[N2j + 24 >> 2] | 0;
                            h67 = Z17[N2j + 12 >> 2] | 0;
                            do {
                                if ((h67 | 0) == (N2j | 0)) {
                                    p67 = N2j + 20 | 0;
                                    h67 = Z17[p67 >> 2] | 0;
                                    if (!h67) {
                                        p67 = N2j + 16 | 0;
                                        h67 = Z17[p67 >> 2] | 0;
                                        if (!h67) {
                                            h67 = 0;
                                            break;
                                        }
                                    }
                                    while (1) {
                                        C2j = h67 + 20 | 0;
                                        x2j = Z17[C2j >> 2] | 0;
                                        if (!x2j) {
                                            C2j = h67 + 16 | 0;
                                            x2j = Z17[C2j >> 2] | 0;
                                            if (!x2j)
                                                break;
                                            else {
                                                h67 = x2j;
                                                p67 = C2j;
                                            }
                                        } else {
                                            h67 = x2j;
                                            p67 = C2j;
                                        }
                                    }
                                    Z17[p67 >> 2] = 0;
                                } else {
                                    r2j = Z17[N2j + 8 >> 2] | 0;
                                    Z17[r2j + 12 >> 2] = h67;
                                    Z17[h67 + 8 >> 2] = r2j;
                                }
                            } while (0);do {
                                if (I2j) {
                                    p67 = Z17[N2j + 28 >> 2] | 0;
                                    x2j = 2064 + (p67 << 2) | 0;
                                    if ((N2j | 0) == (Z17[x2j >> 2] | 0)) {
                                        Z17[x2j >> 2] = h67;
                                        if (!h67) {
                                            w2j = w2j & ~(1 << p67);
                                            Z17[441] = w2j;
                                            break;
                                        }
                                    } else {
                                        r2j = I2j + 16 | 0;
                                        Z17[((Z17[r2j >> 2] | 0) == (N2j | 0) ? r2j : I2j + 20 | 0) >> 2] = h67;
                                        if (!h67)
                                            break;
                                    }
                                    Z17[h67 + 24 >> 2] = I2j;
                                    p67 = Z17[N2j + 16 >> 2] | 0;
                                    if (p67 | 0) {
                                        Z17[h67 + 16 >> 2] = p67;
                                        Z17[p67 + 24 >> 2] = h67;
                                    }
                                    p67 = Z17[N2j + 20 >> 2] | 0;
                                    if (p67) {
                                        Z17[h67 + 20 >> 2] = p67;
                                        Z17[p67 + 24 >> 2] = h67;
                                    }
                                }
                            } while (0);a: do {
                                if (M2j >>> 0 < 16) {
                                    r2j = M2j + U2j | 0;
                                    Z17[N2j + 4 >> 2] = r2j | 3;
                                    r2j = N2j + r2j + 4 | 0;
                                    Z17[r2j >> 2] = Z17[r2j >> 2] | 1;
                                } else {
                                    Z17[N2j + 4 >> 2] = U2j | 3;
                                    Z17[Y2j + 4 >> 2] = M2j | 1;
                                    Z17[Y2j + M2j >> 2] = M2j;
                                    h67 = M2j >>> 3;
                                    if (M2j >>> 0 < 256) {
                                        x2j = 1800 + (h67 << 1 << 2) | 0;
                                        p67 = Z17[440] | 0;
                                        h67 = 1 << h67;
                                        if (!(p67 & h67)) {
                                            Z17[440] = p67 | h67;
                                            h67 = x2j;
                                            p67 = x2j + 8 | 0;
                                        } else {
                                            p67 = x2j + 8 | 0;
                                            h67 = Z17[p67 >> 2] | 0;
                                        }
                                        Z17[p67 >> 2] = Y2j;
                                        Z17[h67 + 12 >> 2] = Y2j;
                                        Z17[Y2j + 8 >> 2] = h67;
                                        Z17[Y2j + 12 >> 2] = x2j;
                                        break;
                                    }
                                    h67 = M2j >>> 8;
                                    if (h67) {
                                        if (M2j >>> 0 > 16777215)
                                            x2j = 31;
                                        else {
                                            j2j = (h67 + 1048320 | 0) >>> 16 & 8;
                                            r2j = h67 << j2j;
                                            V2j = (r2j + 520192 | 0) >>> 16 & 4;
                                            r2j = r2j << V2j;
                                            x2j = (r2j + 245760 | 0) >>> 16 & 2;
                                            x2j = 14 - (V2j | j2j | x2j) + (r2j << x2j >>> 15) | 0;
                                            x2j = M2j >>> (x2j + 7 | 0) & 1 | x2j << 1;
                                        }
                                    } else
                                        x2j = 0;
                                    h67 = 2064 + (x2j << 2) | 0;
                                    Z17[Y2j + 28 >> 2] = x2j;
                                    p67 = Y2j + 16 | 0;
                                    Z17[p67 + 4 >> 2] = 0;
                                    Z17[p67 >> 2] = 0;
                                    p67 = 1 << x2j;
                                    if (!(w2j & p67)) {
                                        Z17[441] = w2j | p67;
                                        Z17[h67 >> 2] = Y2j;
                                        Z17[Y2j + 24 >> 2] = h67;
                                        Z17[Y2j + 12 >> 2] = Y2j;
                                        Z17[Y2j + 8 >> 2] = Y2j;
                                        break;
                                    }
                                    h67 = Z17[h67 >> 2] | 0;
                                    b: do {
                                        if ((Z17[h67 + 4 >> 2] & -8 | 0) != (M2j | 0)) {
                                            w2j = M2j << ((x2j | 0) == 31 ? 0 : 25 - (x2j >>> 1) | 0);
                                            while (1) {
                                                x2j = h67 + 16 + (w2j >>> 31 << 2) | 0;
                                                p67 = Z17[x2j >> 2] | 0;
                                                if (!p67)
                                                    break;
                                                if ((Z17[p67 + 4 >> 2] & -8 | 0) == (M2j | 0)) {
                                                    h67 = p67;
                                                    break b;
                                                } else {
                                                    w2j = w2j << 1;
                                                    h67 = p67;
                                                }
                                            }
                                            Z17[x2j >> 2] = Y2j;
                                            Z17[Y2j + 24 >> 2] = h67;
                                            Z17[Y2j + 12 >> 2] = Y2j;
                                            Z17[Y2j + 8 >> 2] = Y2j;
                                            break a;
                                        }
                                    } while (0);j2j = h67 + 8 | 0;
                                    r2j = Z17[j2j >> 2] | 0;
                                    Z17[r2j + 12 >> 2] = Y2j;
                                    Z17[j2j >> 2] = Y2j;
                                    Z17[Y2j + 8 >> 2] = r2j;
                                    Z17[Y2j + 12 >> 2] = h67;
                                    Z17[Y2j + 24 >> 2] = 0;
                                }
                            } while (0);r2j = N2j + 8 | 0;
                            g17 = D2j;
                            return r2j | 0;
                        } else
                            O2j = U2j;
                    } else
                        O2j = U2j;
                } else
                    O2j = -1;
            } while (0);x2j = Z17[442] | 0;
            if (x2j >>> 0 >= O2j >>> 0) {
                h67 = x2j - O2j | 0;
                p67 = Z17[445] | 0;
                if (h67 >>> 0 > 15) {
                    r2j = p67 + O2j | 0;
                    Z17[445] = r2j;
                    Z17[442] = h67;
                    Z17[r2j + 4 >> 2] = h67 | 1;
                    Z17[p67 + x2j >> 2] = h67;
                    Z17[p67 + 4 >> 2] = O2j | 3;
                } else {
                    Z17[442] = 0;
                    Z17[445] = 0;
                    Z17[p67 + 4 >> 2] = x2j | 3;
                    r2j = p67 + x2j + 4 | 0;
                    Z17[r2j >> 2] = Z17[r2j >> 2] | 1;
                }
                r2j = p67 + 8 | 0;
                g17 = D2j;
                return r2j | 0;
            }
            M2j = Z17[443] | 0;
            if (M2j >>> 0 > O2j >>> 0) {
                V2j = M2j - O2j | 0;
                Z17[443] = V2j;
                r2j = Z17[446] | 0;
                j2j = r2j + O2j | 0;
                Z17[446] = j2j;
                Z17[j2j + 4 >> 2] = V2j | 1;
                Z17[r2j + 4 >> 2] = O2j | 3;
                r2j = r2j + 8 | 0;
                g17 = D2j;
                return r2j | 0;
            }
            if (!(Z17[558] | 0)) {
                Z17[560] = 4096;
                Z17[559] = 4096;
                Z17[561] = -1;
                Z17[562] = -1;
                Z17[563] = 0;
                Z17[551] = 0;
                Z17[558] = t2j & -16 ^ 1431655768;
                p67 = 4096;
            } else
                p67 = Z17[560] | 0;
            N2j = O2j + 48 | 0;
            a2j = O2j + 47 | 0;
            I2j = p67 + a2j | 0;
            C2j = 0 - p67 | 0;
            U2j = I2j & C2j;
            if (U2j >>> 0 <= O2j >>> 0) {
                r2j = 0;
                g17 = D2j;
                return r2j | 0;
            }
            p67 = Z17[550] | 0;
            if (p67 | 0 ? (Y2j = Z17[548] | 0,
            t2j = Y2j + U2j | 0,
            t2j >>> 0 <= Y2j >>> 0 | t2j >>> 0 > p67 >>> 0) : 0) {
                r2j = 0;
                g17 = D2j;
                return r2j | 0;
            }
            a: do {
                if (!(Z17[551] & 4)) {
                    x2j = Z17[446] | 0;
                    b: do {
                        if (x2j) {
                            w2j = 2208;
                            while (1) {
                                t2j = Z17[w2j >> 2] | 0;
                                if (t2j >>> 0 <= x2j >>> 0 ? (t2j + (Z17[w2j + 4 >> 2] | 0) | 0) >>> 0 > x2j >>> 0 : 0)
                                    break;
                                p67 = Z17[w2j + 8 >> 2] | 0;
                                if (!p67) {
                                    B2j = 128;
                                    break b;
                                } else
                                    w2j = p67;
                            }
                            h67 = I2j - M2j & C2j;
                            if (h67 >>> 0 < 2147483647) {
                                p67 = y17(h67 | 0) | 0;
                                if ((p67 | 0) == ((Z17[w2j >> 2] | 0) + (Z17[w2j + 4 >> 2] | 0) | 0)) {
                                    if ((p67 | 0) != (-1 | 0)) {
                                        M2j = h67;
                                        I2j = p67;
                                        B2j = 145;
                                        break a;
                                    }
                                } else {
                                    w2j = p67;
                                    B2j = 136;
                                }
                            } else
                                h67 = 0;
                        } else
                            B2j = 128;
                    } while (0);do {
                        if ((B2j | 0) == 128) {
                            x2j = y17(0) | 0;
                            if ((x2j | 0) != (-1 | 0) ? (h67 = x2j,
                            K2j = Z17[559] | 0,
                            k2j = K2j + -1 | 0,
                            h67 = ((k2j & h67 | 0) == 0 ? 0 : (k2j + h67 & 0 - K2j) - h67 | 0) + U2j | 0,
                            K2j = Z17[548] | 0,
                            k2j = h67 + K2j | 0,
                            h67 >>> 0 > O2j >>> 0 & h67 >>> 0 < 2147483647) : 0) {
                                t2j = Z17[550] | 0;
                                if (t2j | 0 ? k2j >>> 0 <= K2j >>> 0 | k2j >>> 0 > t2j >>> 0 : 0) {
                                    h67 = 0;
                                    break;
                                }
                                p67 = y17(h67 | 0) | 0;
                                if ((p67 | 0) == (x2j | 0)) {
                                    M2j = h67;
                                    I2j = x2j;
                                    B2j = 145;
                                    break a;
                                } else {
                                    w2j = p67;
                                    B2j = 136;
                                }
                            } else
                                h67 = 0;
                        }
                    } while (0);do {
                        if ((B2j | 0) == 136) {
                            x2j = 0 - h67 | 0;
                            if (!(N2j >>> 0 > h67 >>> 0 & (h67 >>> 0 < 2147483647 & (w2j | 0) != (-1 | 0))))
                                if ((w2j | 0) == (-1 | 0)) {
                                    h67 = 0;
                                    break;
                                } else {
                                    M2j = h67;
                                    I2j = w2j;
                                    B2j = 145;
                                    break a;
                                }
                            p67 = Z17[560] | 0;
                            p67 = a2j - h67 + p67 & 0 - p67;
                            if (p67 >>> 0 >= 2147483647) {
                                M2j = h67;
                                I2j = w2j;
                                B2j = 145;
                                break a;
                            }
                            if ((y17(p67 | 0) | 0) == (-1 | 0)) {
                                y17(x2j | 0) | 0;
                                h67 = 0;
                                break;
                            } else {
                                M2j = p67 + h67 | 0;
                                I2j = w2j;
                                B2j = 145;
                                break a;
                            }
                        }
                    } while (0);Z17[551] = Z17[551] | 4;
                    B2j = 143;
                } else {
                    h67 = 0;
                    B2j = 143;
                }
            } while (0);if (((B2j | 0) == 143 ? U2j >>> 0 < 2147483647 : 0) ? (V2j = y17(U2j | 0) | 0,
            k2j = y17(0) | 0,
            T2j = k2j - V2j | 0,
            u2j = T2j >>> 0 > (O2j + 40 | 0) >>> 0,
            !((V2j | 0) == (-1 | 0) | u2j ^ 1 | V2j >>> 0 < k2j >>> 0 & ((V2j | 0) != (-1 | 0) & (k2j | 0) != (-1 | 0)) ^ 1)) : 0) {
                M2j = u2j ? T2j : h67;
                I2j = V2j;
                B2j = 145;
            }
            if ((B2j | 0) == 145) {
                h67 = (Z17[548] | 0) + M2j | 0;
                Z17[548] = h67;
                if (h67 >>> 0 > (Z17[549] | 0) >>> 0)
                    Z17[549] = h67;
                a2j = Z17[446] | 0;
                b: do {
                    if (a2j) {
                        h67 = 2208;
                        while (1) {
                            p67 = Z17[h67 >> 2] | 0;
                            x2j = Z17[h67 + 4 >> 2] | 0;
                            if ((I2j | 0) == (p67 + x2j | 0)) {
                                B2j = 154;
                                break;
                            }
                            w2j = Z17[h67 + 8 >> 2] | 0;
                            if (!w2j)
                                break;
                            else
                                h67 = w2j;
                        }
                        if (((B2j | 0) == 154 ? (j2j = h67 + 4 | 0,
                        (Z17[h67 + 12 >> 2] & 8 | 0) == 0) : 0) ? I2j >>> 0 > a2j >>> 0 & p67 >>> 0 <= a2j >>> 0 : 0) {
                            Z17[j2j >> 2] = x2j + M2j;
                            r2j = (Z17[443] | 0) + M2j | 0;
                            V2j = a2j + 8 | 0;
                            V2j = (V2j & 7 | 0) == 0 ? 0 : 0 - V2j & 7;
                            j2j = a2j + V2j | 0;
                            V2j = r2j - V2j | 0;
                            Z17[446] = j2j;
                            Z17[443] = V2j;
                            Z17[j2j + 4 >> 2] = V2j | 1;
                            Z17[a2j + r2j + 4 >> 2] = 40;
                            Z17[447] = Z17[562];
                            break;
                        }
                        if (I2j >>> 0 < (Z17[444] | 0) >>> 0)
                            Z17[444] = I2j;
                        x2j = I2j + M2j | 0;
                        h67 = 2208;
                        while (1) {
                            if ((Z17[h67 >> 2] | 0) == (x2j | 0)) {
                                B2j = 162;
                                break;
                            }
                            p67 = Z17[h67 + 8 >> 2] | 0;
                            if (!p67)
                                break;
                            else
                                h67 = p67;
                        }
                        if ((B2j | 0) == 162 ? (Z17[h67 + 12 >> 2] & 8 | 0) == 0 : 0) {
                            Z17[h67 >> 2] = I2j;
                            Y2j = h67 + 4 | 0;
                            Z17[Y2j >> 2] = (Z17[Y2j >> 2] | 0) + M2j;
                            Y2j = I2j + 8 | 0;
                            Y2j = I2j + ((Y2j & 7 | 0) == 0 ? 0 : 0 - Y2j & 7) | 0;
                            h67 = x2j + 8 | 0;
                            h67 = x2j + ((h67 & 7 | 0) == 0 ? 0 : 0 - h67 & 7) | 0;
                            U2j = Y2j + O2j | 0;
                            N2j = h67 - Y2j - O2j | 0;
                            Z17[Y2j + 4 >> 2] = O2j | 3;
                            c: do {
                                if ((a2j | 0) == (h67 | 0)) {
                                    r2j = (Z17[443] | 0) + N2j | 0;
                                    Z17[443] = r2j;
                                    Z17[446] = U2j;
                                    Z17[U2j + 4 >> 2] = r2j | 1;
                                } else {
                                    if ((Z17[445] | 0) == (h67 | 0)) {
                                        r2j = (Z17[442] | 0) + N2j | 0;
                                        Z17[442] = r2j;
                                        Z17[445] = U2j;
                                        Z17[U2j + 4 >> 2] = r2j | 1;
                                        Z17[U2j + r2j >> 2] = r2j;
                                        break;
                                    }
                                    p67 = Z17[h67 + 4 >> 2] | 0;
                                    if ((p67 & 3 | 0) == 1) {
                                        M2j = p67 & -8;
                                        w2j = p67 >>> 3;
                                        a: do {
                                            if (p67 >>> 0 < 256) {
                                                p67 = Z17[h67 + 8 >> 2] | 0;
                                                x2j = Z17[h67 + 12 >> 2] | 0;
                                                if ((x2j | 0) == (p67 | 0)) {
                                                    Z17[440] = Z17[440] & ~(1 << w2j);
                                                    break;
                                                } else {
                                                    Z17[p67 + 12 >> 2] = x2j;
                                                    Z17[x2j + 8 >> 2] = p67;
                                                    break;
                                                }
                                            } else {
                                                I2j = Z17[h67 + 24 >> 2] | 0;
                                                p67 = Z17[h67 + 12 >> 2] | 0;
                                                do {
                                                    if ((p67 | 0) == (h67 | 0)) {
                                                        x2j = h67 + 16 | 0;
                                                        w2j = x2j + 4 | 0;
                                                        p67 = Z17[w2j >> 2] | 0;
                                                        if (!p67) {
                                                            p67 = Z17[x2j >> 2] | 0;
                                                            if (!p67) {
                                                                p67 = 0;
                                                                break;
                                                            }
                                                        } else
                                                            x2j = w2j;
                                                        while (1) {
                                                            C2j = p67 + 20 | 0;
                                                            w2j = Z17[C2j >> 2] | 0;
                                                            if (!w2j) {
                                                                C2j = p67 + 16 | 0;
                                                                w2j = Z17[C2j >> 2] | 0;
                                                                if (!w2j)
                                                                    break;
                                                                else {
                                                                    p67 = w2j;
                                                                    x2j = C2j;
                                                                }
                                                            } else {
                                                                p67 = w2j;
                                                                x2j = C2j;
                                                            }
                                                        }
                                                        Z17[x2j >> 2] = 0;
                                                    } else {
                                                        r2j = Z17[h67 + 8 >> 2] | 0;
                                                        Z17[r2j + 12 >> 2] = p67;
                                                        Z17[p67 + 8 >> 2] = r2j;
                                                    }
                                                } while (0);if (!I2j)
                                                    break;
                                                x2j = Z17[h67 + 28 >> 2] | 0;
                                                w2j = 2064 + (x2j << 2) | 0;
                                                do {
                                                    if ((Z17[w2j >> 2] | 0) != (h67 | 0)) {
                                                        r2j = I2j + 16 | 0;
                                                        Z17[((Z17[r2j >> 2] | 0) == (h67 | 0) ? r2j : I2j + 20 | 0) >> 2] = p67;
                                                        if (!p67)
                                                            break a;
                                                    } else {
                                                        Z17[w2j >> 2] = p67;
                                                        if (p67 | 0)
                                                            break;
                                                        Z17[441] = Z17[441] & ~(1 << x2j);
                                                        break a;
                                                    }
                                                } while (0);Z17[p67 + 24 >> 2] = I2j;
                                                x2j = h67 + 16 | 0;
                                                w2j = Z17[x2j >> 2] | 0;
                                                if (w2j | 0) {
                                                    Z17[p67 + 16 >> 2] = w2j;
                                                    Z17[w2j + 24 >> 2] = p67;
                                                }
                                                x2j = Z17[x2j + 4 >> 2] | 0;
                                                if (!x2j)
                                                    break;
                                                Z17[p67 + 20 >> 2] = x2j;
                                                Z17[x2j + 24 >> 2] = p67;
                                            }
                                        } while (0);h67 = h67 + M2j | 0;
                                        C2j = M2j + N2j | 0;
                                    } else
                                        C2j = N2j;
                                    h67 = h67 + 4 | 0;
                                    Z17[h67 >> 2] = Z17[h67 >> 2] & -2;
                                    Z17[U2j + 4 >> 2] = C2j | 1;
                                    Z17[U2j + C2j >> 2] = C2j;
                                    h67 = C2j >>> 3;
                                    if (C2j >>> 0 < 256) {
                                        x2j = 1800 + (h67 << 1 << 2) | 0;
                                        p67 = Z17[440] | 0;
                                        h67 = 1 << h67;
                                        if (!(p67 & h67)) {
                                            Z17[440] = p67 | h67;
                                            h67 = x2j;
                                            p67 = x2j + 8 | 0;
                                        } else {
                                            p67 = x2j + 8 | 0;
                                            h67 = Z17[p67 >> 2] | 0;
                                        }
                                        Z17[p67 >> 2] = U2j;
                                        Z17[h67 + 12 >> 2] = U2j;
                                        Z17[U2j + 8 >> 2] = h67;
                                        Z17[U2j + 12 >> 2] = x2j;
                                        break;
                                    }
                                    h67 = C2j >>> 8;
                                    do {
                                        if (!h67)
                                            w2j = 0;
                                        else {
                                            if (C2j >>> 0 > 16777215) {
                                                w2j = 31;
                                                break;
                                            }
                                            j2j = (h67 + 1048320 | 0) >>> 16 & 8;
                                            r2j = h67 << j2j;
                                            V2j = (r2j + 520192 | 0) >>> 16 & 4;
                                            r2j = r2j << V2j;
                                            w2j = (r2j + 245760 | 0) >>> 16 & 2;
                                            w2j = 14 - (V2j | j2j | w2j) + (r2j << w2j >>> 15) | 0;
                                            w2j = C2j >>> (w2j + 7 | 0) & 1 | w2j << 1;
                                        }
                                    } while (0);h67 = 2064 + (w2j << 2) | 0;
                                    Z17[U2j + 28 >> 2] = w2j;
                                    p67 = U2j + 16 | 0;
                                    Z17[p67 + 4 >> 2] = 0;
                                    Z17[p67 >> 2] = 0;
                                    p67 = Z17[441] | 0;
                                    x2j = 1 << w2j;
                                    if (!(p67 & x2j)) {
                                        Z17[441] = p67 | x2j;
                                        Z17[h67 >> 2] = U2j;
                                        Z17[U2j + 24 >> 2] = h67;
                                        Z17[U2j + 12 >> 2] = U2j;
                                        Z17[U2j + 8 >> 2] = U2j;
                                        break;
                                    }
                                    h67 = Z17[h67 >> 2] | 0;
                                    a: do {
                                        if ((Z17[h67 + 4 >> 2] & -8 | 0) != (C2j | 0)) {
                                            w2j = C2j << ((w2j | 0) == 31 ? 0 : 25 - (w2j >>> 1) | 0);
                                            while (1) {
                                                x2j = h67 + 16 + (w2j >>> 31 << 2) | 0;
                                                p67 = Z17[x2j >> 2] | 0;
                                                if (!p67)
                                                    break;
                                                if ((Z17[p67 + 4 >> 2] & -8 | 0) == (C2j | 0)) {
                                                    h67 = p67;
                                                    break a;
                                                } else {
                                                    w2j = w2j << 1;
                                                    h67 = p67;
                                                }
                                            }
                                            Z17[x2j >> 2] = U2j;
                                            Z17[U2j + 24 >> 2] = h67;
                                            Z17[U2j + 12 >> 2] = U2j;
                                            Z17[U2j + 8 >> 2] = U2j;
                                            break c;
                                        }
                                    } while (0);j2j = h67 + 8 | 0;
                                    r2j = Z17[j2j >> 2] | 0;
                                    Z17[r2j + 12 >> 2] = U2j;
                                    Z17[j2j >> 2] = U2j;
                                    Z17[U2j + 8 >> 2] = r2j;
                                    Z17[U2j + 12 >> 2] = h67;
                                    Z17[U2j + 24 >> 2] = 0;
                                }
                            } while (0);r2j = Y2j + 8 | 0;
                            g17 = D2j;
                            return r2j | 0;
                        }
                        h67 = 2208;
                        while (1) {
                            p67 = Z17[h67 >> 2] | 0;
                            if (p67 >>> 0 <= a2j >>> 0 ? (r2j = p67 + (Z17[h67 + 4 >> 2] | 0) | 0,
                            r2j >>> 0 > a2j >>> 0) : 0)
                                break;
                            h67 = Z17[h67 + 8 >> 2] | 0;
                        }
                        C2j = r2j + -47 | 0;
                        p67 = C2j + 8 | 0;
                        p67 = C2j + ((p67 & 7 | 0) == 0 ? 0 : 0 - p67 & 7) | 0;
                        C2j = a2j + 16 | 0;
                        p67 = p67 >>> 0 < C2j >>> 0 ? a2j : p67;
                        h67 = p67 + 8 | 0;
                        x2j = M2j + -40 | 0;
                        V2j = I2j + 8 | 0;
                        V2j = (V2j & 7 | 0) == 0 ? 0 : 0 - V2j & 7;
                        j2j = I2j + V2j | 0;
                        V2j = x2j - V2j | 0;
                        Z17[446] = j2j;
                        Z17[443] = V2j;
                        Z17[j2j + 4 >> 2] = V2j | 1;
                        Z17[I2j + x2j + 4 >> 2] = 40;
                        Z17[447] = Z17[562];
                        x2j = p67 + 4 | 0;
                        Z17[x2j >> 2] = 27;
                        Z17[h67 >> 2] = Z17[552];
                        Z17[h67 + 4 >> 2] = Z17[553];
                        Z17[h67 + 8 >> 2] = Z17[554];
                        Z17[h67 + 12 >> 2] = Z17[555];
                        Z17[552] = I2j;
                        Z17[553] = M2j;
                        Z17[555] = 0;
                        Z17[554] = h67;
                        h67 = p67 + 24 | 0;
                        do {
                            j2j = h67;
                            h67 = h67 + 4 | 0;
                            Z17[h67 >> 2] = 7;
                        } while ((j2j + 8 | 0) >>> 0 < r2j >>> 0);if ((p67 | 0) != (a2j | 0)) {
                            I2j = p67 - a2j | 0;
                            Z17[x2j >> 2] = Z17[x2j >> 2] & -2;
                            Z17[a2j + 4 >> 2] = I2j | 1;
                            Z17[p67 >> 2] = I2j;
                            h67 = I2j >>> 3;
                            if (I2j >>> 0 < 256) {
                                x2j = 1800 + (h67 << 1 << 2) | 0;
                                p67 = Z17[440] | 0;
                                h67 = 1 << h67;
                                if (!(p67 & h67)) {
                                    Z17[440] = p67 | h67;
                                    h67 = x2j;
                                    p67 = x2j + 8 | 0;
                                } else {
                                    p67 = x2j + 8 | 0;
                                    h67 = Z17[p67 >> 2] | 0;
                                }
                                Z17[p67 >> 2] = a2j;
                                Z17[h67 + 12 >> 2] = a2j;
                                Z17[a2j + 8 >> 2] = h67;
                                Z17[a2j + 12 >> 2] = x2j;
                                break;
                            }
                            h67 = I2j >>> 8;
                            if (h67) {
                                if (I2j >>> 0 > 16777215)
                                    w2j = 31;
                                else {
                                    j2j = (h67 + 1048320 | 0) >>> 16 & 8;
                                    r2j = h67 << j2j;
                                    V2j = (r2j + 520192 | 0) >>> 16 & 4;
                                    r2j = r2j << V2j;
                                    w2j = (r2j + 245760 | 0) >>> 16 & 2;
                                    w2j = 14 - (V2j | j2j | w2j) + (r2j << w2j >>> 15) | 0;
                                    w2j = I2j >>> (w2j + 7 | 0) & 1 | w2j << 1;
                                }
                            } else
                                w2j = 0;
                            x2j = 2064 + (w2j << 2) | 0;
                            Z17[a2j + 28 >> 2] = w2j;
                            Z17[a2j + 20 >> 2] = 0;
                            Z17[C2j >> 2] = 0;
                            h67 = Z17[441] | 0;
                            p67 = 1 << w2j;
                            if (!(h67 & p67)) {
                                Z17[441] = h67 | p67;
                                Z17[x2j >> 2] = a2j;
                                Z17[a2j + 24 >> 2] = x2j;
                                Z17[a2j + 12 >> 2] = a2j;
                                Z17[a2j + 8 >> 2] = a2j;
                                break;
                            }
                            h67 = Z17[x2j >> 2] | 0;
                            a: do {
                                if ((Z17[h67 + 4 >> 2] & -8 | 0) != (I2j | 0)) {
                                    w2j = I2j << ((w2j | 0) == 31 ? 0 : 25 - (w2j >>> 1) | 0);
                                    while (1) {
                                        x2j = h67 + 16 + (w2j >>> 31 << 2) | 0;
                                        p67 = Z17[x2j >> 2] | 0;
                                        if (!p67)
                                            break;
                                        if ((Z17[p67 + 4 >> 2] & -8 | 0) == (I2j | 0)) {
                                            h67 = p67;
                                            break a;
                                        } else {
                                            w2j = w2j << 1;
                                            h67 = p67;
                                        }
                                    }
                                    Z17[x2j >> 2] = a2j;
                                    Z17[a2j + 24 >> 2] = h67;
                                    Z17[a2j + 12 >> 2] = a2j;
                                    Z17[a2j + 8 >> 2] = a2j;
                                    break b;
                                }
                            } while (0);j2j = h67 + 8 | 0;
                            r2j = Z17[j2j >> 2] | 0;
                            Z17[r2j + 12 >> 2] = a2j;
                            Z17[j2j >> 2] = a2j;
                            Z17[a2j + 8 >> 2] = r2j;
                            Z17[a2j + 12 >> 2] = h67;
                            Z17[a2j + 24 >> 2] = 0;
                        }
                    } else {
                        r2j = Z17[444] | 0;
                        if ((r2j | 0) == 0 | I2j >>> 0 < r2j >>> 0)
                            Z17[444] = I2j;
                        Z17[552] = I2j;
                        Z17[553] = M2j;
                        Z17[555] = 0;
                        Z17[449] = Z17[558];
                        Z17[448] = -1;
                        Z17[453] = 1800;
                        Z17[452] = 1800;
                        Z17[455] = 1808;
                        Z17[454] = 1808;
                        Z17[457] = 1816;
                        Z17[456] = 1816;
                        Z17[459] = 1824;
                        Z17[458] = 1824;
                        Z17[461] = 1832;
                        Z17[460] = 1832;
                        Z17[463] = 1840;
                        Z17[462] = 1840;
                        Z17[465] = 1848;
                        Z17[464] = 1848;
                        Z17[467] = 1856;
                        Z17[466] = 1856;
                        Z17[469] = 1864;
                        Z17[468] = 1864;
                        Z17[471] = 1872;
                        Z17[470] = 1872;
                        Z17[473] = 1880;
                        Z17[472] = 1880;
                        Z17[475] = 1888;
                        Z17[474] = 1888;
                        Z17[477] = 1896;
                        Z17[476] = 1896;
                        Z17[479] = 1904;
                        Z17[478] = 1904;
                        Z17[481] = 1912;
                        Z17[480] = 1912;
                        Z17[483] = 1920;
                        Z17[482] = 1920;
                        Z17[485] = 1928;
                        Z17[484] = 1928;
                        Z17[487] = 1936;
                        Z17[486] = 1936;
                        Z17[489] = 1944;
                        Z17[488] = 1944;
                        Z17[491] = 1952;
                        Z17[490] = 1952;
                        Z17[493] = 1960;
                        Z17[492] = 1960;
                        Z17[495] = 1968;
                        Z17[494] = 1968;
                        Z17[497] = 1976;
                        Z17[496] = 1976;
                        Z17[499] = 1984;
                        Z17[498] = 1984;
                        Z17[501] = 1992;
                        Z17[500] = 1992;
                        Z17[503] = 2e3;
                        Z17[502] = 2e3;
                        Z17[505] = 2008;
                        Z17[504] = 2008;
                        Z17[507] = 2016;
                        Z17[506] = 2016;
                        Z17[509] = 2024;
                        Z17[508] = 2024;
                        Z17[511] = 2032;
                        Z17[510] = 2032;
                        Z17[513] = 2040;
                        Z17[512] = 2040;
                        Z17[515] = 2048;
                        Z17[514] = 2048;
                        r2j = M2j + -40 | 0;
                        V2j = I2j + 8 | 0;
                        V2j = (V2j & 7 | 0) == 0 ? 0 : 0 - V2j & 7;
                        j2j = I2j + V2j | 0;
                        V2j = r2j - V2j | 0;
                        Z17[446] = j2j;
                        Z17[443] = V2j;
                        Z17[j2j + 4 >> 2] = V2j | 1;
                        Z17[I2j + r2j + 4 >> 2] = 40;
                        Z17[447] = Z17[562];
                    }
                } while (0);h67 = Z17[443] | 0;
                if (h67 >>> 0 > O2j >>> 0) {
                    V2j = h67 - O2j | 0;
                    Z17[443] = V2j;
                    r2j = Z17[446] | 0;
                    j2j = r2j + O2j | 0;
                    Z17[446] = j2j;
                    Z17[j2j + 4 >> 2] = V2j | 1;
                    Z17[r2j + 4 >> 2] = O2j | 3;
                    r2j = r2j + 8 | 0;
                    g17 = D2j;
                    return r2j | 0;
                }
            }
            Z17[(J17() | 0) >> 2] = 12;
            r2j = 0;
            g17 = D2j;
            return r2j | 0;
        }
        function J97(n2j) {
            n2j = n2j | 0;
            var P2j = 0
              , E2j = 0
              , s2j = 0
              , o2j = 0
              , e2j = 0
              , z2j = 0
              , R2j = 0
              , m2j = 0;
            if (!n2j)
                return;
            E2j = n2j + -8 | 0;
            o2j = Z17[444] | 0;
            n2j = Z17[n2j + -4 >> 2] | 0;
            P2j = n2j & -8;
            m2j = E2j + P2j | 0;
            do {
                if (!(n2j & 1)) {
                    s2j = Z17[E2j >> 2] | 0;
                    if (!(n2j & 3))
                        return;
                    z2j = E2j + (0 - s2j) | 0;
                    e2j = s2j + P2j | 0;
                    if (z2j >>> 0 < o2j >>> 0)
                        return;
                    if ((Z17[445] | 0) == (z2j | 0)) {
                        n2j = m2j + 4 | 0;
                        P2j = Z17[n2j >> 2] | 0;
                        if ((P2j & 3 | 0) != 3) {
                            R2j = z2j;
                            P2j = e2j;
                            break;
                        }
                        Z17[442] = e2j;
                        Z17[n2j >> 2] = P2j & -2;
                        Z17[z2j + 4 >> 2] = e2j | 1;
                        Z17[z2j + e2j >> 2] = e2j;
                        return;
                    }
                    E2j = s2j >>> 3;
                    if (s2j >>> 0 < 256) {
                        n2j = Z17[z2j + 8 >> 2] | 0;
                        P2j = Z17[z2j + 12 >> 2] | 0;
                        if ((P2j | 0) == (n2j | 0)) {
                            Z17[440] = Z17[440] & ~(1 << E2j);
                            R2j = z2j;
                            P2j = e2j;
                            break;
                        } else {
                            Z17[n2j + 12 >> 2] = P2j;
                            Z17[P2j + 8 >> 2] = n2j;
                            R2j = z2j;
                            P2j = e2j;
                            break;
                        }
                    }
                    o2j = Z17[z2j + 24 >> 2] | 0;
                    n2j = Z17[z2j + 12 >> 2] | 0;
                    do {
                        if ((n2j | 0) == (z2j | 0)) {
                            P2j = z2j + 16 | 0;
                            E2j = P2j + 4 | 0;
                            n2j = Z17[E2j >> 2] | 0;
                            if (!n2j) {
                                n2j = Z17[P2j >> 2] | 0;
                                if (!n2j) {
                                    n2j = 0;
                                    break;
                                }
                            } else
                                P2j = E2j;
                            while (1) {
                                s2j = n2j + 20 | 0;
                                E2j = Z17[s2j >> 2] | 0;
                                if (!E2j) {
                                    s2j = n2j + 16 | 0;
                                    E2j = Z17[s2j >> 2] | 0;
                                    if (!E2j)
                                        break;
                                    else {
                                        n2j = E2j;
                                        P2j = s2j;
                                    }
                                } else {
                                    n2j = E2j;
                                    P2j = s2j;
                                }
                            }
                            Z17[P2j >> 2] = 0;
                        } else {
                            R2j = Z17[z2j + 8 >> 2] | 0;
                            Z17[R2j + 12 >> 2] = n2j;
                            Z17[n2j + 8 >> 2] = R2j;
                        }
                    } while (0);if (o2j) {
                        P2j = Z17[z2j + 28 >> 2] | 0;
                        E2j = 2064 + (P2j << 2) | 0;
                        if ((Z17[E2j >> 2] | 0) == (z2j | 0)) {
                            Z17[E2j >> 2] = n2j;
                            if (!n2j) {
                                Z17[441] = Z17[441] & ~(1 << P2j);
                                R2j = z2j;
                                P2j = e2j;
                                break;
                            }
                        } else {
                            R2j = o2j + 16 | 0;
                            Z17[((Z17[R2j >> 2] | 0) == (z2j | 0) ? R2j : o2j + 20 | 0) >> 2] = n2j;
                            if (!n2j) {
                                R2j = z2j;
                                P2j = e2j;
                                break;
                            }
                        }
                        Z17[n2j + 24 >> 2] = o2j;
                        P2j = z2j + 16 | 0;
                        E2j = Z17[P2j >> 2] | 0;
                        if (E2j | 0) {
                            Z17[n2j + 16 >> 2] = E2j;
                            Z17[E2j + 24 >> 2] = n2j;
                        }
                        P2j = Z17[P2j + 4 >> 2] | 0;
                        if (P2j) {
                            Z17[n2j + 20 >> 2] = P2j;
                            Z17[P2j + 24 >> 2] = n2j;
                            R2j = z2j;
                            P2j = e2j;
                        } else {
                            R2j = z2j;
                            P2j = e2j;
                        }
                    } else {
                        R2j = z2j;
                        P2j = e2j;
                    }
                } else {
                    R2j = E2j;
                    z2j = E2j;
                }
            } while (0);if (z2j >>> 0 >= m2j >>> 0)
                return;
            n2j = m2j + 4 | 0;
            s2j = Z17[n2j >> 2] | 0;
            if (!(s2j & 1))
                return;
            if (!(s2j & 2)) {
                if ((Z17[446] | 0) == (m2j | 0)) {
                    m2j = (Z17[443] | 0) + P2j | 0;
                    Z17[443] = m2j;
                    Z17[446] = R2j;
                    Z17[R2j + 4 >> 2] = m2j | 1;
                    if ((R2j | 0) != (Z17[445] | 0))
                        return;
                    Z17[445] = 0;
                    Z17[442] = 0;
                    return;
                }
                if ((Z17[445] | 0) == (m2j | 0)) {
                    m2j = (Z17[442] | 0) + P2j | 0;
                    Z17[442] = m2j;
                    Z17[445] = z2j;
                    Z17[R2j + 4 >> 2] = m2j | 1;
                    Z17[z2j + m2j >> 2] = m2j;
                    return;
                }
                o2j = (s2j & -8) + P2j | 0;
                E2j = s2j >>> 3;
                do {
                    if (s2j >>> 0 < 256) {
                        P2j = Z17[m2j + 8 >> 2] | 0;
                        n2j = Z17[m2j + 12 >> 2] | 0;
                        if ((n2j | 0) == (P2j | 0)) {
                            Z17[440] = Z17[440] & ~(1 << E2j);
                            break;
                        } else {
                            Z17[P2j + 12 >> 2] = n2j;
                            Z17[n2j + 8 >> 2] = P2j;
                            break;
                        }
                    } else {
                        e2j = Z17[m2j + 24 >> 2] | 0;
                        n2j = Z17[m2j + 12 >> 2] | 0;
                        do {
                            if ((n2j | 0) == (m2j | 0)) {
                                P2j = m2j + 16 | 0;
                                E2j = P2j + 4 | 0;
                                n2j = Z17[E2j >> 2] | 0;
                                if (!n2j) {
                                    n2j = Z17[P2j >> 2] | 0;
                                    if (!n2j) {
                                        E2j = 0;
                                        break;
                                    }
                                } else
                                    P2j = E2j;
                                while (1) {
                                    s2j = n2j + 20 | 0;
                                    E2j = Z17[s2j >> 2] | 0;
                                    if (!E2j) {
                                        s2j = n2j + 16 | 0;
                                        E2j = Z17[s2j >> 2] | 0;
                                        if (!E2j)
                                            break;
                                        else {
                                            n2j = E2j;
                                            P2j = s2j;
                                        }
                                    } else {
                                        n2j = E2j;
                                        P2j = s2j;
                                    }
                                }
                                Z17[P2j >> 2] = 0;
                                E2j = n2j;
                            } else {
                                E2j = Z17[m2j + 8 >> 2] | 0;
                                Z17[E2j + 12 >> 2] = n2j;
                                Z17[n2j + 8 >> 2] = E2j;
                                E2j = n2j;
                            }
                        } while (0);if (e2j | 0) {
                            n2j = Z17[m2j + 28 >> 2] | 0;
                            P2j = 2064 + (n2j << 2) | 0;
                            if ((Z17[P2j >> 2] | 0) == (m2j | 0)) {
                                Z17[P2j >> 2] = E2j;
                                if (!E2j) {
                                    Z17[441] = Z17[441] & ~(1 << n2j);
                                    break;
                                }
                            } else {
                                s2j = e2j + 16 | 0;
                                Z17[((Z17[s2j >> 2] | 0) == (m2j | 0) ? s2j : e2j + 20 | 0) >> 2] = E2j;
                                if (!E2j)
                                    break;
                            }
                            Z17[E2j + 24 >> 2] = e2j;
                            n2j = m2j + 16 | 0;
                            P2j = Z17[n2j >> 2] | 0;
                            if (P2j | 0) {
                                Z17[E2j + 16 >> 2] = P2j;
                                Z17[P2j + 24 >> 2] = E2j;
                            }
                            n2j = Z17[n2j + 4 >> 2] | 0;
                            if (n2j | 0) {
                                Z17[E2j + 20 >> 2] = n2j;
                                Z17[n2j + 24 >> 2] = E2j;
                            }
                        }
                    }
                } while (0);Z17[R2j + 4 >> 2] = o2j | 1;
                Z17[z2j + o2j >> 2] = o2j;
                if ((R2j | 0) == (Z17[445] | 0)) {
                    Z17[442] = o2j;
                    return;
                }
            } else {
                Z17[n2j >> 2] = s2j & -2;
                Z17[R2j + 4 >> 2] = P2j | 1;
                Z17[z2j + P2j >> 2] = P2j;
                o2j = P2j;
            }
            n2j = o2j >>> 3;
            if (o2j >>> 0 < 256) {
                E2j = 1800 + (n2j << 1 << 2) | 0;
                P2j = Z17[440] | 0;
                n2j = 1 << n2j;
                if (!(P2j & n2j)) {
                    Z17[440] = P2j | n2j;
                    n2j = E2j;
                    P2j = E2j + 8 | 0;
                } else {
                    P2j = E2j + 8 | 0;
                    n2j = Z17[P2j >> 2] | 0;
                }
                Z17[P2j >> 2] = R2j;
                Z17[n2j + 12 >> 2] = R2j;
                Z17[R2j + 8 >> 2] = n2j;
                Z17[R2j + 12 >> 2] = E2j;
                return;
            }
            n2j = o2j >>> 8;
            if (n2j) {
                if (o2j >>> 0 > 16777215)
                    s2j = 31;
                else {
                    z2j = (n2j + 1048320 | 0) >>> 16 & 8;
                    m2j = n2j << z2j;
                    e2j = (m2j + 520192 | 0) >>> 16 & 4;
                    m2j = m2j << e2j;
                    s2j = (m2j + 245760 | 0) >>> 16 & 2;
                    s2j = 14 - (e2j | z2j | s2j) + (m2j << s2j >>> 15) | 0;
                    s2j = o2j >>> (s2j + 7 | 0) & 1 | s2j << 1;
                }
            } else
                s2j = 0;
            n2j = 2064 + (s2j << 2) | 0;
            Z17[R2j + 28 >> 2] = s2j;
            Z17[R2j + 20 >> 2] = 0;
            Z17[R2j + 16 >> 2] = 0;
            P2j = Z17[441] | 0;
            E2j = 1 << s2j;
            a: do {
                if (!(P2j & E2j)) {
                    Z17[441] = P2j | E2j;
                    Z17[n2j >> 2] = R2j;
                    Z17[R2j + 24 >> 2] = n2j;
                    Z17[R2j + 12 >> 2] = R2j;
                    Z17[R2j + 8 >> 2] = R2j;
                } else {
                    n2j = Z17[n2j >> 2] | 0;
                    b: do {
                        if ((Z17[n2j + 4 >> 2] & -8 | 0) != (o2j | 0)) {
                            s2j = o2j << ((s2j | 0) == 31 ? 0 : 25 - (s2j >>> 1) | 0);
                            while (1) {
                                E2j = n2j + 16 + (s2j >>> 31 << 2) | 0;
                                P2j = Z17[E2j >> 2] | 0;
                                if (!P2j)
                                    break;
                                if ((Z17[P2j + 4 >> 2] & -8 | 0) == (o2j | 0)) {
                                    n2j = P2j;
                                    break b;
                                } else {
                                    s2j = s2j << 1;
                                    n2j = P2j;
                                }
                            }
                            Z17[E2j >> 2] = R2j;
                            Z17[R2j + 24 >> 2] = n2j;
                            Z17[R2j + 12 >> 2] = R2j;
                            Z17[R2j + 8 >> 2] = R2j;
                            break a;
                        }
                    } while (0);z2j = n2j + 8 | 0;
                    m2j = Z17[z2j >> 2] | 0;
                    Z17[m2j + 12 >> 2] = R2j;
                    Z17[z2j >> 2] = R2j;
                    Z17[R2j + 8 >> 2] = m2j;
                    Z17[R2j + 12 >> 2] = n2j;
                    Z17[R2j + 24 >> 2] = 0;
                }
            } while (0);m2j = (Z17[448] | 0) + -1 | 0;
            Z17[448] = m2j;
            if (m2j | 0)
                return;
            n2j = 2216;
            while (1) {
                n2j = Z17[n2j >> 2] | 0;
                if (!n2j)
                    break;
                else
                    n2j = n2j + 8 | 0;
            }
            Z17[448] = -1;
            return;
        }
        function v97(Q2j) {
            Q2j = Q2j | 0;
            var H2j = 0
              , c2j = 0;
            H2j = g17;
            g17 = g17 + 16 | 0;
            if ((g17 | 0) >= (S17 | 0))
                W17(16);
            c2j = H2j;
            Z17[c2j >> 2] = r67(Z17[Q2j + 60 >> 2] | 0) | 0;
            Q2j = F17(I97(6, c2j | 0) | 0) | 0;
            g17 = H2j;
            return Q2j | 0;
        }
        function U97(g2j, q2j, b2j) {
            g2j = g2j | 0;
            q2j = q2j | 0;
            b2j = b2j | 0;
            var f2j = 0
              , X2j = 0
              , Z2j = 0
              , G2j = 0
              , y2j = 0
              , A2j = 0
              , W2j = 0
              , F2j = 0
              , d2j = 0
              , S2j = 0
              , l2j = 0;
            d2j = g17;
            g17 = g17 + 48 | 0;
            if ((g17 | 0) >= (S17 | 0))
                W17(48);
            W2j = d2j + 32 | 0;
            Z2j = d2j + 16 | 0;
            X2j = d2j;
            y2j = g2j + 28 | 0;
            f2j = Z17[y2j >> 2] | 0;
            Z17[X2j >> 2] = f2j;
            A2j = g2j + 20 | 0;
            f2j = (Z17[A2j >> 2] | 0) - f2j | 0;
            Z17[X2j + 4 >> 2] = f2j;
            Z17[X2j + 8 >> 2] = q2j;
            Z17[X2j + 12 >> 2] = b2j;
            f2j = f2j + b2j | 0;
            G2j = g2j + 60 | 0;
            Z17[Z2j >> 2] = Z17[G2j >> 2];
            Z17[Z2j + 4 >> 2] = X2j;
            Z17[Z2j + 8 >> 2] = 2;
            Z2j = F17(h17(146, Z2j | 0) | 0) | 0;
            a: do {
                if ((f2j | 0) != (Z2j | 0)) {
                    q2j = 2;
                    while (1) {
                        if ((Z2j | 0) < 0)
                            break;
                        f2j = f2j - Z2j | 0;
                        l2j = Z17[X2j + 4 >> 2] | 0;
                        S2j = Z2j >>> 0 > l2j >>> 0;
                        X2j = S2j ? X2j + 8 | 0 : X2j;
                        q2j = q2j + (S2j << 31 >> 31) | 0;
                        l2j = Z2j - (S2j ? l2j : 0) | 0;
                        Z17[X2j >> 2] = (Z17[X2j >> 2] | 0) + l2j;
                        S2j = X2j + 4 | 0;
                        Z17[S2j >> 2] = (Z17[S2j >> 2] | 0) - l2j;
                        Z17[W2j >> 2] = Z17[G2j >> 2];
                        Z17[W2j + 4 >> 2] = X2j;
                        Z17[W2j + 8 >> 2] = q2j;
                        Z2j = F17(h17(146, W2j | 0) | 0) | 0;
                        if ((f2j | 0) == (Z2j | 0)) {
                            F2j = 3;
                            break a;
                        }
                    }
                    Z17[g2j + 16 >> 2] = 0;
                    Z17[y2j >> 2] = 0;
                    Z17[A2j >> 2] = 0;
                    Z17[g2j >> 2] = Z17[g2j >> 2] | 32;
                    if ((q2j | 0) == 2)
                        b2j = 0;
                    else
                        b2j = b2j - (Z17[X2j + 4 >> 2] | 0) | 0;
                } else
                    F2j = 3;
            } while (0);if ((F2j | 0) == 3) {
                l2j = Z17[g2j + 44 >> 2] | 0;
                Z17[g2j + 16 >> 2] = l2j + (Z17[g2j + 48 >> 2] | 0);
                Z17[y2j >> 2] = l2j;
                Z17[A2j >> 2] = l2j;
            }
            g17 = d2j;
            return b2j | 0;
        }
        function h97(J2j, h2j, p2j) {
            J2j = J2j | 0;
            h2j = h2j | 0;
            p2j = p2j | 0;
            var v2j = 0
              , L2j = 0
              , i2j = 0;
            L2j = g17;
            g17 = g17 + 32 | 0;
            if ((g17 | 0) >= (S17 | 0))
                W17(32);
            i2j = L2j;
            v2j = L2j + 20 | 0;
            Z17[i2j >> 2] = Z17[J2j + 60 >> 2];
            Z17[i2j + 4 >> 2] = 0;
            Z17[i2j + 8 >> 2] = h2j;
            Z17[i2j + 12 >> 2] = v2j;
            Z17[i2j + 16 >> 2] = p2j;
            if ((F17(r97(140, i2j | 0) | 0) | 0) < 0) {
                Z17[v2j >> 2] = -1;
                J2j = -1;
            } else
                J2j = Z17[v2j >> 2] | 0;
            g17 = L2j;
            return J2j | 0;
        }
        function F17(x8j) {
            x8j = x8j | 0;
            if (x8j >>> 0 > 4294963200) {
                Z17[(J17() | 0) >> 2] = 0 - x8j;
                x8j = -1;
            }
            return x8j | 0;
        }
        function J17() {
            return 2256;
        }
        function r67(r8j) {
            r8j = r8j | 0;
            return r8j | 0;
        }
        function w67(I8j, N8j, U8j) {
            I8j = I8j | 0;
            N8j = N8j | 0;
            U8j = U8j | 0;
            var w8j = 0
              , a8j = 0;
            a8j = g17;
            g17 = g17 + 32 | 0;
            if ((g17 | 0) >= (S17 | 0))
                W17(32);
            w8j = a8j;
            Z17[I8j + 36 >> 2] = 3;
            if ((Z17[I8j >> 2] & 64 | 0) == 0 ? (Z17[w8j >> 2] = Z17[I8j + 60 >> 2],
            Z17[w8j + 4 >> 2] = 21523,
            Z17[w8j + 8 >> 2] = a8j + 16,
            w97(54, w8j | 0) | 0) : 0)
                f17[I8j + 75 >> 0] = -1;
            w8j = U97(I8j, N8j, U8j) | 0;
            g17 = a8j;
            return w8j | 0;
        }
        function I67() {
            C97(2260);
            return 2268;
        }
        function a67() {
            a97(2260);
            return;
        }
        function O97(M8j) {
            M8j = M8j | 0;
            var C8j = 0;
            do {
                if (M8j) {
                    if ((Z17[M8j + 76 >> 2] | 0) <= -1) {
                        C8j = L17(M8j) | 0;
                        break;
                    }
                    C8j = L17(M8j) | 0;
                } else {
                    if (!(Z17[179] | 0))
                        C8j = 0;
                    else
                        C8j = O97(Z17[179] | 0) | 0;
                    M8j = Z17[(I67() | 0) >> 2] | 0;
                    if (M8j)
                        do {
                            if ((Z17[M8j + 20 >> 2] | 0) >>> 0 > (Z17[M8j + 28 >> 2] | 0) >>> 0)
                                C8j = L17(M8j) | 0 | C8j;
                            M8j = Z17[M8j + 56 >> 2] | 0;
                        } while ((M8j | 0) != 0);a67();
                }
            } while (0);return C8j | 0;
        }
        function L17(O8j) {
            O8j = O8j | 0;
            var V8j = 0
              , Y8j = 0
              , j8j = 0
              , B8j = 0
              , D8j = 0
              , t8j = 0;
            V8j = O8j + 20 | 0;
            t8j = O8j + 28 | 0;
            if ((Z17[V8j >> 2] | 0) >>> 0 > (Z17[t8j >> 2] | 0) >>> 0 ? (i17[Z17[O8j + 36 >> 2] & 3](O8j, 0, 0) | 0,
            (Z17[V8j >> 2] | 0) == 0) : 0)
                O8j = -1;
            else {
                Y8j = O8j + 4 | 0;
                j8j = Z17[Y8j >> 2] | 0;
                B8j = O8j + 8 | 0;
                D8j = Z17[B8j >> 2] | 0;
                if (j8j >>> 0 < D8j >>> 0)
                    i17[Z17[O8j + 40 >> 2] & 3](O8j, j8j - D8j | 0, 1) | 0;
                Z17[O8j + 16 >> 2] = 0;
                Z17[t8j >> 2] = 0;
                Z17[V8j >> 2] = 0;
                Z17[B8j >> 2] = 0;
                Z17[Y8j >> 2] = 0;
                O8j = 0;
            }
            return O8j | 0;
        }
        function b17(k8j) {
            k8j = k8j | 0;
            return C67(k8j) | 0;
        }
        function C67(K8j) {
            K8j = K8j | 0;
            return j97(K8j | 0) | 0;
        }
        function O67() {}
        function j97(T8j) {
            T8j = T8j | 0;
            return (T8j & 255) << 24 | (T8j >> 8 & 255) << 16 | (T8j >> 16 & 255) << 8 | T8j >>> 24 | 0;
        }
        function B97(u8j, n8j, P8j) {
            u8j = u8j | 0;
            n8j = n8j | 0;
            P8j = P8j | 0;
            var s8j = 0
              , E8j = 0
              , R8j = 0;
            if ((P8j | 0) >= 8192)
                return N97(u8j | 0, n8j | 0, P8j | 0) | 0;
            R8j = u8j | 0;
            E8j = u8j + P8j | 0;
            if ((u8j & 3) == (n8j & 3)) {
                while (u8j & 3) {
                    if (!P8j)
                        return R8j | 0;
                    f17[u8j >> 0] = f17[n8j >> 0] | 0;
                    u8j = u8j + 1 | 0;
                    n8j = n8j + 1 | 0;
                    P8j = P8j - 1 | 0;
                }
                P8j = E8j & -4 | 0;
                s8j = P8j - 64 | 0;
                while ((u8j | 0) <= (s8j | 0)) {
                    Z17[u8j >> 2] = Z17[n8j >> 2];
                    Z17[u8j + 4 >> 2] = Z17[n8j + 4 >> 2];
                    Z17[u8j + 8 >> 2] = Z17[n8j + 8 >> 2];
                    Z17[u8j + 12 >> 2] = Z17[n8j + 12 >> 2];
                    Z17[u8j + 16 >> 2] = Z17[n8j + 16 >> 2];
                    Z17[u8j + 20 >> 2] = Z17[n8j + 20 >> 2];
                    Z17[u8j + 24 >> 2] = Z17[n8j + 24 >> 2];
                    Z17[u8j + 28 >> 2] = Z17[n8j + 28 >> 2];
                    Z17[u8j + 32 >> 2] = Z17[n8j + 32 >> 2];
                    Z17[u8j + 36 >> 2] = Z17[n8j + 36 >> 2];
                    Z17[u8j + 40 >> 2] = Z17[n8j + 40 >> 2];
                    Z17[u8j + 44 >> 2] = Z17[n8j + 44 >> 2];
                    Z17[u8j + 48 >> 2] = Z17[n8j + 48 >> 2];
                    Z17[u8j + 52 >> 2] = Z17[n8j + 52 >> 2];
                    Z17[u8j + 56 >> 2] = Z17[n8j + 56 >> 2];
                    Z17[u8j + 60 >> 2] = Z17[n8j + 60 >> 2];
                    u8j = u8j + 64 | 0;
                    n8j = n8j + 64 | 0;
                }
                while ((u8j | 0) < (P8j | 0)) {
                    Z17[u8j >> 2] = Z17[n8j >> 2];
                    u8j = u8j + 4 | 0;
                    n8j = n8j + 4 | 0;
                }
            } else {
                P8j = E8j - 4 | 0;
                while ((u8j | 0) < (P8j | 0)) {
                    f17[u8j >> 0] = f17[n8j >> 0] | 0;
                    f17[u8j + 1 >> 0] = f17[n8j + 1 >> 0] | 0;
                    f17[u8j + 2 >> 0] = f17[n8j + 2 >> 0] | 0;
                    f17[u8j + 3 >> 0] = f17[n8j + 3 >> 0] | 0;
                    u8j = u8j + 4 | 0;
                    n8j = n8j + 4 | 0;
                }
            }
            while ((u8j | 0) < (E8j | 0)) {
                f17[u8j >> 0] = f17[n8j >> 0] | 0;
                u8j = u8j + 1 | 0;
                n8j = n8j + 1 | 0;
            }
            return R8j | 0;
        }
        function D97(m8j, z8j, o8j) {
            m8j = m8j | 0;
            z8j = z8j | 0;
            o8j = o8j | 0;
            var e8j = 0;
            if ((z8j | 0) < (m8j | 0) & (m8j | 0) < (z8j + o8j | 0)) {
                e8j = m8j;
                z8j = z8j + o8j | 0;
                m8j = m8j + o8j | 0;
                while ((o8j | 0) > 0) {
                    m8j = m8j - 1 | 0;
                    z8j = z8j - 1 | 0;
                    o8j = o8j - 1 | 0;
                    f17[m8j >> 0] = f17[z8j >> 0] | 0;
                }
                m8j = e8j;
            } else
                B97(m8j, z8j, o8j) | 0;
            return m8j | 0;
        }
        function B67(Q8j, c8j, X8j) {
            Q8j = Q8j | 0;
            c8j = c8j | 0;
            X8j = X8j | 0;
            var f8j = 0
              , g8j = 0
              , Z8j = 0
              , H8j = 0;
            Z8j = Q8j + X8j | 0;
            c8j = c8j & 255;
            if ((X8j | 0) >= 67) {
                while (Q8j & 3) {
                    f17[Q8j >> 0] = c8j;
                    Q8j = Q8j + 1 | 0;
                }
                f8j = Z8j & -4 | 0;
                g8j = f8j - 64 | 0;
                H8j = c8j | c8j << 8 | c8j << 16 | c8j << 24;
                while ((Q8j | 0) <= (g8j | 0)) {
                    Z17[Q8j >> 2] = H8j;
                    Z17[Q8j + 4 >> 2] = H8j;
                    Z17[Q8j + 8 >> 2] = H8j;
                    Z17[Q8j + 12 >> 2] = H8j;
                    Z17[Q8j + 16 >> 2] = H8j;
                    Z17[Q8j + 20 >> 2] = H8j;
                    Z17[Q8j + 24 >> 2] = H8j;
                    Z17[Q8j + 28 >> 2] = H8j;
                    Z17[Q8j + 32 >> 2] = H8j;
                    Z17[Q8j + 36 >> 2] = H8j;
                    Z17[Q8j + 40 >> 2] = H8j;
                    Z17[Q8j + 44 >> 2] = H8j;
                    Z17[Q8j + 48 >> 2] = H8j;
                    Z17[Q8j + 52 >> 2] = H8j;
                    Z17[Q8j + 56 >> 2] = H8j;
                    Z17[Q8j + 60 >> 2] = H8j;
                    Q8j = Q8j + 64 | 0;
                }
                while ((Q8j | 0) < (f8j | 0)) {
                    Z17[Q8j >> 2] = H8j;
                    Q8j = Q8j + 4 | 0;
                }
            }
            while ((Q8j | 0) < (Z8j | 0)) {
                f17[Q8j >> 0] = c8j;
                Q8j = Q8j + 1 | 0;
            }
            return Z8j - X8j | 0;
        }
        function y17(q8j) {
            q8j = q8j | 0;
            var l8j = 0
              , b8j = 0;
            b8j = Z17[G17 >> 2] | 0;
            l8j = b8j + q8j | 0;
            if ((q8j | 0) > 0 & (l8j | 0) < (b8j | 0) | (l8j | 0) < 0) {
                V97() | 0;
                p17(12);
                return -1;
            }
            Z17[G17 >> 2] = l8j;
            if ((l8j | 0) > (Y97() | 0) ? (t97() | 0) == 0 : 0) {
                Z17[G17 >> 2] = b8j;
                p17(12);
                return -1;
            }
            return b8j | 0;
        }
        function t67(S8j, W8j) {
            S8j = S8j | 0;
            W8j = W8j | 0;
            return k97[S8j & 1](W8j | 0) | 0;
        }
        function k67(d8j, y8j, A8j, G8j) {
            d8j = d8j | 0;
            y8j = y8j | 0;
            A8j = A8j | 0;
            G8j = G8j | 0;
            return i17[d8j & 3](y8j | 0, A8j | 0, G8j | 0) | 0;
        }
        function K67(F8j) {
            F8j = F8j | 0;
            x97(0);
            return 0;
        }
        function T67(i8j, J8j, v8j) {
            i8j = i8j | 0;
            J8j = J8j | 0;
            v8j = v8j | 0;
            M97(1);
            return 0;
        }
        var k97 = [K67, v97];
        var i17 = [T67, w67, h97, U97];
        return {
            _Encrypt: F97,
            _Process: G97,
            ___errno_location: J17,
            _fflush: O97,
            _free: J97,
            _llvm_bswap_i32: j97,
            _malloc: i97,
            _memcpy: B97,
            _memmove: D97,
            _memset: B67,
            _sbrk: y17,
            dynCall_ii: t67,
            dynCall_iiii: k67,
            establishStackSpace: W97,
            getTempRet0: A97,
            runPostSets: O67,
            setTempRet0: y97,
            setThrew: d97,
            stackAlloc: b97,
            stackRestore: S97,
            stackSave: q97
        };
    }(b57.asmGlobalArg, b57.asmLibraryArg, F57)
      , J77 = W57._Encrypt;
    W57._Encrypt = function() {
        return S57(A57, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        S57(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        J77.apply(null, arguments);
    }
    ;
    var v77 = W57._Process;
    W57._Process = function() {
        return S57(A57, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        S57(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        v77.apply(null, arguments);
    }
    ;
    var L77 = W57.___errno_location;
    W57.___errno_location = function() {
        return S57(A57, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        S57(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        L77.apply(null, arguments);
    }
    ;
    var h77 = W57._fflush;
    W57._fflush = function() {
        return S57(A57, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        S57(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        h77.apply(null, arguments);
    }
    ;
    var p77 = W57._free;
    W57._free = function() {
        return S57(A57, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        S57(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        p77.apply(null, arguments);
    }
    ;
    var x47 = W57._llvm_bswap_i32;
    W57._llvm_bswap_i32 = function() {
        return S57(A57, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        S57(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        x47.apply(null, arguments);
    }
    ;
    var r47 = W57._malloc;
    W57._malloc = function() {
        return S57(A57, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        S57(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        r47.apply(null, arguments);
    }
    ;
    var w47 = W57._memmove;
    W57._memmove = function() {
        return S57(A57, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        S57(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        w47.apply(null, arguments);
    }
    ;
    var I47 = W57._sbrk;
    W57._sbrk = function() {
        return S57(A57, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        S57(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        I47.apply(null, arguments);
    }
    ;
    var a47 = W57.establishStackSpace;
    W57.establishStackSpace = function() {
        return S57(A57, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        S57(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        a47.apply(null, arguments);
    }
    ;
    var N47 = W57.getTempRet0;
    W57.getTempRet0 = function() {
        return S57(A57, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        S57(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        N47.apply(null, arguments);
    }
    ;
    var U47 = W57.setTempRet0;
    W57.setTempRet0 = function() {
        return S57(A57, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        S57(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        U47.apply(null, arguments);
    }
    ;
    var M47 = W57.setThrew;
    W57.setThrew = function() {
        return S57(A57, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        S57(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        M47.apply(null, arguments);
    }
    ;
    var C47 = W57.stackAlloc;
    W57.stackAlloc = function() {
        return S57(A57, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        S57(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        C47.apply(null, arguments);
    }
    ;
    var O47 = W57.stackRestore;
    W57.stackRestore = function() {
        return S57(A57, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        S57(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        O47.apply(null, arguments);
    }
    ;
    var V47 = W57.stackSave;
    W57.stackSave = function() {
        return S57(A57, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        S57(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        V47.apply(null, arguments);
    }
    ;
    b57._Encrypt = W57._Encrypt,
    b57._Process = W57._Process,
    b57.___errno_location = W57.___errno_location,
    b57._fflush = W57._fflush,
    b57._free = W57._free,
    b57._llvm_bswap_i32 = W57._llvm_bswap_i32,
    b57._malloc = W57._malloc,
    b57._memcpy = W57._memcpy,
    b57._memmove = W57._memmove,
    b57._memset = W57._memset,
    b57._sbrk = W57._sbrk,
    b57.establishStackSpace = W57.establishStackSpace,
    b57.getTempRet0 = W57.getTempRet0,
    b57.runPostSets = W57.runPostSets,
    b57.setTempRet0 = W57.setTempRet0,
    b57.setThrew = W57.setThrew;
    var E77, m77, T77 = b57.stackAlloc = W57.stackAlloc, O77 = b57.stackRestore = W57.stackRestore, U77 = b57.stackSave = W57.stackSave;
    b57.dynCall_ii = W57.dynCall_ii,
    b57.dynCall_iiii = W57.dynCall_iiii;
    if (b57.asm = W57,
    b57.intArrayFromString || (b57.intArrayFromString = function() {
        q57("'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.intArrayToString || (b57.intArrayToString = function() {
        q57("'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.ccall = function(B7j, M7j, t7j, w7j, k7j) {
        var Y7j = function(n7j) {
            var K7j = b57["_" + n7j];
            return S57(K7j, "Cannot call unknown function " + n7j + ", make sure it is exported"),
            K7j;
        }(B7j)
          , I7j = []
          , h8j = 0;
        if (S57("array" !== M7j, 'Return type should not be "array".'),
        w7j)
            for (var L8j = 0; L8j < w7j.length; L8j++) {
                var O7j = B47[t7j[L8j]];
                O7j ? (0 === h8j && (h8j = U77()),
                I7j[L8j] = O7j(w7j[L8j])) : I7j[L8j] = w7j[L8j];
            }
        var p8j = Y7j.apply(null, I7j);
        return p8j = function(R7j) {
            return "string" === M7j ? Y47(R7j) : "boolean" === M7j ? Boolean(R7j) : R7j;
        }(p8j),
        0 !== h8j && O77(h8j),
        p8j;
    }
    ,
    b57.cwrap || (b57.cwrap = function() {
        q57("'cwrap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.setValue || (b57.setValue = function() {
        q57("'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.getValue || (b57.getValue = function() {
        q57("'getValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.allocate || (b57.allocate = function() {
        q57("'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.getMemory || (b57.getMemory = function() {
        q57("'getMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }
    ),
    b57.Pointer_stringify || (b57.Pointer_stringify = function() {
        q57("'Pointer_stringify' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.AsciiToString || (b57.AsciiToString = function() {
        q57("'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.stringToAscii || (b57.stringToAscii = function() {
        q57("'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.UTF8ArrayToString || (b57.UTF8ArrayToString = function() {
        q57("'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.UTF8ToString || (b57.UTF8ToString = function() {
        q57("'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.stringToUTF8Array || (b57.stringToUTF8Array = function() {
        q57("'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.stringToUTF8 || (b57.stringToUTF8 = function() {
        q57("'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.lengthBytesUTF8 || (b57.lengthBytesUTF8 = function() {
        q57("'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.UTF16ToString || (b57.UTF16ToString = function() {
        q57("'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.stringToUTF16 || (b57.stringToUTF16 = function() {
        q57("'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.lengthBytesUTF16 || (b57.lengthBytesUTF16 = function() {
        q57("'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.UTF32ToString || (b57.UTF32ToString = function() {
        q57("'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.stringToUTF32 || (b57.stringToUTF32 = function() {
        q57("'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.lengthBytesUTF32 || (b57.lengthBytesUTF32 = function() {
        q57("'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.allocateUTF8 || (b57.allocateUTF8 = function() {
        q57("'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.stackTrace || (b57.stackTrace = function() {
        q57("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.addOnPreRun || (b57.addOnPreRun = function() {
        q57("'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.addOnInit || (b57.addOnInit = function() {
        q57("'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.addOnPreMain || (b57.addOnPreMain = function() {
        q57("'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.addOnExit || (b57.addOnExit = function() {
        q57("'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.addOnPostRun || (b57.addOnPostRun = function() {
        q57("'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.writeStringToMemory || (b57.writeStringToMemory = function() {
        q57("'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.writeArrayToMemory || (b57.writeArrayToMemory = function() {
        q57("'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.writeAsciiToMemory || (b57.writeAsciiToMemory = function() {
        q57("'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.addRunDependency || (b57.addRunDependency = function() {
        q57("'addRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }
    ),
    b57.removeRunDependency || (b57.removeRunDependency = function() {
        q57("'removeRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }
    ),
    b57.ENV || (b57.ENV = function() {
        q57("'ENV' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.FS || (b57.FS = function() {
        q57("'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.FS_createFolder || (b57.FS_createFolder = function() {
        q57("'FS_createFolder' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }
    ),
    b57.FS_createPath || (b57.FS_createPath = function() {
        q57("'FS_createPath' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }
    ),
    b57.FS_createDataFile || (b57.FS_createDataFile = function() {
        q57("'FS_createDataFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }
    ),
    b57.FS_createPreloadedFile || (b57.FS_createPreloadedFile = function() {
        q57("'FS_createPreloadedFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }
    ),
    b57.FS_createLazyFile || (b57.FS_createLazyFile = function() {
        q57("'FS_createLazyFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }
    ),
    b57.FS_createLink || (b57.FS_createLink = function() {
        q57("'FS_createLink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }
    ),
    b57.FS_createDevice || (b57.FS_createDevice = function() {
        q57("'FS_createDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }
    ),
    b57.FS_unlink || (b57.FS_unlink = function() {
        q57("'FS_unlink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }
    ),
    b57.GL || (b57.GL = function() {
        q57("'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.staticAlloc || (b57.staticAlloc = function() {
        q57("'staticAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.dynamicAlloc || (b57.dynamicAlloc = function() {
        q57("'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.warnOnce || (b57.warnOnce = function() {
        q57("'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.loadDynamicLibrary || (b57.loadDynamicLibrary = function() {
        q57("'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.loadWebAssemblyModule || (b57.loadWebAssemblyModule = function() {
        q57("'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.getLEB || (b57.getLEB = function() {
        q57("'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.getFunctionTables || (b57.getFunctionTables = function() {
        q57("'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.alignFunctionTables || (b57.alignFunctionTables = function() {
        q57("'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.registerFunctions || (b57.registerFunctions = function() {
        q57("'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.addFunction || (b57.addFunction = function() {
        q57("'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.removeFunction || (b57.removeFunction = function() {
        q57("'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.getFuncWrapper || (b57.getFuncWrapper = function() {
        q57("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.prettyPrint || (b57.prettyPrint = function() {
        q57("'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.makeBigInt || (b57.makeBigInt = function() {
        q57("'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.dynCall || (b57.dynCall = function() {
        q57("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.getCompilerSetting || (b57.getCompilerSetting = function() {
        q57("'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.stackSave || (b57.stackSave = function() {
        q57("'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.stackRestore || (b57.stackRestore = function() {
        q57("'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.stackAlloc || (b57.stackAlloc = function() {
        q57("'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.establishStackSpace || (b57.establishStackSpace = function() {
        q57("'establishStackSpace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.print || (b57.print = function() {
        q57("'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.printErr || (b57.printErr = function() {
        q57("'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.intArrayFromBase64 || (b57.intArrayFromBase64 = function() {
        q57("'intArrayFromBase64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.tryParseAsDataURI || (b57.tryParseAsDataURI = function() {
        q57("'tryParseAsDataURI' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    b57.ALLOC_NORMAL || Object.defineProperty(b57, "ALLOC_NORMAL", {
        get: function() {
            q57("'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
        }
    }),
    b57.ALLOC_STACK || Object.defineProperty(b57, "ALLOC_STACK", {
        get: function() {
            q57("'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
        }
    }),
    b57.ALLOC_STATIC || Object.defineProperty(b57, "ALLOC_STATIC", {
        get: function() {
            q57("'ALLOC_STATIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
        }
    }),
    b57.ALLOC_DYNAMIC || Object.defineProperty(b57, "ALLOC_DYNAMIC", {
        get: function() {
            q57("'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
        }
    }),
    b57.ALLOC_NONE || Object.defineProperty(b57, "ALLOC_NONE", {
        get: function() {
            q57("'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
        }
    }),
    v57)
        if (T47(v57) || (m77 = v57,
        v57 = b57.locateFile ? b57.locateFile(m77, h57) : h57 + m77),
        C77 || c77) {
            var k47 = b57.readBinary(v57);
            i57.set(k47, 8);
        } else {
            var q77 = function() {
                b57.readAsync(v57, k77, function() {
                    throw "could not load memory initializer " + v57;
                });
            };
            E77 = "memory initializer",
            r77++,
            b57.monitorRunDependencies && b57.monitorRunDependencies(r77),
            E77 ? (S57(!B77[E77]),
            B77[E77] = 1,
            null === x77 && "undefined" != typeof setInterval && (x77 = setInterval(function() {
                if (R77)
                    return clearInterval(x77),
                    void (x77 = null);
                var m7j = !1;
                for (var e7j in B77)
                    m7j || (m7j = !0,
                    G57("still waiting on run dependencies:")),
                    G57("dependency: " + e7j);
                m7j && G57("(end of list)");
            }, 1e4))) : G57("warning: run dependency added without ID");
            var k77 = function(Q7j) {
                Q7j.byteLength && (Q7j = new Uint8Array(Q7j));
                for (var c7j = 0; c7j < Q7j.length; c7j++)
                    S57(0 === i57[8 + c7j], "area for memory initializer should not have been touched before it's loaded");
                i57.set(Q7j, 8),
                b57.memoryInitializerRequest && delete b57.memoryInitializerRequest.response,
                function(X7j) {
                    if (r77--,
                    b57.monitorRunDependencies && b57.monitorRunDependencies(r77),
                    X7j ? (S57(B77[X7j]),
                    delete B77[X7j]) : G57("warning: run dependency removed without ID"),
                    0 == r77 && (null !== x77 && (clearInterval(x77),
                    x77 = null),
                    j77)) {
                        var g7j = j77;
                        j77 = null,
                        g7j();
                    }
                }("memory initializer");
            }
              , W77 = w77(v57);
            if (W77)
                k77(W77.buffer);
            else if (b57.memoryInitializerRequest) {
                var d77 = function() {
                    var b7j = b57.memoryInitializerRequest
                      , q7j = b7j.response;
                    if (200 !== b7j.status && 0 !== b7j.status) {
                        var d7j = w77(b57.memoryInitializerRequestURL);
                        if (!d7j)
                            return console.warn("a problem seems to have happened with Module.memoryInitializerRequest, status: " + b7j.status + ", retrying " + v57),
                            void q77();
                        q7j = d7j.buffer;
                    }
                    k77(q7j);
                };
                b57.memoryInitializerRequest.response ? setTimeout(d77, 0) : b57.memoryInitializerRequest.addEventListener("load", d77);
            } else
                q77();
        }
    function t77(y7j) {
        this.name = "ExitStatus",
        this.message = "Program terminated with exit(" + y7j + ")",
        this.status = y7j;
    }
    function g77(A7j) {
        function G7j() {
            b57.calledRun || (b57.calledRun = !0,
            R77 || (u77(),
            A57 || (A57 = !0,
            P77(X77)),
            u77(),
            P77(K47),
            b57.onRuntimeInitialized && b57.onRuntimeInitialized(),
            S57(!b57._main, 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]'),
            function() {
                if (u77(),
                b57.postRun)
                    for ("function" == typeof b57.postRun && (b57.postRun = [b57.postRun]); b57.postRun.length; )
                        F7j = b57.postRun.shift(),
                        Q77.unshift(F7j);
                var F7j;
                P77(Q77);
            }()));
        }
        A7j = A7j || b57.arguments,
        r77 > 0 || (S57(0 == (3 & L57)),
        M77[(L57 >> 2) - 1] = 34821223,
        M77[(L57 >> 2) - 2] = 2310721022,
        function() {
            if (b57.preRun)
                for ("function" == typeof b57.preRun && (b57.preRun = [b57.preRun]); b57.preRun.length; )
                    i7j = b57.preRun.shift(),
                    Z77.unshift(i7j);
            var i7j;
            P77(Z77);
        }(),
        r77 > 0 || b57.calledRun || (b57.setStatus ? (b57.setStatus("Running..."),
        setTimeout(function() {
            setTimeout(function() {
                b57.setStatus("");
            }, 1),
            G7j();
        }, 1)) : G7j(),
        u77()));
    }
    t77.prototype = new Error(),
    t77.prototype.constructor = t77,
    j77 = function h7j() {
        b57.calledRun || g77(),
        b57.calledRun || (j77 = h7j);
    }
    ,
    b57.run = g77;
    var l77 = [];
    function q57(r4j) {
        b57.onAbort && b57.onAbort(r4j),
        void 0 !== r4j ? (K77(r4j),
        G57(r4j),
        r4j = JSON.stringify(r4j)) : r4j = "",
        R77 = !0;
        var V4j = "abort(" + r4j + ") at " + E47();
        throw l77 && l77.forEach(function(s4j) {
            V4j = s4j(V4j, r4j);
        }),
        V4j;
    }
    if (b57.abort = q57,
    b57.preInit)
        for ("function" == typeof b57.preInit && (b57.preInit = [b57.preInit]); b57.preInit.length > 0; )
            b57.preInit.pop()();
    return b57.noExitRuntime = !0,
    g77(),
    b57;
}();

module.exports = y1h;