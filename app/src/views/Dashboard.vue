<template>
  <div class="container d-flex justify-content-center flex-column my-4">
    <h1 v-if="appointments.length > 0" class="mb-4 display-5 fw-bold">
      Your Appointment
    </h1>
    <h1 v-else class="mb-4 display-5 fw-bold text-center">
      You don't have any appointment yet.
    </h1>
    <ul
      v-for="appointment in appointments"
      :key="appointment.id"
      class="list-group"
    >
      <li
        class="
          list-group-item
          d-flex
          justify-content-between
          align-items-center
          mb-3
          accordion-item
        "
      >
        <span>{{ appointment.day }} At {{ appointment.hour }}</span>
        <button
          @click="handleDeleteAppointment(appointment)"
          class="btn btn-outline-danger"
        >
          Cancel
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  methods: {
    handleDeleteAppointment({ id }) {
      var requestOptions = {
        method: "DELETE",
        redirect: "follow",
      };

      fetch(`http://localhost:8000/api/appointment/${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => this.getAppointments())
        .catch((error) => console.log("error", error));
    },
    getAppointments() {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        `http://localhost:8000/api/user/${localStorage.getItem("ref")}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          this.appointments = result.map((cur) => {
            switch (+cur.time) {
              case 1:
                return { ...cur, hour: "08-10 am" };
              case 2:
                return { ...cur, hour: "10-12 am" };
              case 3:
                return { ...cur, hour: "14-16 pm" };
              case 4:
                return { ...cur, hour: "16-18 pm" };
            }
          });
        })
        .catch((error) => console.log("error", error));
    },
  },
  data() {
    return {
      appointments: [],
    };
  },
  created() {
    this.getAppointments();
  },
};
</script>

<style>
.accordion-item {
  transition: 0.3s;
}
.accordion-item:hover {
  transform: scale(1.04);
}
</style>