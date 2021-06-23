<template>
  <header class="p-3" style="border: 1px solid #dbdbdb">
    <div class="container">
      <div
        class="
          d-flex
          flex-wrap
          align-items-center
          justify-content-center justify-content-lg-start
        "
      >
        <router-link
          class="
            d-flex
            align-items-center
            mb-3 mb-md-0
            me-md-auto
            text-dark text-decoration-none
          "
          :to="{ name: 'Home' }"
          ><span class="fs-4">App</span></router-link
        >

        <ul
          class="
            nav
            col-12 col-lg-auto
            me-lg-auto
            mb-2
            justify-content-center
            mb-md-0
          "
        >
          <li>
            <router-link class="nav-link px-2 text-dark" :to="{ name: 'Home' }"
              >Home</router-link
            >
          </li>
        </ul>
        <div v-if="!user" class="text-end">
          <router-link
            class="btn btn-outline-primary mx-2 text-decoration-none"
            :to="{ name: 'Signin' }"
            >Login</router-link
          >
          <router-link
            class="btn btn-primary text-decoration-none"
            :to="{ name: 'Signup' }"
            >Sign-up</router-link
          >
        </div>
        <div v-else class="flex-shrink-0 dropdown">
          <a
            href="#"
            class="d-block link-dark text-decoration-none dropdown-toggle"
            id="dropdownUser2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://img.icons8.com/fluent/96/000000/user-male-circle.png"
              alt="mdo"
              width="32"
              height="32"
              class="rounded-circle"
            />
          </a>
          <ul
            class="dropdown-menu text-small shadow"
            aria-labelledby="dropdownUser2"
          >
            <li>
              <span style="cursor: default" class="dropdown-item fw-bold"
                >{{ user.dd.firstName }} {{ user.dd.lastName }}</span
              >
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <router-link
                class="dropdown-item text-decoration-none"
                :to="{ name: 'Dashboard' }"
                >Dashboard</router-link
              >
            </li>
            <li>
              <router-link
                class="dropdown-item text-decoration-none"
                :to="{ name: 'Appointment' }"
                >Appointment</router-link
              >
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <div
                style="cursor: pointer"
                @click="handleLogout"
                class="dropdown-item"
              >
                Sign out
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import actions from "../request/action";
import { mapGetters } from "vuex";
export default {
  name: "Header",
  methods: {
    handleLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("ref");
      this.$store.dispatch("user", null);
      this.$router.push({ name: "Signin" });
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["user"]),
  },
  created() {},
  mounted() {},
};
</script>

<style>
</style>