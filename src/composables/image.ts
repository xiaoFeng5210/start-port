import { createFloating } from "./floating";
import TheImage from "~/components/TheImage.vue";

const { Container, Proxy } = createFloating(TheImage)

export {
  Container,
  Proxy,
}

