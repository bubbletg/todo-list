<template>
  <div class="home">
    <div class="home_list">
      <div
        v-for="item in todoList"
        :key="item.id"
        class="home_list_item"
      >
        {{
          item.todoName
        }}
      </div>
    </div>
  </div>
  <!-- 添加 -->
  <div
    class="fixed-add"
    @click="isShowPopup=true"
  >
    <i class="iconfont icon-tianjia" />
  </div>
  <Popup
    v-model:show="isShowPopup"
    class="popup_wrap"
    position="bottom"
    :style="{ height: '30%' }"
  >
    <AddTodo />
  </Popup>
</template>
<script setup lang="ts">
import { reactive, ref } from '@vue/runtime-core'
import { Popup } from 'vant'
import AddTodo from './components/AddTodo.vue'
interface TodoListItem {
  todoName:string,
  id: string | number
}
const todoList: TodoListItem[] = reactive([])
todoList.push({
  id: 1,
  todoName: 'as'
})
// const count = 0
// const addTodo = () => {
//   count += count
//   isShowPopup.value = !isShowPopup.value
// }
// 是否显示添加弹层
const isShowPopup = ref(false)
</script>

<style lang="scss">
.popup_wrap{
  border-radius: 10px 10px 0 0;
  overflow: hidden;
}
</style>

<style lang="scss" scoped>
.home{
&_list{
  margin: 10px;
  background-color: pink;
}
}
.fixed-add{
  position: fixed;
  right: 30px;
  bottom: 80px;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 15px;
  overflow: hidden;
  background-color: $g-blue;
  color: #fff;
}
</style>
