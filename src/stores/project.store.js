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

    getProgress(id){
      const index = this.projects.findIndex(project => project.id == id)
      return (parseFloat(this.projects[index].completed) / (parseFloat(this.projects[index].completed)+parseFloat(this.projects[index].incompleted)))*100
    },

    getTotal(id){
      const index = this.projects.findIndex(project => project.id == id)
      return (parseInt(this.projects[index].completed)+parseInt(this.projects[index].incompleted))
    },

    updateCheckbox(idProject, idCheckbox){
      const indexProject = this.projects.findIndex(project => project.id == idProject)
      const index = this.projects[indexProject].todo.findIndex(item => item.id == idCheckbox)
      console.log(index)
    },

    async fetch() {
      const projects = await axiosWrapper.get(`${baseUrl}/project`)
      if (projects) {
        this.projects = projects.data
      }
      // this.addPercent()
    },
    
    async add(data) {
      const project = await axiosWrapper.post(`${baseUrl}/project`, data, true)
      this.project = project.data
      return project
    },

    async get(id) {
      const project = await axiosWrapper.get(`${baseUrl}/project/${id}`)
      this.project = project.data
      return project
    }
  }
})