const vm = new Vue({
    el:"#app",
    data:{
        url: server_url + "/api/",
        login_state:false,
        user_info:{
            "user_name":"未登录",
            "user_head_img":"img/head.jpg"
        },
        comments_info:[
            {
                "comments_user":"评论用户",
                "user_head_img":"img/head.jpg",
                "comments_text":"评论内容",
                "comments_time":"评论时间",
                "reply":[
                    {
                        "reply_user":"回复评论回复的用户1",
                        "reply_text":"回复评论回复的回复"
                    },
                    {
                        "reply_user":"回复评论回复的用户1",
                        "reply_text":"回复评论回复的内容"
                    }
                ]
            },
            {
                "comments_user":"评论用户",
                "user_head_img":"img/head.jpg",
                "comments_text":"评论内容",
                "comments_time":"评论时间",
                "reply":[
                    {
                        "reply_user":"回复评论回复的用户1",
                        "reply_text":"回复评论回复的回复"
                    }
                ]
            },
        ],
        blog_info:{
            blog_user:"加载中···",
            blog_title:"加载中···",
            blog_text:"加载中···",
            blog_group:"public",
            blog_time:"加载中···",
            blog_modify_time:"加载中···"
        },
        blog_msg:{
            "msg_title":"站点公告",
            "msg_text":"Z-BSS开始开发啦"
        }
    },
    methods: {
        GetQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
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
                           /*
                            hsycms.success('用户已登录',()=>{

                            },1800)
                            */
                            this.user_info['user_name'] = uname;
                            this.user_info['user_head_img'] = res.data['user_head_img'];
                            this.login_state = true;
                            console.log("验证成功");
                        }else if(res.data['status']===404) {
                            this.user_info['user_name'] = "未登录"
                            this.user_info['user_head_img'] = "img/logo.png";
                            this.login_state = false;
                            console.log("验证失败");
                        }
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
        getBlog:function (blog_id){
            //获取博文
            let data = {
                "blogId":blog_id
            }
            let formData = new FormData()
            for (let key in data) {
                formData.append(key, data[key])
            }
            axios.post(this.url + "getBlog",formData)
                .then((res) => {
                    if (res.status === 200) {
                        if (res.data['status'] === 200) {
                            console.log(res.data['data'][0]);
                            this.blog_info = res.data['data'][0];
                        } else if(res.data['status'] === 404){
                            hsycms.fail('该博客不存在',()=>{
                            },1800)
                        }else {
                            alert("接口验证失败")
                        }
                    } else {
                        alert("获取博客接口请求失败");
                    }
                })
        },
        pushReply:function (){

        }
    },
    mounted:function (){
        this.user_check();
        this.getBlog(this.GetQueryString("bid"))
    }
});