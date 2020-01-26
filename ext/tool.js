// ==================================== es6工具类 ========================================
class Tools {
    static loadScript(url, callback) {
        let old_script = document.getElementById(url);
        if (old_script) {
            if (old_script.ready == true) {
                callback && callback();
                return;
            } else {
                document.body.removeChild(old_script);
            }
        }
        let script = document.createElement('script');
        script.id = url;
        script.src = url;
        script.onload = script.onreadystatechange = function () {
            if (script.ready) {
                return false;
            }
            if (!script.readyState || script.readyState == "loaded" || script.readyState == 'complete') {
                script.ready = true;
                callback && callback();
            }
        };
        document.body.appendChild(script);
    }

    //同步加载多个脚本
    static syncLoadScripts(scripts, callback) {
        var ok = 0;
        var loadScript = function (url) {
            Tools.loadScript(url, function () {
                ok++;
                if (ok == scripts.length) {
                    callback && callback();
                } else {
                    loadScript(scripts[ok])
                }
            })
        }
        loadScript(scripts[0]);
    }

    //异步加载多个脚本
    static asyncLoadScripts(scripts, callback) {
        var ok = 0;
        for (var i = 0; i < scripts.length; i++) {
            Tools.loadScript(scripts[i], function () {
                console.log(scripts[ok])
                ok++;
                if (ok == scripts.length) {
                    callback && callback();
                }
            })
        }
    }
}




