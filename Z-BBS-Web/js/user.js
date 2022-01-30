const vm = new Vue({
    el: "#app",
    data: {
        web_url:WEB_URL,
        url: SERVER_URL + "/api/",
        login_state: false,
        user_info: {
            user_name: "未登录",
            user_reg_time:"1970-01-01",//用户注册时间
            user_head_img: "img/logo.png"
        },
        bbs_info:{
            "bbsThemeCount":0,//主题
            "bbsDiscussCount":0,//讨论
            "bbsUserCount":0,//用户
        },
        blog_info: [],
        blog_preview:[],
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
                "blog_title":$("#blog_title").val(),
                "blog_group":$("#blog_group").val(),
                "blog_text":editor.txt.html(),
                "blog_time":this.getDate,
                "blog_modify_time":this.getDate,
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
                                $('#new_blog').modal('hide');
                                this.get_user_blog_preview_info();
                            },1800)
                        } else {
                            alert("接口验证失败")
                        }
                    } else {
                        alert("接口请求失败");
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
                                this.user_info['user_reg_time'] = res.data['data']['user_reg_time'];
                                this.login_state = true;
                                localStorage.setItem("user_head_img",res.data['data']['user_head_img']);
                                localStorage.setItem("uname",res.data['data']['uname']);
                                localStorage.setItem("token",res.data['data']['token']);
                                this.get_user_blog_preview_info()
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
                            this.user_info['user_name'] = uname;
                            this.user_info['user_head_img'] = res.data['user_head_img'];
                            this.login_state = true;
                            console.log("验证成功");
                            //获取用户博客预览
                            this.get_user_blog_preview_info();
                        }else if(res.data['status']===403) {
                            this.user_info['user_name'] = "未登录"
                            this.user_info['user_head_img'] = "img/logo.png";
                            this.login_state = false;
                            $('#login_model').modal('show');
                            console.log("验证失败");

                        }
                    }
                })
        },
        push_modify_user_head : function(){
            //提交修改用户头像
            if(document.getElementById("img_file").files.length === 0){
                alert("请选择文件");
            }else {
                console.log(this.img_cut())
                let uname = localStorage.getItem("uname");
                let token = localStorage.getItem("token");
                let img_urt_base64 = this.img_cut();
                let data = {
                    "uname":uname,
                    "token":token,
                    "new_user_head_b64": img_urt_base64
                }
                let formData = new FormData()
                for (let key in data) {
                    formData.append(key, data[key])
                }
                axios.post(this.url + "modifyUserHead",formData)
                    .then((res) => {
                        if (res.status === 200) {
                            if (res.data['status'] === 200) {
                                hsycms.success(res.data["msg"],()=>{
                                    location.reload()
                                },1800)
                            }else {
                                hsycms.fail(res.data["msg"],()=>{

                                },1800)
                            }
                        } else {
                            alert("获取博客接口请求失败");
                        }
                    })
            }
        },
        get_modify_user_blog : function(blog_id){
            //获取修改用户博客的内容
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
                            editor.txt.html(this.blog_info['blog_text'])
                            $("#blog_title").val(this.blog_info['blog_title'])
                            $("#blog_id").val(this.blog_info['blog_id'])
                            if (this.blog_info['blog_group'] === "public"){
                                document.getElementById("blog_group").selectedIndex = 0
                            }else {
                                document.getElementById("blog_group").selectedIndex = 1
                            }
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
        push_modify_user_blog:function (blog_id){
            //提交修改博文
            let data = {
                "uname": localStorage.getItem("uname"),
                "token":localStorage.getItem("token"),
                "blog_id":this.blog_info['blog_id'],
                "blog_title":$("#blog_title").val(),
                "blog_group":$("#blog_group").val(),
                "blog_text":editor.txt.html(),
                "blog_modify_time":this.getDate
            }
            let formData = new FormData()
            for (let key in data) {
                formData.append(key, data[key])
            }
            axios.post(this.url + "modifyUserBlog",formData)
                .then((res) => {
                    if (res.status === 200) {
                        if (res.data['status'] === 200) {
                            hsycms.success('修改成功',()=>{
                                $('#new_blog').modal('hide');
                                this.get_user_blog_preview_info("public");
                            },1800)
                        } else {
                            alert("接口验证失败")
                        }
                    } else {
                        alert("接口请求失败");
                    }
                })
        },
        get_user_blog_preview_info: function () {
            /*
            * 获取用户发表的博文标题和预览
            * @param group {String} 需获取的博客的组
            * */
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
            axios.post(this.url + "getUserBlogPreview" ,formData)
                .then((res) => {
                    if (res.status === 200) {
                        if (res.data['status'] === 200) {
                            this.blog_preview = res.data['data'];
                        } else {
                            alert("接口验证失败")
                        }
                    } else {
                        alert("获取博客接口请求失败");
                    }
                })
        },
        delete_user_blog:function (blog_id){
            //删除用户博客
            /*
            * 获取用户发表的博文标题和预览
            * @param group {String} 需获取的博客的组
            * */
            hsycms.confirm('确定要这么做',
                ()=>{
                //点了确定
                    let uname = localStorage.getItem("uname");
                    let token = localStorage.getItem("token");
                    let data = {
                        "uname":uname,
                        "token":token,
                        "blog_id":blog_id
                    }
                    let formData = new FormData()
                    for (let key in data) {
                        formData.append(key, data[key])
                    }
                    axios.post(this.url + "delUserBlog" ,formData)
                        .then((res) => {
                            if (res.status === 200) {
                                if (res.data['status'] === 200) {
                                    hsycms.success('删除成功',()=>{
                                        this.get_user_blog_preview_info();
                                    },1800)
                                } else {
                                    hsycms.fail('删除失败',()=>{
                                        this.get_user_blog_preview_info();
                                    },1800)
                                }
                            } else {
                                alert("获取博客接口请求失败");
                            }
                        })
                },
                ()=>{
                    console.log("点了取消")
                }
            )
        },
        modify_user_password:function (){
            let uname = localStorage.getItem("uname");
            let token = localStorage.getItem("token");
            let new_pwd = $("#new_pwd").val()
            if (new_pwd === ""){
                hsycms.alert("密码不能为空");
                return
            }
            let data = {
                "uname":uname,
                "token":token,
                "new_pwd":new_pwd
            }
            let formData = new FormData()
            for (let key in data) {
                formData.append(key, data[key])
            }
            axios.post(this.url + "modifyUserPassword" ,formData)
                .then((res)=>{
                    if (res.status === 200){
                        if (res.data['status'] === 200){
                            hsycms.success(res.data['msg'],()=>{
                                localStorage.clear()
                                location.reload();
                            },1800)
                        }else {
                            hsycms.fail("服务器错误",()=>{

                            },1800)
                        }
                    }else {
                        alert("获取博客接口请求失败");
                    }
                })

        },
        img_load: function() {
            //加载选择的图片
            let file = document.getElementById("img_file");
            file.disabled = "disabled";
            console.log(file)
            var image = '';
            if (!file.files || !file.files[0]) {
                return;
            }
            var reader = new FileReader();
            reader.onload = function (evt) {
                document.getElementById('image').src = evt.target.result;
                image = evt.target.result;
            }
            console.log(document.getElementById('image'))
            reader.readAsDataURL(file.files[0]);
        },
        img_load_cut: function(){
            //载入图片裁切
            $('#image').cropper({
                aspectRatio: 1 / 1,
                crop: function(data) {
                    console.log(data);
                }
            });
        },
        img_cut: function(){
            //图片裁切
            var cas=$('#image').cropper('getCroppedCanvas');
            console.log(cas.toDataURL('image/jpeg'));
            return cas.toDataURL('image/jpeg')
        },
        // dealImage: function(base64, w) {
        //     //base64 图片压缩
        //     var newImage = new Image();
        //     var quality = 0.5;    //压缩系数0-1之间
        //     newImage.src = base64;
        //     newImage.setAttribute("crossOrigin", 'Anonymous');	//url为外域时需要
        //     var imgWidth, imgHeight;
        //     newImage.onload = function () {
        //         imgWidth = this.width;
        //         imgHeight = this.height;
        //         var canvas = document.createElement("canvas");
        //         var ctx = canvas.getContext("2d");
        //         if (Math.max(imgWidth, imgHeight) > w) {
        //             if (imgWidth > imgHeight) {
        //                 canvas.width = w;
        //                 canvas.height = w * imgHeight / imgWidth;
        //             } else {
        //                 canvas.height = w;
        //                 canvas.width = w * imgWidth / imgHeight;
        //             }
        //         } else {
        //             canvas.width = imgWidth;
        //             canvas.height = imgHeight;
        //             quality = 0.6;
        //         }
        //         ctx.clearRect(0, 0, canvas.width, canvas.height);
        //         ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
        //         var base64 = canvas.toDataURL("image/jpeg", quality); //压缩语句
        //         // 如想确保图片压缩到自己想要的尺寸,如要求在50-150kb之间，请加以下语句，quality初始值根据情况自定
        //         while (base64.length / 1024 > 150) {
        //         	quality -= 0.01;
        //         	base64 = canvas.toDataURL("image/jpeg", quality);
        //         }
        //         //防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
        //         while (base64.length / 1024 < 50) {
        //         	quality += 0.001;
        //         	base64 = canvas.toDataURL("image/jpeg", quality);
        //         }
        //         return base64;//必须通过回调函数返回，否则无法及时拿到该值
        //     }
        // },
        logon_out:function (){
            //登出
            if (this.login_state){
                if(confirm("是否登出账户？")){
                    localStorage.clear();
                    location.reload();
                    this.login_state = false;
                }
            }
        }

    },
    computed: {
        getDate:function (){
            let d = new Date()
            return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes()+":"+d.getSeconds();
        },
        getBlogUrl:function (){
            return window.location.protocol + "//" + window.location.host + "/blog.html?bid=";
        }
    },
    mounted: function () {
        this.user_check()
    }
});