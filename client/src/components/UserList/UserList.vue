<template>
  <div class="friends">
    <div
      @click="select(index)"
      class="user"
      v-for="(item, index) in user"
      :key="index"
    >
      <div class="selected" :class="{ isselected: item.selected }">
        <img
          src="../../static/images/Register/Group 3.png"
          v-if="item.selected"
          alt=""
        />
      </div>
      <img class="user-img" :src="item.imgurl" alt="" />
      <div class="name">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
  methods: {
    select(e) {
      console.log(e);
      this.user[e].selected = !this.user[e].selected;
      if (this.user[e].selected === true) {
        this.$store.commit("setNumber", (this.$store.state.number += 1));
        this.$store.commit(
          "setInviteNumber",
          (this.$store.state.inviteNumber += 1)
        );
        console.log(this.user[e].selected);
      } else {
        this.$store.commit("setNumber", (this.$store.state.number -= 1));
        this.$store.commit(
          "setInviteNumber",
          (this.$store.state.inviteNumber -= 1)
        );
      }
    },
  },
};
</script>

<style scoped>
.friends {
  padding: 320px 20px 80px 20px;
}
.user {
  display: flex;
  flex-direction: row;
  height: 60px;
  align-items: center;
}
.selected {
  flex: none;
  margin-right: 10px;
  width: 24px;
  height: 24px;
  background: rgba(255, 228, 49, 0.5);
  border-radius: 12px;
}
.isselected {
  background: rgba(255, 228, 49, 1);
}
.selected img {
  width: 15px;
  height: 15px;
  padding-left: 5px;
  padding-top: 5px;
}
.user-img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  flex: none;
}
.name {
  padding-left: 16px;
  font-size: 20px;
  color: #272832;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>