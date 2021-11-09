const vm = new Vue({
    el: "#app",
    data: {
        url: server_url + "/api/",
        login_state: false,
        user_info: {
            user_name: "未登录",
            user_head_img: "img/logo.png"
        },
        blog_info: [
        ],
        blog_msg: {
            "msg_title": "站点公告",
            "msg_text": "Z-BSS开始开发啦"
        }
    },
    methods: {
        push_new_blog: function () {
            //发新帖
            let data = {
                "uname": localStorage.getItem("uname"),
                "token":localStorage.getItem("token"),
                "blog_title":$("#bolg_title").val(),
                "blog_group":$("#bolg_group").val(),
                "blog_text":editor.txt.html(),
                "blog_time":this.getDate,
                "blog_modify_time":this.getDate
            }
            let formData = new FormData()
            for (let key in data) {
                formData.append(key, data[key])
            }
            axios.post(this.url + "pushBlog",formData)
                .then((res) => {
                    if (res.status === 200) {
                        if (res.data['status'] === 200) {
                            hsycms.success('发送成功',()=>{
                                $('#new_bolg').modal('hide');
                                this.get_blog_info("public");
                            },1800)
                        } else {
                            alert("接口验证失败")
                        }
                    } else {
                        alert("接口请求失败");
                    }
                })
        },
        get_blog_info: function (group) {
            /*
            * 获取博文标题和预览
            * @param group {String} 需获取的博客的组
            * */
            axios.get(this.url + "getBlogPreview/" + group)
                .then((res) => {
                    if (res.status === 200) {
                        if (res.data['status'] === 200) {
                            this.blog_info = res.data['data'];
                        } else {
                            alert("接口验证失败")
                        }
                    } else {
                        alert("获取博客接口请求失败");
                    }
                })
        },
        user_login:function (){
            //用户登录
            let data = {
                "uname": $("#uname").val(),
                "pwd":$("#pwd").val()
            }
            let formData = new FormData()
            for (let key in data) {
                formData.append(key, data[key])
            }
            axios.post(this.url + "/userLogin",formData)
                .then((res)=>{
                    if(res.status===200){
                        //console.log(res.data['status']===404)
                        if (res.data['status'] === 200){
                            hsycms.success('登陆成功',()=>{
                                this.user_info['user_name'] = res.data['data']['uname'];
                                this.user_info['user_head_img'] = res.data['data']['user_head_img'];
                                this.login_state = true;
                                localStorage.setItem("user_head_img",res.data['data']['user_head_img']);
                                localStorage.setItem("uname",res.data['data']['uname']);
                                localStorage.setItem("token",res.data['data']['token']);
                                $('#login_model').modal('hide');
                            },1800)
                        }else if(res.data['status']===404) {
                            hsycms.fail('用户名或密码错误',()=>{
                                $("#pwd").val("");
                            },1800)
                        }
                    }
                })
        },
        user_check:function (){
            //检查用户登录
            let uname = localStorage.getItem("uname");
            let token = localStorage.getItem("token");
            let data = {
                "uname":uname,
                "token":token
            }
            let formData = new FormData()
            for (let key in data) {
                formData.append(key, data[key])
            }
            axios.post(this.url + "userLoginCheck",formData)
                .then((res)=>{
                    if(res.status===200){
                        //console.log(res.data['status']===404)
                        if (res.data['status'] === 200){
                            hsycms.success('用户已登录',()=>{
                                this.user_info['user_name'] = uname;
                                this.user_info['user_head_img'] = res.data['user_head_img'];
                                this.login_state = true;
                                console.log("验证成功");
                            },1800)
                        }else if(res.data['status']===404) {
                            this.user_info['user_name'] = "未登录"
                            this.user_info['user_head_img'] = "img/logo.png";
                            this.login_state = false;
                            console.log("验证失败");
                        }
                    }
                })
        }

    },
    computed: {
        getDate:function (){
            let d = new Date()
            return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes()+":"+d.getSeconds();
        },
        getBlogUrl:function (){
            return window.location.protocol + "//" + window.location.host + "/blog.html?bid=";
        }
    },
    mounted: function () {
        this.get_blog_info("public");
        this.user_check()
    }
});