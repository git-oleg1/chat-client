<template>
  <!-- Users list -->
  <v-main style="display: flex; flex-direction: column;">
    <div class="mx-5 my-5" style="flex: 1">
    <v-sheet border="md" rounded>
      <v-toolbar title="Чаты">
        <v-btn
        icon="mdi-plus"
        @click="chatDialogInfo.show = true"
      ></v-btn>
      </v-toolbar>
      <v-data-table-server
      v-model:items-per-page="chats.itemsPerPage"
      :headers="chats.headers"
      :items-length="chats.totalItems"
      :items="chats.serverItems"
      :loading="chats.loading"
      :search="chats.search"
      class="elevation-1"
      item-value="name"
      @update:options="loadChats"
    ></v-data-table-server></v-sheet>
  </div>
  </v-main>


  <!-- Form chat -->
  <v-dialog
    v-model="chatDialogInfo.show"
    persistent
    width="824"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">Чат</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Имя*"
                v-model="chatDialogInfo.chatInfo.name"
                required
                :rules="[rules.required, rules.max20]"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>* указывает обязательное поле</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-4"
          variant="text"
          @click="chatDialogInfo.show = false"
        >
          Закрыть
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="saveChat"
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
import type { CreateChatInfo } from '@/types';
import { VDataTableServer } from 'vuetify/labs/VDataTable';
import axios from 'axios';
import { useSocket } from '@/plugins/socket';

const API_URL = import.meta.env.VITE_API_URL;

interface ChatInfo {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

interface UsersPage {
  items: ChatInfo[];
  total: number;
}

interface ChatDialogInfo {
  show: boolean;
  chatInfo: CreateChatInfo;
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
const chatDialogInfo = reactive<ChatDialogInfo>({
  show: false,
  chatInfo: {
    name: '',
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

const chats = reactive({
  itemsPerPage: 5,
  headers: [
    {
      title: 'Название',
      sortable: false,
      key: 'name',
    },
  ],
  search: '',
  serverItems: [] as ChatInfo[],
  loading: true,
  totalItems: 0,
});

const loadChats = (payload: { page: number; itemsPerPage: number; sortBy?: string; }) => {
  chats.loading = true;
  socket.socket.emitWithAck('findAllChat', payload).then((data) => {
    chats.serverItems = data.items.map((item: ChatInfo) => ({ ...item, createdAt: new Date(item.createdAt) }));
    chats.totalItems = data.total;
    chats.loading = false;
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

const socket = useSocket();

const saveChat = async () => {
  confirmDialog({ title: 'Сохранить данные чата?' })
    .then((value: boolean) => {
      if (value) {
        socket.socket.emitWithAck('createChat', chatDialogInfo.chatInfo).then(() => {
          chatDialogInfo.show = false;
          chatDialogInfo.chatInfo.name = '';
          loadChats({ page: 1, itemsPerPage: chats.itemsPerPage });
        });
      }
    })
}
</script>
