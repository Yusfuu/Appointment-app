<template>
  <div class="container d-flex justify-content-center my-4">
    <!-- Modal -->

    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              Appointments Scheduling successfully
            </h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              aria-label="Close"
              data-bs-dismiss="modal"
              class="btn btn-primary"
            >
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="w-25">
      <h1 class="display-5 fw-bold">{{ title }}</h1>
      <div class="input-group">
        <input
          @change="handlePick"
          v-model.trim="datetime"
          type="date"
          class="form-control"
          :min="new Date().toISOString().slice(0, 10)"
        />
      </div>
      <div class="flexing">
        <div
          v-for="(slot, idx) in slots"
          :key="idx"
          class="accordion"
          id="accordionFlushExample"
        >
          <div class="accordion-item">
            <h2 class="accordion-header" :class="['flush-' + idx]">
              <button
                class="
                  d-flex
                  align-items-center
                  class-gap
                  accordion-button
                  collapsed
                "
                :disabled="slot.slot"
                :data-bs-toggle="!slot.slot ? 'collapse' : ''"
                :data-bs-target="['#flush-' + idx]"
                aria-expanded="false"
                :aria-controls="['flush-' + idx]"
                :class="['flush-' + idx]"
              >
                <div>{{ slot.hour }}</div>
                <div v-if="!slot.slot" class="badge bg-success">Available</div>
                <span v-else class="badge bg-danger">Not Available</span>
              </button>
            </h2>
            <div
              :id="['flush-' + idx]"
              :class="'accordion-collapse collapse'"
              data-bs-parent="#accordionFlushExample"
            >
              <div v-if="!slot.slot" class="accordion-body">
                <button
                  @click="handleAppointment(slot.time)"
                  type="button"
                  class="btn btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Get Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Appointment",
  props: {},
  data() {
    return {
      datetime: "",
      slots: [],
      title: "",
    };
  },
  mounted() {},
  methods: {
    handlePick() {
      const day = this.datetime;

      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      const time = ["08-10 am", "10-12 am", "14-16 pm", "16-18 pm"];

      fetch(`http://localhost:8000/api/appointment/${day}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          this.slots = result.map((cur, idx) => ({ ...cur, hour: time[idx] }));
        })
        .catch((error) => console.log("error", error));
    },
    handleAppointment(val) {
      const formdata = new FormData();
      formdata.append("day", this.datetime);
      formdata.append("ref", localStorage.getItem("ref"));
      formdata.append("time", val);

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch("http://localhost:8000/api/appointment", requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      this.handlePick();
    },
  },
};
</script>

<style>
.class-gap {
  column-gap: 15px;
}
.accordion-item {
  transition: 0.3s;
}
.accordion-item:hover {
  transform: scale(1.06);
}
.flexing {
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  margin: 50px 0;
}
</style>