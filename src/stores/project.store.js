import { defineStore } from "pinia";
import { axiosWrapper } from "../helper/axios-wrapper";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useProjectStore = defineStore({
  id: 'project',
  state: () => ({
    projects: [],
    project: null,
  }),
  actions: {

    sortLatest(){
      this.projects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    },

    getProgress(id){
      const index = this.projects.findIndex(project => project.id == id)
      return (parseFloat(this.projects[index].completed) / parseFloat(this.getTotal(id)))*100
    },

    getTotal(id){
      const index = this.projects.findIndex(project => project.id == id)
      return this.projects[index].todo.length
    },

    updateProgress(id){
      const index = this.projects.findIndex(project => project.id == id)
      const total = this.projects[index].todo.filter(item => item.is_complete == true).length
      this.projects[index].completed = total
    },

    // updateCheckbox(idProject, idCheckbox, status){
    updateCheckbox(idProject, idCheckbox){
      const indexProject = this.projects.findIndex(project => project.id == idProject)
      const indexItem = this.projects[indexProject].todo.findIndex(item => item.id == idCheckbox)
      this.projects[indexProject].todo[indexItem].is_complete = !this.projects[indexProject].todo[indexItem].is_complete
      this.updateProgress(idProject)
    },

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
      this.sortLatest()
      return project
    },

    async get(id) {
      const project = await axiosWrapper.get(`${baseUrl}/project/${id}`)
      this.project = project.data
      return project
    }
  }
})