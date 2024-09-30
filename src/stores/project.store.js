import { defineStore } from "pinia";
import { axiosWrapper } from "../helper/axios-wrapper";

import router from '@/router/index.js'

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useProjectStore = defineStore({
  id: 'project',
  state: () => ({
    projects: [],
    project: null,
    currentPage: 1,
    limitShow: 6,
    completed: false
    // limit todo jadi 3
  }),
  actions: {
    async fetch() {
      const projects = await axiosWrapper.get(`${baseUrl}/project`)
      if (projects) {
        this.projects = projects.data
      }
      this.sortLatest()
    },

    async add(data) {
      const project = await axiosWrapper.post(`${baseUrl}/project`, data, true)
      this.project = project.data
      this.fetch()
      return project
    },

    async get(id) {
      const project = await axiosWrapper.get(`${baseUrl}/project/${id}`)
      this.project = project.data
      return project
    },

    totalPages() {
      return Math.ceil(this.projects.length / this.limitShow)
    },

    sortLatest() {
      this.projects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    },

    paginatedProjects() {
      const start = (this.currentPage - 1) * this.limitShow;
      let data = []
      if (this.completed) {
        // data = this.projects.filter(project => project.incompleted == 0 && project.completed > project.incompleted)
        data = this.projects.filter(project => project.incompleted == 0)
      } else {
        data = this.projects
      }
      return data.slice(start, start + this.limitShow);
    },

    getProgress(id) {
      const index = this.projects.findIndex(project => project.id == id)
      return (parseFloat(this.projects[index].completed) / parseFloat(this.getTotal(id))) * 100
    },

    getTotal(id) {
      const index = this.projects.findIndex(project => project.id == id)
      return this.projects[index].todo.length
    },

    updateProgress(id) {
      const index = this.projects.findIndex(project => project.id == id)
      const completed = this.projects[index].todo.filter(item => item.is_complete == true).length
      const incompleted = this.projects[index].todo.filter(item => item.is_complete == false).length
      this.projects[index].completed = completed
      this.projects[index].incompleted = incompleted
    },

    setProject(id) {
      const index = this.projects.findIndex(project => project.id == id)
      this.project = this.projects[index]
    },
    
    getProject(projectId) {
      const index = this.projects.findIndex(project => project.id == projectId)
      return this.projects[index].todo
    },
    
    // updateCheckbox(projectId, idCheckbox, status){
    updateChecklist(projectId, todoId) {
      const todos = this.getProject(projectId)
      const index = todos.findIndex(item => item.id == todoId)
      todos[index].is_complete = !todos[index].is_complete
      this.updateProgress(projectId)
    },

    renameChecklist(projectId, todoId, desc) {
      const todos = this.getProject(projectId)
      const index = todos.findIndex(item => item.id == todoId)
      todos[index].description = desc
    },

    getTodo(projectId, todoId) {
      const todos = this.getProject(projectId)
      const index = todos.findIndex(todo => todo.id == todoId)
      const description = todos[index].description
      const is_complete = todos[index].is_complete
      return { description, is_complete }
    },
  }
})