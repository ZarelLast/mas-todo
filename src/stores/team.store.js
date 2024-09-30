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
    async get(projectId) {
      const teams = await axiosWrapper.get(`${baseUrl}/team/${projectId}`)
      this.teams = teams.data
    },

    async add(data) {
      const team = await axiosWrapper.post(`${baseUrl}/team`, data, true)
      this.team = team.data
      return team
    },

    async delete(projectId) {
      return (await axiosWrapper.delete(`${baseUrl}/team/${projectId}`, {}, true))
    },

    async deleteAlert(title, projectId, swal, toHome) {
      swal.fire({
        title: `Keluar dari Project ${title}`,
        text: "Apa anda yakin ingin keluar dari project ini?",
        iconHtml: `<div class="rounded-full px-4 py-1 border-4 border-Text-100">
        <i class="ri-logout-box-r-line text-Text-100" />
        </div>`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        showCancelButton: true,
        confirmButtonText: "Keluar",
        cancelButtonText: "Batal",
        reverseButtons: true,
        customClass: {
          popup: 'p-3 rounded-2xl !flex flex-col',
          icon: 'bg-W-600 px-0 py-16 m-0 rounded-2xl border-none w-full h-full',
          title: 'text-lg m-0 px-0 pt-6 text-left',
          htmlContainer: '!m-0 !p-0 !text-left',
          actions: 'flex flex-row flex-nowarp w-full gap-4 pt-6 m-0',
          confirmButton: 'flex-1 border-2 p-2 rounded-xl hover:bg-W-700 hover:border-W-700 border-W-600 bg-W-600 text-Text-100 font-semibold',
          cancelButton: 'flex-1 border-2 p-2 rounded-xl hover:bg-Text-300 hover:border-W-700 border-W-600 bg-Text-100 text-W-600 font-semibold',
        },
        buttonsStyling: false
      }).then((result) => {
        if (result.isConfirmed) {
          toHome()
          return this.delete(projectId)
        }
      })
    }
  }
})