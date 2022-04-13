<template>
  <div class="wrap">
    <SwipeCell>
      <div class="todo_list_item">
        <div class="todo_name">
          {{
            props.todo.name
          }}
        </div>
        <div class="todo_describe">
          {{
            props.todo.describe
          }}
        </div>
      </div>
      <template #right>
        <Button
          square
          text="删除"
          type="danger"
          class="delete_button"
          @click="deleteTodo(props.todo.id)"
        />
      </template>
    </SwipeCell>
  </div>
</template>
<script lang="ts" setup>
import { SwipeCell, Button, Toast } from 'vant'

import { apiDeleteTodo } from '@/api'
const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['deleteTodo'])

const deleteTodo = (id) => {
  apiDeleteTodo(id).then((data) => {
    if (data) {
      Toast('删除成功')
      emit('deleteTodo')
    }
  })
}
</script>

<style lang="scss" scoped>
.wrap {
   :deep(.van-swipe-cell__right) {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
}
.todo_list_item {
  margin: 10px;
  height: 70px;
  border-radius: 10px;
  border-bottom: 1px solid $g-blue;
  border-top: 1px solid $g-blue;
  .todo_name,
  .todo_describe {
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
  }
  .todo_describe {
    color:gray;
    font-size:12px;
  }
}
</style>
