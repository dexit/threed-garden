import { ReactNode } from 'react'

// @mui material components
import Card from '@mui/material/Card'

// ThreeD Garden components
import MDBox from '#/lib/mui/MDBox'
import MDTypography from '#/lib/mui/MDTypography'

// ThreeD Garden components
import { useMaterialUIController } from '#/lib/contexts'

// Timeline context
import { TimelineProvider } from '#/ui/elements/Timeline/context'

// Declaring props types for TimelineList
interface Props {
  title: string
  dark?: boolean
  children: ReactNode
}

function TimelineList({ title, dark, children }: Props): JSX.Element {
  const [controller] = useMaterialUIController()
  const { darkMode } = controller

  return (
    <TimelineProvider value={dark}>
      <Card>
        <MDBox
          bgColor={dark ? 'dark' : 'white'}
          variant='gradient'
          borderRadius='xl'
          sx={{
            background: ({ palette: { background } }: any) => darkMode && background.card,
          }}
        >
          <MDBox
            pt={3}
            px={3}
          >
            <MDTypography
              variant='h6'
              fontWeight='medium'
              color={dark ? 'white' : 'dark'}
            >
              {title}
            </MDTypography>
          </MDBox>
          <MDBox p={2}>{children}</MDBox>
        </MDBox>
      </Card>
    </TimelineProvider>
  )
}

// Declaring default props for TimelineList
TimelineList.defaultProps = {
  dark: false,
}

export default TimelineList
