<template>
  <div class="addtodo">
    <!-- 添加标题 -->
    <div class="flex justify-between">
      <div class="addtodo_name flex justify-start align-center">
        <span class="addtodo_name_icon" />
        <input
          v-model="name"
          placeholder="准备做什么？"
        >
      </div>
      <div
        class="addtodo_add"
        @click="addTodo"
      >
        添加
      </div>
    </div>
    <!-- 添加描述 -->
    <div class="addtodo_describe">
      <Field
        v-model="describe"
        rows="1"
        autosize
        type="textarea"
        placeholder="添加描述"
        maxlength="50"
      >
        <template #right-icon>
          <i
            v-show="describe.trim() !== ''"
            class="iconfont icon-shanchu"
            @click="describe = ''"
          />
        </template>
      </Field>
    </div>
    <!-- 选择时间 -->
    <div class="addtodo_time">
      <div
        v-for="item in selectTimeList"
        :key="item"
        class="addtodo_time_btn"
        :class="isselectTime === item ? 'addtodo_time_btn-active' : ''"
        @click="
          () => {
            isselectTime = item
          }
        "
      >
        {{ item }}
      </div>
    </div>
    <div class="addtodo_more">
      <div
        v-show="!isMore"
        class="addtodo_more_btn"
        @click="()=>{isMore=true;}"
      >
        展开更多
      </div>
      <div
        v-show="isMore"
        class="addtodo_more_content"
      >
        11111
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Toast, Field } from 'vant'
import { ref, reactive } from '@vue/runtime-core'
import { Todo } from '@/types'
import { apiAddTodo } from '@/api/todo'
// const useEffNameAndDescribe = () => {
const addTodo = () => {
  if (name.value.trim() === '') {
    Toast('请输入待办名称！')
    return
  }
  apiAddTodo({
    name: name.value,
    describe: describe.value
  })
  name.value = ''
  describe.value = ''
  localStorage.setItem('todoList', JSON.stringify(todoList))
}
const todoList: Todo[] = []
const name = ref('')
const describe = ref('')
// return {
//   addTodo,
//   name,
//   describe
// }
// }
const isselectTime = ref('')
const selectTimeList = reactive(['今天', '明天', '选择日期', '没有日期'])
const isMore = ref(false)
// useEffNameAndDescribe()
</script>

<style lang="scss" scoped>
.addtodo {
  margin: 15px;
  .addtodo_name {
    height: 30px;
    &_icon {
      background-color: pink;
      width: 20px;
      height: 20px;
      border-radius: 10px;
      margin-right: 10px;
    }
    > input {
      color: #000;
    }
  }
  .addtodo_add {
    color: $g-blue;
    margin-right: 10px;
  }
  .addtodo_describe {
    min-height: 30px;
    max-height: 90px;
    line-height: 30px;
    border-bottom: 1px solid $g-blue;
    overflow: hidden;
  }
  .addtodo_time {
    border-bottom: 1px solid $g-blue;
    &_btn {
      display: inline-block;
      margin: 10px 10px 10px 0;
      height: 20px;
      line-height: 20px;
      padding: 0 5px;
      border-radius: 4px;
      font-size: 13px;
      background-color: rgb(189, 187, 187);
      &-active {
        background-color: $g-blue;
        color: #fff;
      }
    }
  }
  .addtodo_more {
    &_btn {
      display: inline-block;
      margin: 10px 10px 10px 0;
      height: 25px;
      line-height: 25px;
      padding: 0 5px;
      border-radius: 10px;
      font-size: 13px;
      background-color: rgb(242, 234, 234);
      color: $g-blue;
    }
    &_content{
      height: 100px;
    }
  }
}
</style>
