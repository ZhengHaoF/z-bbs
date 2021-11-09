<?php

namespace app\controller;

use app\BaseController;
use app\Request;
use think\facade\Db;
use function MongoDB\BSON\toJSON;

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
            return json(array("status"=>200,"data"=>array("uname"=>$uname,"user_head_img"=>$data["user_head_img"],'token'=>$token)));
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
            return json(array("status"=>404,"msg"=>"验证失败"));
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
        $blogId = $request->param("blogId");
        $blog_data = Db::table("z_blog_info")->where("blog_id", $blogId)->select();
        if ($blog_data->count()>0){
            return json(array("status"=>200,"data"=>$blog_data));
        }else{
            return json(array("status"=>404,"msg"=>"找不到该博客"));
        }
    }

}
