const vm = new Vue({
    el:"#app",
    data:{
        url: server_url + "/api/",
        login_state:false,
        blog_id:"", //博文ID
        user_info:{
            "user_name":"未登录",
            "user_head_img":"img/head.jpg"
        },
        reply_info:[
            {
                "reply_reply_box":{
                    //回复回复的回复框
                    state:false, //状态（是否显示）
                    reply_for_name:"回复@ZHF",//回复给谁（显示文字）
                    reply_text:"回复内容"
                },
                "blog_id":"博客ID",
                "reply_user":"评论用户",
                "reply_id":0,
                "user_head_img":"img/head.jpg",
                "reply_text":"加载中···",
                "reply_time":"加载中···",
                "have_son_reply":true,
                "reply":[
                    {
                        "blog_id":"博客ID",
                        "reply_user":"评论用户",
                        "reply_id":0,
                        "user_head_img":"img/head.jpg",
                        "reply_text":"加载中···",
                        "reply_time":"加载中···",
                        "have_son_reply":true,
                    }
                ]
            }
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
        },
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
            let formData = new FormData();
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
        get_blog:function (blog_id){
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
                            this.blog_id = blog_id;
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
        push_reply:function (blog_id,replyFor){
            //回复

            let uname = localStorage.getItem("uname");
            let token = localStorage.getItem("token");

            let data = {
                "uname":uname,
                "token":token,
                "blogId":this.blog_id, //博客ID
                "replyText":$("#reply_text").val(),
                "replyTime":this.getDate,
                "replyFor":replyFor //0为对博客的评论,其他为评论id
            }

            let formData = new FormData()
            for (let key in data) {
                formData.append(key, data[key])
            }
            axios.post(this.url + "pushReply",formData)
                .then((res) => {
                    if (res.status === 200) {
                        if (res.data['status'] === 200) {
                            hsycms.success("评论成功    ",()=>{
                                $("#reply_text").val('');//清空文本框
                                this.get_reply(blog_id,0)
                            },1800)
                        } else if(res.data['status'] === 403){
                            hsycms.fail('用户未登录',()=>{
                            },1800)
                        }else {
                            alert("接口验证失败")
                        }
                    } else {
                        alert("获取博客接口请求失败");
                    }
                })
        },
        get_reply:function(blogId,replyFor,reply_index){
            //获取评论
            let data = {
                "blogId":blogId, //博客ID
                "replyFor":replyFor
            }
            let formData = new FormData()
            for (let key in data) {
                formData.append(key, data[key])
            }
            axios.post(this.url + "getReply",formData)
                .then((res) => {
                    if (res.status === 200) {
                        if (res.data['status'] === 200) {
                            if(replyFor === 0){
                                //获取根节点回复
                                this.reply_info = res.data['data'];
                                for (let i in res.data['data']){
                                    //
                                    this.$set(this.reply_info[i] ,"reply",[]);
                                }
                            }else {
                                //获取子节点回复
                                for (let i in res.data['data']){
                                    this.reply_info[reply_index]['reply'].push(res.data['data'][i]);
                                }
                                console.log(this.reply_info[reply_index]['reply']);
                                this.reply_info[reply_index]['have_son_reply'] = false;
                            }
                        } else if(res.data['status'] === 403){

                        }else {
                            alert("接口验证失败")
                        }
                    } else {
                        alert("获取博客接口请求失败");
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
    mounted:function (){
        this.user_check();
        this.get_blog(this.GetQueryString("bid"));
        this.get_reply(this.GetQueryString("bid"),0);
    }
});