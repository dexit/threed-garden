// ThreeD Garden Base Styles
import typography from '#/ui/themes/theme-dark/base/typography'
import colors from '#/ui/themes/theme-dark/base/colors'

// ThreeD Garden Helper Functions
import rgba from '#/ui/themes/theme-dark/functions/rgba'

const { size } = typography
const { white } = colors

// types
type Types = any

const dialogContentText: Types = {
  styleOverrides: {
    root: {
      fontSize: size.md,
      color: rgba(white.main, 0.8),
    },
  },
}

export default dialogContentText
