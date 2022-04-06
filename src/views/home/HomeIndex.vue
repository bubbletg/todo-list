<template>
  <div class="home">
    <div class="home_list">
      <template
        v-for="item in todoList"
        :key="item.id"
      >
        <TodoItem
          :todo="item"
          @delete-todo="addCallback"
        />
      </template>
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
  >
    <AddTodo
      @add-callback="addCallback"
    />
  </Popup>
</template>
<script setup lang="ts">
import { Todo } from '@/types'
import { ref } from '@vue/runtime-core'
import { Popup } from 'vant'
import AddTodo from './components/AddTodo.vue'
import TodoItem from './components/TodoItem.vue'
import { apiGetAllTodoList } from '@/api'

// 获得todo 列表
const todoList = ref<Todo[]>([])
const getTodoList = () => {
  apiGetAllTodoList().then(data => {
    todoList.value = data
  })
}
// 是否显示添加弹层
const isShowPopup = ref(false)
// 添加todo 回调
const addCallback = () => {
  isShowPopup.value = false
  getTodoList()
}
addCallback()

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
