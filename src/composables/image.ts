import { createFloating } from "./floating";
import TheImage from "~/components/TheImage.vue";

const { container, proxy } = createFloating(TheImage)

export {
  container as TheImageContainer,
  proxy as TheImageProxy,
}

