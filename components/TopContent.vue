<template>
  <div class="mainnnn">
    <div class="flexx">
      <div class="titles">
        <h3 class="page-title">Users</h3>
        <p class="route">
          <NuxtLink to="/">Users</NuxtLink>
        </p>
      </div>
      <div class="buttons">
        <button class="btn-white">
          <span
            ><Icon name="material-symbols:download" size="20" /> Export</span
          >
        </button>

        <button class="btn-red" @click="adduser">
          <span><Icon name="material-symbols:add" size="20" /> Add User</span>
        </button>
      </div>
    </div>

    <div class="actives">
      <p
        @click="userActive = 'active'"
        :class="userActive === 'active' ? 'active' : ''"
      >
        Active users
      </p>
      <p
        @click="userActive = 'blocked'"
        :class="userActive === 'blocked' ? 'active' : ''"
      >
        blocked users
      </p>
    </div>

    <div class="line"></div>
  </div>
</template>

<script setup lang="ts">
const userActive = ref("active");

const adduser = () => {
  navigateTo("/addUser");
};
</script>

<style scoped lang="scss">
.flexx {
  display: flex;
  justify-content: space-between;

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
        color: black;
      }
    }
  }

  .buttons {
    display: flex;
    gap: 10px;
    height: 40px;

    .btn-white {
      width: 105px;
      height: 100%;
      background-color: white;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      transition: 0.2s ease;
    }
    .btn-red {
      width: 105px;
      height: 100%;
      background-image: $loginColor;
      border-radius: 8px;
      border: none;
      color: white;
      cursor: pointer;
      transition: 0.2s ease;
    }
    button {
      box-shadow: 0px 1px 2px 0px #1018280d;
      border: 1px solid #d0d5dd;
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
    //styleName: Text sm/Semibold;
    font-size: 14px;
    font-weight: 600;
  }
}

.line {
  height: 2px;
  background: #eaecf0;
}
</style>
