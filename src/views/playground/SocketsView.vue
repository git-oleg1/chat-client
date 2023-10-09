<template>
  <v-main style="display: flex; flex-direction: column;">
    <div class="mx-5 my-5" style="flex: 1">
      <v-sheet border="md" rounded>
        <v-toolbar title="График">
        </v-toolbar>
        <div>
          <Bar :data="data" :options="options" />
        </div>
      </v-sheet>
    </div>
  </v-main>
</template>

<script lang="ts" setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
// import { reactive, watch } from 'vue';
// import { useSocket } from '@/plugins/socket';
// const API_URL = import.meta.env.VITE_API_URL;
// const socket = useSocket();

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  datasets: [
    {
      label: 'События',
      backgroundColor: '#f87979',
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: false
}

</script>
