import { http } from "../../../utils/http";

// theme
export const httpThemeList = () => {
  return http({
    url: '/ppr/client/theme',
  })
}

// search
export const httpChangeSearchType = (data) => {
  return http({
    url: '/ppr/client/search',
    method: 'patch',
    data
  })
}

export const httpGetSearchType = () => {
  return http({
    url: '/ppr/client/search',
  })
}

export const httpSearchKeywordHistory = keyword => {
  return http({
    url: '/ppr/client/search/history',
    method: 'post',
    data: { keyword }
  })
}

export const httpGetHotKeyByBing = keyword => {
  return http({
    url: '/ppr/client/search/history',
    params: { keyword }
  })
}

export const httpDeleteKeywordHistory = keyword => {
  return http({
    url: '/ppr/client/search/history',
    method: 'delete',
    data: {
      keyword
    }
  })
}

// link

export const httpGetLinks = () => http({ url: '/ppr/client/links' })
