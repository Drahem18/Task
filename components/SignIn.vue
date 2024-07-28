<template>
  <div class="containerr">
    <div class="header">
      <h3 class="title">Sign In to your Account</h3>
      <p>Welcome back! please enter your detail</p>
    </div>
    <form @submit.prevent="signIn">
      <div class="inputs">
        <div class="relative">
          <span class="icon"><Icon name="carbon:email" size="20" /></span>
          <input
            type="email"
            name="email"
            v-model="email"
            required
            placeholder="Email"
          />
        </div>
        <div class="relative">
          <span class="icon"
            ><Icon name="mdi:password-outline" size="20"
          /></span>
          <input
            :type="show ? 'text' : 'password'"
            name="password"
            v-model="password"
            placeholder="Password"
            required
            class="password"
          />
          <span class="show" @click="show = !show"
            ><Icon name="ph:eye-slash" size="20"
          /></span>
        </div>
      </div>
      <div class="check">
        <div class="flex">
          <input type="checkbox" name="check" id="" />
          <label for="check"> Remember me</label>
        </div>
        <NuxtLink class="link"> Forgot Password?</NuxtLink>
      </div>

      <div class="center">
        <button type="submit" @click="">Sign In</button>

        <p>
          Don’t have an account?
          <NuxtLink class="link" to="/signup"> Sign Up </NuxtLink>
        </p>

        <p class="error">{{ loginError }}</p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Sign In",
});

const email = ref("");
const password = ref("");
const show = ref(false);
const loginError = ref("");

interface LoginResponse {
  login: {
    access_token: string;
    refresh_token: string;
  };
}

const LOG_IN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      refresh_token
    }
  }
`;

const { mutate } = useMutation<LoginResponse>(LOG_IN);

const signIn = async () => {
  try {
    const response = await mutate({
      email: email.value,
      password: password.value,
    });
    if (response?.data) {
      const token = response.data.login;
      useCookie("accessToken").value = token.access_token;
      useCookie("refreshToken").value = token.refresh_token;

      navigateTo("/");
    }
  } catch (err) {
    loginError.value = "Login failed! Please ary again";
    password.value = "";
    email.value = "";
  }
};
</script>

<style scoped lang="scss">
::placeholder {
  font-size: 16px;
  font-weight: 400;
}
.containerr {
  width: 50%;
}
.header {
  margin-bottom: 32px;
  .title {
    font-size: 24px;
    font-weight: 700;
  }
  p {
    font-size: 16px;
    font-weight: 400;
    color: #858589;
  }
}
form {
  display: flex;
  flex-direction: column;
  gap: 32px;
  .inputs {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .relative {
      position: relative;

      .icon {
        position: absolute;
        left: 10px;
        top: 17px;
        color: #858589;
      }
      input {
        padding-right: 40px;
      }
      .show {
        position: absolute;
        right: 10px;
        top: 17px;
        color: #858589;
        cursor: pointer;
      }
    }

    input {
      padding: 16px 16px;
      outline: 0;
      padding-left: 40px !important;
      border: 1px solid #dddcd8;
      width: 100%;
      font-size: 16px;
      font-weight: 500;

      // font: large;
    }

    input:focus {
      border: 1px solid #eb2e48;
    }

    input::before {
      content: "";
    }
  }
  .check {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    .flex {
      display: flex;
    }
    label {
      font-size: 14px;
      font-weight: 500;
    }

    input {
      accent-color: #ef3e2c;
      width: 16px;
      height: 16px;
      margin-right: 10px;
    }

    .link {
      font-size: 14px;
      background: $loginColor;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      cursor: pointer;
      font-weight: 700;
    }
  }

  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    button {
      width: 100%;
      padding: 16px;
      border-radius: 100px;
      border: none;
      background-image: $loginColor;
      color: white;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      margin-bottom: 32px;
    }

    .link {
      font-size: 14px;
      font-weight: 500;
      background: $loginColor;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      cursor: pointer;
    }
    p {
      font-weight: 400;
    }
    .error {
      color: #eb2e48;
      margin-top: 20px;
      font-weight: 500;
    }
  }
}
</style>
