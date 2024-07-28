<template>
  <div class="containerr">
    <div class="header">
      <h3 class="title">Sign In to your Account</h3>
      <p>Welcome back! please enter your detail</p>
    </div>
    <form @submit.prevent="submit">
      <div class="inputs">
        <div class="relative">
          <span class="icon"><Icon name="ph:user" size="20" /></span>
          <input
            type="text"
            name="username"
            placeholder="Username"
            v-model="userName"
            required
          />
        </div>
        <div class="relative">
          <span class="icon"><Icon name="carbon:email" size="20" /></span>
          <input
            type="email"
            name="email"
            v-model="email"
            placeholder="Email"
            required
          />
        </div>
        <div class="relative">
          <span class="icon"
            ><Icon name="mdi:password-outline" size="20"
          /></span>
          <input
            placeholder="Password"
            :type="show ? 'text' : 'password'"
            name="password"
            v-model="password"
            required
            class="password"
          />
          <span class="show" @click="show = !show"
            ><Icon name="ph:eye-slash" size="20"
          /></span>

          <p
            class="pass-hint"
            :class="{ hidden: password.length > 8 || password.length === 0 }"
          >
            <Icon name="gg:info" size="15" class="iconn" /> {{ errorr }}
          </p>
        </div>
      </div>
      <div class="check">
        <div class="flex">
          <input type="checkbox" name="check" v-model="checkbox" required />
          <label for="check">
            By creating an account means you agree to the
            <span>Terms & Conditions</span> and our
            <span>Privacy Policy</span></label
          >
        </div>
      </div>

      <div class="center">
        <button type="submit" @click="" class="submit">Sign Up</button>

        <p>
          Already have an account?
          <NuxtLink class="link" to="/signin"> Log In </NuxtLink>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const errorr = ref(
  "Your password is not strong enough. Use at least 8 characters "
);
const checkbox = ref(false);
const show = ref(false);
const userName = ref("youssef");
const lastName = ref("drahem");
const email = ref("a@a.com");
const password = ref("123123123");

const ADD_USER_MUTATION = gql`
  mutation AddUser(
    $name: String!
    $email: String!
    $password: String!
    $avatar: String!
    $role: Role
  ) {
    addUser(
      data: {
        name: $name
        email: $email
        password: $password
        avatar: $avatar
        role: $role
      }
    ) {
      id
      name
      avatar
      role
    }
  }
`;

const { mutate: addUserMutation, error } = useMutation(ADD_USER_MUTATION);
const submit = async () => {
  try {
    const response = await addUserMutation({
      name: userName.value,
      email: email.value,
      password: password.value,
      avatar:
        "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      role: "admin",
    });
    console.log("User added successfully:", response?.data.addUser);
  } catch (e) {
    console.error("Error adding user:", error || e);
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

      input:focus {
        border: 1px solid #eb2e48;
      }

      .show {
        position: absolute;
        right: 10px;
        top: 17px;
        color: #858589;
        cursor: pointer;
      }
      .pass-hint {
        display: flex;
        align-items: center;
        gap: 5px;
        background: linear-gradient(90deg, #ef3e2c 0%, #e71f63 100%);
        background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 500;

        font-size: 12px;
        font-weight: 400;
        margin-top: 12px;
        transition: 1s ease-in-out;

        .iconn {
          color: #eb2e48;
        }
      }
      .hidden {
        visibility: hidden;
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
      input {
        width: 20px;
        height: 20px;
      }
    }
    label {
      font-size: 12px;
      font-weight: 400;
      color: #858589;

      span {
        font-weight: 500;
        color: black;
        cursor: pointer;
      }
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

    .submit {
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
  }
}
</style>
