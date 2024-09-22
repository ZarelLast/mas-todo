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
    limitShow: 6
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
      return this.projects.slice(start, start + this.limitShow);
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
      const total = this.projects[index].todo.filter(item => item.is_complete == true).length
      this.projects[index].completed = total
    },

    setProject(id) {
      const index = this.projects.findIndex(project => project.id == id)
      this.project = this.projects[index]
      router.push('/project')
    },

    // updateCheckbox(projectId, idCheckbox, status){
    updateCheckbox(projectId, idCheckbox) {
      const indexProject = this.projects.findIndex(project => project.id == projectId)
      const indexItem = this.projects[indexProject].todo.findIndex(item => item.id == idCheckbox)
      this.projects[indexProject].todo[indexItem].is_complete = !this.projects[indexProject].todo[indexItem].is_complete
      this.updateProgress(projectId)
    },

    getProject(projectId) {
      const indexProject = this.projects.findIndex(project => project.id == projectId)
      return this.projects[indexProject].todo
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