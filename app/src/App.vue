<template>
  <Header />
  <router-view></router-view>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
  name: "App",
  components: { Header },
  data() {
    return {};
  },
  mounted() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8000/api/auth", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.$store.dispatch("user", result);
      })
      .catch((error) => console.log("error", error));
  },
};
</script>

<style>
</style>
