<template>
  <!-- Users list -->
  <v-main style="display: flex; flex-direction: column;">
    <div class="mx-5 my-5" style="flex: 1">
    <v-sheet border="md" rounded>
      <v-toolbar title="Пользователи">
        <v-btn
        icon="mdi-plus"

        @click="userDialogInfo.show = true"
      ></v-btn>
      </v-toolbar>
      <v-data-table-server
      v-model:items-per-page="users.itemsPerPage"
      :headers="users.headers"
      :items-length="users.totalItems"
      :items="users.serverItems"
      :loading="users.loading"
      :search="users.search"
      class="elevation-1"
      item-value="name"
      @update:options="loadUsers"
    ></v-data-table-server></v-sheet>
  </div>
  </v-main>


  <!-- Form user -->
  <v-dialog
    v-model="userDialogInfo.show"
    persistent
    width="824"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">Профиль пользователя</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Имя*"
                v-model="userDialogInfo.userInfo.name"
                required
                :rules="[rules.required, rules.min5, rules.max20]"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Email*"
                v-model="userDialogInfo.userInfo.email"
                required
                :rules="[rules.required, rules.email]"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Пароль*"
                type="password"
                v-model="userDialogInfo.userInfo.password"
                required
                :rules="[rules.required, rules.min5, rules.max20]"
              ></v-text-field>
            </v-col>
            <!-- <v-col
              cols="12"
              sm="6"
            >
              <v-select
                :items="['0-17', '18-29', '30-54', '54+']"
                label="Возраст*"
                required
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-autocomplete
                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                label="Интересы"
                multiple
              ></v-autocomplete>
            </v-col> -->
          </v-row>
        </v-container>
        <small>* указывает обязательное поле</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-4"
          variant="text"
          @click="userDialogInfo.show = false"
        >
          Закрыть
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="saveUser"
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Conform dialog -->
  <v-dialog
    v-model="confirmDialogInfo.show"
    width="1024"
  >
    <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <div>{{ confirmDialogInfo.title }}</div>
          <v-spacer></v-spacer>
          <v-btn @click="confirmDialogInfo.result = false; confirmDialogInfo.show = false;">Отмена</v-btn>
          <v-btn @click="confirmDialogInfo.result = true; confirmDialogInfo.show = false;">Сохранить</v-btn>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue';
import type { CreateUserInfo } from '@/types';
import { VDataTableServer } from 'vuetify/labs/VDataTable';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

interface UserInfo {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

interface UsersPage {
  items: UserInfo[];
  total: number;
}

interface UserDialogInfo {
  show: boolean;
  userInfo: CreateUserInfo;
}

interface ConfirmDialogInfo {
  show: boolean;
  title: string;
  result: undefined | boolean;
}

const confirmDialogInfo = reactive<ConfirmDialogInfo>({
  show: false,
  title: '',
  result: undefined,
});

/**
 * Показать\скрыть диалог профиля пользователя
 */
const userDialogInfo = reactive<UserDialogInfo>({
  show: false,
  userInfo: {
    name: '',
    email: '',
    password: '',
  },
});

const rules = {
  required: (value: any) => !!value || 'Заполните поле',
  email: (value: string) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Invalid e-mail.'
  },
  min5: (value: string) => value.length >= 5 || 'Введите не меньше 5 символов',
  max20: (value: string) => value.length <= 20 || 'Введите не больше 20 символов',
  max50: (value: string) => value.length <= 50 || 'Введите не больше 50 символов',
}

const users = reactive({
  itemsPerPage: 5,
  headers: [
    {
      title: 'ФИО',
      // align: 'start',
      sortable: false,
      key: 'name',
    },
    {
      title: 'Email',
      // align: 'start',
      sortable: false,
      key: 'email',
    },
    {
      title: 'Пароль',
      // align: 'start',
      sortable: false,
      key: 'password',
    },
  ],
  search: '',
  serverItems: [] as UserInfo[],
  loading: true,
  totalItems: 0,
});

const loadUsers = (payload: { page: number; itemsPerPage: number; sortBy?: string; }) => {
  users.loading = true;
  axios.get<UsersPage>(`${API_URL}/user`, { params: payload }).then(({ data }) => {
    users.serverItems = data.items.map((item) => ({ ...item, createdAt: new Date(item.createdAt) }));
    users.totalItems = data.total;
    users.loading = false;
  });
};

/**
 * Показывает\Скрывает диалог подтверждения операции.
 * Возвращает Promise<bool>. Резолвится когда confirmDialogInfo.result = <true|false>
 */
const confirmDialog = async (options: false | { title: string; }): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    confirmDialogInfo.result = undefined;
    if (options !== false) {
      confirmDialogInfo.show = true;
      confirmDialogInfo.title = options.title;
    } else {
      confirmDialogInfo.show = false;
      confirmDialogInfo.title = '';
    }
    const unwatch = watch(() => confirmDialogInfo.result, (result) => {
      if (result === undefined) return;
      unwatch();
      resolve(result)
    });
  })

}

const saveUser = async () => {
  confirmDialog({ title: 'Сохранить данные пользователя?' })
    .then((value: boolean) => {
      if (value) {
        axios.post(`${API_URL}/user`, userDialogInfo.userInfo).then(() => {
          userDialogInfo.show = false;
          loadUsers({ page: 1, itemsPerPage: users.itemsPerPage })
        });
      }
    })
}
</script>