// ==================================== 磁链转换部分========================================
Vue.component("clzh_content", {
    template: ([
        '<div class="content" >',
        '    原始地址：',
        '    <input class="url" type="text" id="inputurl" />',
        '    <span>',
        '        <button class="cp btn btn-primary btn-sm" data-clipboard-target="#inputurl" aria-label="复制成功！">复制</button>',
        '    </span>',
        '    <button class="btn btn-default btn-sm" v-on:click="clear">清空</button>',
        '    <div style="margin-top:6px;">',
        '       <button class="btn btn-success btn-sm" v-on:click="convert(1)">Utf16转换</button>',
        '       <button class="btn btn-success btn-sm" v-on:click="convert(2)">Unicode转换</button>',
        '       <button class="btn btn-success btn-sm" v-on:click="convert(3)">GBK转换</button>',
        '    </div>',
        '    <hr>',
        '    <div>',
        '       <a class="btn btn-outline-info btn-sm" target="_blank" href="http://www.torrent.org.cn/">',
        '           <svg height="16" class="octicon octicon-issue-reopened" viewBox="0 0 14 16" version="1.1" width="16" aria-hidden="true"><path fill="silver" fill-rule="evenodd" d="M8 9H6V4h2v5zm-2 3h2v-2H6v2zm6.33-2H10l1.5 1.5c-1.05 1.33-2.67 2.2-4.5 2.2A5.71 5.71 0 0 1 1.3 8c0-.34.03-.67.09-1H.08C.03 7.33 0 7.66 0 8c0 3.86 3.14 7 7 7 2.19 0 4.13-1.02 5.41-2.59L14 14v-4h-1.67zM1.67 6H4L2.5 4.5C3.55 3.17 5.17 2.3 7 2.3c3.14 0 5.7 2.56 5.7 5.7 0 .34-.03.67-.09 1h1.31c.05-.33.08-.66.08-1 0-3.86-3.14-7-7-7-2.19 0-4.13 1.02-5.41 2.59L0 2v4h1.67z"></path></svg>',
        '           www.torrent.org.cn',
        '       </a>',
        '    </div>',
        '    <hr />',
        '    真实地址：',
        '    <input class="url input-sm" type="text" id="realurl" />',
        '    <span>',
        '        <button class="cp btn btn-primary btn-sm" data-clipboard-target="#realurl" aria-label="复制成功！">复制</button>',
        '    </span>',
        '    <div>',
        '    <button class="btn btn-info btn-sm" v-on:click="jumpToDownload(\'http://btcache.me/torrent/\')">',
        '       <svg height="18" class="octicon octicon-cloud-download" viewBox="0 0 16 16" version="1.1" width="26" aria-hidden="true"><path fill="#fff" fill-rule="evenodd" d="M9 12h2l-3 3-3-3h2V7h2v5zm3-8c0-.44-.91-3-4.5-3C5.08 1 3 2.92 3 5 1.02 5 0 6.52 0 8c0 1.53 1 3 3 3h3V9.7H3C1.38 9.7 1.3 8.28 1.3 8c0-.17.05-1.7 1.7-1.7h1.3V5c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V11h2c2.08 0 4-1.16 4-3.5C16 5.06 14.08 4 12 4z"></path></svg>',
        '       btcache.me ',
        '    </button>',
        '    <button class="btn btn-info btn-sm" v-on:click="jumpToDownload(\'https://itorrents.org/torrent/\',\'.torrent\')">',
        '       <svg height="18" class="octicon octicon-cloud-download" viewBox="0 0 16 16" version="1.1" width="26" aria-hidden="true"><path fill="#fff" fill-rule="evenodd" d="M9 12h2l-3 3-3-3h2V7h2v5zm3-8c0-.44-.91-3-4.5-3C5.08 1 3 2.92 3 5 1.02 5 0 6.52 0 8c0 1.53 1 3 3 3h3V9.7H3C1.38 9.7 1.3 8.28 1.3 8c0-.17.05-1.7 1.7-1.7h1.3V5c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V11h2c2.08 0 4-1.16 4-3.5C16 5.06 14.08 4 12 4z"></path></svg>',
        '       itorrents.org ',
        '    </button>',
        '    <button class="btn btn-info btn-sm" v-on:click="jumpToDownload(\'https://www.yandex.com/search/?text=\')">',
        '       <svg height="18" class="octicon octicon-cloud-download" viewBox="0 0 16 16" version="1.1" width="26" aria-hidden="true"><path fill="#fff" fill-rule="evenodd" d="M9 12h2l-3 3-3-3h2V7h2v5zm3-8c0-.44-.91-3-4.5-3C5.08 1 3 2.92 3 5 1.02 5 0 6.52 0 8c0 1.53 1 3 3 3h3V9.7H3C1.38 9.7 1.3 8.28 1.3 8c0-.17.05-1.7 1.7-1.7h1.3V5c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V11h2c2.08 0 4-1.16 4-3.5C16 5.06 14.08 4 12 4z"></path></svg>',
        '       yandex ',
        '    </button>',
        '    </div>',
        '    <br />',
        '    迅雷地址：',
        '    <input class="url" type="text" id="thunderurl" />',
        '    <span>',
        '        <button class="cp btn btn-primary btn-sm" data-clipboard-target="#thunderurl" aria-label="复制成功！">复制</button>',
        '    </span>',
        '    <br />',
        '    快车地址：',
        '    <input class="url" type="text" id="flashgeturl" />',
        '    <span>',
        '        <button class="cp btn btn-primary btn-sm" data-clipboard-target="#flashgeturl" aria-label="复制成功！">复制</button>',
        '    </span>',
        '    <br />',
        '    旋风地址：',
        '    <input class="url" type="text" id="qqurl" />',
        '    <span>',
        '        <button class="cp btn btn-primary btn-sm" data-clipboard-target="#qqurl" aria-label="复制成功！">复制</button>',
        '    </span>',
        '    <br />',
        '    <hr />',
        '    <span id="thunderdownload"></span>',
        '    <span id="otherdownload"></span>',
        '</div>'
    ].join("")),
    beforeMount() {
        Tools.asyncLoadScripts(["./ext/encrypt.util.js"]);
        Tools.asyncLoadScripts(["./ext/gbk/encoding-indexes.js"]);
        Tools.asyncLoadScripts(["./ext/gbk/encoding.js"]);
    },
    mounted() {
        // var url='ed2k://|file|%E8%B6%8A%E7%8B%B1.Prison.Break.S05E08.%E4%B8%AD%E8%8B%B1%E5%AD%97%E5%B9%95.HDTVrip.720P-%E4%BA%BA%E4%BA%BA%E5%BD%B1%E8%A7%86V2.mp4|619162687|1551a1c5c2807796aaffee499a46f3bf|h=vk7qarwo76nmosnvbzlsfjx2k2myy32n|/';
        // var url = 'thunder://QUFodHRwOi8veHVubGVpYS56dWlkYTM2MC5jb20vMTgwMy+77svAyMu56cC0MS5CRDEyODC438fl1tDTosur19aw5i5tcDRaWg==';
        // document.getElementById("inputurl").value = url;
        window.ConvertURL2FG = function (url, fUrl, uid) {
            try {
                FlashgetDown(url, uid);
            } catch (e) {
                location.href = fUrl;
            }
        }
        Tools.syncLoadScripts(["https://cdn.bootcss.com/clipboard.js/1.7.1/clipboard.js"], function () {
            new Clipboard('.cp').on('success', function (e) {
                var thedom = e.trigger;
                var i = document.createElement("i");
                i.innerHTML = '✔';
                i.setAttribute("class", "flag");
                i.style = "font-weight:bolder;color:#e314e4;font-size:17pt;";
                thedom.parentNode.appendChild(i);
                setTimeout(function () {
                    // thedom.parentNode.removeChild(i);
                }, 3000);
                e.clearSelection();
            });
        });
    },
    methods: {

        cleanCopyFlag() {
            var flags = document.getElementsByClassName("flag");
            for (var i = 0; i < flags.length; i++) {
                var it = flags[i];
                it.parentNode.removeChild(it);
                i--;
            }
        },
        clear() {
            document.querySelectorAll('.content input').forEach(function (it) {
                it.value = '';
            });
            this.cleanCopyFlag();
        },

        convert(flag) {

            function ThunderEncode(t_url) {
                var thunderPrefix = "AA";
                var thunderPosix = "ZZ";
                var thunderTitle = "thunder://";
                var tem_t_url = t_url;
                var thunderUrl = thunderTitle + EncryptUtil.base64.encode64(EncryptUtil.utf16to8(thunderPrefix + tem_t_url + thunderPosix))+'==';
                return thunderUrl;
            }
            function Thunderdecode(url) {
                url = url.replace('thunder://', '');
                let thunderUrl = EncryptUtil.utf8to16(EncryptUtil.base64.decode64(url));
                thunderUrl = thunderUrl.substr(2, thunderUrl.length - 4);
                return thunderUrl;
            }
            // function ThunderEncode1(t_url) {
            //     var thunderPrefix = "AA";
            //     var thunderPosix = "ZZ";
            //     var thunderTitle = "thunder://";
            //     var tem_t_url = t_url;
            //     var thunderUrl = thunderTitle + EncryptUtil.base64.encode64(EncryptUtil.Ansi.strUnicode2Ansi(thunderPrefix + tem_t_url + thunderPosix))+'==';
            //     return thunderUrl;
            // }
            function Thunderdecode1(url) {
                url = url.replace('thunder://', '');
                let thunderUrl = EncryptUtil.Ansi.strAnsi2Unicode(EncryptUtil.base64.decode64(url));
                thunderUrl = thunderUrl.substr(2, thunderUrl.length - 4);
                return thunderUrl;
            }
            function Thunderdecode2(url) {
                url = url.replace('thunder://', '');
                url=url.substr(0,url.length-2);
                let thunderUrl = new TextDecoder('gbk').decode(new Uint8Array(EncryptUtil.base64.toBytes(url)));
                thunderUrl = thunderUrl.replace(/\s/g,"").substr(2, thunderUrl.length - 4);
                console.log(thunderUrl)
                return thunderUrl;
            }



            function flashgetencode(url) {
                url = 'Flashget://' + EncryptUtil.base64.encode64(EncryptUtil.utf16to8('[FLASHGET]' + url + '[FLASHGET]')) + '&1926';
                return url;
            }
            function Flashgetdecode(url) {
                url = url.replace('Flashget://', '');
                if (url.indexOf('&') != -1) {
                    url = url.substr(0, url.indexOf('&'));
                }
                url = EncryptUtil.utf8to16(EncryptUtil.base64.decode64(url));
                flashgeturl = url.replace('[FLASHGET]', '').replace('[FLASHGET]', '');
                return flashgeturl;
            }


            function qqencode(url) {
                return 'qqdl://' + EncryptUtil.base64.encode64(EncryptUtil.utf16to8(url));
            }
            function qqdecode(url) {
                return EncryptUtil.utf8to16(EncryptUtil.base64.decode64(url.replace('qqdl://', '')));
            }



            this.cleanCopyFlag();
            let oldurl = document.getElementById("inputurl").value.trim();
            if (oldurl == '') {
                return;
            }
            let newurl;
            if (oldurl.indexOf("thunder://") != -1) {
                if (flag===1){
                    newurl = Thunderdecode(oldurl);
                }else if(flag===2) {
                    newurl = Thunderdecode1(oldurl);
                } else if(flag===3){
                    newurl = Thunderdecode2(oldurl);
                }
            } else if (oldurl.indexOf("Flashget://") != -1) {
                newurl = Flashgetdecode(oldurl);
            } else if (oldurl.indexOf("qqdl://") != -1) {
                newurl = qqdecode(oldurl);
            } else {
                newurl = oldurl;
            }

            let thunderurl;
            // if(flag===1){
                thunderurl = ThunderEncode(newurl);
            // }else if (flag===2) {
            //     thunderurl = ThunderEncode1(newurl);
            // }
            let flashgeturl = flashgetencode(newurl);
            let qqurl = qqencode(newurl);

            this.reWrite(oldurl, newurl, thunderurl, flashgeturl, qqurl);
        },
        reWrite(oldurl, newurl, thunderurl, flashgeturl, qqurl) {
            function createThunderDownLoadADOm(label, url, title, id, name, cls, style) {
                return [
                    "<a",
                    "	oncontextmenu=ThunderNetwork_SetHref(this) ",
                    id ? "id='" + id + "'" : "",
                    name ? "name='" + name + "'" : "",
                    "	style='" + (style || "") + "'",
                    "	class='" + (cls || "") + "'",
                    ' 	onclick="return OnDownloadClick_Simple(this)" ',
                    '	href="' + url + '"',
                    ' 	thunderResTitle="' + (title || "迅雷下载") + '"',
                    ' 	thunderType="04"',
                    ' 	thunderPid="00008"',
                    ' 	thunderHref="' + url + '"',
                    '>' + (label || "迅雷下载") + '</a>'
                ].join("");
            }
            function createFlashgetOrOtherDownLoadADOm(label, url, flashgeturl, id, name, cls, style) {
                var str = "<a href='javascript://' onclick='ConvertURL2FG(\"" + flashgeturl + "\",\"" + url + "\",1926)'>" + label + "</a>";
                return str;
            }
            document.getElementById("inputurl").value = oldurl;
            document.getElementById("realurl").value = newurl;
            document.getElementById("thunderurl").value = thunderurl;
            document.getElementById("flashgeturl").value = flashgeturl;
            document.getElementById("qqurl").value = qqurl;
            document.getElementById("thunderdownload").innerHTML = createThunderDownLoadADOm("迅雷下载", thunderurl, "迅雷下载", null, null, "btn btn-link", null);
            document.getElementById("otherdownload").innerHTML = createFlashgetOrOtherDownLoadADOm("其他下载", newurl, flashgeturl, null, null, "", null);
        },
        jumpToDownload(rootUrl,footUrl){
            window.open(rootUrl+document.getElementById("realurl").value.replace('magnet:?xt=urn:btih:',"")+(footUrl?footUrl:""));
        }
    }
});

