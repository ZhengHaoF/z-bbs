<?php

namespace app\controller;

use app\BaseController;
use app\Request;
use think\facade\Db;

class Index extends BaseController
{
    public function index()
    {
        return '<style type="text/css">*{ padding: 0; margin: 0; } div{ padding: 4px 48px;} a{color:#2E5CD5;cursor: pointer;text-decoration: none} a:hover{text-decoration:underline; } body{ background: #fff; font-family: "Century Gothic","Microsoft yahei"; color: #333;font-size:18px;} h1{ font-size: 100px; font-weight: normal; margin-bottom: 12px; } p{ line-height: 1.6em; font-size: 42px }</style><div style="padding: 24px 48px;"> <h1>:) </h1><p> ThinkPHP V' . \think\facade\App::version() . '<br/><span style="font-size:30px;">14载初心不改 - 你值得信赖的PHP框架</span></p><span style="font-size:25px;">[ V6.0 版本由 <a href="https://www.yisu.com/" target="yisu">亿速云</a> 独家赞助发布 ]</span></div><script type="text/javascript" src="https://tajs.qq.com/stats?sId=64890268" charset="UTF-8"></script><script type="text/javascript" src="https://e.topthink.com/Public/static/client.js"></script><think id="ee9b1aa918103c4fc"></think>';
    }

    public function hello($name)
    {
        return 'hello,' . $name;
    }

    public function getBlogPreview($group)
    {
        //获取博客预览内容
        $blog_data = Db::table("z_blog_info")->where("blog_group", $group)->select()->toArray();
        for ($i = 0; $i < sizeof($blog_data); $i++) {
            $uname = $blog_data[$i]["blog_user"];
            $user_head_img = json_decode($this->getUserHeadImg($uname), true)['data'];
            $blog_data[$i]["user_head_img"] = $user_head_img;
            $blog_data[$i]["blog_text"] = mb_substr($blog_data[$i]["blog_text"],0,10,'utf-8');
        }
        return json(array("status" => 200, "data" => $blog_data));
    }

    private function getUserHeadImg($uname)
    {
        //私有的获取用户头像功能
        $data = Db::table("z_users")->where("uname", $uname)->value("user_head_img");
        return json_encode(array("status" => 200, "data" => $data));
    }


    public function userLogin(Request $request){
        //登录
        $uname = $request->param("uname");
        $pwd = md5($request->param("pwd"));
        $data = Db::table("z_users")->where("uname",$uname)->where("pwd",$pwd)->find();
        if($data != null){
            //生成Token
            $token = hash("sha256",$uname.time().rand(10000,99999));
            //插入表
            $r = Db::table("z_users_token")->where("uname",$uname)->count();
            if($r>0){
                //在字段中存在
                Db::table("z_users_token")->save(['uname'=>$uname,'token'=>$token]);
            }else{
                //在字段中不存在
                Db::table("z_users_token")->insert(['uname'=>$uname,'token'=>$token]);
            }
            return json(array("status"=>200,"data"=>array("uname"=>$uname,"user_reg_time"=>$data['reg_time'],"user_head_img"=>$data["user_head_img"],'token'=>$token)));
        }else{
            return json(array("status"=>404,"msg"=>"用户名或密码错误"));
        }
    }

    private function userLoginCheckMethods($uname,$token){
        //私有的用户登录检查模块
        $res = Db::table("z_users_token")->where("uname",$uname)->where("token",$token)->select();
        if($res->count()>0){

            return array("status"=>200,"msg"=>"验证成功");
        }else{

            return array("status"=>404,"msg"=>"验证失败");
        }
    }

    public function userLoginCheck(Request $request){
        //用户的登录检查
        $uname = $request -> param("uname");
        $token = $request -> param("token");
        $r = $this->userLoginCheckMethods($uname,$token);
        if($r['status']==200){
            $user_head_img = json_decode($this->getUserHeadImg($uname), true)['data'];
            return json(array("status"=>200,"msg"=>"验证成功","user_head_img"=>$user_head_img));
        }else{
            return json(array("status"=>403,"msg"=>"验证失败"));
        }

    }

