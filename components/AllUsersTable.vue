<template>
  <div>
    <table>
      <thead>
        <tr class="header">
          <th class="name"><input type="checkbox" /> Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Created at</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="error">
          <td colspan="5">Error</td>
        </tr>
        <tr v-if="!users">
          <td colspan="5"><Spinner /></td>
        </tr>
        <tr v-else v-for="user in paginatedUsers" :key="user.id">
          <td>
            <NuxtLink :to="`/user/${user.id}`"
              ><div class="avatar">
                <input type="checkbox" />
                <div class="user-data">
                  <div class="img"><NuxtImg :src="user.avatar" /></div>
                  <div class="name-id">
                    <span>{{ user.name }}</span> {{ user.id }}
                  </div>
                </div>
              </div>
            </NuxtLink>
          </td>
          <td>
            <NuxtLink :to="`/user/${user.id}`">{{ user.email }} </NuxtLink>
          </td>
          <td>
            <NuxtLink :to="`/user/${user.id}`">{{ user.role }} </NuxtLink>
          </td>
          <td>
            <NuxtLink :to="`/user/${user.id}`">{{ user.creationAt }}</NuxtLink>
          </td>
          <td class="self">
            <Icon class="icon" name="ph:prohibit" size="20" />
            <NuxtLink :to="`/user/${user.id}`">
              <Icon class="icon-2" name="pepicons-pop:dots-y" size="20" />
            </NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="my-pagination">
      <Pagination :totalItems="totalItems" @page-changed="onPageChanged" />
    </div>
  </div>
</template>

<script setup lang="ts">
const query = gql`
  query {
    users {
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
  users: User[];
}

const { data, error } = await useAsyncQuery<GetUsersQueryResult>(query);

const users = ref<User[]>([]);
const currentPage = ref(1);
const itemsPerPage = ref(7);

const totalItems = computed(() => data.value?.users.length ?? 0);
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return users.value.slice(start, end);
});

const onPageChanged = (page: number) => {
  currentPage.value = page;
};

onMounted(() => {
  if (data.value) {
    users.value = data.value.users;
  }
});
</script>

<style scoped lang="scss">
table {
  width: 100%;
  border: none;
  border-collapse: collapse;
  .header {
    width: 100%;
    padding: 10px 20px;
    font-size: 12px;
    font-weight: 400;
    color: #475467;

    .name {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
  th,
  td {
    padding: 10px 20px;
    text-align: left;
    border: none;

    a {
      text-decoration: none;
      color: #475467;
    }
  }
  th {
    background-color: #f9fafb;
    padding: 10px 20px;
  }

  .avatar {
    display: flex;
    align-items: center;
    gap: 10px;

    .user-data {
      display: flex;
      align-items: center;
      gap: 10px;
      img {
        position: relative;
        width: 40px;
        height: 40px;
        border-radius: 200px;
        background-color: #c7b9da;
        overflow: hidden;
      }

      .name-id {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
    }
  }

  input {
    width: 16px;
    height: 16px;
    accent-color: #ef3e2c;
    border-radius: 6px;
    margin-right: 10px;
    border: 1px solid #d0d5dd;
    outline: none;
  }

  tbody {
    tr {
      border-bottom: 1px solid #eaecf0;
    }
    .self {
      display: flex;
      justify-content: end;
      gap: 20px;
    }
    td {
      .icon {
        color: #ef3e2c;
        cursor: pointer;
      }
      .icon-2 {
        color: #858589;
      }
    }
  }
}

.my-pagination {
  display: flex;
  justify-content: center;
  margin: 20px 0px;
}
</style>