// ==================================== 金融转换部分========================================
Vue.component("jrzh_content", {
    template: [
        '<div class="content">',
        '    <strong>金额</strong><small> （数字）</small>：<input class="price" type="text" id="raw" />',
        '    <button class="btn btn-success" v-on:click="convert">转换</button>',
        '    <hr />',
        '    <strong>金额</strong><small> （标准）</small>：<input class="price" type="text" id="price" readOnly />',
        '    <span>',
        '        <button class="cp btn btn-primary" data-clipboard-target="#price" aria-label="复制成功！">复制</button>',
        '    </span>',
        '</div>'
    ].join(""),
    mounted() {
        Tools.syncLoadScripts(["https://cdn.bootcss.com/clipboard.js/1.7.1/clipboard.js"], function () {
            new Clipboard('.cp').on('success', function (e) {
                var thedom = e.trigger;
                var i = document.createElement("i");
                i.innerHTML = '✔';
                i.setAttribute("class", "flag");
                i.style = "font-weight:bolder;color:#e314e4;font-size:17pt;";
                thedom.parentNode.appendChild(i);
                setTimeout(function () {
                    // thedom.parentNode.removeChild(i);
                }, 3000);
                e.clearSelection();
            });
        });

    },
    methods: {
        convert() {
            let v = document.getElementById("raw").value;
            if (v && v.trim().length > 0) {
                document.getElementById("price").value = this.changeMoneyToChinese(v);
            }
        },
        changeMoneyToChinese(money) {
            var cnNums = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"]; //汉字的数字
            var cnIntRadice = ["", "拾", "佰", "仟"]; //基本单位
            var cnIntUnits = ["", "万", "亿", "兆"]; //对应整数部分扩展单位
            var cnDecUnits = ["角", "分", "毫", "厘"]; //对应小数部分单位
            var cnIntLast = "元"; //整型完以后的单位
            var maxNum = 999999999999999.9999; //最大处理的数字

            var IntegerNum; //金额整数部分
            var DecimalNum; //金额小数部分
            var ChineseStr = ""; //输出的中文金额字符串
            var parts; //分离金额后用的数组，预定义
            if (money === "") {
                return "";
            }
            money = parseFloat(money);
            if (money >= maxNum) {
                alert('超出最大处理数字');
                return "";
            }
            if (money === 0) {
                ChineseStr = cnNums[0] + cnIntLast
                return ChineseStr;
            }
            money = money.toString(); //转换为字符串
            if (money.indexOf(".") === -1) {
                IntegerNum = money;
                DecimalNum = '';
            } else {
                parts = money.split(".");
                IntegerNum = parts[0];
                DecimalNum = parts[1].substr(0, 4);
            }
            if (parseInt(IntegerNum, 10) > 0) { //获取整型部分转换
                let zeroCount = 0;
                let IntLen = IntegerNum.length;
                for (let i = 0; i < IntLen; i++) {
                    let n = IntegerNum.substr(i, 1);
                    let p = IntLen - i - 1;
                    let q = p / 4;
                    let m = p % 4;
                    if (n === "0") {
                        zeroCount++;
                    } else {
                        if (zeroCount > 0) {
                            ChineseStr += cnNums[0];
                        }
                        zeroCount = 0; //归零
                        ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                    }
                    if (m === 0 && zeroCount < 4) {
                        ChineseStr += cnIntUnits[q];
                    }
                }
                ChineseStr += cnIntLast;
            }
            if (DecimalNum !== '') { //小数部分
                decLen = DecimalNum.length;
                for (i = 0; i < decLen; i++) {
                    n = DecimalNum.substr(i, 1);
                    if (n !== '0') {
                        ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
                    }
                }
            }
            if (ChineseStr === '') {
                ChineseStr += cnNums[0] + cnIntLast;
            }
            return ChineseStr;
        }
    }
});


