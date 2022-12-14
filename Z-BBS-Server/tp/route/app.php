<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------
use think\facade\Route;

Route::get('think', function () {
    return 'hello,ThinkPHP6!';
});

Route::rule('hello/:name', 'index/hello');
Route::get('api/getBlogPreview/:group', 'index/getBlogPreview');
Route::get('api/getUserHeadImg/:uname', 'index/getUserHeadImg');
Route::post('api/userLogin', 'index/userLogin');
Route::post('api/userLoginCheck', 'index/userLoginCheck');
Route::post('api/pushBlog', 'index/pushBlog');
Route::post('api/getBlog', 'index/getBlog');
Route::post('api/pushReply', 'index/pushReply');
Route::post('api/getReply', 'index/getReply');
Route::get('api/getBbsBaseInfo', 'index/getBbsBaseInfo');
Route::get('api/getBbsInfo', 'index/getBbsInfo');
Route::post('api/getUserBlogPreview', 'index/getUserBlogPreview');
Route::post('api/delUserBlog', 'index/delUserBlog');
Route::post('api/modifyUserBlog', 'index/modifyUserBlog');
Route::post('api/modifyUserPassword', 'index/modifyUserPassword');
Route::post('api/modifyUserHead', 'index/modifyUserHead');
Route::post('api/userRegistered', 'index/userRegistered');
Route::post('img/', 'index/');
Route::rule('install.php/', 'install.php');
