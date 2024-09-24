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
    async add(data) {
      // const formData = {project_id: projectId, email: email}
      const team = await axiosWrapper.post(`${baseUrl}/team`, data, true)
      this.team = team.data
      // console.log('status',team.status)
      return team
      // false/true
      // sudah ada =false
      // email tidak ada = false
      // joined = true
    },

    // delete
    async delete(projectId){
      return await axiosWrapper.delete(`${baseUrl}/team/${projectId}`, {}, true)
    }
  }
})