// ==================================== 视频转gif部分 ========================================
Vue.component("spzgif_content", {
    template: [
        '<div class="content">',
        '    <script src="https://cdn.bootcss.com/clipboard.js/1.7.1/clipboard.js"></script>',
        '    <div>',
        '        <input type="file" class="btn btn-success" v-on:change="changeFile" />',
        '    </div>',
        '    <hr />',
        '    <div class="media-area">',
        '        <video ref="video" src="" controls muted style="max-width: 50%"  />',
        '        <img ref="gif" src="" style="max-width: 50%；float: right;" />',
        '    </div>',
        '    <hr />',
        '    <div>',
        '        图片宽度 ：',
        '        <input type="range" min="100" max="1000" onChange="widthChange" ref="widthRange" value={this.state.width} />',
        '        <input type="text" :value="width" readOnly style="width: 50px " />',
        '        <br />',
        '        <br />',
        '        <button class="btn btn-secondery" v-on:click="initAll">初始化所有配置参数</button>',
        '        <button class="btn btn-info" v-on:click="drawVideo">开始截图</button>',
        '        <button class="btn btn-warning" v-on:click="finishDrawVideo">停止截图</button>',
        '        <button class="btn btn-primary" v-on:click="createGif">生成Gif</button>',
        '        <button class="btn btn-danger" v-on:click="downloadGif">下载Gif</button>',
        '    </div>',
        '    <div class="captures" ref="captures">',
        '    </div>',
        '</div>',
    ].join(""),
    data() {
        return {
            delay: 200,
            timeoutKeeper: null,
            width: 100,
        }
    },

    mounted() {
        Tools.syncLoadScripts(["ext/gif.js/gif.js"])
        let that = this;
        this.$refs.video.addEventListener("ended", function () {
            that.finishDrawVideo();
        });
    },
    methods: {
        initAll() {
            this.$refs.widthRange.removeAttribute("disabled");
            this.width = 100;
        },
        changeFile(e) {
            console.log(e.target)
            this.$refs.video.src = URL.createObjectURL(e.target.files[0]);
        },
        drawVideo() {
            this.$refs.widthRange.setAttribute("disabled", true);
            let video = this.$refs.video;
            let ratio = video.offsetWidth / video.offsetHeight;
            let canvas = document.createElement("canvas");
            canvas.width = this.width;
            canvas.height = Math.floor(this.width / ratio);
            this.$refs.captures.appendChild(canvas);
            let ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, this.width, this.width / ratio)
            video.play();
            this.timeoutKeeper = setTimeout(this.drawVideo.bind(this), this.delay);
        },
        finishDrawVideo() {
            clearTimeout(this.timeoutKeeper);
            this.timeoutKeeper = null
            this.$refs.video.pause();
        },
        createGif() {
            this.$refs.video.pause();
            let gif = new GIF({
                workers: 2,
                quality: 10
            });
            document.querySelectorAll(".captures canvas").forEach(function (it, idx, all) {
                gif.addFrame(it, { delay: 200 });
            });
            let that = this;
            gif.on('finished', function (blob) {
                that.$refs.gif.src = URL.createObjectURL(blob);
            });
            gif.render();
        },

        downloadGif() {
            window.open(this.$refs.gif.src)
        },
        widthChange(e) {
            console.log(e.target.value)
            this.width = e.target.value;
        }
    }


});


