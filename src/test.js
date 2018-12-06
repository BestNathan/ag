const {DecryptUser} = require('../lib/asm')
const a = '00:04:9b:10:00:00:04:10:00:00:03:b5:a3:4f:4a:cb:18:f6:f7:7a:a9:47:4c:eb:7b:a5:90:28:fb:15:10:a1:35:98:ad:14:f6:29:14:de:3d:e6:d2:1a:9f:71:73:f9:2f:c1:83:49:aa:74:40:f8:13:be:8b:37:d5:7a:28:a1:77:9c:9c:15:81:2c:19:a0:42:9d:a0:6a:89:52:66:ae:25:cb:cb:4b:9c:72:30:fa:19:c7:f3:4b:a0:0d:38:84:66:c9:95:1c:c7:2b:2a:a3:37:9a:af:16:f4:2b:16:dc:3f:e4:d0:18:91:7f:7a:fa:2d:c3:81:4b:a8:76:42:fa:11:bc:89:35:d7:7b:4e:c7:11:fd:fd:76:e2:4f:7a:c3:21:fe:c3:09:ea:31:05:ce:2c:c2:c1:41:97:79:3b:f1:12:cc:f8:40:ab:06:33:8f:6d:c1:f6:7f:a4:4f:4c:c5:51:fc:c9:70:92:4d:70:ba:59:82:b6:7d:9d:73:7e:f0:26:c8:8a:40:a3:7d:49:f1:1a:b7:82:3e:dc:70:41:c8:12:fe:ff:76:e2:4f:7a:c3:21:fe:c3:09:ea:31:05:ce:28:c6:c5:4e:98:74:36:fc:1f:c1:f5:4d:a6:0b:3e:82:60:cc:ff:76:a1:4e:4e:c7:53:fe:cb:72:90:4f:72:b8:5b:80:b4:7f:9b:75:72:f3:24:ca:88:42:a1:7f:4b:f3:18:b5:80:3c:de:72:4f:c6:10:f8:fb:72:e6:4b:7e:c7:25:fa:c7:0d:ee:35:01:ca:20:ce:c2:48:9d:73:31:fb:18:c6:f2:4a:a1:0c:39:85:67:cb:8f:06:d5:39:3a:b3:27:8a:bf:06:e4:3b:06:cc:2f:f4:c0:0b:9a:74:74:fa:2c:c2:80:4a:a9:77:43:fb:10:bd:88:34:d6:7a:3c:b5:66:89:8a:03:97:3a:0f:b6:54:8b:b6:7c:9f:44:70:bb:2c:c2:c1:4d:9b:75:37:fd:1e:c0:f4:4c:a7:0a:3f:83:61:cd:8d:04:d0:38:39:b0:24:89:bc:05:e7:38:05:cf:2c:f7:c3:08:9d:73:71:fb:2d:c3:81:4b:a8:76:42:fa:11:bc:89:35:d7:7b:39:b0:63:84:85:0c:98:35:00:b9:5b:84:b9:73:90:4b:7f:b4:2f:c1:cd:46:93:7d:3f:f5:16:c8:fc:44:af:02:37:8b:69:c5:89:00:da:32:33:ba:2e:83:b6:0f:ed:32:0f:c5:26:fd:c9:02:9b:75:72:ff:2a:c4:86:4c:af:71:45:fd:16:bb:8e:32:d0:7c:32:bb:6c:85:85:0c:98:35:00:b9:5b:84:b9:73:90:4b:7f:b4:2b:c5:c6:47:92:7c:3e:f4:17:c9:fd:45:ae:03:36:8a:68:c4:8c:05:d0:3e:3e:b7:23:8e:bb:02:e0:3f:02:c8:2b:f0:c4:0f:92:7c:78:f7:22:cc:8e:44:a7:79:4d:f5:1e:b3:86:3a:d8:74:3e:b7:6c:84:85:0c:98:35:00:b9:5b:84:b9:73:90:4b:7f:b4:37:d9:da:55:83:6d:2f:e5:06:d8:ec:54:bf:12:27:9b:79:d5:81:08:d2:3f:3c:b5:21:8c:b9:00:e2:3d:00:ca:29:f2:c6:0d:8c:62:61:e8:3e:d0:92:58:bb:65:51:e9:02:af:9a:26:c4:68:3e:b7:63:8d:8e:07:93:3e:0b:b2:50:8f:b2:78:9b:40:74:bf:38:d6:db:55:82:6c:2e:e4:07:d9:ed:55:be:13:26:9a:78:d4:84:0d:d9:36:35:bc:28:85:b0:09:eb:34:09:c3:20:fb:cf:04:81:6f:6c:e4:32:dd:9f:55:b6:68:5c:e4:0f:a2:97:2b:c9:65:37:be:6e:89:88:01:95:38:0d:b4:56:89:b4:7e:9d:46:72:b9:32:dc:da:5b:8c:62:20:ea:09:d7:e3:5b:b0:1d:28:94:76:da:86:0f:da:33:33:ba:2e:83:b6:0f:ed:32:0f:c5:26:fd:c9:02:8b:65:66:e9:3e:d0:92:58:bb:65:51:e9:02:af:9a:26:c4:69:5c:d5:00:eb:eb:62:f6:5b:6e:d7:35:ea:d7:1d:fe:25:11:db:39:d7:da:55:83:6d:2f:e5:06:d8:ec:54:bf:12:27:9b:79:d4:e3:6a:bb:55:56:dd:49:e4:d1:68:8a:55:68:a2:41:9a:ae:64:84:6a:6e:ee:39:d7:95:5f:bc:62:56:ee:05:a8:9d:21:c3:6e:5f:d6:01:ee:ee:67:f3:5e:6b:d2:30:ef:d2:18:fb:20:14:de:38:d6:d1:50:87:69:2b:e1:02:dc:e8:50:bb:16:23:9f:7d:d0:e3:6a:bc:50:50:d9:4d:e0:d5:6c:8e:51:6c:a6:45:9e:aa:60:84:6a:69:e6:31:df:9d:57:b4:6a:5e:e6:0d:a0:95:29:cb:66:5b:d2:08:e4:e5:6c:f8:55:60:d9:3b:e4:d9:13:f0:2b:1f:d5:3f:d1:dc:5c:89:67:25:ef:0c:d2:e6:5e:b5:18:2d:91:73:de:9a:13:c6:2f:2f:a6:32:9f:aa:13:f1:2e:13:d9:3a:e1:d5:1f:8e:60:63:ed:3b:d5:97:5d:be:60:54:ec:07:aa:9f:23:c1:6c:2a:a3:72:9a:9a:13:87:2a:1f:a6:44:9b:a6:6c:8f:54:60:aa:3d:d3:d0:59:8c:62:20:ea:09:d7:e3:5b:b0:1d:28:94:76:db:9b:12:c0:28:28:a3'.replace(/:/g, '')
const buf = Buffer.from(a, 'hex')
console.log(DecryptUser(buf, 1756424166))