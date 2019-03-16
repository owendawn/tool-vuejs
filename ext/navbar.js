Vue.component("Navbar",{
    template:([
        '<div class="navbar">',
        '    <div class="logoDiv" >',
        '        <span> -ϰ - </span>',
        '    </div>',
        '    <div class="navbar-nav">',
        '        <ul class="nav-items">',
        '            <li > <a href="vipparse.html" > Vip 解 析 </a></li>',
        '            <li > <a v-on:click="urlChange(\'CLZH\')"> 磁 链 转 换 </a></li>',
        '            <li class="nav-item dropdown">',
        '                <a class="nav-link dropdown-toggle" v-on:click="toggleDropDown(\'navbarDropdown\')" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">工具集</a>',
        '                <div class="dropdown-menu" aria-labelledby="navbarDropdown">',
        '                    <a class="dropdown-item" v-on:click="urlChange(\'JRZH\')"> 金 融 转 换 </a>',
        '                    <a class="dropdown-item" v-on:click="urlChange(\'SPZGIF\')">视频 转 GIF</a>',
        '                    <a class="dropdown-item" href="#">Another action</a>',
        '                    <div class="dropdown-divider"></div>',
        '                    <a class="dropdown-item" href="#">Something else here</a>',
        '                </div>',
        '            </li>',
        '        </ul>',
        '    </div>',
        '</div>',
    ].join("")),
    data(){
        return {
            type:window.location.hash?(window.location.hash.replace("#", "")):null
        }
    },
    methods:{
        toggleDropDown(id, e) {
            let target = document.getElementById(id);
            let dropdowndom = document.querySelector('.dropdown-menu[aria-labelledby="' + id + '"]');
            let parent = dropdowndom.parentNode.getBoundingClientRect();
            let it = target.getBoundingClientRect();
            let baseStyle = "top:" + it.height + "px;left:" + (it.left - parent.left) + "px;"
            if (target.getAttribute("aria-expanded") === "false") {
                dropdowndom.style = baseStyle + "display:block";
                target.setAttribute("aria-expanded", true);
            } else {
                dropdowndom.style = baseStyle + "";
                target.setAttribute("aria-expanded", false);
            }
        },
    
        urlChange(type, e) {
            let toggleDom = document.querySelector(".dropdown-toggle[aria-expanded='true']");
            if (toggleDom) {
                let toggleId = toggleDom.id;
                this.toggleDropDown(toggleId)
            }
            if (this.type!=null&&type!=null) {
                this.$emit('toggle-type',type)
            } else {
                console.log("page jump");
                window.location.href = "tool.html#" + type;
            }
            this.type=type;
        }
    }
});