// ==================================== 经纬度转换部分========================================
Vue.component("jwzh_content", {
    template: [
        '<div class="content">',
        '   <div>',
        '       <strong>经纬度</strong><small> （小&emsp;数）</small>：',
        '       <input class="price jw-text" type="text" id="raw">',
        '       <button class="btn btn-success" v-on:click="changeToDFM">转换</button>',
        '   </div>',
        '   <div style="margin-top: 35px;">',
        '       <strong>经纬度</strong><small> （度分秒）</small>：',
        '       <input class="price dfm jw-text" type="text" id="rawdu1">',
        '       <button class="btn btn-success" v-on:click="parseToDu">匹配</button>',
        '   </div>',
        '   <div style="margin-top: 5px;">',
        '       <strong>经纬度</strong><small> （度分秒）</small>：',
        '       <input class="price dfm jw-text" type="number" id="rawdu"> °&nbsp;',
        '       <input class="price dfm jw-text" type="number" id="rawfen"> \'&nbsp;',
        '       <input class="price dfm jw-text" type="number" id="rawmiao"> "',
        '       <button class="btn btn-success" v-on:click="changeToDu">转换</button>',
        '   </div>',
        '   <hr>',
        '   <div>',
        '       <strong>经纬度</strong><small> （小&emsp;数）</small>：',
        '       <input class="price jw-text" type="text" id="jwxs">',
        '       <span><button class="cp btn btn-primary" data-clipboard-target="#jwxs" aria-label="复制成功！">复制</button></span>',
        '   </div>',
        '   <div style="margin-top: 5px;">',
        '       <strong>经纬度</strong><small> （度分秒）</small>：',
        '       <input class="price jw-text" type="text" id="jwdfm">',
        '       <span><button class="cp btn btn-primary" data-clipboard-target="#jwdfm" aria-label="复制成功！">复制</button></span>',
        '   </div>',
        '</div>'
    ].join(""),
    mounted() {
        Tools.syncLoadScripts(["https://cdn.bootcss.com/clipboard.js/1.7.1/clipboard.js"], function () {
            new Clipboard('.cp').on('success', function (e) {
                var thedom = e.trigger;
                var i = document.createElement("i");
                i.innerHTML = '✔';
                i.setAttribute("class", "flag");
                i.style = "font-weight:bolder;color:#e314e4;font-size:17pt;";
                thedom.parentNode.appendChild(i);
                setTimeout(function () {
                    // thedom.parentNode.removeChild(i);
                }, 3000);
                e.clearSelection();
            });
        });

    },
    methods: {
        changeToDFM() {
            var du = document.getElementById("raw").value;
            var str1 = du.split(".");
            if(str1.length>2){
                alert("异常数据");
                return;
            }
            var du1 = str1[0];
            var tp = "0." + str1[1]
            var tp = String(tp * 60.00);		//这里进行了强制类型转换
            var str2 = tp.split(".");
            var fen = str2[0];
            tp = "0." + (str2[1]||0);
            tp = tp * 60;
            var miao = tp;
            document.getElementById("jwdfm").value = du1 + "°" + fen + "'" + miao + "\"";
            document.getElementById("jwxs").value = du;
        },
    
        changeToDu() {
            var d = document.getElementById("rawdu").value;
            var f = document.getElementById("rawfen").value;
            var m = document.getElementById("rawmiao").value;
    
            var ff = parseFloat(f) + parseFloat(m / 60);
            var du = parseFloat(ff / 60) + parseFloat(d);
            document.getElementById("jwxs").value = du;
            document.getElementById("jwdfm").value = d + "°" + f + "'" + m + "\"";
        },
    
        parseToDu(){
            var all=document.getElementById("rawdu1").value;
            var str1=all.trim().split("°");
            document.getElementById("rawdu").value=str1[0];
            var str2=str1[1].trim().replace("′","'").split("'");
            document.getElementById("rawfen").value=str2[0];
            document.getElementById("rawmiao").value=str2[1].replace("″","").replace("\"","");
        }
    }
});