    public function pushBlog(Request $request){
        //提交博客内容
        $uname = $request -> param("uname");
        $token = $request -> param("token");
        $blog_title = $request -> param("blog_title");
        $blog_text = $request -> param("blog_text");
        $blog_group = $request ->param("blog_group");
        $blog_time = $request ->param("blog_time");
        $blog_modify_time = $request ->param("blog_modify_time");
        if($this->userLoginCheckMethods($uname,$token)["status"]==200){
            $data = [
                'blog_user' => $uname,
                'blog_title' => $blog_title,
                'blog_text' => $blog_text,
                'blog_group' => $blog_group,
                'blog_time'=> $blog_time,
                'blog_modify_time'=>$blog_modify_time
                ];
            if(Db::table("z_blog_info")->insert($data)==1){
                return json(array("status"=>200,"msg"=>"发布成功"));
            }else{
                return json(array("status"=>500,"msg"=>"发布失败"));
            }
        }
    }
    public function getBlog(Request $request)
    {
        //获取博客内容
        /*
         {
            "status": 200,  //状态码
            "data": [
                {
                    "blog_title": "SQL表结构修复",   //博文标题
                    "blog_text": "博文内容",    //博文内容
                    "blog_time": "2021-10-09 14:23:19", //博文发表时间
                    "blog_user": "ZHF", //博文用户
                    "blog_group": "public", //博文权限
                    "blog_id": 12,  //博文ID
                    "blog_modify_time": "2021-10-09 14:23:19"   //博文修改时间
                }
            ]
        }
         */
        $blogId = $request->param("blogId");
        $blog_data = Db::table("z_blog_info")->where("blog_id", $blogId)->select();
        if ($blog_data->count()>0){
            return json(array("status"=>200,"data"=>$blog_data));
        }else{
            return json(array("status"=>404,"msg"=>"找不到该博客"));
        }
    }

    public function pushReply(Request $request)
    {
        //博文评论
        $reply_user = $request -> param("uname");
        $token = $request -> param("token");
        $replyTime = $request -> param("replyTime");
        $replyText = $request -> param("replyText");
        $blogId = $request -> param("blogId");
        $replyFor = $request -> param("replyFor");
        if($this->userLoginCheckMethods($reply_user, $token)["status"]==200){
            $data = [
                'reply_user' => $reply_user,
                'reply_time' => $replyTime,
                'reply_text' => $replyText,
                'blog_id' => $blogId,
                'reply_for' => $replyFor
            ];
            Db::table("z_reply_info")->insert($data);
            return json(array("status"=>200,"msg"=>"提交成功"));
        }else{
            return json(array("status"=>403,"msg"=>"用户未登录"));
        }
    }

