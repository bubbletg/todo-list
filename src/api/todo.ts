import { Todo } from '@/types'
import request from '@/utils/request'
import { IAddTodoInfo } from './types/todo'

export const apiAddTodo = (data: Todo) => {
  return request<IAddTodoInfo>({
    method: 'post',
    url: '/todo/add',
    data: data
  })
}
