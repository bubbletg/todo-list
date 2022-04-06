import { Todo } from '@/types'
import request from '@/utils/request'
import { IAddTodoInfo, IDelTodoInfo } from './types/todo'

export const apiAddTodo = (data: Todo) => {
  return request<IAddTodoInfo>({
    method: 'post',
    url: '/todo/add',
    data: data
  })
}

export const apiGetAllTodoList = () => {
  return request<Todo[]>({
    method: 'get',
    url: '/todo/allList'
  })
}

export const apiDeleteTodo = (id: number) => {
  return request<IDelTodoInfo>({
    method: 'get',
    url: '/todo/delete/' + id
  })
}
