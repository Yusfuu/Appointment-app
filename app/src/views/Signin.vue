<template>
  <div class="container-fluid">
    <div class="row no-gutter" style="flex-direction: row">
      <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
      <div class="col-md-8 col-lg-6">
        <div class="login d-flex align-items-center py-5">
          <div class="container">
            <div class="row">
              <div class="col-md-9 col-lg-8 mx-auto">
                <h3 class="login-heading" style="font-weight: 500">
                  Create an account
                </h3>
                <p class="text-muted mb-3 fw-normal" style="font-size: 0.9rem">
                  Go Back ?
                  <router-link style="color: #1473e6" :to="{ name: 'Home' }"
                    >Home</router-link
                  >
                </p>

                <div>
                  <div class="form-label-group">
                    <input
                      v-model.trim="user.email"
                      type="email"
                      class="form-control"
                      id="email"
                      placeholder="Email address"
                      required
                      autofocus
                    />
                    <label for="email">Email</label>
                    <div
                      v-if="emailError.is"
                      :style="{
                        display: emailError.is ? 'block !important' : 'none',
                      }"
                      class="invalid-feedback"
                    >
                      {{ emailError.message }}
                    </div>
                  </div>

                  <div class="form-label-group">
                    <input
                      v-model.trim="user.password"
                      type="password"
                      class="form-control"
                      id="password"
                      placeholder="Password"
                      required
                    />
                    <label for="password">Password</label>
                    <div
                      v-if="passwordError.is"
                      :style="{
                        display: passwordError.is ? 'block !important' : 'none',
                      }"
                      class="invalid-feedback"
                    >
                      {{ passwordError.message }}
                    </div>
                  </div>
                  <div class="form-label-group">
                    <button
                      @click="handleSubmit"
                      class="btn btn-lg btn-primary btn-block btn-login"
                      id="submit"
                    >
                      <span> Create an account </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signup",
  props: {
    method: { type: Function },
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      emailError: {
        is: false,
        message: "",
      },
      passwordError: {
        is: false,
        message: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      const user = { ...this.user };
      if (this.validEmail(user.email)) {
        const formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("password", user.password);

        const requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };

        fetch("http://localhost:8000/api/user/signin", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data.message) {
              if (data.message.includes("password")) {
                this.passwordError.is = true;
                this.passwordError.message = data.message;
              }
            } else {
              this.$store.dispatch("user", data);
              const { token, dd } = data;
              localStorage.setItem("token", token);
              localStorage.setItem("ref", dd.ref);
              this.$router.push({ name: "Dashboard" });
            }
          })
          .catch((error) => console.log("error", error));
      } else {
        this.emailError.is = true;
        this.emailError.message = "email invalid";
      }
    },
    validEmail(val) {
      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi.test(val);
    },
  },
};
</script>

<style>
:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: 0.75rem;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.login,
.image {
  min-height: 100vh;
}

.bg-image {
  background-image: url("https://images.unsplash.com/photo-1539815208687-a0f05e15d601?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80");
  background-size: cover;
  background-position: center;
}

.btn-login {
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group > input,
.form-label-group > label {
  padding: var(--input-padding-y) var(--input-padding-x);
  height: auto;
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  line-height: 1.5;
  color: #495057;
  cursor: text;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}

#submit {
  background: linear-gradient(65deg, #0270d7 0, #0f8afd 100%);
  border: none;
  border-radius: 2px;
  transition: 0.3s;
  position: relative;
}

#submit:hover {
  background: linear-gradient(65deg, #0275e1 0, #198ffd 100%);
}
</style>