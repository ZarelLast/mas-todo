import { defineStore } from "pinia";
import { axiosWrapper } from "../helper/axios-wrapper";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useTodoStore = defineStore({
  id: 'todo',
  state: () => ({
    todos: [],
    todo: null
  }),
  actions: {
    // get by projectid
    // error 500
    // async get(id) {
    //   console.log(id)
    //   const todos = await axiosWrapper.get(`${baseUrl}/todo/${id}`)
    //   this.todos = todos.data
    //   return todos
    // },

    // get dari project store
    // get(data){
    //   this.todos =
    // }

    // bug reload ilang

    // post
    async add(data) {
      // console.log(data)
      // const formData = {project_id: projectId, description: val}
      const todo = await axiosWrapper.post(`${baseUrl}/todo`, data, true)
      this.todo = todo.data
      return todo
    },

    // put
    async update(id, data) {
      return await axiosWrapper.put(`${baseUrl}/todo/${id}`, data, true)
    },

    // delete
    async delete(id){
      return await axiosWrapper.delete(`${baseUrl}/todo/${id}`, {}, true)
    }
  }
})