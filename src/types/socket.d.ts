// import { ComponentCustomProperties } from "vue";
import { UnwrapNestedRefs } from 'vue';
import { SocketService } from '../plugins/socket'

declare module 'vue' {
  interface ComponentCustomProperties {
    $socket: UnwrapNestedRefs<SocketService>;
  }
}

export {}