// ==================================== 车辆识别号部分========================================

Vue.component("clsbh_content", {
    template: [
        '<div class="content">',
        '    <strong>车辆识别号</strong><small> / 车架号</small>：',
        '    <input class="price" type="text" id="raw" ',
        // '       value="lvgbp87e2hg108849"',
        '    />',
        '    <button class="btn btn-success" v-on:click="convert">转换</button>',
        '    <button class="btn btn-info" v-on:click="more">更多</button>',
        '    <br /><br />',
        '    <table class="table table-striped table-borderless" style="text-align:center;">',
        '        <thead><tr><th>序号</th><th>值</th><th>含义</th></tr></thead>',
        '        <tbody id="tbody"></tbody>',
        '    </table>',
        '</div>'
    ].join(""),
    mounted() {
        // this.convert();
    },
    methods: {
        more(){
            let v = document.getElementById("raw").value;
            if (v && v.trim().length === 17) {
                v=v.toUpperCase();
               window.open("http://www.17vin.com/vin/"+v);
            }
        },
        convert() {
            let v = document.getElementById("raw").value;
            if (v && v.trim().length === 17) {
                v=v.toUpperCase();
                let strs=v.split('');
                let htmls=[];
                htmls.push(['<tr><td>1</td><td>',strs[0],'</td><td>',this.parseSCGB(strs[0]),'</td></tr>'].join(''));
                htmls.push(['<tr><td>2、1~3</td><td>',strs.slice(0,3).join(''),'</td><td>',this.parseSCCS(strs),'</td></tr>'].join(''));
                htmls.push(['<tr><td>9</td><td>',strs[8],'</td><td>VIN检验数代码</td></tr>'].join(''));
                htmls.push(['<tr><td>10</td><td>',strs[9],'</td><td>',this.parseCXNK(strs[9]),'</td></tr>'].join(''));
                htmls.push(['<tr><td>11</td><td>',strs[10],'</td><td>总装工厂代码</td></tr>'].join(''));
                htmls.push(['<tr><td>12-17</td><td>',strs.slice(11).join(''),'</td><td>生产序列号</td></tr>'].join(''));
                document.getElementById('tbody').innerHTML=htmls.join('');
            }
        },
        parseQCLB(flag){
            switch(flag){
                case 1:return '载重汽车';
                case 2:return '越野汽车';
                case 3:return '倾卸汽车';
                case 4:return '牵引车';
                case 5:return '特种车'; 
                case 6:return '客车（大、中、小）';
                case 7:return '轿车';
                case 8:return '挂车';
                case 9:return '半挂车、加长货挂车';
                default:return '未知汽车类别'
            }
        },
        parseSCGB(flag){
            switch(flag){
                case '1' : return '美国';
                case 'J' : return '日本';
                case 'S' : return '英国';
                case '2' : return '加拿大';
                case 'K' : return '韩国';
                case 'T' : return '瑞士';
                case '3' : return '墨西哥';
                case 'L' : return '中国';
                case 'V' : return '法国 ';
                case '4' : return '美国';
                case 'R' : return '台湾';
                case 'W' : return '德国 ';
                case '6' : return '澳大利亚';
                case 'Y' : return '瑞典';
                case '9' : return '巴西';
                case 'Z' : return '意大利';
                default : return '未知国家';
            }
        },
        parseSCCS(flags){
            switch(flags.slice(0,3).join("")){
                case 'LJ1':return '安徽江淮汽车集团有限公司';
                case 'LE4':return '北京奔驰-戴姆勒·克莱斯勒汽车有限公司';
                case 'LBE':return '北京现代汽车有限公司';
                case 'LGX':return '比亚迪汽车有限公司';
                case 'LVS':return '长安福特马自达汽车有限公司';
                case 'LHA':return '大迪汽车集团有限公司';
                case 'LVH':return '东风本田汽车有限公司';
                case 'LGD':return '东风汽车股份有限公司';
                case 'LGB':return '东风汽车有限公司';
                case 'LJD':return '东风悦达起亚汽车有限公司';
                case 'LDN':return '东南(福建)汽车工业有限公司';
                case 'LTN':return '东南(福建)汽车工业有限公司';
                case 'LHG':return '广州本田汽车有限公司';
                case 'LVG':return '广州丰田汽车有限公司';
                case 'LKH':return '哈飞汽车股份有限公司';
                case 'LTA':return '河北中兴汽车制造有限公司';
                case 'LBV':return '华晨宝马汽车有限公司';
                case 'LJX':return '江铃汽车股份有限公司';
                case 'LVF':return '江西昌河铃木汽车有限责任公司';
                case 'LVV':return '奇瑞汽车有限公司';
                case 'LG1':return '荣成华泰汽车有限公司';
                case 'LSV':return '上海大众汽车有限公司';
                case 'LJU':return '上海华普汽车有限公司';
                case 'LSJ':return '上海汽车股份有限公司';
                case 'LSG':return '上海通用汽车有限公司';
                case 'LZW':return '上汽通用五菱汽车股份有限公司';
                case 'LDC':return '神龙汽车有限公司';
                case 'LSY':return '沈阳华晨金杯汽车有限公司';
                case 'LFM':return '天津一汽丰田汽车有限公司';
                case 'LTV':return '天津一汽丰田汽车有限公司';
                case 'LFP':return '天津一汽夏利汽车股份有限公司';
                case 'LTJ':return '天津一汽夏利汽车股份有限公司';
                case 'LFV':return '一汽-大众汽车有限公司';
                case 'LH1':return '一汽海马汽车有限公司';
                case 'LNP':return '跃进汽车集团公司';
                case 'LB3':return '浙江豪情汽车制造有限公司';
                case 'L6T':return '浙江吉利汽车有限公司';
                case 'LFP':return '中国第一汽车集团公司';
                case 'LS5':return '重庆长安铃木汽车有限公司';
                case 'LLV':return '重庆力帆乘用车有限公司';
                default:return this.parseSCGB(flags[0])+'-未知生产厂商';
            }
        },
        parseCXNK(flag){
            let codes=['1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','J','K','L','M','N','P','R','S','T','V','W','X','Y'];
            let begin=false;
            let offset=1;
            while(!begin){
                for(let i=codes.length-1;i>=0;){
                    if(codes[i]===codes[(new Date().getFullYear()+10)%codes.length-1]){
                        begin=true;
                    }
                    if(begin){
                        offset--;
                    }
                    if(flag===codes[i]){
                        break;
                    }
                    i--;
                    if(i===-1){
                        i=codes.length-1;
                    }
                }
            }
            return offset+new Date().getFullYear();
        }
    }
});

// ==================================== 其他========================================
