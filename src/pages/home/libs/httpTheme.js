import { http } from "../../../utils/http";

export const httpThemeList = () => {
  return http({
    url: '/ppr/client/theme',
  })
}
