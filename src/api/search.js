const { default: Axios } = require("axios");

import axios from "axios";

// 搜索 name 关键词  page 数量
export function getSearchSongs(name, page) {
  const url = `/search?keywords=${name}&offset=${page}`;
  return axios.get(url);
}
// 热搜列表
export function getSearchHot() {
  const url = "/search/hot";
  return axios.get(url);
}

// 歌手排行榜
export function getTopList() {
  const url = "/toplist/artist";
  return axios.get(url);
}

// 登录 参数 phone password
export function getLogin(phone, password) {
  const url = `/login/cellphone?phone=${phone}&password=${password}`;
  return axios.get(url);
}
// 接收验证码 参数 phone
export function getCode(phone) {
  const url = `/captcha/sent?phone=${phone}`;
  return axios.get(url);
}

// 验证验证码 参数 phone captcha
export function getCoded(phone, captcha) {
  const url = `/captcha/verify?phone=${phone}&captcha=${captcha}`;
  return axios.get(url);
}

// 验证手机号是否被注册
export function getPhone(phone) {
  const url = `/cellphone/existence/check?phone=${phone}`;
  return axios.get(url);
}

// 注册
export function getRegister(phone, password, captcha, nickname) {
  const url = `/captcha/verify?phone=${phone}&password=${password}&captcha=${captcha}&nickname=${nickname}`;
  return axios.post(url);
}

// 获得每日推荐歌曲 ( 需要登录 )
export function getRecommend() {
  const url = "/recommend/songs";
  return axios.get(url);
}
// 歌单排行榜
export function getTopSongs() {
  const url = "/toplist/detail";
  return axios.get(url);
}
// 精品歌单
export function getHighquality(before, limit) {
  const url = `/top/playlist/highquality?before=${before}&limit=${limit}`;
  return axios.get(url);
}
// 推荐歌单
export function getPersonalized(limit) {
  const url = `/personalized?limit=${limit}`;
  return axios.get(url);
}
// 获取歌曲url
export function getSong(id) {
  const url = `/song/url?id=${id}`;
  return axios.get(url);
}
// 获取歌词
export function getLyric(id) {
  const url = `/lyric?id=${id}`;
  return axios.get(url);
}
// 注销
export function getLogout() {
  const url = `/logout`;
  return axios.get(url);
}
// 发送请求歌单列表信息
export function getPlaylist(id) {
  const url = `/playlist/detail?id=${id}`;
  return axios.get(url);
}
// 轮播图
export function getBanner() {
  const url = "/banner";
  return axios.get(url);
}
// 登录状态
export function getStatus() {
  const url = "/login/status";
  return axios.get(url);
}
// 获取用户信息
export function getUserinfo(uid) {
  const url = `/user/binding?uid=${uid}`;
  return axios.get(url);
}
// 获取账号信息 （需登录）
export function getUserSubcount() {
  const url = "/user/subcount";
  return axios.get(url);
}
