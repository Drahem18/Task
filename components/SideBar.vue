<template>
  <div class="nav">
    <div class="fixed">
      <div class="links">
        <div v-for="(link, index) in links" class="link" :class="link.class">
          <NuxtLink to="/"
            ><div class="icon-link">
              <Icon :name="link.icon" size="20" /> {{ link.name }}
            </div>
          </NuxtLink>
        </div>
      </div>

      <div class="user-data">
        <div class="img-container">
          <img src="https://i.imgur.com/LDOO4Qs.jpg" class="img" />
        </div>
        <div class="data">
          <h3>Oliva</h3>
          <p>admin</p>
        </div>
        <div class="log-container">
          <Icon
            name="ic:baseline-log-out"
            size="30"
            class="logout"
            @click="logout"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const links = [
  { name: "Home", class: "", icon: "ph:house", link: "/" },
  { name: "Users", class: "active", icon: "ph:users-four-light", link: "/" },
  { name: "Experts", class: "", icon: "ph:seal-check", link: "/" },
  { name: "Content", class: "", icon: "ph:square-half", link: "/" },
  { name: "Rooms", class: "", icon: "ph:chats-circle", link: "/" },
  { name: "App Management", class: "", icon: "ph:note-pencil", link: "/" },
];

const logout = () => {
  const tokens = useCookie("accessToken");
  tokens.value = null;
  navigateTo("/signIn");
};

const user = ref({
  name: "",
  avatar: "",
  role: "",
});
</script>

<style scoped lang="scss">
.nav {
  min-height: 100vh;
  width: 270px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-top: 70px;
  .fixed {
    position: fixed;

    display: flex;
    height: 90vh;
    flex-direction: column;
    justify-content: space-between;
    align-items: self-end;

    .links {
      display: flex;
      flex-direction: column;
      width: 100%;

      .link {
        display: flex;
        align-items: center;
        padding: 20px;
        padding: 8px 12px 8px 12px;
        gap: 0px;
        border-radius: 6px;
        opacity: 0px;
        transition: 0.2s ease;
        cursor: pointer;

        .icon-link {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        a {
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          line-height: 19.2px;
          color: inherit;
          width: 100%;
        }
      }

      .link:hover {
        background-image: $loginColor;
        color: white;
      }
    }

    .active {
      background-image: $loginColor;
      color: white;
    }

    .user-data {
      justify-self: flex-end;
      width: 100%;
      display: flex;
      justify-content: start;
      gap: 10px;
      flex: auto;
      align-items: flex-end;
      justify-content: space-around;
      margin-bottom: 20px;

      .img-container {
        overflow: hidden;
        border-radius: 50%;
        .img {
          width: 40px;
          height: 40px;
        }
      }
      span {
        cursor: pointer;
        color: #667085;
      }
      .log-container {
        .logut {
          margin-right: 50px;
          cursor: pointer;
          color: #667085;
        }
      }
    }
  }
}
</style>