    public function getReply(Request $request){
        //获取评论
        /*
            [
                {
                    "status": 200, //状态码
                    "data": [
                        {
                            "reply_id": 10, //评论ID
                            "blog_id": 12,  //博客ID
                            "reply_text": "666",
                            "reply_time": "2021-11-15 15:48:40",    //评论时间
                            "reply_for": 2, //评论对象，0代表评论对象为博客，非0则为评论的子评论
                            "uname": "ZHF", //评论用户
                            "user_head_img": "./img/head.jpg",  //评论用户的头像
                            "have_son_reply": false //是否还有子评论
                        }
                    ]
                }
            ]

         */
        $blogId = $request -> param("blogId");
        $replyFor = $request -> param("replyFor");
        $data = Db::table("z_reply_info")->where("blog_id",$blogId)->where("reply_for",$replyFor)->select()->toArray();
        for($i=0;$i<sizeof($data);$i++){
            $uname = $data[$i]["reply_user"];
            $user_head_img = json_decode($this->getUserHeadImg($uname), true)['data'];
            $data[$i]["user_head_img"] = $user_head_img;
            //是否有子评论
            $have_son_reply = Db::table("z_reply_info")->where("blog_id",$blogId)->where("reply_for",$data[$i]["reply_id"])->count() > 0;
            $data[$i]["have_son_reply"] = $have_son_reply;
        }
        return json(array("status"=>200,"data"=>$data));
    }
    public function getBbsInfo(){
            //获取论坛数据
        $bbsThemeCount = Db::table("z_blog_info")->count();
        $bbsDiscussCount = Db::table("z_reply_info")->count();
        $bbsUserCount = Db::table("z_users")->count();
        return json(array("status"=>200,"data"=>array("bbsThemeCount"=>$bbsThemeCount,"bbsDiscussCount"=>$bbsDiscussCount,"bbsUserCount"=>$bbsUserCount)));
    }
    public function getUserBlogPreview(Request $request){
        //获取博客预览内容
        $uname = $request -> param("uname");
        $token = $request -> param("token");
        if($this->userLoginCheckMethods($uname,$token)["status"]==200) {
            $blog_data = Db::table("z_blog_info")->where("blog_user", $uname)->select()->toArray();
            for ($i = 0; $i < sizeof($blog_data); $i++) {
                $uname = $blog_data[$i]["blog_user"];
                $user_head_img = json_decode($this->getUserHeadImg($uname), true)['data'];
                $blog_data[$i]["user_head_img"] = $user_head_img;
                $blog_data[$i]["blog_text"] = mb_substr($blog_data[$i]["blog_text"], 0, 10, 'utf-8');
            }
            return json(array("status" => 200, "data" => $blog_data));
        }else{
            return json(array("status" => 403, "msg" => "用户未登录或密码错误"));
        }
    }

    /**
     * @throws \think\db\exception\DbException
     */
    public function delUserBlog(Request $request){
        //删除用户博客
        $uname = $request -> param("uname");
        $token = $request -> param("token");
        $blogId = $request -> param("blog_id");
        if($this->userLoginCheckMethods($uname,$token)["status"]==200) {
            if (Db::table("z_users")->where("uname",$uname)->value("user_group") == "admin"){
                //是管理员直接删除
                if (!Db::table("z_blog_info")->where("blog_id", $blogId)->delete()){
                    return json(array("status" => 500, "msg" => "删除失败"));
                }
            }else{
                //是普通用户只能删除本人发的
                if(!Db::table("z_blog_info")->where("blog_user", $uname)->where("blog_id",$blogId)->delete()){
                    return json(array("status" => 500, "msg" => "删除失败"));
                }
            }
                 return json(array("status" => 200, "msg" => "删除成功"));
        }else{
            return json(array("status" => 403, "msg" => "用户未登录或密码错误"));
        }
    }

    /**
     * @throws \think\db\exception\DbException
     */
    public function modifyUserBlog(Request $request){
        //修改用户博客
        $uname = $request -> param("uname");
        $token = $request -> param("token");
        $blog_id = $request -> param("blog_id");
        $blog_title = $request -> param("blog_title");
        $blog_text = $request -> param("blog_text");
        $blog_group = $request ->param("blog_group");
        $blog_modify_time = $request ->param("blog_modify_time");
        if($this->userLoginCheckMethods($uname,$token)["status"]==200){
            $data = [
                'blog_user' => $uname,
                'blog_title' => $blog_title,
                'blog_text' => $blog_text,
                'blog_group' => $blog_group,
                'blog_modify_time'=>$blog_modify_time
            ];
            if(Db::table("z_blog_info")->where("blog_id",$blog_id)->data($data)->update()==1){
                return json(array("status"=>200,"msg"=>"修改成功"));
            }else{
                return json(array("status"=>500,"msg"=>"修改失败"));
            }
        }
    }


/*
    状态码列表
    200 --- 成功响应
    404 --- 找不到文件/用户（登录时或查看博客时）
    403 --- 禁止访问（用户未登录）
    500 --- 服务器问题，未响应
*/

}
