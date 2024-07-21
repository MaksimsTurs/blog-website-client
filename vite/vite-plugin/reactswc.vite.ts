import react from "@vitejs/plugin-react-swc";

export default () => {
  return react({
    devTarget: 'esnext'
  })
}