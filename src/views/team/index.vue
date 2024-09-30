<template>
  <div class="border rounded-[10px]">
    <ul class="flex flex-col border-[#F9FBFE] divide-y-2">
      <li class="py-1.5 shrink-0 flex flex-row items-center font-bold bg-base-Section rounded-t-[10px]">
        <div class="py-4 px-5">
          #
        </div>
        <div class="py-4 px-5 flex-1">
          Nama Personil
        </div>
        <div class="py-4 px-5 flex-1">
          Email
        </div>
        <div class="py-4 px-5 flex-1">
          No Telepon
        </div>
      </li>
      <li v-for="(user, index) in fetchTeam" class="py-1.5 shrink-0 flex flex-row items-center">
        <div class="py-4 px-5">
          {{ index + 1 }}
        </div>
        <div class="py-4 px-5 flex-1 font-bold">
          {{ user.name }}
        </div>
        <div class="py-4 px-5 flex-1">
          {{ user.email }}
        </div>
        <div class="py-4 px-5 flex-1">
          {{ user.phone_number }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { useTeamStore } from '@/stores/team.store';
import { useProjectStore } from '@/stores/project.store'

export default {
  data() {
    return {
      teamStore: useTeamStore(),
      projectStore: useProjectStore(),
    }
  },
  computed:{
    fetchTeam(){
      this.teamStore.get(this.projectStore.project.id)
      return this.teamStore.teams
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const formattedDate = date.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // 24-hour format
      });
      return formattedDate.replace(',', '').replace(':', '.');
    }
  }
}
</script>