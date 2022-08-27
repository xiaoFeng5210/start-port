import type { Component, StyleValue } from 'vue'
import { h, Teleport } from 'vue'

export interface FloatingOptions {
  duration?: number
}

export const metadata = reactive<any>({
  props: {},
  attrs: {},
})

export const proxyEl = ref<HTMLElement | null>()

export function createFloating<T extends Component>(component: T, options?: FloatingOptions) {
  const metadata = reactive<any>({
    props: {},
    attrs: {},
  })
  const { duration = 500 } = options || {}
  const proxyEl = ref<HTMLElement | null>()

  const container = defineComponent({
    setup() {
      const rect = ref<DOMRect | undefined>();
      watch(
        proxyEl,
        (el) => {
          rect.value = el?.getBoundingClientRect() ?? rect.value;
        },
        { immediate: true }
      );
      const style = computed((): StyleValue => {
        const fixed: StyleValue = {
          transition: "all",
          transitionDuration: duration + "s",
          position: "fixed",
        }
        if (!rect.value || !proxyEl.value) {
          return {
            ...fixed,
            opacity: 0,
            transform: 'translateY(-100px)',
            pointerEvents: 'none'
          }
        }
        return {
          ...fixed,
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


      let landed = $ref(false);
      let landing: NodeJS.Timeout
      function liftOff() {
        landed = false
      }
      function land() {
        landing = setTimeout(() => {
          landed = true
        }, duration)
      }
      watch(proxyEl, (el) => {
        clearTimeout(landing)
        liftOff()
        update()
        if (el) {
          land()
        }
      });
      return () => {
        const children = [h(component, metadata.attrs)]
        return landed && proxyEl.value
          ? h(Teleport, { to: proxyEl.value }, children)
          : h("div", { style: style.value }, children)
      }
    }
  })

  const proxy = defineComponent({
    setup(props, ctx) {
      const attrs = useAttrs()
      metadata.attrs = attrs
      metadata.props = props
      console.log(metadata)
      const el = ref<HTMLElement>()
      onMounted(() => {
        proxyEl.value = el.value
      })

      onBeforeUnmount(() => {
        if (proxyEl.value === el.value) {
          proxyEl.value = undefined
        }
        
      })
      return () => h('div', { ref: el }, [
        ctx.slots.default ? h(ctx.slots.default) : null
      ])
    }
  })

  return {
    container,
    proxy,
  }
}
