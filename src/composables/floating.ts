import type { Component, StyleValue } from "vue"
import { h } from "vue"

export const metadata = reactive<any>({
  props: {},
  attrs: {},
})

export const proxyEl = ref<HTMLElement | null>();

export function createFloating<T extends Component>(component: T) {
  const metadata = reactive<any>({
    props: {},
    attrs: {},
  });

  const proxyEl = ref<HTMLElement | null>()

  const container = defineComponent({
    setup() {
      const rect = ref<DOMRect | undefined>({
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        bottom: 0,
        right: 0,
      } as DOMRect);
      watch(
        proxyEl,
        (el) => {
          rect.value = el?.getBoundingClientRect() ?? rect.value;
        },
        { immediate: true }
      );
      const style = computed((): StyleValue => {
        return {
          transition: "all .5s ease-in-out",
          position: "fixed",
          top: `${rect.value?.top ?? 0}px`,
          left: `${rect.value?.left ?? 0}px`,
        };
      });
      function update() {
        rect.value = proxyEl.value?.getBoundingClientRect();
      }

      useMutationObserver(proxyEl, update, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });

      useEventListener("resize", update);
      watchEffect(update);

      return () => h("div", { style: style.value }, [h(component, metadata.attrs)])
    }
  })

  const proxy = defineComponent({
    setup(props, ctx) {
      const attrs = useAttrs()
      metadata.attrs = attrs
      const el = ref<HTMLElement>()
      onMounted(() => {
        proxyEl.value = el.value
      })
      return () => h('div', { ref: el }, [
        ctx.slots.default ? h(ctx.slots.default) : null
      ])
    }
  })

  return {
    Container: container,
    Proxy: proxy,
  }
}
