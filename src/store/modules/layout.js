import { initPanelsLayout } from '@/views/index//js/layout.js'

const useLayoutStore = defineStore(
  'layout',
  {
    state: () => ({
      layout: initPanelsLayout,
    }),
    actions:{
      setLayout(newLayout){
        this.layout = newLayout
      },
      getLayout(){
        return this.layout
      }
    }

  }
)
export default useLayoutStore
