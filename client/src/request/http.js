// 封装函数
import { post } from './post';
// Login
export const logIn = (p) => post('login/match', p); // 登录
// Register
export const canRegister = (p) => post('register/judge', p);   // 判断邮箱是否注册
export const register = (p) => post('register/add', p);// 注册
// UserHome
export const groupMsg = (p) => post('group/match', p);  // 获取群信息
export const userMsg = (p) => post('user/detail', p);  // 获取用户信息
export const friendRequest = (p) => post('friend/request', p);  // 发送好友请求
export const groupRequest = (p) => post('friend/request', p);  // 发送加群请求
// UserDetail
export const myMsg = (p) => post('user/detail', p);  // 获取自己的信息
// 有问题
export const updateImg = (p) => post('user/updatefile', p);  // 修改自己的头像
export const updateMsg = (p) => post('user/update', p);  // 修改自己的信息
// Search
export const findFriend = (p) => post('friend/search', p);  // 找自己的朋友
export const findGroup = (p) => post('group/find', p);  // 找自己的群
export const searchUser = (p) => post('user/search', p);  // 获取所有的用户
export const searchGroup = (p) => post('group/search', p);  // 获取所有的群
// Invite
export const friendShow = (p) => post('group/show', p);  // 获取好友列表
export const inviteFriend = (p) => post('group/inviteMember', p);  // 邀请好友
// Index
export const showMsg = (p) => post('friend/render', p);  // 获取好友、群列表数据
// Groupdetail
export const updetailGroupName = (p) => post('group/update1', p);  // 修改群昵称
export const updetailGroupNotice = (p) => post('group/update2', p);  // 修改群公告
// 有问题
export const updetailGroupImg = (p) => post('group/updatefile', p);  // 修改群头像
export const deleteGroupMember = (p) => post('group/delete', p);  // 删除群成员、退群
// FriendRequest
export const friendRequestMsg = (p) => post('friend/show', p);  // 展示好友请求
export const disagreeReuest = (p) => post('friend/disagree', p);  // 拒绝
export const agreeReuest = (p) => post('friend/agree', p);  // 同意
// Create
// 有问题
export const createGroup = (p) => post('group/createGroup', p);  // 建群
// ChatRoom
export const clearTip = (p) => post('chat/stateZero', p);  // 清空未读消息
export const sendText = (p) => post('chat/text', p);  // 发送文字消息
// 有问题
export const sendForm = (p) => post('chat/add', p);  // 发送图片、语音消息
export const getTalkMessage = (p) => post('chat/getMessage', p);  // 获取聊天数据
export const lookPerson = (p) => post('friend/compare', p);  // 点击好友头像