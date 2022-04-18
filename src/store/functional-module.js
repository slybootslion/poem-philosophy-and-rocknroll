import { defineStore } from "pinia";
import { ref } from "vue";
import { useHomeState } from "./home-theme";
import { useUserInfo } from "./user-info";
import { showMessage } from "../utils/tools";
const { changeTimeState } = useHomeState()

export const useSearchBoard = defineStore('searchBoard', () => {
  const showSearchBoard = ref(false)

  const changeSearchBoard = val => showSearchBoard.value = val

  const searchBoardState = () => showSearchBoard.value

  return { showSearchBoard, changeSearchBoard, searchBoardState }
})

const { changeSearchBoard, searchBoardState } = useSearchBoard()
export const useLinkBoard = defineStore('linkBoard', () => {
  const showLinkBoard = ref(false)

  const changeLinkBoard = val => {
      showLinkBoard.value = val == null ? !linkBoardState() : val
      if (showLinkBoard.value) changeTimeState(false)
      if (showLinkBoard.value === false && !searchBoardState()) changeTimeState(true)
  }

  const linkBoardState = () => showLinkBoard.value

  return { showLinkBoard, changeLinkBoard, linkBoardState }
})

const { changeLinkBoard } = useLinkBoard()

export const searchCurrent = () => {
  changeSearchBoard(true)
  changeLinkBoard(false)
  changeTimeState(false)
}
const {user} = useUserInfo()
export const linkCurrent = () => {
  if (!user.isLogin) {
    showMessage('未登录')
    return
  }
  changeLinkBoard()
  changeSearchBoard(false)
}
export const closeSearchBoard = () => {
  changeSearchBoard(false)
  changeTimeState(true)
}
export const closeLinkBoard = () => {
  changeLinkBoard(false)
  changeTimeState(true)
}
