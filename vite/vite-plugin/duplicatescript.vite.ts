import detectDuplicatedDeps from 'unplugin-detect-duplicated-deps/vite'

export default () => {
  return detectDuplicatedDeps({
    deep: false,
  })
}