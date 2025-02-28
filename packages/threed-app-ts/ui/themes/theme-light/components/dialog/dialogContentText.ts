// ThreeD Garden Base Styles
import typography from '#/ui/themes/theme-light/base/typography'
import colors from '#/ui/themes/theme-light/base/colors'

const { size } = typography
const { text } = colors

// types
type Types = any

const dialogContentText: Types = {
  styleOverrides: {
    root: {
      fontSize: size.md,
      color: text.main,
    },
  },
}

export default dialogContentText
