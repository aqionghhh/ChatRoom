// 封装函数
import { post } from './post';
// Login
export const logIn = (p) => { // 登录
  return post('login/match', p);
}
// Register
export const canRegister = (p) => {  // 判断邮箱是否注册
  return post('register/judge', p);
}
export const register = (p) => {  // 注册
  return post('register/add', p);
}
// UserHome
export const groupMsg = (p) => {  // 获取群信息
  return post('group/match', p);
}
export const userMsg = (p) => {  // 获取用户信息
  return post('user/detail', p);
}
export const friendRequest = (p) => {  // 发送好友请求
  return post('friend/request', p);
}
export const groupRequest = (p) => {  // 发送加群请求
  return post('friend/request', p);
}
// UserDetail
export const myMsg = (p) => {  // 获取自己的信息
  return post('user/detail', p);
}
// 有问题
export const updateImg = (p) => {  // 修改自己的头像
  return post('user/updatefile', p);
}
export const updateMsg = (p) => {  // 修改自己的信息
  return post('user/update', p);
}
// Search
export const findFriend = (p) => {  // 找自己的朋友
  return post('friend/search', p);
}
export const findGroup = (p) => {  // 找自己的群
  return post('group/find', p);
}
export const searchUser = (p) => {  // 获取所有的用户
  return post('user/search', p);
}
export const searchGroup = (p) => {  // 获取所有的群
  return post('group/search', p);
}
// Invite
export const friendShow = (p) => {  // 获取好友列表
  return post('group/show', p);
}
export const inviteFriend = (p) => {  // 邀请好友
  return post('group/inviteMember', p);
}
// Index
export const showMsg = (p) => {  // 获取好友、群列表数据
  return post('friend/render', p);
}
// Groupdetail
export const updetailGroupName = (p) => {  // 修改群昵称
  return post('group/update1', p);
}
export const updetailGroupNotice = (p) => {  // 修改群公告
  return post('group/update2', p);
}
// 有问题
export const updetailGroupImg = (p) => {  // 修改群头像
  return post('group/updatefile', p);
}
export const deleteGroupMember = (p) => {  // 删除群成员、退群
  return post('group/delete', p);
}
// FriendRequest
export const friendRequestMsg = (p) => {  // 展示好友请求
  return post('friend/show', p);
}
export const disagreeReuest = (p) => {  // 拒绝
  return post('friend/disagree', p);
}
export const agreeReuest = (p) => {  // 同意
  return post('friend/agree', p);
}
// Create
// 有问题
export const createGroup = (p) => {  // 建群
  return post('group/createGroup', p);
}
// ChatRoom
export const clearTip = (p) => {  // 清空未读消息
  return post('chat/stateZero', p);
}
export const sendText = (p) => {  // 发送文字消息
  return post('chat/text', p);
}
// 有问题
export const sendForm = (p) => {  // 发送图片、语音消息
  return post('chat/add', p);
}
export const getTalkMessage = (p) => {  // 获取聊天数据
  return post('chat/getMessage', p);
}
export const lookPerson = (p) => {  // 点击好友头像
  return post('friend/compare', p);
}