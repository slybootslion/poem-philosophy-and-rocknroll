import { ref } from "vue";
import { useHomeStateOutside } from "../../../store/home-theme";
const { changeTimeState } = useHomeStateOutside()

export const usePopupState = () => {
  const isShow = ref(false)

  const openPopup = cb => {
    isShow.value = true
    changeTimeState(false)
    cb && cb()
  }

  const closePopup = cb => {
    isShow.value = false
    changeTimeState(true)
    cb && cb()
  }

  return {
    isShow, openPopup, closePopup
  }
}
