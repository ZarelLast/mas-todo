import { defineStore } from "pinia";
import { axiosWrapper } from "../helper/axios-wrapper";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useTeamStore = defineStore({
  id: 'team',
  state: () => ({
    teams: [],
    team: null
  }),
  actions: {

    // searchMember(val){
    //   return this.teams.filter((member)=> member.includes(val))
    // },
    
    // get
    async get(projectId){
      const teams = await axiosWrapper.get(`${baseUrl}/team/${projectId}`)
      this.teams = teams.data
    },

    // add
    async add(projectId, val) {
      const formData = {project_id: projectId, email: val}
      const todo = await axiosWrapper.post(`${baseUrl}/team`, formData, true)
      this.todo = todo.data
      return todo
    },

    // delete
    async delete(id){
      return await axiosWrapper.delete(`${baseUrl}/team/${id}`, {}, true)
    }
  }
})