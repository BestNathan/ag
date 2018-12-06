function g0T(C57) {
    return (h6h = "function" == typeof Symbol && "symbol" == typeof Symbol["iterator"] ? function(O57) {
        return typeof O57;
    }
    : function(V57) {
        return V57 && "function" == typeof Symbol && V57["constructor"] === Symbol && V57 !== Symbol["prototype"] ? "symbol" : typeof V57;
    }
    )(C57);
}
var J4T = function(K0t) {
    K0t = void 0 !== (K0t = K0t || {}) ? K0t : {};
    var s6t, A6t = {};
    for (s6t in K0t)
        K0t.hasOwnProperty(s6t) && (A6t[s6t] = K0t[s6t]);
    K0t.arguments = [],
    K0t.thisProgram = "./this.program",
    K0t.quit = function(a2t, i2t) {
        throw i2t;
    }
    ,
    K0t.preRun = [],
    K0t.postRun = [];
    var c6t, J6t, f6t, b6t = !1;
    if (c6t = "object" === ("undefined" == typeof window ? "undefined" : g0T(window)),
    J6t = "function" == typeof importScripts,
    b6t = "object" === ("undefined" == typeof process ? "undefined" : g0T(process)) && "function" == typeof require && !c6t && !J6t,
    f6t = !c6t && !b6t && !J6t,
    K0t.ENVIRONMENT)
        throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)");
    j0t(void 0 === K0t.memoryInitializerPrefixURL, "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead"),
    j0t(void 0 === K0t.pthreadMainPrefixURL, "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead"),
    j0t(void 0 === K0t.cdInitializerPrefixURL, "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead"),
    j0t(void 0 === K0t.filePackagePrefixURL, "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
    var B6t, K6t, r6t = "";
    if (b6t)
        r6t = __dirname + "/",
        K0t.read = function(d2t, M2t) {
            var e2t;
            return (e2t = v6t(d2t)) || (B6t || (B6t = require("fs")),
            K6t || (K6t = require("path")),
            d2t = K6t.normalize(d2t),
            e2t = B6t.readFileSync(d2t)),
            M2t ? e2t : e2t.toString();
        }
        ,
        K0t.readBinary = function(P2t) {
            var I2t = K0t.read(P2t, !0);
            return I2t.buffer || (I2t = new Uint8Array(I2t)),
            j0t(I2t.buffer),
            I2t;
        }
        ,
        process.argv.length > 1 && (K0t.thisProgram = process.argv[1].replace(/\\/g, "/")),
        K0t.arguments = process.argv.slice(2),
        process.on("uncaughtException", function(f2t) {
            if (!(f2t instanceof q6t))
                throw f2t;
        }),
        process.on("unhandledRejection", x0t),
        K0t.quit = function(h2t) {
            process.exit(h2t);
        }
        ,
        K0t.inspect = function() {
            return "[Emscripten Module object]";
        }
        ;
    else if (f6t)
        "undefined" != typeof read && (K0t.read = function(B2t) {
            var C2t = v6t(B2t);
            return C2t ? t6t(C2t) : read(B2t);
        }
        ),
        K0t.readBinary = function(U2t) {
            var R2t;
            return (R2t = v6t(U2t)) ? R2t : "function" == typeof readbuffer ? new Uint8Array(readbuffer(U2t)) : (j0t("object" === g0T(R2t = read(U2t, "binary"))),
            R2t);
        }
        ,
        "undefined" != typeof scriptArgs ? K0t.arguments = scriptArgs : void 0 !== arguments && (K0t.arguments = arguments),
        "function" == typeof quit && (K0t.quit = function(K2t) {
            quit(K2t);
        }
        );
    else {
        if (!c6t && !J6t)
            throw new Error("environment detection error");
        J6t ? r6t = self.location.href : document.currentScript && (r6t = document.currentScript.src),
        r6t = 0 !== r6t.indexOf("blob:") ? r6t.substr(0, r6t.lastIndexOf("/") + 1) : "",
        K0t.read = function(l2t) {
            try {
                var x2t = new XMLHttpRequest();
                return x2t.open("GET", l2t, !1),
                x2t.send(null),
                x2t.responseText;
            } catch (F2t) {
                var j2t = v6t(l2t);
                if (j2t)
                    return t6t(j2t);
                throw F2t;
            }
        }
        ,
        J6t && (K0t.readBinary = function(O2t) {
            try {
                var T2t = new XMLHttpRequest();
                return T2t.open("GET", O2t, !1),
                T2t.responseType = "arraybuffer",
                T2t.send(null),
                new Uint8Array(T2t.response);
            } catch (Q2t) {
                var t2t = v6t(O2t);
                if (t2t)
                    return t2t;
                throw Q2t;
            }
        }
        ),
        K0t.readAsync = function(y1t, S1t, X1t) {
            var V2t = new XMLHttpRequest();
            V2t.open("GET", y1t, !0),
            V2t.responseType = "arraybuffer",
            V2t.onload = function() {
                if (200 == V2t.status || 0 == V2t.status && V2t.response)
                    S1t(V2t.response);
                else {
                    var r1t = v6t(y1t);
                    r1t ? S1t(r1t.buffer) : X1t();
                }
            }
            ,
            V2t.onerror = X1t,
            V2t.send(null);
        }
        ,
        K0t.setWindowTitle = function(H1t) {
            document.title = H1t;
        }
        ;
    }
    var p6t = K0t.print || ("undefined" != typeof console ? console.log.bind(console) : "undefined" != typeof print ? print : null)
      , O0t = K0t.printErr || ("undefined" != typeof printErr ? printErr : "undefined" != typeof console && console.warn.bind(console) || p6t);
    for (s6t in A6t)
        A6t.hasOwnProperty(s6t) && (K0t[s6t] = A6t[s6t]);
    A6t = void 0;
    var V6t = 16;
    function D2t(w1t, k1t) {
        return k1t || (k1t = V6t),
        w1t = Math.ceil(w1t / k1t) * k1t;
    }
    u6t = Z6t = g6t = function() {
        x0t("cannot use the stack before compiled code is ready to run, and has provided stack access");
    }
    ;
    var G6t = !1;
    function j0t(v1t, E1t) {
        v1t || x0t("Assertion failed: " + E1t);
    }
    var e6t = {
        stackSave: function() {
            u6t();
        },
        stackRestore: function() {
            Z6t();
        },
        arrayToC: function(s1t) {
            var u1t, Y1t, n1t = g6t(s1t.length);
            return Y1t = n1t,
            j0t((u1t = s1t).length >= 0, "writeArrayToMemory array must have a length (should be an array or typed array)"),
            W2t.set(u1t, Y1t),
            n1t;
        },
        stringToC: function(b1t) {
            var Z1t = 0;
            if (null != b1t && 0 !== b1t) {
                var A1t = 1 + (b1t.length << 2);
                (function(D1t, N1t, J1t) {
                    j0t("number" == typeof J1t, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"),
                    function(o1t, L1t, q1t, m1t) {
                        if (!(m1t > 0))
                            return 0;
                        for (var z1t = q1t, p1t = q1t + m1t - 1, g1t = 0; g1t < o1t.length; ++g1t) {
                            var c1t = o1t.charCodeAt(g1t);
                            if (c1t >= 55296 && c1t <= 57343) {
                                var W1t = o1t.charCodeAt(++g1t);
                                c1t = 65536 + ((1023 & c1t) << 10) | 1023 & W1t;
                            }
                            if (c1t <= 127) {
                                if (q1t >= p1t)
                                    break;
                                L1t[q1t++] = c1t;
                            } else if (c1t <= 2047) {
                                if (q1t + 1 >= p1t)
                                    break;
                                L1t[q1t++] = 192 | c1t >> 6,
                                L1t[q1t++] = 128 | 63 & c1t;
                            } else if (c1t <= 65535) {
                                if (q1t + 2 >= p1t)
                                    break;
                                L1t[q1t++] = 224 | c1t >> 12,
                                L1t[q1t++] = 128 | c1t >> 6 & 63,
                                L1t[q1t++] = 128 | 63 & c1t;
                            } else if (c1t <= 2097151) {
                                if (q1t + 3 >= p1t)
                                    break;
                                L1t[q1t++] = 240 | c1t >> 18,
                                L1t[q1t++] = 128 | c1t >> 12 & 63,
                                L1t[q1t++] = 128 | c1t >> 6 & 63,
                                L1t[q1t++] = 128 | 63 & c1t;
                            } else if (c1t <= 67108863) {
                                if (q1t + 4 >= p1t)
                                    break;
                                L1t[q1t++] = 248 | c1t >> 24,
                                L1t[q1t++] = 128 | c1t >> 18 & 63,
                                L1t[q1t++] = 128 | c1t >> 12 & 63,
                                L1t[q1t++] = 128 | c1t >> 6 & 63,
                                L1t[q1t++] = 128 | 63 & c1t;
                            } else {
                                if (q1t + 5 >= p1t)
                                    break;
                                L1t[q1t++] = 252 | c1t >> 30,
                                L1t[q1t++] = 128 | c1t >> 24 & 63,
                                L1t[q1t++] = 128 | c1t >> 18 & 63,
                                L1t[q1t++] = 128 | c1t >> 12 & 63,
                                L1t[q1t++] = 128 | c1t >> 6 & 63,
                                L1t[q1t++] = 128 | 63 & c1t;
                            }
                        }
                        L1t[q1t] = 0;
                    }(D1t, V0t, N1t, J1t);
                }(b1t, Z1t = g6t(A1t), A1t));
            }
            return Z1t;
        }
    }
      , N2t = {
        string: e6t.stringToC,
        array: e6t.arrayToC
    };
    function J2t(i1t, G1t) {
        if (0 === G1t || !i1t)
            return "";
        for (var I1t, e1t = 0, a1t = 0; j0t(i1t + a1t < y6t),
        e1t |= I1t = V0t[i1t + a1t >> 0],
        (0 != I1t || G1t) && (a1t++,
        !G1t || a1t != G1t); )
            ;
        G1t || (G1t = a1t);
        var d1t = "";
        if (e1t < 128) {
            for (var M1t; G1t > 0; )
                M1t = String.fromCharCode.apply(String, V0t.subarray(i1t, i1t + Math.min(G1t, 1024))),
                d1t = d1t ? d1t + M1t : M1t,
                i1t += 1024,
                G1t -= 1024;
            return d1t;
        }
        return function(P1t) {
            return m2t(V0t, P1t);
        }(i1t);
    }
    var d6t = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
    function m2t(C1t, h1t) {
        for (var U1t = h1t; C1t[U1t]; )
            ++U1t;
        if (U1t - h1t > 16 && C1t.subarray && d6t)
            return d6t.decode(C1t.subarray(h1t, U1t));
        for (var f1t, B1t, K1t, x1t, j1t, R1t = ""; ; ) {
            if (!(f1t = C1t[h1t++]))
                return R1t;
            if (128 & f1t)
                if (B1t = 63 & C1t[h1t++],
                192 != (224 & f1t))
                    if (K1t = 63 & C1t[h1t++],
                    224 == (240 & f1t) ? f1t = (15 & f1t) << 12 | B1t << 6 | K1t : (x1t = 63 & C1t[h1t++],
                    240 == (248 & f1t) ? f1t = (7 & f1t) << 18 | B1t << 12 | K1t << 6 | x1t : (j1t = 63 & C1t[h1t++],
                    f1t = 248 == (252 & f1t) ? (3 & f1t) << 24 | B1t << 18 | K1t << 12 | x1t << 6 | j1t : (1 & f1t) << 30 | B1t << 24 | K1t << 18 | x1t << 12 | j1t << 6 | 63 & C1t[h1t++])),
                    f1t < 65536)
                        R1t += String.fromCharCode(f1t);
                    else {
                        var l1t = f1t - 65536;
                        R1t += String.fromCharCode(55296 | l1t >> 10, 56320 | 1023 & l1t);
                    }
                else
                    R1t += String.fromCharCode((31 & f1t) << 6 | B1t);
            else
                R1t += String.fromCharCode(f1t);
        }
    }
    var Q0t, W2t, V0t, o2t, H6t, Y6t, n6t, T6t, Q6t, c2t, X6t, M6t, j6t;
    "undefined" != typeof TextDecoder && new TextDecoder("utf-16le");
    function G2t(F1t) {
        return function T1t(t1t) {
            T1t.shown || (T1t.shown = {}),
            T1t.shown[t1t] || (T1t.shown[t1t] = 1,
            O0t(t1t));
        }("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling"),
        F1t;
    }
    function z2t() {
        var O1t = function() {
            var Q1t = new Error();
            if (!Q1t.stack) {
                try {
                    throw new Error(0);
                } catch (V1t) {
                    Q1t = V1t;
                }
                if (!Q1t.stack)
                    return "(no stack trace available)";
            }
            return Q1t.stack.toString();
        }();
        return K0t.extraStackTrace && (O1t += "\n" + K0t.extraStackTrace()),
        O1t.replace(/__Z[\w\d_]+/g, function(y7t) {
            var S7t = G2t(y7t);
            return y7t === S7t ? y7t : S7t + " [" + y7t + "]";
        });
    }
    function o6t() {
        if (34821223 == Y6t[(X6t >> 2) - 1] && 2310721022 == Y6t[(X6t >> 2) - 2] || x0t("Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x02135467, but received 0x" + Y6t[(X6t >> 2) - 2].toString(16) + " " + Y6t[(X6t >> 2) - 1].toString(16)),
        1668509029 !== H6t[0])
            throw "Runtime error: The application has corrupted its heap memory area (address zero)!";
    }
    function q2t() {
        x0t("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + y6t + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or (4) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ");
    }
    n6t = X6t = 0,
    T6t = !1;
    var m6t = K0t.TOTAL_STACK || 5242880
      , y6t = K0t.TOTAL_MEMORY || 16777216;
    if (y6t < m6t && O0t("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + y6t + "! (TOTAL_STACK=" + m6t + ")"),
    j0t("undefined" != typeof Int32Array && "undefined" != typeof Float64Array && void 0 !== Int32Array.prototype.subarray && void 0 !== Int32Array.prototype.set, "JS engine does not provide full typed array support"),
    K0t.buffer ? j0t((Q0t = K0t.buffer).byteLength === y6t, "provided buffer should be " + y6t + " bytes, but it is " + Q0t.byteLength) : (j0t((Q0t = new ArrayBuffer(y6t)).byteLength === y6t),
    K0t.buffer = Q0t),
    K0t.HEAP8 = W2t = new Int8Array(Q0t),
    K0t.HEAP16 = o2t = new Int16Array(Q0t),
    K0t.HEAP32 = H6t = new Int32Array(Q0t),
    K0t.HEAPU8 = V0t = new Uint8Array(Q0t),
    K0t.HEAPU16 = new Uint16Array(Q0t),
    K0t.HEAPU32 = Y6t = new Uint32Array(Q0t),
    K0t.HEAPF32 = new Float32Array(Q0t),
    K0t.HEAPF64 = new Float64Array(Q0t),
    H6t[0] = 1668509029,
    o2t[1] = 25459,
    115 !== V0t[2] || 99 !== V0t[3])
        throw "Runtime error: expected the system to be little-endian!";
    function W6t(H7t) {
        for (; H7t.length > 0; ) {
            var X7t = H7t.shift();
            if ("function" != typeof X7t) {
                var r7t = X7t.func;
                "number" == typeof r7t ? void 0 === X7t.arg ? K0t.dynCall_v(r7t) : K0t.dynCall_vi(r7t, X7t.arg) : r7t(void 0 === X7t.arg ? null : X7t.arg);
            } else
                X7t();
        }
    }
    var C6t = []
      , h6t = []
      , p2t = []
      , I6t = []
      , t0t = !1;
    Math.imul && -5 === Math.imul(4294967295, 5) || (Math.imul = function(v7t, E7t) {
        var k7t = 65535 & v7t
          , w7t = 65535 & E7t;
        return k7t * w7t + ((v7t >>> 16) * w7t + k7t * (E7t >>> 16) << 16) | 0;
    }
    ),
    Math.imul = Math.imul,
    Math.clz32 || (Math.clz32 = function(n7t) {
        var u7t = 32
          , s7t = n7t >> 16;
        return s7t && (u7t -= 16,
        n7t = s7t),
        (s7t = n7t >> 8) && (u7t -= 8,
        n7t = s7t),
        (s7t = n7t >> 4) && (u7t -= 4,
        n7t = s7t),
        (s7t = n7t >> 2) && (u7t -= 2,
        n7t = s7t),
        (s7t = n7t >> 1) ? u7t - 2 : u7t - n7t;
    }
    ),
    Math.clz32 = Math.clz32,
    Math.trunc || (Math.trunc = function(Y7t) {
        return Y7t < 0 ? Math.ceil(Y7t) : Math.floor(Y7t);
    }
    ),
    Math.trunc = Math.trunc;
    var w6t = 0
      , k6t = null
      , D6t = null
      , N6t = {};
    K0t.preloadedImages = {},
    K0t.preloadedAudios = {};
    var S6t = null
      , F0t = {
        error: function() {
            x0t("Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with  -s FORCE_FILESYSTEM=1");
        },
        init: function() {
            F0t.error();
        },
        createDataFile: function() {
            F0t.error();
        },
        createPreloadedFile: function() {
            F0t.error();
        },
        createLazyFile: function() {
            F0t.error();
        },
        open: function() {
            F0t.error();
        },
        mkdev: function() {
            F0t.error();
        },
        registerDevice: function() {
            F0t.error();
        },
        analyzePath: function() {
            F0t.error();
        },
        loadFilesFromDB: function() {
            F0t.error();
        },
        ErrnoError: function() {
            F0t.error();
        }
    };
    K0t.FS_createDataFile = F0t.createDataFile,
    K0t.FS_createPreloadedFile = F0t.createPreloadedFile;
    var i6t = "data:application/octet-stream;base64,";
    function g2t(b7t) {
        return String.prototype.startsWith ? b7t.startsWith(i6t) : 0 === b7t.indexOf(i6t);
    }
    n6t = 2280,
    h6t.push(),
    S6t = "data:application/octet-stream;base64,AAAAAAAAAADR9pHS0HD42vi+FPcO90nKJTc38G4uORF5QRi+uu8oM1dfafp+3+4u6OtGtJII+F4YsybxMhbkoqmLG+XO9PsN6/ntEW2IiygKN/cnY35bEpo4gM8u+CYAZjD3Lmz3MacO3luOYlLC+DI8OLEc55ia+nP1v+YtndfjiW8ZPZ7kvGy0R5g66l5RlteOWXUgb5EiZGi9PoJktrmIlNF8taAq5iae5cC48JVagS53oTkX7h7vTiFgqhvBi7UbHvwYRgAP57jKldKS6lWa2dpsg0hOBb/5CbeLpX2rF3WgeIpqLXEwUQxAFlbbUlC6tnattWdGBNHE9obmiR1Us6nNK0Ei7CiwWNV5cG/B/n7Jcy83ueQYT8c2OhkxWfi0BkOAd4U0iBvxA4I//PocjpAUAKdjodg9R5emEzz3S5/ocgHQYf+PmJu+y0qUlvJFINdg+1qEXSMmwwJ8CGniGvCvqJ3FEv0hZgdJTSkuX4GHCtwOLD5ome1/Km1b6SfdFVMeEfU4k8KMZOverFzT9G7W7jLOkeWeOaNC1OGuyBCNqjvvnMzjV2JEH2XgpN8zwLw1JLsLe8/zxkx6XqKxdLINayW9eAVI7Tyj5u/A8oGJb9DGKu7qvUP91eMPlNcnJKfIsik7fRAwV1WE94932aYAqiOR4WkOpBFlCxU/7NMIZ1DNuRRYiJ6wDNKCQmxJCjdLTtjWL03fagZ+F7jdFs62+Sva8PiaWbec6aH0h7/zLEd5Yhn+1HygqIv8lmjnky3RugMFAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAANgCAAAABAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAK/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAI=";
    var P6t = n6t;
    n6t += 16,
    j0t(P6t % 8 == 0);
    var T0t = {
        varargs: 0,
        get: function(Z7t) {
            return T0t.varargs += 4,
            H6t[T0t.varargs - 4 >> 2];
        },
        getStr: function() {
            return J2t(T0t.get());
        },
        get64: function() {
            var A7t = T0t.get()
              , J7t = T0t.get();
            return j0t(A7t >= 0 ? 0 === J7t : -1 === J7t),
            A7t;
        },
        getZero: function() {
            j0t(0 === T0t.get());
        }
    };
    function E6t(W7t, m7t) {
        T0t.varargs = m7t;
        try {
            var g7t = T0t.get()
              , q7t = T0t.get()
              , o7t = T0t.get()
              , L7t = 0;
            E6t.buffers || (E6t.buffers = [null, [], []],
            E6t.printChar = function(i7t, G7t) {
                var z7t = E6t.buffers[i7t];
                j0t(z7t),
                0 === G7t || 10 === G7t ? ((1 === i7t ? p6t : O0t)(m2t(z7t, 0)),
                z7t.length = 0) : z7t.push(G7t);
            }
            );
            for (var D7t = 0; D7t < o7t; D7t++) {
                for (var p7t = H6t[q7t + 8 * D7t >> 2], c7t = H6t[q7t + (8 * D7t + 4) >> 2], N7t = 0; N7t < c7t; N7t++)
                    E6t.printChar(g7t, V0t[p7t + N7t]);
                L7t += c7t;
            }
            return L7t;
        } catch (a7t) {
            return void 0 !== F0t && a7t instanceof F0t.ErrnoError || x0t(a7t),
            -a7t.errno;
        }
    }
    function t6t(I7t) {
        for (var M7t = [], e7t = 0; e7t < I7t.length; e7t++) {
            var d7t = I7t[e7t];
            d7t > 255 && (j0t(!1, "Character code " + d7t + " (" + String.fromCharCode(d7t) + ")  at offset " + e7t + " not in 0x00-0xFF."),
            d7t &= 255),
            M7t.push(String.fromCharCode(d7t));
        }
        return M7t.join("");
    }
    j6t = function(f7t) {
        j0t(!T6t);
        var P7t = n6t;
        return j0t((n6t = n6t + f7t + 15 & -16) < y6t, "not enough memory for static allocation - increase TOTAL_MEMORY"),
        P7t;
    }(4),
    Q6t = c2t = D2t(n6t),
    M6t = D2t(X6t = Q6t + m6t),
    H6t[j6t >> 2] = M6t,
    T6t = !0,
    j0t(M6t < y6t, "TOTAL_MEMORY not big enough for stack");
    var O6t = "function" == typeof atob ? atob : function(h7t) {
        var x7t, l7t, F7t, K7t, U7t, j7t, B7t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", R7t = "", C7t = 0;
        h7t = h7t.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        do {
            x7t = B7t.indexOf(h7t.charAt(C7t++)) << 2 | (K7t = B7t.indexOf(h7t.charAt(C7t++))) >> 4,
            l7t = (15 & K7t) << 4 | (U7t = B7t.indexOf(h7t.charAt(C7t++))) >> 2,
            F7t = (3 & U7t) << 6 | (j7t = B7t.indexOf(h7t.charAt(C7t++))),
            R7t += String.fromCharCode(x7t),
            64 !== U7t && (R7t += String.fromCharCode(l7t)),
            64 !== j7t && (R7t += String.fromCharCode(F7t));
        } while (C7t < h7t.length);return R7t;
    }
    ;
    function v6t(T7t) {
        if (g2t(T7t))
            return function(V7t) {
                if ("boolean" == typeof b6t && b6t) {
                    var t7t;
                    try {
                        t7t = Buffer.from(V7t, "base64");
                    } catch (S3t) {
                        t7t = new Buffer(V7t,"base64");
                    }
                    return new Uint8Array(t7t.buffer,t7t.byteOffset,t7t.byteLength);
                }
                try {
                    for (var Q7t = O6t(V7t), y3t = new Uint8Array(Q7t.length), O7t = 0; O7t < Q7t.length; ++O7t)
                        y3t[O7t] = Q7t.charCodeAt(O7t);
                    return y3t;
                } catch (X3t) {
                    throw new Error("Converting base64 string to bytes failed.");
                }
            }(T7t.slice(i6t.length));
    }
    K0t.asmGlobalArg = {
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
    K0t.asmLibraryArg = {
        abort: x0t,
        assert: j0t,
        enlargeMemory: function() {
            q2t();
        },
        getTotalMemory: function() {
            return y6t;
        },
        abortOnCannotGrowMemory: q2t,
        abortStackOverflow: function(r3t) {
            x0t("Stack overflow! Attempted to allocate " + r3t + " bytes on the stack, but stack has only " + (X6t - u6t() + r3t) + " bytes available!");
        },
        nullFunc_ii: function(H3t) {
            O0t("Invalid function pointer called with signature 'ii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"),
            O0t("Build with ASSERTIONS=2 for more info."),
            x0t(H3t);
        },
        nullFunc_iiii: function(k3t) {
            O0t("Invalid function pointer called with signature 'iiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"),
            O0t("Build with ASSERTIONS=2 for more info."),
            x0t(k3t);
        },
        invoke_ii: function(v3t, E3t) {
            var w3t = u6t();
            try {
                return K0t.dynCall_ii(v3t, E3t);
            } catch (n3t) {
                if (Z6t(w3t),
                "number" != typeof n3t && "longjmp" !== n3t)
                    throw n3t;
                K0t.setThrew(1, 0);
            }
        },
        invoke_iiii: function(u3t, Y3t, b3t, Z3t) {
            var s3t = u6t();
            try {
                return K0t.dynCall_iiii(u3t, Y3t, b3t, Z3t);
            } catch (A3t) {
                if (Z6t(s3t),
                "number" != typeof A3t && "longjmp" !== A3t)
                    throw A3t;
                K0t.setThrew(1, 0);
            }
        },
        ___lock: function() {},
        ___setErrNo: function(J3t) {
            return K0t.___errno_location ? H6t[K0t.___errno_location() >> 2] = J3t : O0t("failed to set errno from JS"),
            J3t;
        },
        ___syscall140: function(g3t, p3t) {
            T0t.varargs = p3t;
            try {
                var D3t = T0t.getStreamFromFD()
                  , q3t = (T0t.get(),
                T0t.get())
                  , L3t = T0t.get()
                  , N3t = T0t.get()
                  , c3t = q3t;
                return F0t.llseek(D3t, c3t, N3t),
                H6t[L3t >> 2] = D3t.position,
                D3t.getdents && 0 === c3t && 0 === N3t && (D3t.getdents = null),
                0;
            } catch (o3t) {
                return void 0 !== F0t && o3t instanceof F0t.ErrnoError || x0t(o3t),
                -o3t.errno;
            }
        },
        ___syscall146: E6t,
        ___syscall54: function(W3t, m3t) {
            T0t.varargs = m3t;
            try {
                return 0;
            } catch (z3t) {
                return void 0 !== F0t && z3t instanceof F0t.ErrnoError || x0t(z3t),
                -z3t.errno;
            }
        },
        ___syscall6: function(a3t, i3t) {
            T0t.varargs = i3t;
            try {
                var G3t = T0t.getStreamFromFD();
                return F0t.close(G3t),
                0;
            } catch (d3t) {
                return void 0 !== F0t && d3t instanceof F0t.ErrnoError || x0t(d3t),
                -d3t.errno;
            }
        },
        ___unlock: function() {},
        _emscripten_memcpy_big: function(e3t, M3t, I3t) {
            return V0t.set(V0t.subarray(M3t, M3t + I3t), e3t),
            e3t;
        },
        flush_NO_FILESYSTEM: function() {
            var f3t = K0t._fflush;
            f3t && f3t(0);
            var P3t = E6t.printChar;
            if (P3t) {
                var h3t = E6t.buffers;
                h3t[1].length && P3t(1, 10),
                h3t[2].length && P3t(2, 10);
            }
        },
        DYNAMICTOP_PTR: j6t,
        tempDoublePtr: P6t,
        STACKTOP: c2t,
        STACK_MAX: X6t
    };
    var l0t = function(U3t, x3t, F3t) {
        "use asm";
        var B3t = new U3t.Int8Array(F3t);
        var i8t = new U3t.Int16Array(F3t);
        var C3t = new U3t.Int32Array(F3t);
        var t3t = new U3t.Uint8Array(F3t);
        var a8t = new U3t.Uint16Array(F3t);
        var I8t = new U3t.Uint32Array(F3t);
        var m8t = new U3t.Float32Array(F3t);
        var W8t = new U3t.Float64Array(F3t);
        var O3t = x3t.DYNAMICTOP_PTR | 0;
        var G8t = x3t.tempDoublePtr | 0;
        var R3t = x3t.STACKTOP | 0;
        var j3t = x3t.STACK_MAX | 0;
        var e8t = U3t.NaN
          , M8t = U3t.Infinity;
        var S8t = 0;
        var P8t = U3t.Math.floor;
        var f8t = U3t.Math.abs;
        var h8t = U3t.Math.sqrt;
        var C8t = U3t.Math.pow;
        var B8t = U3t.Math.cos;
        var R8t = U3t.Math.sin;
        var X5t = U3t.Math.tan;
        var H5t = U3t.Math.acos;
        var k5t = U3t.Math.asin;
        var s5t = U3t.Math.atan;
        var u5t = U3t.Math.atan2;
        var Y5t = U3t.Math.exp;
        var A5t = U3t.Math.log;
        var J5t = U3t.Math.ceil;
        var D5t = U3t.Math.imul;
        var c5t = U3t.Math.min;
        var o5t = U3t.Math.max;
        var p8t = U3t.Math.clz32;
        var g8t = x3t.abort;
        var o8t = x3t.assert;
        var q8t = x3t.enlargeMemory;
        var J8t = x3t.getTotalMemory;
        var A8t = x3t.abortOnCannotGrowMemory;
        var l3t = x3t.abortStackOverflow;
        var k8t = x3t.nullFunc_ii;
        var Y8t = x3t.nullFunc_iiii;
        var d8t = x3t.invoke_ii;
        var z8t = x3t.invoke_iiii;
        var b8t = x3t.___lock;
        var H8t = x3t.___setErrNo;
        var w8t = x3t.___syscall140;
        var r8t = x3t.___syscall146;
        var v8t = x3t.___syscall54;
        var E8t = x3t.___syscall6;
        var n8t = x3t.___unlock;
        var s8t = x3t._emscripten_memcpy_big;
        var U8t = x3t.flush_NO_FILESYSTEM;
        function K8t(m5t) {
            m5t = m5t | 0;
            var W5t = 0;
            W5t = R3t;
            R3t = R3t + m5t | 0;
            R3t = R3t + 15 & -16;
            if ((R3t | 0) >= (j3t | 0))
                l3t(m5t | 0);
            return W5t | 0;
        }
        function x8t() {
            return R3t | 0;
        }
        function j8t(z5t) {
            z5t = z5t | 0;
            R3t = z5t;
        }
        function l8t(G5t, i5t) {
            G5t = G5t | 0;
            i5t = i5t | 0;
            R3t = G5t;
            j3t = i5t;
        }
        function F8t(a5t, d5t) {
            a5t = a5t | 0;
            d5t = d5t | 0;
        }
        function T8t(e5t) {
            e5t = e5t | 0;
            S8t = e5t;
        }
        function t8t() {
            return S8t | 0;
        }
        function O8t(M5t, U5t, h5t, f5t, R5t, B5t) {
            M5t = M5t | 0;
            U5t = U5t | 0;
            h5t = h5t | 0;
            f5t = f5t | 0;
            R5t = R5t | 0;
            B5t = B5t | 0;
            var P5t = 0
              , C5t = 0
              , I5t = 0
              , x5t = 0
              , K5t = 0
              , j5t = 0;
            j5t = R3t;
            R3t = R3t + 80 | 0;
            if ((R3t | 0) >= (j3t | 0))
                l3t(80);
            K5t = j5t + 68 | 0;
            x5t = j5t + 64 | 0;
            I5t = j5t;
            if (h5t >>> 0 < 12) {
                K5t = -1;
                R3t = j5t;
                return K5t | 0;
            }
            P5t = C3t[U5t >> 2] | 0;
            M5t = K3t(P5t) | 0;
            switch (M5t | 0) {
            case 301825:
                {
                    M5t = U5t + 12 | 0;
                    K5t = B3t[M5t >> 0] | 0;
                    P5t = U5t + 13 | 0;
                    P5t = K3t(t3t[P5t >> 0] | t3t[P5t + 1 >> 0] << 8 | t3t[P5t + 2 >> 0] << 16 | t3t[P5t + 3 >> 0] << 24) | 0;
                    if (!(K5t << 24 >> 24)) {
                        C3t[U5t >> 2] = K3t(301826) | 0;
                        C3t[U5t + 4 >> 2] = K3t(16) | 0;
                        C3t[U5t + 8 >> 2] = K3t(1) | 0;
                        C3t[M5t >> 2] = K3t(P5t ^ f5t) | 0;
                        C3t[U5t + 16 >> 2] = K3t(P5t) | 0;
                        K5t = 2;
                        R3t = j5t;
                        return K5t | 0;
                    } else {
                        C3t[U5t >> 2] = K3t(P5t) | 0;
                        K5t = 3;
                        R3t = j5t;
                        return K5t | 0;
                    }
                }
            case 301569:
                {
                    C3t[U5t >> 2] = K3t(K3t(C3t[U5t + 12 >> 2] | 0) | 0) | 0;
                    K5t = 4;
                    R3t = j5t;
                    return K5t | 0;
                }
            case 301840:
            case 301584:
                {
                    f5t = K3t(C3t[U5t + 8 >> 2] | 0) | 0;
                    switch (M5t | 0) {
                    case 301584:
                        {
                            M5t = B5t;
                            C5t = 9;
                            break;
                        }
                    case 301840:
                        {
                            M5t = R5t;
                            C5t = 9;
                            break;
                        }
                    default:
                        {
                            R5t = 0;
                            P5t = 0;
                            B5t = 0;
                            M5t = 0;
                        }
                    }
                    if ((C5t | 0) == 9) {
                        M5t = K3t(M5t) | 0;
                        C3t[x5t >> 2] = M5t;
                        R5t = M5t & 255;
                        P5t = M5t >>> 8 & 255;
                        B5t = M5t >>> 16 & 255;
                        M5t = M5t >>> 24 & 255;
                    }
                    if (((f5t >>> 0) % 7 | 0) >>> 0 > 3) {
                        R5t = R5t ^ B3t[16 + (f5t & 63) >> 0];
                        B3t[x5t >> 0] = R5t;
                        P5t = P5t ^ B3t[16 + (f5t + 1 & 63) >> 0];
                        B3t[x5t + 1 >> 0] = P5t;
                        B5t = B5t ^ B3t[16 + (f5t + 2 & 63) >> 0];
                        B3t[x5t + 2 >> 0] = B5t;
                        M5t = M5t ^ B3t[16 + (f5t + 3 & 63) >> 0];
                        B3t[x5t + 3 >> 0] = M5t;
                    }
                    do {
                        if ((f5t + -200 | 0) >>> 0 < 100) {
                            if (h5t >>> 0 > 12) {
                                M5t = 12;
                                do {
                                    C5t = M5t + -12 | 0;
                                    I5t = U5t + M5t | 0;
                                    B3t[I5t >> 0] = B3t[80 + ((C5t >>> 0) % 67 | 0) >> 0] ^ (B3t[I5t >> 0] ^ B3t[x5t + (C5t & 3) >> 0]);
                                    M5t = M5t + 1 | 0;
                                } while ((M5t | 0) != (h5t | 0));
                            }
                            C5t = U5t + 12 | 0;
                            f5t = h5t + -12 | 0;
                            R5t = K3t(1522487922) | 0;
                            C3t[K5t >> 2] = R5t;
                            B5t = f5t >>> 2;
                            if (!B5t)
                                M5t = 0;
                            else {
                                P5t = 0;
                                M5t = 0;
                                while (1) {
                                    M5t = C5t + M5t | 0;
                                    C3t[M5t >> 2] = C3t[M5t >> 2] ^ R5t;
                                    M5t = P5t + 1 | 0;
                                    if ((M5t | 0) == (B5t | 0))
                                        break;
                                    else {
                                        P5t = M5t;
                                        M5t = M5t << 2;
                                    }
                                }
                                M5t = f5t & -4;
                            }
                            if (M5t >>> 0 < f5t >>> 0)
                                do {
                                    h5t = C5t + M5t | 0;
                                    B3t[h5t >> 0] = B3t[h5t >> 0] ^ B3t[K5t + (M5t & 3) >> 0];
                                    M5t = M5t + 1 | 0;
                                } while ((M5t | 0) != (f5t | 0));
                        } else {
                            if ((f5t + -300 | 0) >>> 0 < 100) {
                                if (h5t >>> 0 > 12) {
                                    M5t = 12;
                                    do {
                                        I5t = U5t + M5t | 0;
                                        B3t[I5t >> 0] = B3t[208 + ((B3t[x5t + (M5t & 3) >> 0] ^ B3t[I5t >> 0]) & 255) >> 0] | 0;
                                        M5t = M5t + 1 | 0;
                                    } while ((M5t | 0) != (h5t | 0));
                                }
                                C5t = U5t + 12 | 0;
                                f5t = h5t + -12 | 0;
                                R5t = K3t(1522487922) | 0;
                                C3t[K5t >> 2] = R5t;
                                B5t = f5t >>> 2;
                                if (!B5t)
                                    M5t = 0;
                                else {
                                    P5t = 0;
                                    M5t = 0;
                                    while (1) {
                                        M5t = C5t + M5t | 0;
                                        C3t[M5t >> 2] = C3t[M5t >> 2] ^ R5t;
                                        M5t = P5t + 1 | 0;
                                        if ((M5t | 0) == (B5t | 0))
                                            break;
                                        else {
                                            P5t = M5t;
                                            M5t = M5t << 2;
                                        }
                                    }
                                    M5t = f5t & -4;
                                }
                                if (M5t >>> 0 < f5t >>> 0)
                                    do {
                                        h5t = C5t + M5t | 0;
                                        B3t[h5t >> 0] = B3t[h5t >> 0] ^ B3t[K5t + (M5t & 3) >> 0];
                                        M5t = M5t + 1 | 0;
                                    } while ((M5t | 0) != (f5t | 0));break;
                            }
                            if ((f5t + -400 | 0) >>> 0 < 100) {
                                P5t = (f5t >>> 0) % 31 | 0;
                                if (h5t >>> 0 > 12) {
                                    M5t = 12;
                                    do {
                                        C5t = M5t + -12 | 0;
                                        I5t = U5t + M5t | 0;
                                        B3t[I5t >> 0] = B3t[80 + ((C5t >>> 0) % 67 | 0) >> 0] ^ (B3t[I5t >> 0] ^ B3t[x5t + (C5t + P5t & 3) >> 0]);
                                        M5t = M5t + 1 | 0;
                                    } while ((M5t | 0) != (h5t | 0));
                                }
                                C5t = U5t + 12 | 0;
                                f5t = h5t + -12 | 0;
                                R5t = K3t(1522487922) | 0;
                                C3t[K5t >> 2] = R5t;
                                B5t = f5t >>> 2;
                                if (!B5t)
                                    M5t = 0;
                                else {
                                    P5t = 0;
                                    M5t = 0;
                                    while (1) {
                                        M5t = C5t + M5t | 0;
                                        C3t[M5t >> 2] = C3t[M5t >> 2] ^ R5t;
                                        M5t = P5t + 1 | 0;
                                        if ((M5t | 0) == (B5t | 0))
                                            break;
                                        else {
                                            P5t = M5t;
                                            M5t = M5t << 2;
                                        }
                                    }
                                    M5t = f5t & -4;
                                }
                                if (M5t >>> 0 < f5t >>> 0)
                                    do {
                                        h5t = C5t + M5t | 0;
                                        B3t[h5t >> 0] = B3t[h5t >> 0] ^ B3t[K5t + (M5t & 3) >> 0];
                                        M5t = M5t + 1 | 0;
                                    } while ((M5t | 0) != (f5t | 0));break;
                            }
                            if ((f5t + -800 | 0) >>> 0 < 78) {
                                P5t = (f5t >>> 0) % 80 | 0;
                                if (h5t >>> 0 > 12) {
                                    M5t = 12;
                                    do {
                                        C5t = M5t + -12 | 0;
                                        I5t = U5t + M5t | 0;
                                        B3t[I5t >> 0] = B3t[80 + ((((C5t + f5t | 0) >>> 0) % 47 | 0) + P5t) >> 0] ^ (B3t[I5t >> 0] ^ B3t[x5t + (C5t & 3) >> 0]);
                                        M5t = M5t + 1 | 0;
                                    } while ((M5t | 0) != (h5t | 0));
                                }
                                C5t = U5t + 12 | 0;
                                f5t = h5t + -12 | 0;
                                R5t = K3t(1522487922) | 0;
                                C3t[K5t >> 2] = R5t;
                                B5t = f5t >>> 2;
                                if (!B5t)
                                    M5t = 0;
                                else {
                                    P5t = 0;
                                    M5t = 0;
                                    while (1) {
                                        M5t = C5t + M5t | 0;
                                        C3t[M5t >> 2] = C3t[M5t >> 2] ^ R5t;
                                        M5t = P5t + 1 | 0;
                                        if ((M5t | 0) == (B5t | 0))
                                            break;
                                        else {
                                            P5t = M5t;
                                            M5t = M5t << 2;
                                        }
                                    }
                                    M5t = f5t & -4;
                                }
                                if (M5t >>> 0 < f5t >>> 0)
                                    do {
                                        h5t = C5t + M5t | 0;
                                        B3t[h5t >> 0] = B3t[h5t >> 0] ^ B3t[K5t + (M5t & 3) >> 0];
                                        M5t = M5t + 1 | 0;
                                    } while ((M5t | 0) != (f5t | 0));break;
                            }
                            if ((f5t + -900 | 0) >>> 0 < 54) {
                                if (h5t >>> 0 > 12) {
                                    M5t = ((((((R5t * 131 & 255) + (B5t & 255) & 255) * 13 | 0) + (P5t & 255) & 255) * 23 | 0) + (M5t & 255) & 255) * 41 & 255;
                                    P5t = 12;
                                    do {
                                        I5t = U5t + P5t | 0;
                                        C5t = M5t;
                                        M5t = B3t[I5t >> 0] | 0;
                                        B3t[I5t >> 0] = M5t ^ C5t ^ B3t[464 + (((f5t + (t3t[x5t + (P5t & 3) >> 0] | 0) | 0) >>> 0) % 113 | 0) >> 0];
                                        P5t = P5t + 1 | 0;
                                    } while ((P5t | 0) != (h5t | 0));
                                }
                                C5t = U5t + 12 | 0;
                                f5t = h5t + -12 | 0;
                                R5t = K3t(1522487922) | 0;
                                C3t[K5t >> 2] = R5t;
                                B5t = f5t >>> 2;
                                if (!B5t)
                                    M5t = 0;
                                else {
                                    P5t = 0;
                                    M5t = 0;
                                    while (1) {
                                        M5t = C5t + M5t | 0;
                                        C3t[M5t >> 2] = C3t[M5t >> 2] ^ R5t;
                                        M5t = P5t + 1 | 0;
                                        if ((M5t | 0) == (B5t | 0))
                                            break;
                                        else {
                                            P5t = M5t;
                                            M5t = M5t << 2;
                                        }
                                    }
                                    M5t = f5t & -4;
                                }
                                if (M5t >>> 0 < f5t >>> 0)
                                    do {
                                        h5t = C5t + M5t | 0;
                                        B3t[h5t >> 0] = B3t[h5t >> 0] ^ B3t[K5t + (M5t & 3) >> 0];
                                        M5t = M5t + 1 | 0;
                                    } while ((M5t | 0) != (f5t | 0));break;
                            }
                            if ((f5t + -954 | 0) >>> 0 < 56) {
                                M5t = C3t[x5t >> 2] | 0;
                                C3t[I5t >> 2] = M5t;
                                C3t[I5t + 4 >> 2] = M5t;
                                C3t[I5t + 8 >> 2] = M5t;
                                C3t[I5t + 12 >> 2] = M5t;
                                C3t[I5t + 16 >> 2] = M5t;
                                C3t[I5t + 20 >> 2] = M5t;
                                C3t[I5t + 24 >> 2] = M5t;
                                C3t[I5t + 28 >> 2] = M5t;
                                C3t[I5t + 32 >> 2] = M5t;
                                C3t[I5t + 36 >> 2] = M5t;
                                C3t[I5t + 40 >> 2] = M5t;
                                C3t[I5t + 44 >> 2] = M5t;
                                C3t[I5t + 48 >> 2] = M5t;
                                C3t[I5t + 52 >> 2] = M5t;
                                C3t[I5t + 56 >> 2] = M5t;
                                C3t[I5t + 60 >> 2] = M5t;
                                C3t[I5t + 64 >> 2] = M5t;
                                C3t[I5t + 68 >> 2] = M5t;
                                C3t[I5t + 72 >> 2] = M5t;
                                C3t[I5t + 76 >> 2] = M5t;
                                C3t[I5t + 80 >> 2] = M5t;
                                C3t[I5t + 84 >> 2] = M5t;
                                C3t[I5t + 88 >> 2] = M5t;
                                C3t[I5t + 92 >> 2] = M5t;
                                C3t[I5t + 96 >> 2] = M5t;
                                C3t[I5t + 100 >> 2] = M5t;
                                C3t[I5t + 104 >> 2] = M5t;
                                C3t[I5t + 108 >> 2] = M5t;
                                C3t[I5t + 112 >> 2] = M5t;
                                C3t[I5t + 116 >> 2] = M5t;
                                C3t[I5t + 120 >> 2] = M5t;
                                C3t[I5t + 124 >> 2] = M5t;
                                C3t[I5t + 128 >> 2] = M5t;
                                C3t[I5t + 132 >> 2] = M5t;
                                C3t[I5t + 136 >> 2] = M5t;
                                C3t[I5t + 140 >> 2] = M5t;
                                C3t[I5t + 144 >> 2] = M5t;
                                C3t[I5t + 148 >> 2] = M5t;
                                C3t[I5t + 152 >> 2] = M5t;
                                C3t[I5t + 156 >> 2] = M5t;
                                C3t[I5t + 160 >> 2] = M5t;
                                C3t[I5t + 164 >> 2] = M5t;
                                C3t[I5t + 168 >> 2] = M5t;
                                C3t[I5t + 172 >> 2] = M5t;
                                C3t[I5t + 176 >> 2] = M5t;
                                C3t[I5t + 180 >> 2] = M5t;
                                C3t[I5t + 184 >> 2] = M5t;
                                C3t[I5t + 188 >> 2] = M5t;
                                C3t[I5t + 192 >> 2] = M5t;
                                C3t[I5t + 196 >> 2] = M5t;
                                C3t[I5t + 200 >> 2] = M5t;
                                C3t[I5t + 204 >> 2] = M5t;
                                C3t[I5t + 208 >> 2] = M5t;
                                C3t[I5t + 212 >> 2] = M5t;
                                C3t[I5t + 216 >> 2] = M5t;
                                C3t[I5t + 220 >> 2] = M5t;
                                C3t[I5t + 224 >> 2] = M5t;
                                C3t[I5t + 228 >> 2] = M5t;
                                C3t[I5t + 232 >> 2] = M5t;
                                C3t[I5t + 236 >> 2] = M5t;
                                C3t[I5t + 240 >> 2] = M5t;
                                C3t[I5t + 244 >> 2] = M5t;
                                C3t[I5t + 248 >> 2] = M5t;
                                C3t[I5t + 252 >> 2] = M5t;
                                M5t = 0;
                                P5t = f5t;
                                do {
                                    B5t = I5t + M5t | 0;
                                    C5t = B3t[B5t >> 0] | 0;
                                    x5t = I5t + (P5t & 63) | 0;
                                    B3t[B5t >> 0] = B3t[x5t >> 0] | 0;
                                    B3t[x5t >> 0] = C5t;
                                    P5t = ((P5t & 16777215) * 131 | 0) + M5t | 0;
                                    M5t = M5t + 1 | 0;
                                } while ((M5t | 0) != 64);if (h5t >>> 0 > 12) {
                                    P5t = f5t + -12 | 0;
                                    M5t = 12;
                                    do {
                                        x5t = U5t + M5t | 0;
                                        B3t[x5t >> 0] = B3t[x5t >> 0] ^ B3t[I5t + (((P5t + M5t | 0) >>> 0) % 53 | 0) >> 0];
                                        M5t = M5t + 1 | 0;
                                    } while ((M5t | 0) != (h5t | 0));
                                }
                                C5t = U5t + 12 | 0;
                                f5t = h5t + -12 | 0;
                                R5t = K3t(1522487922) | 0;
                                C3t[K5t >> 2] = R5t;
                                B5t = f5t >>> 2;
                                if (!B5t)
                                    M5t = 0;
                                else {
                                    P5t = 0;
                                    M5t = 0;
                                    while (1) {
                                        M5t = C5t + M5t | 0;
                                        C3t[M5t >> 2] = C3t[M5t >> 2] ^ R5t;
                                        M5t = P5t + 1 | 0;
                                        if ((M5t | 0) == (B5t | 0))
                                            break;
                                        else {
                                            P5t = M5t;
                                            M5t = M5t << 2;
                                        }
                                    }
                                    M5t = f5t & -4;
                                }
                                if (M5t >>> 0 < f5t >>> 0)
                                    do {
                                        h5t = C5t + M5t | 0;
                                        B3t[h5t >> 0] = B3t[h5t >> 0] ^ B3t[K5t + (M5t & 3) >> 0];
                                        M5t = M5t + 1 | 0;
                                    } while ((M5t | 0) != (f5t | 0));break;
                            }
                            P5t = h5t >>> 2;
                            if (h5t >>> 0 > 15) {
                                R5t = C3t[x5t >> 2] | 0;
                                M5t = 3;
                                do {
                                    I5t = U5t + (M5t << 2) | 0;
                                    C3t[I5t >> 2] = C3t[I5t >> 2] ^ R5t;
                                    M5t = M5t + 1 | 0;
                                } while (M5t >>> 0 < P5t >>> 0);M5t = M5t << 2;
                            } else
                                M5t = 12;
                            if (M5t >>> 0 < h5t >>> 0)
                                do {
                                    I5t = U5t + M5t | 0;
                                    B3t[I5t >> 0] = B3t[I5t >> 0] ^ B3t[x5t + (M5t & 3) >> 0];
                                    M5t = M5t + 1 | 0;
                                } while ((M5t | 0) != (h5t | 0));C5t = U5t + 12 | 0;
                            f5t = h5t + -12 | 0;
                            R5t = K3t(1522487922) | 0;
                            C3t[K5t >> 2] = R5t;
                            B5t = f5t >>> 2;
                            if (!B5t)
                                M5t = 0;
                            else {
                                P5t = 0;
                                M5t = 0;
                                while (1) {
                                    M5t = C5t + M5t | 0;
                                    C3t[M5t >> 2] = C3t[M5t >> 2] ^ R5t;
                                    M5t = P5t + 1 | 0;
                                    if ((M5t | 0) == (B5t | 0))
                                        break;
                                    else {
                                        P5t = M5t;
                                        M5t = M5t << 2;
                                    }
                                }
                                M5t = f5t & -4;
                            }
                            if (M5t >>> 0 < f5t >>> 0)
                                do {
                                    h5t = C5t + M5t | 0;
                                    B3t[h5t >> 0] = B3t[h5t >> 0] ^ B3t[K5t + (M5t & 3) >> 0];
                                    M5t = M5t + 1 | 0;
                                } while ((M5t | 0) != (f5t | 0));
                        }
                    } while (0);K5t = 1;
                    R3t = j5t;
                    return K5t | 0;
                }
            default:
                {
                    R5t = K3t(1522487922) | 0;
                    C3t[K5t >> 2] = R5t;
                    B5t = h5t >>> 2;
                    if (!B5t)
                        M5t = 0;
                    else {
                        C3t[U5t >> 2] = P5t ^ R5t;
                        if ((B5t | 0) != 1) {
                            P5t = 4;
                            M5t = 1;
                            while (1) {
                                C3t[U5t + P5t >> 2] = C3t[U5t + P5t >> 2] ^ R5t;
                                M5t = M5t + 1 | 0;
                                if ((M5t | 0) == (B5t | 0))
                                    break;
                                else
                                    P5t = M5t << 2;
                            }
                        }
                        M5t = h5t & -4;
                    }
                    if (M5t >>> 0 < h5t >>> 0)
                        do {
                            x5t = U5t + M5t | 0;
                            B3t[x5t >> 0] = B3t[x5t >> 0] ^ B3t[K5t + (M5t & 3) >> 0];
                            M5t = M5t + 1 | 0;
                        } while ((M5t | 0) != (h5t | 0));K5t = 0;
                    R3t = j5t;
                    return K5t | 0;
                }
            }
            return 0;
        }
        function Q8t(l5t, T5t, F5t, O5t, t5t, V5t, S4N) {
            l5t = l5t | 0;
            T5t = T5t | 0;
            F5t = F5t | 0;
            O5t = O5t | 0;
            t5t = t5t | 0;
            V5t = V5t | 0;
            S4N = S4N | 0;
            var H4N = 0
              , X4N = 0
              , Q5t = 0;
            Q5t = R3t;
            R3t = R3t + 16 | 0;
            if ((R3t | 0) >= (j3t | 0))
                l3t(16);
            H4N = Q5t;
            X4N = F5t + 12 | 0;
            if (X4N >>> 0 > O5t >>> 0) {
                F5t = -1;
                R3t = Q5t;
                return F5t | 0;
            }
            S4N = K3t(t5t) | 0;
            C3t[H4N >> 2] = S4N;
            c8t(T5t + 12 | 0, T5t | 0, F5t | 0) | 0;
            C3t[T5t >> 2] = K3t(301840) | 0;
            C3t[T5t + 4 >> 2] = K3t(X4N) | 0;
            C3t[T5t + 8 >> 2] = K3t(1) | 0;
            O5t = F5t >>> 2;
            if (!O5t)
                l5t = 0;
            else {
                V5t = 0;
                l5t = 0;
                while (1) {
                    l5t = T5t + (l5t + 12) | 0;
                    C3t[l5t >> 2] = C3t[l5t >> 2] ^ S4N;
                    l5t = V5t + 1 | 0;
                    if ((l5t | 0) == (O5t | 0))
                        break;
                    else {
                        V5t = l5t;
                        l5t = l5t << 2;
                    }
                }
                l5t = F5t & -4;
            }
            if (l5t >>> 0 < F5t >>> 0)
                do {
                    t5t = T5t + (l5t + 12) | 0;
                    B3t[t5t >> 0] = B3t[t5t >> 0] ^ B3t[H4N + (l5t & 3) >> 0];
                    l5t = l5t + 1 | 0;
                } while ((l5t | 0) != (F5t | 0));F5t = X4N;
            R3t = Q5t;
            return F5t | 0;
        }
        function V8t(v4N) {
            v4N = v4N | 0;
            var w4N = 0
              , E4N = 0
              , s4N = 0
              , D4N = 0
              , u4N = 0
              , J4N = 0
              , b4N = 0
              , Y4N = 0
              , Z4N = 0
              , L4N = 0
              , N4N = 0
              , W4N = 0
              , G4N = 0
              , z4N = 0
              , g4N = 0
              , i4N = 0
              , a4N = 0
              , q4N = 0
              , p4N = 0
              , n4N = 0
              , m4N = 0;
            m4N = R3t;
            R3t = R3t + 16 | 0;
            if ((R3t | 0) >= (j3t | 0))
                l3t(16);
            W4N = m4N;
            do {
                if (v4N >>> 0 < 245) {
                    Z4N = v4N >>> 0 < 11 ? 16 : v4N + 11 & -8;
                    v4N = Z4N >>> 3;
                    N4N = C3t[440] | 0;
                    E4N = N4N >>> v4N;
                    if (E4N & 3 | 0) {
                        w4N = (E4N & 1 ^ 1) + v4N | 0;
                        v4N = 1800 + (w4N << 1 << 2) | 0;
                        E4N = v4N + 8 | 0;
                        s4N = C3t[E4N >> 2] | 0;
                        D4N = s4N + 8 | 0;
                        u4N = C3t[D4N >> 2] | 0;
                        if ((u4N | 0) == (v4N | 0))
                            C3t[440] = N4N & ~(1 << w4N);
                        else {
                            C3t[u4N + 12 >> 2] = v4N;
                            C3t[E4N >> 2] = u4N;
                        }
                        n4N = w4N << 3;
                        C3t[s4N + 4 >> 2] = n4N | 3;
                        n4N = s4N + n4N + 4 | 0;
                        C3t[n4N >> 2] = C3t[n4N >> 2] | 1;
                        n4N = D4N;
                        R3t = m4N;
                        return n4N | 0;
                    }
                    L4N = C3t[442] | 0;
                    if (Z4N >>> 0 > L4N >>> 0) {
                        if (E4N | 0) {
                            w4N = 2 << v4N;
                            w4N = E4N << v4N & (w4N | 0 - w4N);
                            w4N = (w4N & 0 - w4N) + -1 | 0;
                            b4N = w4N >>> 12 & 16;
                            w4N = w4N >>> b4N;
                            E4N = w4N >>> 5 & 8;
                            w4N = w4N >>> E4N;
                            u4N = w4N >>> 2 & 4;
                            w4N = w4N >>> u4N;
                            v4N = w4N >>> 1 & 2;
                            w4N = w4N >>> v4N;
                            s4N = w4N >>> 1 & 1;
                            s4N = (E4N | b4N | u4N | v4N | s4N) + (w4N >>> s4N) | 0;
                            w4N = 1800 + (s4N << 1 << 2) | 0;
                            v4N = w4N + 8 | 0;
                            u4N = C3t[v4N >> 2] | 0;
                            b4N = u4N + 8 | 0;
                            E4N = C3t[b4N >> 2] | 0;
                            if ((E4N | 0) == (w4N | 0)) {
                                v4N = N4N & ~(1 << s4N);
                                C3t[440] = v4N;
                            } else {
                                C3t[E4N + 12 >> 2] = w4N;
                                C3t[v4N >> 2] = E4N;
                                v4N = N4N;
                            }
                            n4N = s4N << 3;
                            J4N = n4N - Z4N | 0;
                            C3t[u4N + 4 >> 2] = Z4N | 3;
                            D4N = u4N + Z4N | 0;
                            C3t[D4N + 4 >> 2] = J4N | 1;
                            C3t[u4N + n4N >> 2] = J4N;
                            if (L4N | 0) {
                                s4N = C3t[445] | 0;
                                w4N = L4N >>> 3;
                                E4N = 1800 + (w4N << 1 << 2) | 0;
                                w4N = 1 << w4N;
                                if (!(v4N & w4N)) {
                                    C3t[440] = v4N | w4N;
                                    w4N = E4N;
                                    v4N = E4N + 8 | 0;
                                } else {
                                    v4N = E4N + 8 | 0;
                                    w4N = C3t[v4N >> 2] | 0;
                                }
                                C3t[v4N >> 2] = s4N;
                                C3t[w4N + 12 >> 2] = s4N;
                                C3t[s4N + 8 >> 2] = w4N;
                                C3t[s4N + 12 >> 2] = E4N;
                            }
                            C3t[442] = J4N;
                            C3t[445] = D4N;
                            n4N = b4N;
                            R3t = m4N;
                            return n4N | 0;
                        }
                        u4N = C3t[441] | 0;
                        if (u4N) {
                            E4N = (u4N & 0 - u4N) + -1 | 0;
                            D4N = E4N >>> 12 & 16;
                            E4N = E4N >>> D4N;
                            s4N = E4N >>> 5 & 8;
                            E4N = E4N >>> s4N;
                            J4N = E4N >>> 2 & 4;
                            E4N = E4N >>> J4N;
                            b4N = E4N >>> 1 & 2;
                            E4N = E4N >>> b4N;
                            Y4N = E4N >>> 1 & 1;
                            Y4N = C3t[2064 + ((s4N | D4N | J4N | b4N | Y4N) + (E4N >>> Y4N) << 2) >> 2] | 0;
                            E4N = Y4N;
                            b4N = Y4N;
                            Y4N = (C3t[Y4N + 4 >> 2] & -8) - Z4N | 0;
                            while (1) {
                                v4N = C3t[E4N + 16 >> 2] | 0;
                                if (!v4N) {
                                    v4N = C3t[E4N + 20 >> 2] | 0;
                                    if (!v4N)
                                        break;
                                }
                                J4N = (C3t[v4N + 4 >> 2] & -8) - Z4N | 0;
                                D4N = J4N >>> 0 < Y4N >>> 0;
                                E4N = v4N;
                                b4N = D4N ? v4N : b4N;
                                Y4N = D4N ? J4N : Y4N;
                            }
                            J4N = b4N + Z4N | 0;
                            if (J4N >>> 0 > b4N >>> 0) {
                                D4N = C3t[b4N + 24 >> 2] | 0;
                                w4N = C3t[b4N + 12 >> 2] | 0;
                                do {
                                    if ((w4N | 0) == (b4N | 0)) {
                                        v4N = b4N + 20 | 0;
                                        w4N = C3t[v4N >> 2] | 0;
                                        if (!w4N) {
                                            v4N = b4N + 16 | 0;
                                            w4N = C3t[v4N >> 2] | 0;
                                            if (!w4N) {
                                                E4N = 0;
                                                break;
                                            }
                                        }
                                        while (1) {
                                            s4N = w4N + 20 | 0;
                                            E4N = C3t[s4N >> 2] | 0;
                                            if (!E4N) {
                                                s4N = w4N + 16 | 0;
                                                E4N = C3t[s4N >> 2] | 0;
                                                if (!E4N)
                                                    break;
                                                else {
                                                    w4N = E4N;
                                                    v4N = s4N;
                                                }
                                            } else {
                                                w4N = E4N;
                                                v4N = s4N;
                                            }
                                        }
                                        C3t[v4N >> 2] = 0;
                                        E4N = w4N;
                                    } else {
                                        E4N = C3t[b4N + 8 >> 2] | 0;
                                        C3t[E4N + 12 >> 2] = w4N;
                                        C3t[w4N + 8 >> 2] = E4N;
                                        E4N = w4N;
                                    }
                                } while (0);do {
                                    if (D4N | 0) {
                                        w4N = C3t[b4N + 28 >> 2] | 0;
                                        v4N = 2064 + (w4N << 2) | 0;
                                        if ((b4N | 0) == (C3t[v4N >> 2] | 0)) {
                                            C3t[v4N >> 2] = E4N;
                                            if (!E4N) {
                                                C3t[441] = u4N & ~(1 << w4N);
                                                break;
                                            }
                                        } else {
                                            n4N = D4N + 16 | 0;
                                            C3t[((C3t[n4N >> 2] | 0) == (b4N | 0) ? n4N : D4N + 20 | 0) >> 2] = E4N;
                                            if (!E4N)
                                                break;
                                        }
                                        C3t[E4N + 24 >> 2] = D4N;
                                        w4N = C3t[b4N + 16 >> 2] | 0;
                                        if (w4N | 0) {
                                            C3t[E4N + 16 >> 2] = w4N;
                                            C3t[w4N + 24 >> 2] = E4N;
                                        }
                                        w4N = C3t[b4N + 20 >> 2] | 0;
                                        if (w4N | 0) {
                                            C3t[E4N + 20 >> 2] = w4N;
                                            C3t[w4N + 24 >> 2] = E4N;
                                        }
                                    }
                                } while (0);if (Y4N >>> 0 < 16) {
                                    n4N = Y4N + Z4N | 0;
                                    C3t[b4N + 4 >> 2] = n4N | 3;
                                    n4N = b4N + n4N + 4 | 0;
                                    C3t[n4N >> 2] = C3t[n4N >> 2] | 1;
                                } else {
                                    C3t[b4N + 4 >> 2] = Z4N | 3;
                                    C3t[J4N + 4 >> 2] = Y4N | 1;
                                    C3t[J4N + Y4N >> 2] = Y4N;
                                    if (L4N | 0) {
                                        s4N = C3t[445] | 0;
                                        w4N = L4N >>> 3;
                                        E4N = 1800 + (w4N << 1 << 2) | 0;
                                        w4N = 1 << w4N;
                                        if (!(w4N & N4N)) {
                                            C3t[440] = w4N | N4N;
                                            w4N = E4N;
                                            v4N = E4N + 8 | 0;
                                        } else {
                                            v4N = E4N + 8 | 0;
                                            w4N = C3t[v4N >> 2] | 0;
                                        }
                                        C3t[v4N >> 2] = s4N;
                                        C3t[w4N + 12 >> 2] = s4N;
                                        C3t[s4N + 8 >> 2] = w4N;
                                        C3t[s4N + 12 >> 2] = E4N;
                                    }
                                    C3t[442] = Y4N;
                                    C3t[445] = J4N;
                                }
                                n4N = b4N + 8 | 0;
                                R3t = m4N;
                                return n4N | 0;
                            } else
                                N4N = Z4N;
                        } else
                            N4N = Z4N;
                    } else
                        N4N = Z4N;
                } else if (v4N >>> 0 <= 4294967231) {
                    v4N = v4N + 11 | 0;
                    Z4N = v4N & -8;
                    s4N = C3t[441] | 0;
                    if (s4N) {
                        D4N = 0 - Z4N | 0;
                        v4N = v4N >>> 8;
                        if (v4N) {
                            if (Z4N >>> 0 > 16777215)
                                Y4N = 31;
                            else {
                                N4N = (v4N + 1048320 | 0) >>> 16 & 8;
                                g4N = v4N << N4N;
                                b4N = (g4N + 520192 | 0) >>> 16 & 4;
                                g4N = g4N << b4N;
                                Y4N = (g4N + 245760 | 0) >>> 16 & 2;
                                Y4N = 14 - (b4N | N4N | Y4N) + (g4N << Y4N >>> 15) | 0;
                                Y4N = Z4N >>> (Y4N + 7 | 0) & 1 | Y4N << 1;
                            }
                        } else
                            Y4N = 0;
                        E4N = C3t[2064 + (Y4N << 2) >> 2] | 0;
                        a: do {
                            if (!E4N) {
                                E4N = 0;
                                v4N = 0;
                                g4N = 61;
                            } else {
                                v4N = 0;
                                b4N = Z4N << ((Y4N | 0) == 31 ? 0 : 25 - (Y4N >>> 1) | 0);
                                u4N = 0;
                                while (1) {
                                    J4N = (C3t[E4N + 4 >> 2] & -8) - Z4N | 0;
                                    if (J4N >>> 0 < D4N >>> 0)
                                        if (!J4N) {
                                            v4N = E4N;
                                            D4N = 0;
                                            g4N = 65;
                                            break a;
                                        } else {
                                            v4N = E4N;
                                            D4N = J4N;
                                        }
                                    g4N = C3t[E4N + 20 >> 2] | 0;
                                    E4N = C3t[E4N + 16 + (b4N >>> 31 << 2) >> 2] | 0;
                                    u4N = (g4N | 0) == 0 | (g4N | 0) == (E4N | 0) ? u4N : g4N;
                                    if (!E4N) {
                                        E4N = u4N;
                                        g4N = 61;
                                        break;
                                    } else
                                        b4N = b4N << 1;
                                }
                            }
                        } while (0);if ((g4N | 0) == 61) {
                            if ((E4N | 0) == 0 & (v4N | 0) == 0) {
                                v4N = 2 << Y4N;
                                v4N = (v4N | 0 - v4N) & s4N;
                                if (!v4N) {
                                    N4N = Z4N;
                                    break;
                                }
                                N4N = (v4N & 0 - v4N) + -1 | 0;
                                J4N = N4N >>> 12 & 16;
                                N4N = N4N >>> J4N;
                                u4N = N4N >>> 5 & 8;
                                N4N = N4N >>> u4N;
                                b4N = N4N >>> 2 & 4;
                                N4N = N4N >>> b4N;
                                Y4N = N4N >>> 1 & 2;
                                N4N = N4N >>> Y4N;
                                E4N = N4N >>> 1 & 1;
                                v4N = 0;
                                E4N = C3t[2064 + ((u4N | J4N | b4N | Y4N | E4N) + (N4N >>> E4N) << 2) >> 2] | 0;
                            }
                            if (!E4N) {
                                b4N = v4N;
                                J4N = D4N;
                            } else
                                g4N = 65;
                        }
                        if ((g4N | 0) == 65) {
                            u4N = E4N;
                            while (1) {
                                N4N = (C3t[u4N + 4 >> 2] & -8) - Z4N | 0;
                                E4N = N4N >>> 0 < D4N >>> 0;
                                D4N = E4N ? N4N : D4N;
                                v4N = E4N ? u4N : v4N;
                                E4N = C3t[u4N + 16 >> 2] | 0;
                                if (!E4N)
                                    E4N = C3t[u4N + 20 >> 2] | 0;
                                if (!E4N) {
                                    b4N = v4N;
                                    J4N = D4N;
                                    break;
                                } else
                                    u4N = E4N;
                            }
                        }
                        if (((b4N | 0) != 0 ? J4N >>> 0 < ((C3t[442] | 0) - Z4N | 0) >>> 0 : 0) ? (L4N = b4N + Z4N | 0,
                        L4N >>> 0 > b4N >>> 0) : 0) {
                            u4N = C3t[b4N + 24 >> 2] | 0;
                            w4N = C3t[b4N + 12 >> 2] | 0;
                            do {
                                if ((w4N | 0) == (b4N | 0)) {
                                    v4N = b4N + 20 | 0;
                                    w4N = C3t[v4N >> 2] | 0;
                                    if (!w4N) {
                                        v4N = b4N + 16 | 0;
                                        w4N = C3t[v4N >> 2] | 0;
                                        if (!w4N) {
                                            w4N = 0;
                                            break;
                                        }
                                    }
                                    while (1) {
                                        D4N = w4N + 20 | 0;
                                        E4N = C3t[D4N >> 2] | 0;
                                        if (!E4N) {
                                            D4N = w4N + 16 | 0;
                                            E4N = C3t[D4N >> 2] | 0;
                                            if (!E4N)
                                                break;
                                            else {
                                                w4N = E4N;
                                                v4N = D4N;
                                            }
                                        } else {
                                            w4N = E4N;
                                            v4N = D4N;
                                        }
                                    }
                                    C3t[v4N >> 2] = 0;
                                } else {
                                    n4N = C3t[b4N + 8 >> 2] | 0;
                                    C3t[n4N + 12 >> 2] = w4N;
                                    C3t[w4N + 8 >> 2] = n4N;
                                }
                            } while (0);do {
                                if (u4N) {
                                    v4N = C3t[b4N + 28 >> 2] | 0;
                                    E4N = 2064 + (v4N << 2) | 0;
                                    if ((b4N | 0) == (C3t[E4N >> 2] | 0)) {
                                        C3t[E4N >> 2] = w4N;
                                        if (!w4N) {
                                            s4N = s4N & ~(1 << v4N);
                                            C3t[441] = s4N;
                                            break;
                                        }
                                    } else {
                                        n4N = u4N + 16 | 0;
                                        C3t[((C3t[n4N >> 2] | 0) == (b4N | 0) ? n4N : u4N + 20 | 0) >> 2] = w4N;
                                        if (!w4N)
                                            break;
                                    }
                                    C3t[w4N + 24 >> 2] = u4N;
                                    v4N = C3t[b4N + 16 >> 2] | 0;
                                    if (v4N | 0) {
                                        C3t[w4N + 16 >> 2] = v4N;
                                        C3t[v4N + 24 >> 2] = w4N;
                                    }
                                    v4N = C3t[b4N + 20 >> 2] | 0;
                                    if (v4N) {
                                        C3t[w4N + 20 >> 2] = v4N;
                                        C3t[v4N + 24 >> 2] = w4N;
                                    }
                                }
                            } while (0);a: do {
                                if (J4N >>> 0 < 16) {
                                    n4N = J4N + Z4N | 0;
                                    C3t[b4N + 4 >> 2] = n4N | 3;
                                    n4N = b4N + n4N + 4 | 0;
                                    C3t[n4N >> 2] = C3t[n4N >> 2] | 1;
                                } else {
                                    C3t[b4N + 4 >> 2] = Z4N | 3;
                                    C3t[L4N + 4 >> 2] = J4N | 1;
                                    C3t[L4N + J4N >> 2] = J4N;
                                    w4N = J4N >>> 3;
                                    if (J4N >>> 0 < 256) {
                                        E4N = 1800 + (w4N << 1 << 2) | 0;
                                        v4N = C3t[440] | 0;
                                        w4N = 1 << w4N;
                                        if (!(v4N & w4N)) {
                                            C3t[440] = v4N | w4N;
                                            w4N = E4N;
                                            v4N = E4N + 8 | 0;
                                        } else {
                                            v4N = E4N + 8 | 0;
                                            w4N = C3t[v4N >> 2] | 0;
                                        }
                                        C3t[v4N >> 2] = L4N;
                                        C3t[w4N + 12 >> 2] = L4N;
                                        C3t[L4N + 8 >> 2] = w4N;
                                        C3t[L4N + 12 >> 2] = E4N;
                                        break;
                                    }
                                    w4N = J4N >>> 8;
                                    if (w4N) {
                                        if (J4N >>> 0 > 16777215)
                                            E4N = 31;
                                        else {
                                            p4N = (w4N + 1048320 | 0) >>> 16 & 8;
                                            n4N = w4N << p4N;
                                            q4N = (n4N + 520192 | 0) >>> 16 & 4;
                                            n4N = n4N << q4N;
                                            E4N = (n4N + 245760 | 0) >>> 16 & 2;
                                            E4N = 14 - (q4N | p4N | E4N) + (n4N << E4N >>> 15) | 0;
                                            E4N = J4N >>> (E4N + 7 | 0) & 1 | E4N << 1;
                                        }
                                    } else
                                        E4N = 0;
                                    w4N = 2064 + (E4N << 2) | 0;
                                    C3t[L4N + 28 >> 2] = E4N;
                                    v4N = L4N + 16 | 0;
                                    C3t[v4N + 4 >> 2] = 0;
                                    C3t[v4N >> 2] = 0;
                                    v4N = 1 << E4N;
                                    if (!(s4N & v4N)) {
                                        C3t[441] = s4N | v4N;
                                        C3t[w4N >> 2] = L4N;
                                        C3t[L4N + 24 >> 2] = w4N;
                                        C3t[L4N + 12 >> 2] = L4N;
                                        C3t[L4N + 8 >> 2] = L4N;
                                        break;
                                    }
                                    w4N = C3t[w4N >> 2] | 0;
                                    b: do {
                                        if ((C3t[w4N + 4 >> 2] & -8 | 0) != (J4N | 0)) {
                                            s4N = J4N << ((E4N | 0) == 31 ? 0 : 25 - (E4N >>> 1) | 0);
                                            while (1) {
                                                E4N = w4N + 16 + (s4N >>> 31 << 2) | 0;
                                                v4N = C3t[E4N >> 2] | 0;
                                                if (!v4N)
                                                    break;
                                                if ((C3t[v4N + 4 >> 2] & -8 | 0) == (J4N | 0)) {
                                                    w4N = v4N;
                                                    break b;
                                                } else {
                                                    s4N = s4N << 1;
                                                    w4N = v4N;
                                                }
                                            }
                                            C3t[E4N >> 2] = L4N;
                                            C3t[L4N + 24 >> 2] = w4N;
                                            C3t[L4N + 12 >> 2] = L4N;
                                            C3t[L4N + 8 >> 2] = L4N;
                                            break a;
                                        }
                                    } while (0);p4N = w4N + 8 | 0;
                                    n4N = C3t[p4N >> 2] | 0;
                                    C3t[n4N + 12 >> 2] = L4N;
                                    C3t[p4N >> 2] = L4N;
                                    C3t[L4N + 8 >> 2] = n4N;
                                    C3t[L4N + 12 >> 2] = w4N;
                                    C3t[L4N + 24 >> 2] = 0;
                                }
                            } while (0);n4N = b4N + 8 | 0;
                            R3t = m4N;
                            return n4N | 0;
                        } else
                            N4N = Z4N;
                    } else
                        N4N = Z4N;
                } else
                    N4N = -1;
            } while (0);E4N = C3t[442] | 0;
            if (E4N >>> 0 >= N4N >>> 0) {
                w4N = E4N - N4N | 0;
                v4N = C3t[445] | 0;
                if (w4N >>> 0 > 15) {
                    n4N = v4N + N4N | 0;
                    C3t[445] = n4N;
                    C3t[442] = w4N;
                    C3t[n4N + 4 >> 2] = w4N | 1;
                    C3t[v4N + E4N >> 2] = w4N;
                    C3t[v4N + 4 >> 2] = N4N | 3;
                } else {
                    C3t[442] = 0;
                    C3t[445] = 0;
                    C3t[v4N + 4 >> 2] = E4N | 3;
                    n4N = v4N + E4N + 4 | 0;
                    C3t[n4N >> 2] = C3t[n4N >> 2] | 1;
                }
                n4N = v4N + 8 | 0;
                R3t = m4N;
                return n4N | 0;
            }
            J4N = C3t[443] | 0;
            if (J4N >>> 0 > N4N >>> 0) {
                q4N = J4N - N4N | 0;
                C3t[443] = q4N;
                n4N = C3t[446] | 0;
                p4N = n4N + N4N | 0;
                C3t[446] = p4N;
                C3t[p4N + 4 >> 2] = q4N | 1;
                C3t[n4N + 4 >> 2] = N4N | 3;
                n4N = n4N + 8 | 0;
                R3t = m4N;
                return n4N | 0;
            }
            if (!(C3t[558] | 0)) {
                C3t[560] = 4096;
                C3t[559] = 4096;
                C3t[561] = -1;
                C3t[562] = -1;
                C3t[563] = 0;
                C3t[551] = 0;
                C3t[558] = W4N & -16 ^ 1431655768;
                v4N = 4096;
            } else
                v4N = C3t[560] | 0;
            b4N = N4N + 48 | 0;
            Y4N = N4N + 47 | 0;
            u4N = v4N + Y4N | 0;
            D4N = 0 - v4N | 0;
            Z4N = u4N & D4N;
            if (Z4N >>> 0 <= N4N >>> 0) {
                n4N = 0;
                R3t = m4N;
                return n4N | 0;
            }
            v4N = C3t[550] | 0;
            if (v4N | 0 ? (L4N = C3t[548] | 0,
            W4N = L4N + Z4N | 0,
            W4N >>> 0 <= L4N >>> 0 | W4N >>> 0 > v4N >>> 0) : 0) {
                n4N = 0;
                R3t = m4N;
                return n4N | 0;
            }
            a: do {
                if (!(C3t[551] & 4)) {
                    E4N = C3t[446] | 0;
                    b: do {
                        if (E4N) {
                            s4N = 2208;
                            while (1) {
                                W4N = C3t[s4N >> 2] | 0;
                                if (W4N >>> 0 <= E4N >>> 0 ? (W4N + (C3t[s4N + 4 >> 2] | 0) | 0) >>> 0 > E4N >>> 0 : 0)
                                    break;
                                v4N = C3t[s4N + 8 >> 2] | 0;
                                if (!v4N) {
                                    g4N = 128;
                                    break b;
                                } else
                                    s4N = v4N;
                            }
                            w4N = u4N - J4N & D4N;
                            if (w4N >>> 0 < 2147483647) {
                                v4N = T3t(w4N | 0) | 0;
                                if ((v4N | 0) == ((C3t[s4N >> 2] | 0) + (C3t[s4N + 4 >> 2] | 0) | 0)) {
                                    if ((v4N | 0) != (-1 | 0)) {
                                        J4N = w4N;
                                        u4N = v4N;
                                        g4N = 145;
                                        break a;
                                    }
                                } else {
                                    s4N = v4N;
                                    g4N = 136;
                                }
                            } else
                                w4N = 0;
                        } else
                            g4N = 128;
                    } while (0);do {
                        if ((g4N | 0) == 128) {
                            E4N = T3t(0) | 0;
                            if ((E4N | 0) != (-1 | 0) ? (w4N = E4N,
                            G4N = C3t[559] | 0,
                            z4N = G4N + -1 | 0,
                            w4N = ((z4N & w4N | 0) == 0 ? 0 : (z4N + w4N & 0 - G4N) - w4N | 0) + Z4N | 0,
                            G4N = C3t[548] | 0,
                            z4N = w4N + G4N | 0,
                            w4N >>> 0 > N4N >>> 0 & w4N >>> 0 < 2147483647) : 0) {
                                W4N = C3t[550] | 0;
                                if (W4N | 0 ? z4N >>> 0 <= G4N >>> 0 | z4N >>> 0 > W4N >>> 0 : 0) {
                                    w4N = 0;
                                    break;
                                }
                                v4N = T3t(w4N | 0) | 0;
                                if ((v4N | 0) == (E4N | 0)) {
                                    J4N = w4N;
                                    u4N = E4N;
                                    g4N = 145;
                                    break a;
                                } else {
                                    s4N = v4N;
                                    g4N = 136;
                                }
                            } else
                                w4N = 0;
                        }
                    } while (0);do {
                        if ((g4N | 0) == 136) {
                            E4N = 0 - w4N | 0;
                            if (!(b4N >>> 0 > w4N >>> 0 & (w4N >>> 0 < 2147483647 & (s4N | 0) != (-1 | 0))))
                                if ((s4N | 0) == (-1 | 0)) {
                                    w4N = 0;
                                    break;
                                } else {
                                    J4N = w4N;
                                    u4N = s4N;
                                    g4N = 145;
                                    break a;
                                }
                            v4N = C3t[560] | 0;
                            v4N = Y4N - w4N + v4N & 0 - v4N;
                            if (v4N >>> 0 >= 2147483647) {
                                J4N = w4N;
                                u4N = s4N;
                                g4N = 145;
                                break a;
                            }
                            if ((T3t(v4N | 0) | 0) == (-1 | 0)) {
                                T3t(E4N | 0) | 0;
                                w4N = 0;
                                break;
                            } else {
                                J4N = v4N + w4N | 0;
                                u4N = s4N;
                                g4N = 145;
                                break a;
                            }
                        }
                    } while (0);C3t[551] = C3t[551] | 4;
                    g4N = 143;
                } else {
                    w4N = 0;
                    g4N = 143;
                }
            } while (0);if (((g4N | 0) == 143 ? Z4N >>> 0 < 2147483647 : 0) ? (q4N = T3t(Z4N | 0) | 0,
            z4N = T3t(0) | 0,
            i4N = z4N - q4N | 0,
            a4N = i4N >>> 0 > (N4N + 40 | 0) >>> 0,
            !((q4N | 0) == (-1 | 0) | a4N ^ 1 | q4N >>> 0 < z4N >>> 0 & ((q4N | 0) != (-1 | 0) & (z4N | 0) != (-1 | 0)) ^ 1)) : 0) {
                J4N = a4N ? i4N : w4N;
                u4N = q4N;
                g4N = 145;
            }
            if ((g4N | 0) == 145) {
                w4N = (C3t[548] | 0) + J4N | 0;
                C3t[548] = w4N;
                if (w4N >>> 0 > (C3t[549] | 0) >>> 0)
                    C3t[549] = w4N;
                Y4N = C3t[446] | 0;
                b: do {
                    if (Y4N) {
                        w4N = 2208;
                        while (1) {
                            v4N = C3t[w4N >> 2] | 0;
                            E4N = C3t[w4N + 4 >> 2] | 0;
                            if ((u4N | 0) == (v4N + E4N | 0)) {
                                g4N = 154;
                                break;
                            }
                            s4N = C3t[w4N + 8 >> 2] | 0;
                            if (!s4N)
                                break;
                            else
                                w4N = s4N;
                        }
                        if (((g4N | 0) == 154 ? (p4N = w4N + 4 | 0,
                        (C3t[w4N + 12 >> 2] & 8 | 0) == 0) : 0) ? u4N >>> 0 > Y4N >>> 0 & v4N >>> 0 <= Y4N >>> 0 : 0) {
                            C3t[p4N >> 2] = E4N + J4N;
                            n4N = (C3t[443] | 0) + J4N | 0;
                            q4N = Y4N + 8 | 0;
                            q4N = (q4N & 7 | 0) == 0 ? 0 : 0 - q4N & 7;
                            p4N = Y4N + q4N | 0;
                            q4N = n4N - q4N | 0;
                            C3t[446] = p4N;
                            C3t[443] = q4N;
                            C3t[p4N + 4 >> 2] = q4N | 1;
                            C3t[Y4N + n4N + 4 >> 2] = 40;
                            C3t[447] = C3t[562];
                            break;
                        }
                        if (u4N >>> 0 < (C3t[444] | 0) >>> 0)
                            C3t[444] = u4N;
                        E4N = u4N + J4N | 0;
                        w4N = 2208;
                        while (1) {
                            if ((C3t[w4N >> 2] | 0) == (E4N | 0)) {
                                g4N = 162;
                                break;
                            }
                            v4N = C3t[w4N + 8 >> 2] | 0;
                            if (!v4N)
                                break;
                            else
                                w4N = v4N;
                        }
                        if ((g4N | 0) == 162 ? (C3t[w4N + 12 >> 2] & 8 | 0) == 0 : 0) {
                            C3t[w4N >> 2] = u4N;
                            L4N = w4N + 4 | 0;
                            C3t[L4N >> 2] = (C3t[L4N >> 2] | 0) + J4N;
                            L4N = u4N + 8 | 0;
                            L4N = u4N + ((L4N & 7 | 0) == 0 ? 0 : 0 - L4N & 7) | 0;
                            w4N = E4N + 8 | 0;
                            w4N = E4N + ((w4N & 7 | 0) == 0 ? 0 : 0 - w4N & 7) | 0;
                            Z4N = L4N + N4N | 0;
                            b4N = w4N - L4N - N4N | 0;
                            C3t[L4N + 4 >> 2] = N4N | 3;
                            c: do {
                                if ((Y4N | 0) == (w4N | 0)) {
                                    n4N = (C3t[443] | 0) + b4N | 0;
                                    C3t[443] = n4N;
                                    C3t[446] = Z4N;
                                    C3t[Z4N + 4 >> 2] = n4N | 1;
                                } else {
                                    if ((C3t[445] | 0) == (w4N | 0)) {
                                        n4N = (C3t[442] | 0) + b4N | 0;
                                        C3t[442] = n4N;
                                        C3t[445] = Z4N;
                                        C3t[Z4N + 4 >> 2] = n4N | 1;
                                        C3t[Z4N + n4N >> 2] = n4N;
                                        break;
                                    }
                                    v4N = C3t[w4N + 4 >> 2] | 0;
                                    if ((v4N & 3 | 0) == 1) {
                                        J4N = v4N & -8;
                                        s4N = v4N >>> 3;
                                        a: do {
                                            if (v4N >>> 0 < 256) {
                                                v4N = C3t[w4N + 8 >> 2] | 0;
                                                E4N = C3t[w4N + 12 >> 2] | 0;
                                                if ((E4N | 0) == (v4N | 0)) {
                                                    C3t[440] = C3t[440] & ~(1 << s4N);
                                                    break;
                                                } else {
                                                    C3t[v4N + 12 >> 2] = E4N;
                                                    C3t[E4N + 8 >> 2] = v4N;
                                                    break;
                                                }
                                            } else {
                                                u4N = C3t[w4N + 24 >> 2] | 0;
                                                v4N = C3t[w4N + 12 >> 2] | 0;
                                                do {
                                                    if ((v4N | 0) == (w4N | 0)) {
                                                        E4N = w4N + 16 | 0;
                                                        s4N = E4N + 4 | 0;
                                                        v4N = C3t[s4N >> 2] | 0;
                                                        if (!v4N) {
                                                            v4N = C3t[E4N >> 2] | 0;
                                                            if (!v4N) {
                                                                v4N = 0;
                                                                break;
                                                            }
                                                        } else
                                                            E4N = s4N;
                                                        while (1) {
                                                            D4N = v4N + 20 | 0;
                                                            s4N = C3t[D4N >> 2] | 0;
                                                            if (!s4N) {
                                                                D4N = v4N + 16 | 0;
                                                                s4N = C3t[D4N >> 2] | 0;
                                                                if (!s4N)
                                                                    break;
                                                                else {
                                                                    v4N = s4N;
                                                                    E4N = D4N;
                                                                }
                                                            } else {
                                                                v4N = s4N;
                                                                E4N = D4N;
                                                            }
                                                        }
                                                        C3t[E4N >> 2] = 0;
                                                    } else {
                                                        n4N = C3t[w4N + 8 >> 2] | 0;
                                                        C3t[n4N + 12 >> 2] = v4N;
                                                        C3t[v4N + 8 >> 2] = n4N;
                                                    }
                                                } while (0);if (!u4N)
                                                    break;
                                                E4N = C3t[w4N + 28 >> 2] | 0;
                                                s4N = 2064 + (E4N << 2) | 0;
                                                do {
                                                    if ((C3t[s4N >> 2] | 0) != (w4N | 0)) {
                                                        n4N = u4N + 16 | 0;
                                                        C3t[((C3t[n4N >> 2] | 0) == (w4N | 0) ? n4N : u4N + 20 | 0) >> 2] = v4N;
                                                        if (!v4N)
                                                            break a;
                                                    } else {
                                                        C3t[s4N >> 2] = v4N;
                                                        if (v4N | 0)
                                                            break;
                                                        C3t[441] = C3t[441] & ~(1 << E4N);
                                                        break a;
                                                    }
                                                } while (0);C3t[v4N + 24 >> 2] = u4N;
                                                E4N = w4N + 16 | 0;
                                                s4N = C3t[E4N >> 2] | 0;
                                                if (s4N | 0) {
                                                    C3t[v4N + 16 >> 2] = s4N;
                                                    C3t[s4N + 24 >> 2] = v4N;
                                                }
                                                E4N = C3t[E4N + 4 >> 2] | 0;
                                                if (!E4N)
                                                    break;
                                                C3t[v4N + 20 >> 2] = E4N;
                                                C3t[E4N + 24 >> 2] = v4N;
                                            }
                                        } while (0);w4N = w4N + J4N | 0;
                                        D4N = J4N + b4N | 0;
                                    } else
                                        D4N = b4N;
                                    w4N = w4N + 4 | 0;
                                    C3t[w4N >> 2] = C3t[w4N >> 2] & -2;
                                    C3t[Z4N + 4 >> 2] = D4N | 1;
                                    C3t[Z4N + D4N >> 2] = D4N;
                                    w4N = D4N >>> 3;
                                    if (D4N >>> 0 < 256) {
                                        E4N = 1800 + (w4N << 1 << 2) | 0;
                                        v4N = C3t[440] | 0;
                                        w4N = 1 << w4N;
                                        if (!(v4N & w4N)) {
                                            C3t[440] = v4N | w4N;
                                            w4N = E4N;
                                            v4N = E4N + 8 | 0;
                                        } else {
                                            v4N = E4N + 8 | 0;
                                            w4N = C3t[v4N >> 2] | 0;
                                        }
                                        C3t[v4N >> 2] = Z4N;
                                        C3t[w4N + 12 >> 2] = Z4N;
                                        C3t[Z4N + 8 >> 2] = w4N;
                                        C3t[Z4N + 12 >> 2] = E4N;
                                        break;
                                    }
                                    w4N = D4N >>> 8;
                                    do {
                                        if (!w4N)
                                            s4N = 0;
                                        else {
                                            if (D4N >>> 0 > 16777215) {
                                                s4N = 31;
                                                break;
                                            }
                                            p4N = (w4N + 1048320 | 0) >>> 16 & 8;
                                            n4N = w4N << p4N;
                                            q4N = (n4N + 520192 | 0) >>> 16 & 4;
                                            n4N = n4N << q4N;
                                            s4N = (n4N + 245760 | 0) >>> 16 & 2;
                                            s4N = 14 - (q4N | p4N | s4N) + (n4N << s4N >>> 15) | 0;
                                            s4N = D4N >>> (s4N + 7 | 0) & 1 | s4N << 1;
                                        }
                                    } while (0);w4N = 2064 + (s4N << 2) | 0;
                                    C3t[Z4N + 28 >> 2] = s4N;
                                    v4N = Z4N + 16 | 0;
                                    C3t[v4N + 4 >> 2] = 0;
                                    C3t[v4N >> 2] = 0;
                                    v4N = C3t[441] | 0;
                                    E4N = 1 << s4N;
                                    if (!(v4N & E4N)) {
                                        C3t[441] = v4N | E4N;
                                        C3t[w4N >> 2] = Z4N;
                                        C3t[Z4N + 24 >> 2] = w4N;
                                        C3t[Z4N + 12 >> 2] = Z4N;
                                        C3t[Z4N + 8 >> 2] = Z4N;
                                        break;
                                    }
                                    w4N = C3t[w4N >> 2] | 0;
                                    a: do {
                                        if ((C3t[w4N + 4 >> 2] & -8 | 0) != (D4N | 0)) {
                                            s4N = D4N << ((s4N | 0) == 31 ? 0 : 25 - (s4N >>> 1) | 0);
                                            while (1) {
                                                E4N = w4N + 16 + (s4N >>> 31 << 2) | 0;
                                                v4N = C3t[E4N >> 2] | 0;
                                                if (!v4N)
                                                    break;
                                                if ((C3t[v4N + 4 >> 2] & -8 | 0) == (D4N | 0)) {
                                                    w4N = v4N;
                                                    break a;
                                                } else {
                                                    s4N = s4N << 1;
                                                    w4N = v4N;
                                                }
                                            }
                                            C3t[E4N >> 2] = Z4N;
                                            C3t[Z4N + 24 >> 2] = w4N;
                                            C3t[Z4N + 12 >> 2] = Z4N;
                                            C3t[Z4N + 8 >> 2] = Z4N;
                                            break c;
                                        }
                                    } while (0);p4N = w4N + 8 | 0;
                                    n4N = C3t[p4N >> 2] | 0;
                                    C3t[n4N + 12 >> 2] = Z4N;
                                    C3t[p4N >> 2] = Z4N;
                                    C3t[Z4N + 8 >> 2] = n4N;
                                    C3t[Z4N + 12 >> 2] = w4N;
                                    C3t[Z4N + 24 >> 2] = 0;
                                }
                            } while (0);n4N = L4N + 8 | 0;
                            R3t = m4N;
                            return n4N | 0;
                        }
                        w4N = 2208;
                        while (1) {
                            v4N = C3t[w4N >> 2] | 0;
                            if (v4N >>> 0 <= Y4N >>> 0 ? (n4N = v4N + (C3t[w4N + 4 >> 2] | 0) | 0,
                            n4N >>> 0 > Y4N >>> 0) : 0)
                                break;
                            w4N = C3t[w4N + 8 >> 2] | 0;
                        }
                        D4N = n4N + -47 | 0;
                        v4N = D4N + 8 | 0;
                        v4N = D4N + ((v4N & 7 | 0) == 0 ? 0 : 0 - v4N & 7) | 0;
                        D4N = Y4N + 16 | 0;
                        v4N = v4N >>> 0 < D4N >>> 0 ? Y4N : v4N;
                        w4N = v4N + 8 | 0;
                        E4N = J4N + -40 | 0;
                        q4N = u4N + 8 | 0;
                        q4N = (q4N & 7 | 0) == 0 ? 0 : 0 - q4N & 7;
                        p4N = u4N + q4N | 0;
                        q4N = E4N - q4N | 0;
                        C3t[446] = p4N;
                        C3t[443] = q4N;
                        C3t[p4N + 4 >> 2] = q4N | 1;
                        C3t[u4N + E4N + 4 >> 2] = 40;
                        C3t[447] = C3t[562];
                        E4N = v4N + 4 | 0;
                        C3t[E4N >> 2] = 27;
                        C3t[w4N >> 2] = C3t[552];
                        C3t[w4N + 4 >> 2] = C3t[553];
                        C3t[w4N + 8 >> 2] = C3t[554];
                        C3t[w4N + 12 >> 2] = C3t[555];
                        C3t[552] = u4N;
                        C3t[553] = J4N;
                        C3t[555] = 0;
                        C3t[554] = w4N;
                        w4N = v4N + 24 | 0;
                        do {
                            p4N = w4N;
                            w4N = w4N + 4 | 0;
                            C3t[w4N >> 2] = 7;
                        } while ((p4N + 8 | 0) >>> 0 < n4N >>> 0);if ((v4N | 0) != (Y4N | 0)) {
                            u4N = v4N - Y4N | 0;
                            C3t[E4N >> 2] = C3t[E4N >> 2] & -2;
                            C3t[Y4N + 4 >> 2] = u4N | 1;
                            C3t[v4N >> 2] = u4N;
                            w4N = u4N >>> 3;
                            if (u4N >>> 0 < 256) {
                                E4N = 1800 + (w4N << 1 << 2) | 0;
                                v4N = C3t[440] | 0;
                                w4N = 1 << w4N;
                                if (!(v4N & w4N)) {
                                    C3t[440] = v4N | w4N;
                                    w4N = E4N;
                                    v4N = E4N + 8 | 0;
                                } else {
                                    v4N = E4N + 8 | 0;
                                    w4N = C3t[v4N >> 2] | 0;
                                }
                                C3t[v4N >> 2] = Y4N;
                                C3t[w4N + 12 >> 2] = Y4N;
                                C3t[Y4N + 8 >> 2] = w4N;
                                C3t[Y4N + 12 >> 2] = E4N;
                                break;
                            }
                            w4N = u4N >>> 8;
                            if (w4N) {
                                if (u4N >>> 0 > 16777215)
                                    s4N = 31;
                                else {
                                    p4N = (w4N + 1048320 | 0) >>> 16 & 8;
                                    n4N = w4N << p4N;
                                    q4N = (n4N + 520192 | 0) >>> 16 & 4;
                                    n4N = n4N << q4N;
                                    s4N = (n4N + 245760 | 0) >>> 16 & 2;
                                    s4N = 14 - (q4N | p4N | s4N) + (n4N << s4N >>> 15) | 0;
                                    s4N = u4N >>> (s4N + 7 | 0) & 1 | s4N << 1;
                                }
                            } else
                                s4N = 0;
                            E4N = 2064 + (s4N << 2) | 0;
                            C3t[Y4N + 28 >> 2] = s4N;
                            C3t[Y4N + 20 >> 2] = 0;
                            C3t[D4N >> 2] = 0;
                            w4N = C3t[441] | 0;
                            v4N = 1 << s4N;
                            if (!(w4N & v4N)) {
                                C3t[441] = w4N | v4N;
                                C3t[E4N >> 2] = Y4N;
                                C3t[Y4N + 24 >> 2] = E4N;
                                C3t[Y4N + 12 >> 2] = Y4N;
                                C3t[Y4N + 8 >> 2] = Y4N;
                                break;
                            }
                            w4N = C3t[E4N >> 2] | 0;
                            a: do {
                                if ((C3t[w4N + 4 >> 2] & -8 | 0) != (u4N | 0)) {
                                    s4N = u4N << ((s4N | 0) == 31 ? 0 : 25 - (s4N >>> 1) | 0);
                                    while (1) {
                                        E4N = w4N + 16 + (s4N >>> 31 << 2) | 0;
                                        v4N = C3t[E4N >> 2] | 0;
                                        if (!v4N)
                                            break;
                                        if ((C3t[v4N + 4 >> 2] & -8 | 0) == (u4N | 0)) {
                                            w4N = v4N;
                                            break a;
                                        } else {
                                            s4N = s4N << 1;
                                            w4N = v4N;
                                        }
                                    }
                                    C3t[E4N >> 2] = Y4N;
                                    C3t[Y4N + 24 >> 2] = w4N;
                                    C3t[Y4N + 12 >> 2] = Y4N;
                                    C3t[Y4N + 8 >> 2] = Y4N;
                                    break b;
                                }
                            } while (0);p4N = w4N + 8 | 0;
                            n4N = C3t[p4N >> 2] | 0;
                            C3t[n4N + 12 >> 2] = Y4N;
                            C3t[p4N >> 2] = Y4N;
                            C3t[Y4N + 8 >> 2] = n4N;
                            C3t[Y4N + 12 >> 2] = w4N;
                            C3t[Y4N + 24 >> 2] = 0;
                        }
                    } else {
                        n4N = C3t[444] | 0;
                        if ((n4N | 0) == 0 | u4N >>> 0 < n4N >>> 0)
                            C3t[444] = u4N;
                        C3t[552] = u4N;
                        C3t[553] = J4N;
                        C3t[555] = 0;
                        C3t[449] = C3t[558];
                        C3t[448] = -1;
                        C3t[453] = 1800;
                        C3t[452] = 1800;
                        C3t[455] = 1808;
                        C3t[454] = 1808;
                        C3t[457] = 1816;
                        C3t[456] = 1816;
                        C3t[459] = 1824;
                        C3t[458] = 1824;
                        C3t[461] = 1832;
                        C3t[460] = 1832;
                        C3t[463] = 1840;
                        C3t[462] = 1840;
                        C3t[465] = 1848;
                        C3t[464] = 1848;
                        C3t[467] = 1856;
                        C3t[466] = 1856;
                        C3t[469] = 1864;
                        C3t[468] = 1864;
                        C3t[471] = 1872;
                        C3t[470] = 1872;
                        C3t[473] = 1880;
                        C3t[472] = 1880;
                        C3t[475] = 1888;
                        C3t[474] = 1888;
                        C3t[477] = 1896;
                        C3t[476] = 1896;
                        C3t[479] = 1904;
                        C3t[478] = 1904;
                        C3t[481] = 1912;
                        C3t[480] = 1912;
                        C3t[483] = 1920;
                        C3t[482] = 1920;
                        C3t[485] = 1928;
                        C3t[484] = 1928;
                        C3t[487] = 1936;
                        C3t[486] = 1936;
                        C3t[489] = 1944;
                        C3t[488] = 1944;
                        C3t[491] = 1952;
                        C3t[490] = 1952;
                        C3t[493] = 1960;
                        C3t[492] = 1960;
                        C3t[495] = 1968;
                        C3t[494] = 1968;
                        C3t[497] = 1976;
                        C3t[496] = 1976;
                        C3t[499] = 1984;
                        C3t[498] = 1984;
                        C3t[501] = 1992;
                        C3t[500] = 1992;
                        C3t[503] = 2e3;
                        C3t[502] = 2e3;
                        C3t[505] = 2008;
                        C3t[504] = 2008;
                        C3t[507] = 2016;
                        C3t[506] = 2016;
                        C3t[509] = 2024;
                        C3t[508] = 2024;
                        C3t[511] = 2032;
                        C3t[510] = 2032;
                        C3t[513] = 2040;
                        C3t[512] = 2040;
                        C3t[515] = 2048;
                        C3t[514] = 2048;
                        n4N = J4N + -40 | 0;
                        q4N = u4N + 8 | 0;
                        q4N = (q4N & 7 | 0) == 0 ? 0 : 0 - q4N & 7;
                        p4N = u4N + q4N | 0;
                        q4N = n4N - q4N | 0;
                        C3t[446] = p4N;
                        C3t[443] = q4N;
                        C3t[p4N + 4 >> 2] = q4N | 1;
                        C3t[u4N + n4N + 4 >> 2] = 40;
                        C3t[447] = C3t[562];
                    }
                } while (0);w4N = C3t[443] | 0;
                if (w4N >>> 0 > N4N >>> 0) {
                    q4N = w4N - N4N | 0;
                    C3t[443] = q4N;
                    n4N = C3t[446] | 0;
                    p4N = n4N + N4N | 0;
                    C3t[446] = p4N;
                    C3t[p4N + 4 >> 2] = q4N | 1;
                    C3t[n4N + 4 >> 2] = N4N | 3;
                    n4N = n4N + 8 | 0;
                    R3t = m4N;
                    return n4N | 0;
                }
            }
            C3t[(y8t() | 0) >> 2] = 12;
            n4N = 0;
            R3t = m4N;
            return n4N | 0;
        }
        function y5t(e4N) {
            e4N = e4N | 0;
            var M4N = 0
              , I4N = 0
              , h4N = 0
              , R4N = 0
              , U4N = 0
              , B4N = 0
              , P4N = 0
              , C4N = 0;
            if (!e4N)
                return;
            I4N = e4N + -8 | 0;
            R4N = C3t[444] | 0;
            e4N = C3t[e4N + -4 >> 2] | 0;
            M4N = e4N & -8;
            C4N = I4N + M4N | 0;
            do {
                if (!(e4N & 1)) {
                    h4N = C3t[I4N >> 2] | 0;
                    if (!(e4N & 3))
                        return;
                    B4N = I4N + (0 - h4N) | 0;
                    U4N = h4N + M4N | 0;
                    if (B4N >>> 0 < R4N >>> 0)
                        return;
                    if ((C3t[445] | 0) == (B4N | 0)) {
                        e4N = C4N + 4 | 0;
                        M4N = C3t[e4N >> 2] | 0;
                        if ((M4N & 3 | 0) != 3) {
                            P4N = B4N;
                            M4N = U4N;
                            break;
                        }
                        C3t[442] = U4N;
                        C3t[e4N >> 2] = M4N & -2;
                        C3t[B4N + 4 >> 2] = U4N | 1;
                        C3t[B4N + U4N >> 2] = U4N;
                        return;
                    }
                    I4N = h4N >>> 3;
                    if (h4N >>> 0 < 256) {
                        e4N = C3t[B4N + 8 >> 2] | 0;
                        M4N = C3t[B4N + 12 >> 2] | 0;
                        if ((M4N | 0) == (e4N | 0)) {
                            C3t[440] = C3t[440] & ~(1 << I4N);
                            P4N = B4N;
                            M4N = U4N;
                            break;
                        } else {
                            C3t[e4N + 12 >> 2] = M4N;
                            C3t[M4N + 8 >> 2] = e4N;
                            P4N = B4N;
                            M4N = U4N;
                            break;
                        }
                    }
                    R4N = C3t[B4N + 24 >> 2] | 0;
                    e4N = C3t[B4N + 12 >> 2] | 0;
                    do {
                        if ((e4N | 0) == (B4N | 0)) {
                            M4N = B4N + 16 | 0;
                            I4N = M4N + 4 | 0;
                            e4N = C3t[I4N >> 2] | 0;
                            if (!e4N) {
                                e4N = C3t[M4N >> 2] | 0;
                                if (!e4N) {
                                    e4N = 0;
                                    break;
                                }
                            } else
                                M4N = I4N;
                            while (1) {
                                h4N = e4N + 20 | 0;
                                I4N = C3t[h4N >> 2] | 0;
                                if (!I4N) {
                                    h4N = e4N + 16 | 0;
                                    I4N = C3t[h4N >> 2] | 0;
                                    if (!I4N)
                                        break;
                                    else {
                                        e4N = I4N;
                                        M4N = h4N;
                                    }
                                } else {
                                    e4N = I4N;
                                    M4N = h4N;
                                }
                            }
                            C3t[M4N >> 2] = 0;
                        } else {
                            P4N = C3t[B4N + 8 >> 2] | 0;
                            C3t[P4N + 12 >> 2] = e4N;
                            C3t[e4N + 8 >> 2] = P4N;
                        }
                    } while (0);if (R4N) {
                        M4N = C3t[B4N + 28 >> 2] | 0;
                        I4N = 2064 + (M4N << 2) | 0;
                        if ((C3t[I4N >> 2] | 0) == (B4N | 0)) {
                            C3t[I4N >> 2] = e4N;
                            if (!e4N) {
                                C3t[441] = C3t[441] & ~(1 << M4N);
                                P4N = B4N;
                                M4N = U4N;
                                break;
                            }
                        } else {
                            P4N = R4N + 16 | 0;
                            C3t[((C3t[P4N >> 2] | 0) == (B4N | 0) ? P4N : R4N + 20 | 0) >> 2] = e4N;
                            if (!e4N) {
                                P4N = B4N;
                                M4N = U4N;
                                break;
                            }
                        }
                        C3t[e4N + 24 >> 2] = R4N;
                        M4N = B4N + 16 | 0;
                        I4N = C3t[M4N >> 2] | 0;
                        if (I4N | 0) {
                            C3t[e4N + 16 >> 2] = I4N;
                            C3t[I4N + 24 >> 2] = e4N;
                        }
                        M4N = C3t[M4N + 4 >> 2] | 0;
                        if (M4N) {
                            C3t[e4N + 20 >> 2] = M4N;
                            C3t[M4N + 24 >> 2] = e4N;
                            P4N = B4N;
                            M4N = U4N;
                        } else {
                            P4N = B4N;
                            M4N = U4N;
                        }
                    } else {
                        P4N = B4N;
                        M4N = U4N;
                    }
                } else {
                    P4N = I4N;
                    B4N = I4N;
                }
            } while (0);if (B4N >>> 0 >= C4N >>> 0)
                return;
            e4N = C4N + 4 | 0;
            h4N = C3t[e4N >> 2] | 0;
            if (!(h4N & 1))
                return;
            if (!(h4N & 2)) {
                if ((C3t[446] | 0) == (C4N | 0)) {
                    C4N = (C3t[443] | 0) + M4N | 0;
                    C3t[443] = C4N;
                    C3t[446] = P4N;
                    C3t[P4N + 4 >> 2] = C4N | 1;
                    if ((P4N | 0) != (C3t[445] | 0))
                        return;
                    C3t[445] = 0;
                    C3t[442] = 0;
                    return;
                }
                if ((C3t[445] | 0) == (C4N | 0)) {
                    C4N = (C3t[442] | 0) + M4N | 0;
                    C3t[442] = C4N;
                    C3t[445] = B4N;
                    C3t[P4N + 4 >> 2] = C4N | 1;
                    C3t[B4N + C4N >> 2] = C4N;
                    return;
                }
                R4N = (h4N & -8) + M4N | 0;
                I4N = h4N >>> 3;
                do {
                    if (h4N >>> 0 < 256) {
                        M4N = C3t[C4N + 8 >> 2] | 0;
                        e4N = C3t[C4N + 12 >> 2] | 0;
                        if ((e4N | 0) == (M4N | 0)) {
                            C3t[440] = C3t[440] & ~(1 << I4N);
                            break;
                        } else {
                            C3t[M4N + 12 >> 2] = e4N;
                            C3t[e4N + 8 >> 2] = M4N;
                            break;
                        }
                    } else {
                        U4N = C3t[C4N + 24 >> 2] | 0;
                        e4N = C3t[C4N + 12 >> 2] | 0;
                        do {
                            if ((e4N | 0) == (C4N | 0)) {
                                M4N = C4N + 16 | 0;
                                I4N = M4N + 4 | 0;
                                e4N = C3t[I4N >> 2] | 0;
                                if (!e4N) {
                                    e4N = C3t[M4N >> 2] | 0;
                                    if (!e4N) {
                                        I4N = 0;
                                        break;
                                    }
                                } else
                                    M4N = I4N;
                                while (1) {
                                    h4N = e4N + 20 | 0;
                                    I4N = C3t[h4N >> 2] | 0;
                                    if (!I4N) {
                                        h4N = e4N + 16 | 0;
                                        I4N = C3t[h4N >> 2] | 0;
                                        if (!I4N)
                                            break;
                                        else {
                                            e4N = I4N;
                                            M4N = h4N;
                                        }
                                    } else {
                                        e4N = I4N;
                                        M4N = h4N;
                                    }
                                }
                                C3t[M4N >> 2] = 0;
                                I4N = e4N;
                            } else {
                                I4N = C3t[C4N + 8 >> 2] | 0;
                                C3t[I4N + 12 >> 2] = e4N;
                                C3t[e4N + 8 >> 2] = I4N;
                                I4N = e4N;
                            }
                        } while (0);if (U4N | 0) {
                            e4N = C3t[C4N + 28 >> 2] | 0;
                            M4N = 2064 + (e4N << 2) | 0;
                            if ((C3t[M4N >> 2] | 0) == (C4N | 0)) {
                                C3t[M4N >> 2] = I4N;
                                if (!I4N) {
                                    C3t[441] = C3t[441] & ~(1 << e4N);
                                    break;
                                }
                            } else {
                                h4N = U4N + 16 | 0;
                                C3t[((C3t[h4N >> 2] | 0) == (C4N | 0) ? h4N : U4N + 20 | 0) >> 2] = I4N;
                                if (!I4N)
                                    break;
                            }
                            C3t[I4N + 24 >> 2] = U4N;
                            e4N = C4N + 16 | 0;
                            M4N = C3t[e4N >> 2] | 0;
                            if (M4N | 0) {
                                C3t[I4N + 16 >> 2] = M4N;
                                C3t[M4N + 24 >> 2] = I4N;
                            }
                            e4N = C3t[e4N + 4 >> 2] | 0;
                            if (e4N | 0) {
                                C3t[I4N + 20 >> 2] = e4N;
                                C3t[e4N + 24 >> 2] = I4N;
                            }
                        }
                    }
                } while (0);C3t[P4N + 4 >> 2] = R4N | 1;
                C3t[B4N + R4N >> 2] = R4N;
                if ((P4N | 0) == (C3t[445] | 0)) {
                    C3t[442] = R4N;
                    return;
                }
            } else {
                C3t[e4N >> 2] = h4N & -2;
                C3t[P4N + 4 >> 2] = M4N | 1;
                C3t[B4N + M4N >> 2] = M4N;
                R4N = M4N;
            }
            e4N = R4N >>> 3;
            if (R4N >>> 0 < 256) {
                I4N = 1800 + (e4N << 1 << 2) | 0;
                M4N = C3t[440] | 0;
                e4N = 1 << e4N;
                if (!(M4N & e4N)) {
                    C3t[440] = M4N | e4N;
                    e4N = I4N;
                    M4N = I4N + 8 | 0;
                } else {
                    M4N = I4N + 8 | 0;
                    e4N = C3t[M4N >> 2] | 0;
                }
                C3t[M4N >> 2] = P4N;
                C3t[e4N + 12 >> 2] = P4N;
                C3t[P4N + 8 >> 2] = e4N;
                C3t[P4N + 12 >> 2] = I4N;
                return;
            }
            e4N = R4N >>> 8;
            if (e4N) {
                if (R4N >>> 0 > 16777215)
                    h4N = 31;
                else {
                    B4N = (e4N + 1048320 | 0) >>> 16 & 8;
                    C4N = e4N << B4N;
                    U4N = (C4N + 520192 | 0) >>> 16 & 4;
                    C4N = C4N << U4N;
                    h4N = (C4N + 245760 | 0) >>> 16 & 2;
                    h4N = 14 - (U4N | B4N | h4N) + (C4N << h4N >>> 15) | 0;
                    h4N = R4N >>> (h4N + 7 | 0) & 1 | h4N << 1;
                }
            } else
                h4N = 0;
            e4N = 2064 + (h4N << 2) | 0;
            C3t[P4N + 28 >> 2] = h4N;
            C3t[P4N + 20 >> 2] = 0;
            C3t[P4N + 16 >> 2] = 0;
            M4N = C3t[441] | 0;
            I4N = 1 << h4N;
            a: do {
                if (!(M4N & I4N)) {
                    C3t[441] = M4N | I4N;
                    C3t[e4N >> 2] = P4N;
                    C3t[P4N + 24 >> 2] = e4N;
                    C3t[P4N + 12 >> 2] = P4N;
                    C3t[P4N + 8 >> 2] = P4N;
                } else {
                    e4N = C3t[e4N >> 2] | 0;
                    b: do {
                        if ((C3t[e4N + 4 >> 2] & -8 | 0) != (R4N | 0)) {
                            h4N = R4N << ((h4N | 0) == 31 ? 0 : 25 - (h4N >>> 1) | 0);
                            while (1) {
                                I4N = e4N + 16 + (h4N >>> 31 << 2) | 0;
                                M4N = C3t[I4N >> 2] | 0;
                                if (!M4N)
                                    break;
                                if ((C3t[M4N + 4 >> 2] & -8 | 0) == (R4N | 0)) {
                                    e4N = M4N;
                                    break b;
                                } else {
                                    h4N = h4N << 1;
                                    e4N = M4N;
                                }
                            }
                            C3t[I4N >> 2] = P4N;
                            C3t[P4N + 24 >> 2] = e4N;
                            C3t[P4N + 12 >> 2] = P4N;
                            C3t[P4N + 8 >> 2] = P4N;
                            break a;
                        }
                    } while (0);B4N = e4N + 8 | 0;
                    C4N = C3t[B4N >> 2] | 0;
                    C3t[C4N + 12 >> 2] = P4N;
                    C3t[B4N >> 2] = P4N;
                    C3t[P4N + 8 >> 2] = C4N;
                    C3t[P4N + 12 >> 2] = e4N;
                    C3t[P4N + 24 >> 2] = 0;
                }
            } while (0);C4N = (C3t[448] | 0) + -1 | 0;
            C3t[448] = C4N;
            if (C4N | 0)
                return;
            e4N = 2216;
            while (1) {
                e4N = C3t[e4N >> 2] | 0;
                if (!e4N)
                    break;
                else
                    e4N = e4N + 8 | 0;
            }
            C3t[448] = -1;
            return;
        }
        function S5t(K4N) {
            K4N = K4N | 0;
            var x4N = 0
              , l4N = 0;
            x4N = R3t;
            R3t = R3t + 16 | 0;
            if ((R3t | 0) >= (j3t | 0))
                l3t(16);
            l4N = x4N;
            C3t[l4N >> 2] = w5t(C3t[K4N + 60 >> 2] | 0) | 0;
            K4N = Q3t(E8t(6, l4N | 0) | 0) | 0;
            R3t = x4N;
            return K4N | 0;
        }
        function u8t(V4N, X0N, S0N) {
            V4N = V4N | 0;
            X0N = X0N | 0;
            S0N = S0N | 0;
            var Q4N = 0
              , T4N = 0
              , t4N = 0
              , E0N = 0
              , w0N = 0
              , v0N = 0
              , H0N = 0
              , n0N = 0
              , k0N = 0
              , r0N = 0
              , y0N = 0;
            k0N = R3t;
            R3t = R3t + 48 | 0;
            if ((R3t | 0) >= (j3t | 0))
                l3t(48);
            H0N = k0N + 32 | 0;
            t4N = k0N + 16 | 0;
            T4N = k0N;
            w0N = V4N + 28 | 0;
            Q4N = C3t[w0N >> 2] | 0;
            C3t[T4N >> 2] = Q4N;
            v0N = V4N + 20 | 0;
            Q4N = (C3t[v0N >> 2] | 0) - Q4N | 0;
            C3t[T4N + 4 >> 2] = Q4N;
            C3t[T4N + 8 >> 2] = X0N;
            C3t[T4N + 12 >> 2] = S0N;
            Q4N = Q4N + S0N | 0;
            E0N = V4N + 60 | 0;
            C3t[t4N >> 2] = C3t[E0N >> 2];
            C3t[t4N + 4 >> 2] = T4N;
            C3t[t4N + 8 >> 2] = 2;
            t4N = Q3t(r8t(146, t4N | 0) | 0) | 0;
            a: do {
                if ((Q4N | 0) != (t4N | 0)) {
                    X0N = 2;
                    while (1) {
                        if ((t4N | 0) < 0)
                            break;
                        Q4N = Q4N - t4N | 0;
                        y0N = C3t[T4N + 4 >> 2] | 0;
                        r0N = t4N >>> 0 > y0N >>> 0;
                        T4N = r0N ? T4N + 8 | 0 : T4N;
                        X0N = X0N + (r0N << 31 >> 31) | 0;
                        y0N = t4N - (r0N ? y0N : 0) | 0;
                        C3t[T4N >> 2] = (C3t[T4N >> 2] | 0) + y0N;
                        r0N = T4N + 4 | 0;
                        C3t[r0N >> 2] = (C3t[r0N >> 2] | 0) - y0N;
                        C3t[H0N >> 2] = C3t[E0N >> 2];
                        C3t[H0N + 4 >> 2] = T4N;
                        C3t[H0N + 8 >> 2] = X0N;
                        t4N = Q3t(r8t(146, H0N | 0) | 0) | 0;
                        if ((Q4N | 0) == (t4N | 0)) {
                            n0N = 3;
                            break a;
                        }
                    }
                    C3t[V4N + 16 >> 2] = 0;
                    C3t[w0N >> 2] = 0;
                    C3t[v0N >> 2] = 0;
                    C3t[V4N >> 2] = C3t[V4N >> 2] | 32;
                    if ((X0N | 0) == 2)
                        S0N = 0;
                    else
                        S0N = S0N - (C3t[T4N + 4 >> 2] | 0) | 0;
                } else
                    n0N = 3;
            } while (0);if ((n0N | 0) == 3) {
                y0N = C3t[V4N + 44 >> 2] | 0;
                C3t[V4N + 16 >> 2] = y0N + (C3t[V4N + 48 >> 2] | 0);
                C3t[w0N >> 2] = y0N;
                C3t[v0N >> 2] = y0N;
            }
            R3t = k0N;
            return S0N | 0;
        }
        function r5t(u0N, Z0N, A0N) {
            u0N = u0N | 0;
            Z0N = Z0N | 0;
            A0N = A0N | 0;
            var Y0N = 0
              , b0N = 0
              , s0N = 0;
            b0N = R3t;
            R3t = R3t + 32 | 0;
            if ((R3t | 0) >= (j3t | 0))
                l3t(32);
            s0N = b0N;
            Y0N = b0N + 20 | 0;
            C3t[s0N >> 2] = C3t[u0N + 60 >> 2];
            C3t[s0N + 4 >> 2] = 0;
            C3t[s0N + 8 >> 2] = Z0N;
            C3t[s0N + 12 >> 2] = Y0N;
            C3t[s0N + 16 >> 2] = A0N;
            if ((Q3t(w8t(140, s0N | 0) | 0) | 0) < 0) {
                C3t[Y0N >> 2] = -1;
                u0N = -1;
            } else
                u0N = C3t[Y0N >> 2] | 0;
            R3t = b0N;
            return u0N | 0;
        }
        function Q3t(J0N) {
            J0N = J0N | 0;
            if (J0N >>> 0 > 4294963200) {
                C3t[(y8t() | 0) >> 2] = 0 - J0N;
                J0N = -1;
            }
            return J0N | 0;
        }
        function y8t() {
            return 2256;
        }
        function w5t(D0N) {
            D0N = D0N | 0;
            return D0N | 0;
        }
        function v5t(c0N, L0N, p0N) {
            c0N = c0N | 0;
            L0N = L0N | 0;
            p0N = p0N | 0;
            var N0N = 0
              , q0N = 0;
            q0N = R3t;
            R3t = R3t + 32 | 0;
            if ((R3t | 0) >= (j3t | 0))
                l3t(32);
            N0N = q0N;
            C3t[c0N + 36 >> 2] = 3;
            if ((C3t[c0N >> 2] & 64 | 0) == 0 ? (C3t[N0N >> 2] = C3t[c0N + 60 >> 2],
            C3t[N0N + 4 >> 2] = 21523,
            C3t[N0N + 8 >> 2] = q0N + 16,
            v8t(54, N0N | 0) | 0) : 0)
                B3t[c0N + 75 >> 0] = -1;
            N0N = u8t(c0N, L0N, p0N) | 0;
            R3t = q0N;
            return N0N | 0;
        }
        function E5t() {
            b8t(2260);
            return 2268;
        }
        function n5t() {
            n8t(2260);
            return;
        }
        function Z8t(g0N) {
            g0N = g0N | 0;
            var o0N = 0;
            do {
                if (g0N) {
                    if ((C3t[g0N + 76 >> 2] | 0) <= -1) {
                        o0N = X8t(g0N) | 0;
                        break;
                    }
                    o0N = X8t(g0N) | 0;
                } else {
                    if (!(C3t[179] | 0))
                        o0N = 0;
                    else
                        o0N = Z8t(C3t[179] | 0) | 0;
                    g0N = C3t[(E5t() | 0) >> 2] | 0;
                    if (g0N)
                        do {
                            if ((C3t[g0N + 20 >> 2] | 0) >>> 0 > (C3t[g0N + 28 >> 2] | 0) >>> 0)
                                o0N = X8t(g0N) | 0 | o0N;
                            g0N = C3t[g0N + 56 >> 2] | 0;
                        } while ((g0N | 0) != 0);n5t();
                }
            } while (0);return o0N | 0;
        }
        function X8t(m0N) {
            m0N = m0N | 0;
            var W0N = 0
              , z0N = 0
              , G0N = 0
              , i0N = 0
              , a0N = 0
              , d0N = 0;
            W0N = m0N + 20 | 0;
            d0N = m0N + 28 | 0;
            if ((C3t[W0N >> 2] | 0) >>> 0 > (C3t[d0N >> 2] | 0) >>> 0 ? (V3t[C3t[m0N + 36 >> 2] & 3](m0N, 0, 0) | 0,
            (C3t[W0N >> 2] | 0) == 0) : 0)
                m0N = -1;
            else {
                z0N = m0N + 4 | 0;
                G0N = C3t[z0N >> 2] | 0;
                i0N = m0N + 8 | 0;
                a0N = C3t[i0N >> 2] | 0;
                if (G0N >>> 0 < a0N >>> 0)
                    V3t[C3t[m0N + 40 >> 2] & 3](m0N, G0N - a0N | 0, 1) | 0;
                C3t[m0N + 16 >> 2] = 0;
                C3t[d0N >> 2] = 0;
                C3t[W0N >> 2] = 0;
                C3t[i0N >> 2] = 0;
                C3t[z0N >> 2] = 0;
                m0N = 0;
            }
            return m0N | 0;
        }
        function K3t(e0N) {
            e0N = e0N | 0;
            return b5t(e0N) | 0;
        }
        function b5t(M0N) {
            M0N = M0N | 0;
            return D8t(M0N | 0) | 0;
        }
        function Z5t() {}
        function D8t(I0N) {
            I0N = I0N | 0;
            return (I0N & 255) << 24 | (I0N >> 8 & 255) << 16 | (I0N >> 16 & 255) << 8 | I0N >>> 24 | 0;
        }
        function N8t(P0N, f0N, h0N) {
            P0N = P0N | 0;
            f0N = f0N | 0;
            h0N = h0N | 0;
            var R0N = 0
              , C0N = 0
              , B0N = 0;
            if ((h0N | 0) >= 8192)
                return s8t(P0N | 0, f0N | 0, h0N | 0) | 0;
            B0N = P0N | 0;
            C0N = P0N + h0N | 0;
            if ((P0N & 3) == (f0N & 3)) {
                while (P0N & 3) {
                    if (!h0N)
                        return B0N | 0;
                    B3t[P0N >> 0] = B3t[f0N >> 0] | 0;
                    P0N = P0N + 1 | 0;
                    f0N = f0N + 1 | 0;
                    h0N = h0N - 1 | 0;
                }
                h0N = C0N & -4 | 0;
                R0N = h0N - 64 | 0;
                while ((P0N | 0) <= (R0N | 0)) {
                    C3t[P0N >> 2] = C3t[f0N >> 2];
                    C3t[P0N + 4 >> 2] = C3t[f0N + 4 >> 2];
                    C3t[P0N + 8 >> 2] = C3t[f0N + 8 >> 2];
                    C3t[P0N + 12 >> 2] = C3t[f0N + 12 >> 2];
                    C3t[P0N + 16 >> 2] = C3t[f0N + 16 >> 2];
                    C3t[P0N + 20 >> 2] = C3t[f0N + 20 >> 2];
                    C3t[P0N + 24 >> 2] = C3t[f0N + 24 >> 2];
                    C3t[P0N + 28 >> 2] = C3t[f0N + 28 >> 2];
                    C3t[P0N + 32 >> 2] = C3t[f0N + 32 >> 2];
                    C3t[P0N + 36 >> 2] = C3t[f0N + 36 >> 2];
                    C3t[P0N + 40 >> 2] = C3t[f0N + 40 >> 2];
                    C3t[P0N + 44 >> 2] = C3t[f0N + 44 >> 2];
                    C3t[P0N + 48 >> 2] = C3t[f0N + 48 >> 2];
                    C3t[P0N + 52 >> 2] = C3t[f0N + 52 >> 2];
                    C3t[P0N + 56 >> 2] = C3t[f0N + 56 >> 2];
                    C3t[P0N + 60 >> 2] = C3t[f0N + 60 >> 2];
                    P0N = P0N + 64 | 0;
                    f0N = f0N + 64 | 0;
                }
                while ((P0N | 0) < (h0N | 0)) {
                    C3t[P0N >> 2] = C3t[f0N >> 2];
                    P0N = P0N + 4 | 0;
                    f0N = f0N + 4 | 0;
                }
            } else {
                h0N = C0N - 4 | 0;
                while ((P0N | 0) < (h0N | 0)) {
                    B3t[P0N >> 0] = B3t[f0N >> 0] | 0;
                    B3t[P0N + 1 >> 0] = B3t[f0N + 1 >> 0] | 0;
                    B3t[P0N + 2 >> 0] = B3t[f0N + 2 >> 0] | 0;
                    B3t[P0N + 3 >> 0] = B3t[f0N + 3 >> 0] | 0;
                    P0N = P0N + 4 | 0;
                    f0N = f0N + 4 | 0;
                }
            }
            while ((P0N | 0) < (C0N | 0)) {
                B3t[P0N >> 0] = B3t[f0N >> 0] | 0;
                P0N = P0N + 1 | 0;
                f0N = f0N + 1 | 0;
            }
            return B0N | 0;
        }
        function c8t(U0N, K0N, x0N) {
            U0N = U0N | 0;
            K0N = K0N | 0;
            x0N = x0N | 0;
            var j0N = 0;
            if ((K0N | 0) < (U0N | 0) & (U0N | 0) < (K0N + x0N | 0)) {
                j0N = U0N;
                K0N = K0N + x0N | 0;
                U0N = U0N + x0N | 0;
                while ((x0N | 0) > 0) {
                    U0N = U0N - 1 | 0;
                    K0N = K0N - 1 | 0;
                    x0N = x0N - 1 | 0;
                    B3t[U0N >> 0] = B3t[K0N >> 0] | 0;
                }
                U0N = j0N;
            } else
                N8t(U0N, K0N, x0N) | 0;
            return U0N | 0;
        }
        function N5t(l0N, T0N, t0N) {
            l0N = l0N | 0;
            T0N = T0N | 0;
            t0N = t0N | 0;
            var Q0N = 0
              , V0N = 0
              , O0N = 0
              , F0N = 0;
            O0N = l0N + t0N | 0;
            T0N = T0N & 255;
            if ((t0N | 0) >= 67) {
                while (l0N & 3) {
                    B3t[l0N >> 0] = T0N;
                    l0N = l0N + 1 | 0;
                }
                Q0N = O0N & -4 | 0;
                V0N = Q0N - 64 | 0;
                F0N = T0N | T0N << 8 | T0N << 16 | T0N << 24;
                while ((l0N | 0) <= (V0N | 0)) {
                    C3t[l0N >> 2] = F0N;
                    C3t[l0N + 4 >> 2] = F0N;
                    C3t[l0N + 8 >> 2] = F0N;
                    C3t[l0N + 12 >> 2] = F0N;
                    C3t[l0N + 16 >> 2] = F0N;
                    C3t[l0N + 20 >> 2] = F0N;
                    C3t[l0N + 24 >> 2] = F0N;
                    C3t[l0N + 28 >> 2] = F0N;
                    C3t[l0N + 32 >> 2] = F0N;
                    C3t[l0N + 36 >> 2] = F0N;
                    C3t[l0N + 40 >> 2] = F0N;
                    C3t[l0N + 44 >> 2] = F0N;
                    C3t[l0N + 48 >> 2] = F0N;
                    C3t[l0N + 52 >> 2] = F0N;
                    C3t[l0N + 56 >> 2] = F0N;
                    C3t[l0N + 60 >> 2] = F0N;
                    l0N = l0N + 64 | 0;
                }
                while ((l0N | 0) < (Q0N | 0)) {
                    C3t[l0N >> 2] = F0N;
                    l0N = l0N + 4 | 0;
                }
            }
            while ((l0N | 0) < (O0N | 0)) {
                B3t[l0N >> 0] = T0N;
                l0N = l0N + 1 | 0;
            }
            return O0N - t0N | 0;
        }
        function T3t(X2N) {
            X2N = X2N | 0;
            var y2N = 0
              , S2N = 0;
            S2N = C3t[O3t >> 2] | 0;
            y2N = S2N + X2N | 0;
            if ((X2N | 0) > 0 & (y2N | 0) < (S2N | 0) | (y2N | 0) < 0) {
                A8t() | 0;
                H8t(12);
                return -1;
            }
            C3t[O3t >> 2] = y2N;
            if ((y2N | 0) > (J8t() | 0) ? (q8t() | 0) == 0 : 0) {
                C3t[O3t >> 2] = S2N;
                H8t(12);
                return -1;
            }
            return S2N | 0;
        }
        function q5t(r2N, H2N) {
            r2N = r2N | 0;
            H2N = H2N | 0;
            return L8t[r2N & 1](H2N | 0) | 0;
        }
        function L5t(k2N, w2N, v2N, E2N) {
            k2N = k2N | 0;
            w2N = w2N | 0;
            v2N = v2N | 0;
            E2N = E2N | 0;
            return V3t[k2N & 3](w2N | 0, v2N | 0, E2N | 0) | 0;
        }
        function p5t(n2N) {
            n2N = n2N | 0;
            k8t(0);
            return 0;
        }
        function g5t(s2N, u2N, Y2N) {
            s2N = s2N | 0;
            u2N = u2N | 0;
            Y2N = Y2N | 0;
            Y8t(1);
            return 0;
        }
        var L8t = [p5t, S5t];
        var V3t = [g5t, v5t, r5t, u8t];
        return {
            _Encrypt: Q8t,
            _Process: O8t,
            ___errno_location: y8t,
            _fflush: Z8t,
            _free: y5t,
            _llvm_bswap_i32: D8t,
            _malloc: V8t,
            _memcpy: N8t,
            _memmove: c8t,
            _memset: N5t,
            _sbrk: T3t,
            dynCall_ii: q5t,
            dynCall_iiii: L5t,
            establishStackSpace: l8t,
            getTempRet0: t8t,
            runPostSets: Z5t,
            setTempRet0: T8t,
            setThrew: F8t,
            stackAlloc: K8t,
            stackRestore: j8t,
            stackSave: x8t
        };
    }(K0t.asmGlobalArg, K0t.asmLibraryArg, Q0t)
      , y2t = l0t._Encrypt;
    l0t._Encrypt = function() {
        return j0t(t0t, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        j0t(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        y2t.apply(null, arguments);
    }
    ;
    var S2t = l0t._Process;
    l0t._Process = function() {
        return j0t(t0t, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        j0t(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        S2t.apply(null, arguments);
    }
    ;
    var X2t = l0t.___errno_location;
    l0t.___errno_location = function() {
        return j0t(t0t, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        j0t(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        X2t.apply(null, arguments);
    }
    ;
    var r2t = l0t._fflush;
    l0t._fflush = function() {
        return j0t(t0t, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        j0t(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        r2t.apply(null, arguments);
    }
    ;
    var H2t = l0t._free;
    l0t._free = function() {
        return j0t(t0t, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        j0t(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        H2t.apply(null, arguments);
    }
    ;
    var k2t = l0t._llvm_bswap_i32;
    l0t._llvm_bswap_i32 = function() {
        return j0t(t0t, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        j0t(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        k2t.apply(null, arguments);
    }
    ;
    var w2t = l0t._malloc;
    l0t._malloc = function() {
        return j0t(t0t, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        j0t(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        w2t.apply(null, arguments);
    }
    ;
    var v2t = l0t._memmove;
    l0t._memmove = function() {
        return j0t(t0t, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        j0t(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        v2t.apply(null, arguments);
    }
    ;
    var E2t = l0t._sbrk;
    l0t._sbrk = function() {
        return j0t(t0t, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        j0t(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        E2t.apply(null, arguments);
    }
    ;
    var n2t = l0t.establishStackSpace;
    l0t.establishStackSpace = function() {
        return j0t(t0t, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        j0t(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        n2t.apply(null, arguments);
    }
    ;
    var s2t = l0t.getTempRet0;
    l0t.getTempRet0 = function() {
        return j0t(t0t, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        j0t(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        s2t.apply(null, arguments);
    }
    ;
    var u2t = l0t.setTempRet0;
    l0t.setTempRet0 = function() {
        return j0t(t0t, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        j0t(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        u2t.apply(null, arguments);
    }
    ;
    var Y2t = l0t.setThrew;
    l0t.setThrew = function() {
        return j0t(t0t, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        j0t(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        Y2t.apply(null, arguments);
    }
    ;
    var b2t = l0t.stackAlloc;
    l0t.stackAlloc = function() {
        return j0t(t0t, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        j0t(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        b2t.apply(null, arguments);
    }
    ;
    var Z2t = l0t.stackRestore;
    l0t.stackRestore = function() {
        return j0t(t0t, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        j0t(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        Z2t.apply(null, arguments);
    }
    ;
    var A2t = l0t.stackSave;
    l0t.stackSave = function() {
        return j0t(t0t, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"),
        j0t(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"),
        A2t.apply(null, arguments);
    }
    ;
    K0t._Encrypt = l0t._Encrypt,
    K0t._Process = l0t._Process,
    K0t.___errno_location = l0t.___errno_location,
    K0t._fflush = l0t._fflush,
    K0t._free = l0t._free,
    K0t._llvm_bswap_i32 = l0t._llvm_bswap_i32,
    K0t._malloc = l0t._malloc,
    K0t._memcpy = l0t._memcpy,
    K0t._memmove = l0t._memmove,
    K0t._memset = l0t._memset,
    K0t._sbrk = l0t._sbrk,
    K0t.establishStackSpace = l0t.establishStackSpace,
    K0t.getTempRet0 = l0t.getTempRet0,
    K0t.runPostSets = l0t.runPostSets,
    K0t.setTempRet0 = l0t.setTempRet0,
    K0t.setThrew = l0t.setThrew;
    var z6t, a6t, g6t = K0t.stackAlloc = l0t.stackAlloc, Z6t = K0t.stackRestore = l0t.stackRestore, u6t = K0t.stackSave = l0t.stackSave;
    K0t.dynCall_ii = l0t.dynCall_ii,
    K0t.dynCall_iiii = l0t.dynCall_iiii;
    if (K0t.asm = l0t,
    K0t.intArrayFromString || (K0t.intArrayFromString = function() {
        x0t("'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.intArrayToString || (K0t.intArrayToString = function() {
        x0t("'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.ccall = function(L2N, N2N, p2N, J2N, g2N) {
        var q2N = function(m2N) {
            var o2N = K0t["_" + m2N];
            return j0t(o2N, "Cannot call unknown function " + m2N + ", make sure it is exported"),
            o2N;
        }(L2N)
          , D2N = []
          , Z2N = 0;
        if (j0t("array" !== N2N, 'Return type should not be "array".'),
        J2N)
            for (var b2N = 0; b2N < J2N.length; b2N++) {
                var c2N = N2t[p2N[b2N]];
                c2N ? (0 === Z2N && (Z2N = u6t()),
                D2N[b2N] = c2N(J2N[b2N])) : D2N[b2N] = J2N[b2N];
            }
        var A2N = q2N.apply(null, D2N);
        return A2N = function(W2N) {
            return "string" === N2N ? J2t(W2N) : "boolean" === N2N ? Boolean(W2N) : W2N;
        }(A2N),
        0 !== Z2N && Z6t(Z2N),
        A2N;
    }
    ,
    K0t.cwrap || (K0t.cwrap = function() {
        x0t("'cwrap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.setValue || (K0t.setValue = function() {
        x0t("'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.getValue || (K0t.getValue = function() {
        x0t("'getValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.allocate || (K0t.allocate = function() {
        x0t("'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.getMemory || (K0t.getMemory = function() {
        x0t("'getMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }
    ),
    K0t.Pointer_stringify || (K0t.Pointer_stringify = function() {
        x0t("'Pointer_stringify' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.AsciiToString || (K0t.AsciiToString = function() {
        x0t("'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.stringToAscii || (K0t.stringToAscii = function() {
        x0t("'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.UTF8ArrayToString || (K0t.UTF8ArrayToString = function() {
        x0t("'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.UTF8ToString || (K0t.UTF8ToString = function() {
        x0t("'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.stringToUTF8Array || (K0t.stringToUTF8Array = function() {
        x0t("'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.stringToUTF8 || (K0t.stringToUTF8 = function() {
        x0t("'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.lengthBytesUTF8 || (K0t.lengthBytesUTF8 = function() {
        x0t("'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.UTF16ToString || (K0t.UTF16ToString = function() {
        x0t("'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.stringToUTF16 || (K0t.stringToUTF16 = function() {
        x0t("'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.lengthBytesUTF16 || (K0t.lengthBytesUTF16 = function() {
        x0t("'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.UTF32ToString || (K0t.UTF32ToString = function() {
        x0t("'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.stringToUTF32 || (K0t.stringToUTF32 = function() {
        x0t("'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.lengthBytesUTF32 || (K0t.lengthBytesUTF32 = function() {
        x0t("'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.allocateUTF8 || (K0t.allocateUTF8 = function() {
        x0t("'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.stackTrace || (K0t.stackTrace = function() {
        x0t("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.addOnPreRun || (K0t.addOnPreRun = function() {
        x0t("'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.addOnInit || (K0t.addOnInit = function() {
        x0t("'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.addOnPreMain || (K0t.addOnPreMain = function() {
        x0t("'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.addOnExit || (K0t.addOnExit = function() {
        x0t("'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.addOnPostRun || (K0t.addOnPostRun = function() {
        x0t("'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.writeStringToMemory || (K0t.writeStringToMemory = function() {
        x0t("'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.writeArrayToMemory || (K0t.writeArrayToMemory = function() {
        x0t("'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.writeAsciiToMemory || (K0t.writeAsciiToMemory = function() {
        x0t("'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.addRunDependency || (K0t.addRunDependency = function() {
        x0t("'addRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }
    ),
    K0t.removeRunDependency || (K0t.removeRunDependency = function() {
        x0t("'removeRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }
    ),
    K0t.ENV || (K0t.ENV = function() {
        x0t("'ENV' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.FS || (K0t.FS = function() {
        x0t("'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.FS_createFolder || (K0t.FS_createFolder = function() {
        x0t("'FS_createFolder' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }
    ),
    K0t.FS_createPath || (K0t.FS_createPath = function() {
        x0t("'FS_createPath' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }
    ),
    K0t.FS_createDataFile || (K0t.FS_createDataFile = function() {
        x0t("'FS_createDataFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }
    ),
    K0t.FS_createPreloadedFile || (K0t.FS_createPreloadedFile = function() {
        x0t("'FS_createPreloadedFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }
    ),
    K0t.FS_createLazyFile || (K0t.FS_createLazyFile = function() {
        x0t("'FS_createLazyFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }
    ),
    K0t.FS_createLink || (K0t.FS_createLink = function() {
        x0t("'FS_createLink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }
    ),
    K0t.FS_createDevice || (K0t.FS_createDevice = function() {
        x0t("'FS_createDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }
    ),
    K0t.FS_unlink || (K0t.FS_unlink = function() {
        x0t("'FS_unlink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }
    ),
    K0t.GL || (K0t.GL = function() {
        x0t("'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.staticAlloc || (K0t.staticAlloc = function() {
        x0t("'staticAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.dynamicAlloc || (K0t.dynamicAlloc = function() {
        x0t("'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.warnOnce || (K0t.warnOnce = function() {
        x0t("'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.loadDynamicLibrary || (K0t.loadDynamicLibrary = function() {
        x0t("'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.loadWebAssemblyModule || (K0t.loadWebAssemblyModule = function() {
        x0t("'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.getLEB || (K0t.getLEB = function() {
        x0t("'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.getFunctionTables || (K0t.getFunctionTables = function() {
        x0t("'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.alignFunctionTables || (K0t.alignFunctionTables = function() {
        x0t("'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.registerFunctions || (K0t.registerFunctions = function() {
        x0t("'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.addFunction || (K0t.addFunction = function() {
        x0t("'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.removeFunction || (K0t.removeFunction = function() {
        x0t("'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.getFuncWrapper || (K0t.getFuncWrapper = function() {
        x0t("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.prettyPrint || (K0t.prettyPrint = function() {
        x0t("'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.makeBigInt || (K0t.makeBigInt = function() {
        x0t("'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.dynCall || (K0t.dynCall = function() {
        x0t("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.getCompilerSetting || (K0t.getCompilerSetting = function() {
        x0t("'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.stackSave || (K0t.stackSave = function() {
        x0t("'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.stackRestore || (K0t.stackRestore = function() {
        x0t("'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.stackAlloc || (K0t.stackAlloc = function() {
        x0t("'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.establishStackSpace || (K0t.establishStackSpace = function() {
        x0t("'establishStackSpace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.print || (K0t.print = function() {
        x0t("'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.printErr || (K0t.printErr = function() {
        x0t("'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.intArrayFromBase64 || (K0t.intArrayFromBase64 = function() {
        x0t("'intArrayFromBase64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.tryParseAsDataURI || (K0t.tryParseAsDataURI = function() {
        x0t("'tryParseAsDataURI' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }
    ),
    K0t.ALLOC_NORMAL || Object.defineProperty(K0t, "ALLOC_NORMAL", {
        get: function() {
            x0t("'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
        }
    }),
    K0t.ALLOC_STACK || Object.defineProperty(K0t, "ALLOC_STACK", {
        get: function() {
            x0t("'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
        }
    }),
    K0t.ALLOC_STATIC || Object.defineProperty(K0t, "ALLOC_STATIC", {
        get: function() {
            x0t("'ALLOC_STATIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
        }
    }),
    K0t.ALLOC_DYNAMIC || Object.defineProperty(K0t, "ALLOC_DYNAMIC", {
        get: function() {
            x0t("'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
        }
    }),
    K0t.ALLOC_NONE || Object.defineProperty(K0t, "ALLOC_NONE", {
        get: function() {
            x0t("'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
        }
    }),
    S6t)
        if (g2t(S6t) || (a6t = S6t,
        S6t = K0t.locateFile ? K0t.locateFile(a6t, r6t) : r6t + a6t),
        b6t || f6t) {
            var L2t = K0t.readBinary(S6t);
            V0t.set(L2t, 8);
        } else {
            var x6t = function() {
                K0t.readAsync(S6t, L6t, function() {
                    throw "could not load memory initializer " + S6t;
                });
            };
            z6t = "memory initializer",
            w6t++,
            K0t.monitorRunDependencies && K0t.monitorRunDependencies(w6t),
            z6t ? (j0t(!N6t[z6t]),
            N6t[z6t] = 1,
            null === k6t && "undefined" != typeof setInterval && (k6t = setInterval(function() {
                if (G6t)
                    return clearInterval(k6t),
                    void (k6t = null);
                var z2N = !1;
                for (var G2N in N6t)
                    z2N || (z2N = !0,
                    O0t("still waiting on run dependencies:")),
                    O0t("dependency: " + G2N);
                z2N && O0t("(end of list)");
            }, 1e4))) : O0t("warning: run dependency added without ID");
            var L6t = function(i2N) {
                i2N.byteLength && (i2N = new Uint8Array(i2N));
                for (var a2N = 0; a2N < i2N.length; a2N++)
                    j0t(0 === V0t[8 + a2N], "area for memory initializer should not have been touched before it's loaded");
                V0t.set(i2N, 8),
                K0t.memoryInitializerRequest && delete K0t.memoryInitializerRequest.response,
                function(d2N) {
                    if (w6t--,
                    K0t.monitorRunDependencies && K0t.monitorRunDependencies(w6t),
                    d2N ? (j0t(N6t[d2N]),
                    delete N6t[d2N]) : O0t("warning: run dependency removed without ID"),
                    0 == w6t && (null !== k6t && (clearInterval(k6t),
                    k6t = null),
                    D6t)) {
                        var e2N = D6t;
                        D6t = null,
                        e2N();
                    }
                }("memory initializer");
            }
              , l6t = v6t(S6t);
            if (l6t)
                L6t(l6t.buffer);
            else if (K0t.memoryInitializerRequest) {
                var F6t = function() {
                    var M2N = K0t.memoryInitializerRequest
                      , I2N = M2N.response;
                    if (200 !== M2N.status && 0 !== M2N.status) {
                        var P2N = v6t(K0t.memoryInitializerRequestURL);
                        if (!P2N)
                            return console.warn("a problem seems to have happened with Module.memoryInitializerRequest, status: " + M2N.status + ", retrying " + S6t),
                            void x6t();
                        I2N = P2N.buffer;
                    }
                    L6t(I2N);
                };
                K0t.memoryInitializerRequest.response ? setTimeout(F6t, 0) : K0t.memoryInitializerRequest.addEventListener("load", F6t);
            } else
                x6t();
        }
    function q6t(f2N) {
        this.name = "ExitStatus",
        this.message = "Program terminated with exit(" + f2N + ")",
        this.status = f2N;
    }
    function R6t(h2N) {
        function C2N() {
            K0t.calledRun || (K0t.calledRun = !0,
            G6t || (o6t(),
            t0t || (t0t = !0,
            W6t(h6t)),
            o6t(),
            W6t(p2t),
            K0t.onRuntimeInitialized && K0t.onRuntimeInitialized(),
            j0t(!K0t._main, 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]'),
            function() {
                if (o6t(),
                K0t.postRun)
                    for ("function" == typeof K0t.postRun && (K0t.postRun = [K0t.postRun]); K0t.postRun.length; )
                        B2N = K0t.postRun.shift(),
                        I6t.unshift(B2N);
                var B2N;
                W6t(I6t);
            }()));
        }
        h2N = h2N || K0t.arguments,
        w6t > 0 || (j0t(0 == (3 & X6t)),
        Y6t[(X6t >> 2) - 1] = 34821223,
        Y6t[(X6t >> 2) - 2] = 2310721022,
        function() {
            if (K0t.preRun)
                for ("function" == typeof K0t.preRun && (K0t.preRun = [K0t.preRun]); K0t.preRun.length; )
                    R2N = K0t.preRun.shift(),
                    C6t.unshift(R2N);
            var R2N;
            W6t(C6t);
        }(),
        w6t > 0 || K0t.calledRun || (K0t.setStatus ? (K0t.setStatus("Running..."),
        setTimeout(function() {
            setTimeout(function() {
                K0t.setStatus("");
            }, 1),
            C2N();
        }, 1)) : C2N(),
        o6t()));
    }
    q6t.prototype = new Error(),
    q6t.prototype.constructor = q6t,
    D6t = function U2N() {
        K0t.calledRun || R6t(),
        K0t.calledRun || (D6t = U2N);
    }
    ,
    K0t.run = R6t;
    var U6t = [];
    function x0t(K2N) {
        K0t.onAbort && K0t.onAbort(K2N),
        void 0 !== K2N ? (p6t(K2N),
        O0t(K2N),
        K2N = JSON.stringify(K2N)) : K2N = "",
        G6t = !0;
        var x2N = "abort(" + K2N + ") at " + z2t();
        throw U6t && U6t.forEach(function(j2N) {
            x2N = j2N(x2N, K2N);
        }),
        x2N;
    }
    if (K0t.abort = x0t,
    K0t.preInit)
        for ("function" == typeof K0t.preInit && (K0t.preInit = [K0t.preInit]); K0t.preInit.length > 0; )
            K0t.preInit.pop()();
    return K0t.noExitRuntime = !0,
    R6t(),
    K0t;
}();

module.exports = J4T;