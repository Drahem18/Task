<template>
  <div class="mainn">
    <div class="padd" :class="blocked ? 'bg-red' : ''">
      <div class="flexx">
        <div class="titles">
          <h3 class="page-title">Users</h3>
          <p class="route">
            <NuxtLink to="/">Users </NuxtLink>
            <NuxtLink> > user profile</NuxtLink>
          </p>
        </div>
        <div class="buttons">
          <button class="btn-red" @click="blocked = !blocked">
            <span
              ><Icon name="ph:prohibit-inset" size="20" />
              {{ blocked ? "Unblock" : "Block" }}</span
            >
          </button>
          <button class="btn-white">
            <span
              ><Icon name="material-symbols:delete-outline" size="20" />
              Delete</span
            >
          </button>

          <button class="btn">
            <span><Icon name="pepicons-pop:dots-y" size="20" /> </span>
          </button>
        </div>
      </div>

      <div class="avatar">
        <div class="img-container">
          <img :src="user?.avatar" />
        </div>
        <div class="avatar-content" :class="blocked ? 'red' : 'black'">
          <div>
            <Icon name="ph:prohibit" size="20" v-if="blocked" />
            <span>{{ user?.name }}</span>
          </div>
          <p>{{ user?.id }}</p>
        </div>
      </div>

      <div class="actives">
        <p
          @click="userActive = 'active'"
          :class="userActive === 'active' ? 'active' : ''"
        >
          Account
        </p>
      </div>

      <div class="line"></div>
    </div>

    <div class="account-info">
      <div class="edit-btn">
        <button class="btn-white">
          <Icon name="ph:pencil-simple-line" /> Edit
        </button>
      </div>

      <div class="data">
        <h2 class="title">Account info</h2>
        <div class="subtitle">
          <h2>Name</h2>
          <p>{{ user?.name }}</p>
          <div class="linee"></div>
        </div>
        <div class="subtitle">
          <h2>Email Address</h2>
          <p>{{ user?.email }}</p>
          <div class="linee"></div>
        </div>
        <div class="subtitle">
          <h2>Role</h2>
          <p>{{ user?.role }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ["user-auth"],
});

const blocked = ref(true);
const userActive = ref("active");
const route = useRoute();

const query = gql`
  query user($ID: ID!) {
    user(id: $ID) {
      id
      name
      creationAt
      email
      avatar
      role
    }
  }
`;

interface User {
  id: number;
  name: string;
  creationAt: string;
  email: string;
  avatar: string;
  role: string;
}

interface GetUsersQueryResult {
  user: User;
}

const { data } = await useAsyncQuery<GetUsersQueryResult>(query, {
  ID: route.params.id,
});

const user = ref<User | null>(null);

watchEffect(() => {
  if (data.value) {
    user.value = data.value.user;
  }
});
</script>

<style scoped lang="scss">
.mainn {
  width: 100%;

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

    .buttons {
      display: flex;
      gap: 10px;
      height: 40px;
      justify-self: end;

      .btn-white {
        width: 105px;
        padding: 0 3px;
        background-color: white;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        transition: 0.2s ease;
        border: 1px solid #d0d5dd;
      }
      .btn-red {
        width: 105px;
        padding: 0 3px;
        background-image: $loginColor;
        border-radius: 8px;
        border: none;
        color: white;
        cursor: pointer;
        transition: 0.2s ease;
        border: 1px solid #d0d5dd;
      }
      .btn {
        border: 1px solid #d0d5dd;
        background-color: white;
        border-radius: 8px;
        border: none;
        color: #858589;
        cursor: pointer;
        transition: 0.2s ease;
        height: 100%;
        padding: 0 3px;
        border: 1px solid #d0d5dd;
      }
      button {
        span {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      button:hover {
        transform: scale(1.05);
      }
      button:active {
        transform: scale(0.95);
      }
    }
  }
  .avatar {
    margin-top: 30px;
    display: flex;
    align-items: center;
    gap: 10px;

    .img-container {
      position: relative;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .avatar-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;

      div {
        span {
          font-size: 24px;
          font-weight: 500;
          line-height: 28.8px;
        }
      }
      p {
        font-size: 18px;
        font-weight: 400;
      }
    }
    .red {
      color: #b71a2a;
    }
  }
  .actives {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    margin-bottom: 20px;

    .active {
      background: linear-gradient(90deg, #ef3e2c 0%, #e71f63 100%);
      background-clip: text;
      -webkit-text-fill-color: transparent;
      position: relative;
    }
    .active::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      right: 0;
      top: 38px;
      background: linear-gradient(90deg, #ef3e2c 0%, #e71f63 100%);
    }
    p {
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
    }
  }

  .line {
    height: 2px;
    background: #eaecf0;
  }

  .bg-red {
    background-color: #fef7f7;
  }
  .padd {
    padding: 20px 20px 0 20px;
  }

  .account-info {
    background-color: #fcfcfd;
    padding: 20px;
    .edit-btn {
      display: flex;
      justify-content: end;

      .btn-white {
        width: 105px;
        padding: 8px 0px;
        background-image: white;
        border-radius: 8px;
        border: none;
        color: #344054;
        cursor: pointer;
        transition: 0.2s ease;
        background-color: white;
        border: 1px solid #d0d5dd;
      }
      button:hover {
        transform: scale(1.05);
      }
      button:active {
        transform: scale(0.95);
      }
    }
  }

  .data {
    padding: 20px;
    .title {
      font-size: 20px;
      font-weight: 600;
      color: #101828;
    }
    .subtitle {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-top: 30px;
      h2 {
        font-size: 16px;
        font-weight: 500;
      }
      p {
        font-size: 14px;
        font-weight: 400;
        color: #858589;
      }
      .linee {
        border: 1px solid #eaeaea;
      }
    }
  }
}
</style>
