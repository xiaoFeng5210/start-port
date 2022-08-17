import type { Component } from "vue";

export const metadata = reactive<any>({
  props: {},
  attrs: {},
});

export const proxyEl = ref<HTMLElement | null>();

export function createFloating<T extends Component>(component: T) {
  const metadata = reactive<any>({
    props: {},
    attrs: {},
  });

  const proxyEl = ref<HTMLElement | null>()

  const container = defineComponent({})

  const proxy = defineComponent({})
}
