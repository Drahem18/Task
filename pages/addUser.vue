<template>
  <div class="padd">
    <div class="flexx">
      <div class="titles">
        <h3 class="page-title">Users</h3>
        <p class="route">
          <NuxtLink to="/">Users </NuxtLink>
          <NuxtLink> > Add user</NuxtLink>
        </p>
      </div>
    </div>

    <form @submit.prevent="submit">
      <div class="adduser">
        <div>
          <h2>Add user account</h2>
          <p>Add photo and personal details here</p>
        </div>
        <div class="buttons">
          <button class="btn-white" @click="resetForm">Reset</button>
          <button class="btn-red" @click="submit">Add</button>
        </div>
      </div>

      <div class="line"></div>

      <div class="form">
        <h2>Account info</h2>

        <div class="content">
          <label for="">Name</label>
          <div>
            <input v-model="firstName" type="text" name="" id="" required />
            <input v-model="lastName" type="text" name="" id="" required />
          </div>
        </div>
        <div class="content">
          <label for="">Email Address</label>
          <input v-model="email" type="text" name="" id="" required />
        </div>
        <div class="content">
          <label for="">Password</label>
          <input v-model="password" type="text" name="" id="" required />
        </div>
        <div class="content">
          <label for="">Role</label>
          <input v-model="role" type="text" name="" id="" />
        </div>
        <div class="content">
          <label for="">Photo</label>
          <input v-model="photo" type="text" name="" id="" />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["user-auth"],
});
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const role = ref("admin");
const photo = ref("none");

const name = computed(() => `${firstName.value} ${lastName.value}`);
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
      name: name.value,
      email: email.value,
      password: password.value,
      role: "admin",
      avatar:
        "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    });
    navigateTo("/");
  } catch (e) {
    console.error("Error adding user:", error || e);
  }
};

const resetForm = () => {
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  password.value = "";
  role.value = "";
  photo.value = "";
};
</script>

<style lang="scss" scoped>
.padd {
  width: 100%;
  background-color: #fcfcfd;
  padding: 20px;
}
.flexx {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: end;
  .titles {
    .page-title {
      font-size: 32px;
      font-weight: 600;
      line-height: 38.4px;
    }

    .route {
      //styleName: Text md/Regular;
      font-family: Inter;
      font-size: 16px;
      font-weight: 400;
      margin-top: 5px;

      a {
        text-decoration: none;
        color: #858589;
        cursor: pointer;
      }
    }
  }
}
.adduser {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    h2 {
      font-size: 18px;
      font-weight: 600;
      color: #101828;
      margin-bottom: 10px;
    }
    p {
      font-size: 14px;
      font-weight: 500;
      color: #858589;
    }
  }

  .buttons {
    display: flex;
    gap: 10px;
    button {
      padding: 8px 0px;
      width: 80px;
    }
  }
}
.line {
  margin-top: 20px;
  width: 100%;
  border: 1px solid #eaeaea;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 20px;
  width: 70%;
  h2 {
    font-size: 20px;
    font-weight: 600;
  }
}

form {
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      display: flex;
      gap: 20px;
      width: 50%;
    }
    label {
      width: 400px;
      font-size: 14px;
      font-weight: 600;
    }

    input {
      border: 1px solid #dddcd8;
      box-shadow: 0px 1px 2px 0px #1018280d;
      padding: 10px 14px 10px 14px;
      gap: 8px;
      border-radius: 4px;
      width: 50%;
    }
    input:focus {
      outline: none;
    }
  }
}
</style>
