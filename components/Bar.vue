<template>
  <div class="container">
    <div class="bar">
      <div class="search">
        <Icon class="icon" name="material-symbols-light:search" size="30" />
        <input type="text" />
      </div>

      <div class="buttons">
        <button>
          <Icon name="mdi:calendar-blank" size="20" /> Jan 6, 2022 – Jan 13,
          2022
        </button>
        <button><Icon name="ph:funnel-simple" size="20" /> Filters</button>
      </div>
    </div>

    <div class="all-users">
      <div class="title">
        <h3>All users</h3>
        <button><Icon name="mage:dots" size="20" /></button>
      </div>

      <AllUsersTable />
    </div>
  </div>
</template>

<script setup>
let search = ref("");
</script>

<style scoped lang="scss">
.container {
  margin-top: 20px;

  .bar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .buttons {
      display: flex;
      gap: 10px;
      button {
        padding: 6px;
        font-size: 14px;
        font-weight: 500;
        border-radius: 8px;
        border: 1px solid #d0d5dd;
        background-color: white;
        transition: 0.2s ease;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      button:hover {
        transform: scale(1.05);
      }
      button:active {
        transform: scale(0.95);
      }
    }
    .search {
      position: relative;
      width: 400px;

      .icon {
        position: absolute;
        left: 5px;
        top: 5px;
        color: #9d9c99;
      }
      input {
        width: 100%;
        padding: 6px;
        border-radius: 8px;
        padding: 10px 16px 10px 45px;
        border-radius: 8px;
        border: 1px solid #d0d5dd;
      }

      input:focus {
        outline: none;
      }
    }
  }

  .all-users {
    border-radius: 12px;
    border: 1px solid #dddcd8;
    opacity: 0px;
    margin-top: 20px;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;

      h3 {
        //styleName: Text lg/Medium;
        font-family: Inter;
        font-size: 18px;
        font-weight: 500;
      }

      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
      }
    }
  }
}
</style>
