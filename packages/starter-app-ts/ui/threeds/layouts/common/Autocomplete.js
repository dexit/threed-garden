// ** React Imports
import { useEffect, useCallback, useRef, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import MuiDialog from '@mui/material/Dialog'
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import ListItemButton from '@mui/material/ListItemButton'
import InputAdornment from '@mui/material/InputAdornment'
import MuiAutocomplete from '@mui/material/Autocomplete'

// ** Icons Imports
import Tab from 'mdi-material-ui/Tab'
import Close from 'mdi-material-ui/Close'
import Magnify from 'mdi-material-ui/Magnify'
import Lastpass from 'mdi-material-ui/Lastpass'
import ChartDonut from 'mdi-material-ui/ChartDonut'
import CartOutline from 'mdi-material-ui/CartOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import AccountGroup from 'mdi-material-ui/AccountGroup'
import CalendarBlank from 'mdi-material-ui/CalendarBlank'
import CalendarRange from 'mdi-material-ui/CalendarRange'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import ViewGridOutline from 'mdi-material-ui/ViewGridOutline'
import GestureTapButton from 'mdi-material-ui/GestureTapButton'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import FileRemoveOutline from 'mdi-material-ui/FileRemoveOutline'
import FormatListCheckbox from 'mdi-material-ui/FormatListCheckbox'
import FormatListNumbered from 'mdi-material-ui/FormatListNumbered'
import ChartTimelineVariant from 'mdi-material-ui/ChartTimelineVariant'
import SubdirectoryArrowLeft from 'mdi-material-ui/SubdirectoryArrowLeft'
import FormatTextVariantOutline from 'mdi-material-ui/FormatTextVariantOutline'
import CardBulletedSettingsOutline from 'mdi-material-ui/CardBulletedSettingsOutline'

// ** Third Party Imports
import axios from 'axios'

// ** Configs Imports
import themeConfig from '#/lib/config/themeConfig'

// ** Custom Components Imports
import UserIcon from '#/ui/layouts/common/UserIcon'

// ** API Icon Import with object
import { autocompleteIconObj } from './autocompleteIconObj'

const defaultSuggestionsData = [
  {
    category: 'Popular Searches',
    suggestions: [
      {
        suggestion: 'CRM',
        link: '/dashboards/crm/',
        icon: <ChartDonut fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />,
      },
      {
        suggestion: 'Analytics',
        link: '/dashboards/analytics/',
        icon: <ChartTimelineVariant fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />,
      },
      {
        suggestion: 'eCommerce',
        link: '/dashboards/ecommerce/',
        icon: <CartOutline fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />,
      },
      {
        suggestion: 'User List',
        link: '/modules/user/list/',
        icon: <AccountGroup fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />,
      },
    ],
  },
  {
    category: 'Apps & Pages',
    suggestions: [
      {
        suggestion: 'Calendar',
        link: '/modules/calendar/',
        icon: <CalendarBlank fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />,
      },
      {
        suggestion: 'Invoice List',
        link: '/modules/invoice/list/',
        icon: <FormatListNumbered fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />,
      },
      {
        suggestion: 'Pricing',
        link: '/pages/pricing/',
        icon: <CurrencyUsd fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />,
      },
      {
        suggestion: 'Account Settings',
        link: '/pages/account-settings/',
        icon: <AccountCogOutline fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />,
      },
    ],
  },
  {
    category: 'User Interface',
    suggestions: [
      {
        suggestion: 'Typography',
        link: '/ui/typography/',
        icon: <FormatTextVariantOutline fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />,
      },
      {
        suggestion: 'Tabs',
        link: '/components/tabs/',
        icon: <Tab fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />,
      },
      {
        suggestion: 'Buttons',
        link: '/components/buttons/',
        icon: <GestureTapButton fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />,
      },
      {
        suggestion: 'Advanced Cards',
        link: '/ui/cards/advanced/',
        icon: <CardBulletedSettingsOutline fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />,
      },
    ],
  },
  {
    category: 'Forms & Tables',
    suggestions: [
      {
        suggestion: 'Select',
        link: '/forms/form-elements/select/',
        icon: <FormatListCheckbox fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />,
      },
      {
        suggestion: 'Autocomplete',
        link: '/forms/form-elements/autocomplete/',
        icon: <Lastpass fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />,
      },
      {
        suggestion: 'Table',
        link: '/tables/mui/',
        icon: <ViewGridOutline fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />,
      },
      {
        suggestion: 'Date Pickers',
        link: '/forms/form-elements/pickers/',
        icon: <CalendarRange fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />,
      },
    ],
  },
]

const categoryTitle = {
  dashboards: 'Adventures',
  appsPages: 'Apps & Pages',
  userInterface: 'User Interface',
  formsTables: 'Forms & Tables',
  chartsMisc: 'Charts & Misc',
}

// ** Styled Autocomplete component
const Autocomplete = styled(MuiAutocomplete)(({ theme }) => ({
  '& fieldset': {
    border: 0,
  },
  '& + .MuiAutocomplete-popper': {
    borderTop: `1px solid ${theme.palette.divider}`,
    '& .MuiAutocomplete-listbox': {
      paddingTop: 0,
      height: '100%',
      maxHeight: 'inherit',
      '& .MuiListSubheader-root': {
        top: 0,
        fontWeight: 400,
        lineHeight: '15px',
        fontSize: '0.75rem',
        letterSpacing: '1px',
        color: theme.palette.text.disabled,
        padding: theme.spacing(3.75, 6, 0.75),
      },
    },
    '& .MuiAutocomplete-paper': {
      border: 0,
      height: '100%',
      borderRadius: 0,
      boxShadow: 'none',
    },
    '& .MuiListItem-root.suggestion': {
      padding: 0,
      '& .MuiListItemSecondaryAction-root': {
        display: 'flex',
      },
      '&.Mui-focused.Mui-focusVisible, &:hover': {
        backgroundColor: theme.palette.action.hover,
      },
      '& .MuiListItemButton-root: hover': {
        backgroundColor: 'transparent',
      },
      '&:not(:hover)': {
        '& .MuiListItemSecondaryAction-root': {
          display: 'none',
        },
        '&.Mui-focused, &.Mui-focused.Mui-focusVisible:not(:hover)': {
          '& .MuiListItemSecondaryAction-root': {
            display: 'flex',
          },
        },
        [theme.breakpoints.down('sm')]: {
          '&.Mui-focused:not(.Mui-focusVisible) .MuiListItemSecondaryAction-root': {
            display: 'none',
          },
        },
      },
    },
    '& .MuiAutocomplete-noOptions': {
      display: 'grid',
      minHeight: '100%',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: theme.spacing(10),
    },
  },
}))

// ** Styled Dialog component
const Dialog = styled(MuiDialog)({
  '& .MuiBackdrop-root': {
    backdropFilter: 'blur(4px)',
  },
  '& .MuiDialog-paper': {
    overflow: 'hidden',
    '&:not(.MuiDialog-paperFullScreen)': {
      height: '100%',
      maxHeight: 550,
    },
  },
})

const NoResult = ({ value, setOpenDialog }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
      <FileRemoveOutline sx={{ mb: 2.5, fontSize: '5rem', color: 'text.primary' }} />
      <Typography variant='h6' sx={{ mb: 11.5, wordWrap: 'break-word' }}>
        No results for{' '}
        <Typography variant='h6' component='span' sx={{ wordWrap: 'break-word' }}>
          {`"${value}"`}
        </Typography>
      </Typography>

      <Typography variant='body2' sx={{ mb: 2.5, color: 'text.disabled' }}>
        Try searching for
      </Typography>
      <List sx={{ py: 0 }}>
        <ListItem sx={{ py: 2 }} disablePadding onClick={() => setOpenDialog(false)}>
          <Link passHref href='/dashboards/ecommerce/'>
            <Box
              component='span'
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                '&:hover > *': { color: 'primary.main' },
              }}>
              <ChartDonut fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />
              <Typography variant='body2' sx={{ color: 'text.primary' }}>
                CRM Dashboard
              </Typography>
            </Box>
          </Link>
        </ListItem>
        <ListItem sx={{ py: 2 }} disablePadding onClick={() => setOpenDialog(false)}>
          <Link passHref href='/modules/user/view/2/'>
            <Box
              component='span'
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                '&:hover > *': { color: 'primary.main' },
              }}>
              <AccountOutline fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />
              <Typography variant='body2' sx={{ color: 'text.primary' }}>
                User View
              </Typography>
            </Box>
          </Link>
        </ListItem>
        <ListItem sx={{ py: 2 }} disablePadding onClick={() => setOpenDialog(false)}>
          <Link passHref href='/pages/account-settings/'>
            <Box
              component='span'
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                '&:hover > *': { color: 'primary.main' },
              }}>
              <AccountCogOutline fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />
              <Typography variant='body2' sx={{ color: 'text.primary' }}>
                Account Settings
              </Typography>
            </Box>
          </Link>
        </ListItem>
      </List>
    </Box>
  )
}

const DefaultSuggestions = ({ setOpenDialog }) => {
  return (
    <Grid container spacing={6} sx={{ ml: 0 }}>
      {defaultSuggestionsData.map((item, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Typography component='p' variant='overline' sx={{ lineHeight: 1.25, color: 'text.disabled' }}>
            {item.category}
          </Typography>
          <List sx={{ py: 2.5 }}>
            {item.suggestions.map((suggestionItem, index2) => (
              <ListItem key={index2} sx={{ py: 2 }} disablePadding>
                <Link passHref href={suggestionItem.link}>
                  <Box
                    component='span'
                    onClick={() => setOpenDialog(false)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      textDecoration: 'none',
                      '&:hover > *': { color: 'primary.main' },
                    }}>
                    {suggestionItem.icon}
                    <Typography variant='body2' sx={{ color: 'text.primary' }}>
                      {suggestionItem.suggestion}
                    </Typography>
                  </Box>
                </Link>
              </ListItem>
            ))}
          </List>
        </Grid>
      ))}
    </Grid>
  )
}

const AutocompleteComponent = ({ hidden, settings }) => {
  // ** States
  const [isMounted, setIsMounted] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [options, setOptions] = useState([])

  // ** Hooks & Vars
  const theme = useTheme()
  const router = useRouter()
  const { layout } = settings
  const wrapper = useRef(null)
  const fullScreenDialog = useMediaQuery(theme.breakpoints.down('sm'))

  // Get all data using API
  useEffect(() => {
    try {
      // axios
      //   .get('/app-bar/search', {
      //     params: { q: searchValue },
      //   })
      //   .then((response) => {
      //     if (response.data && response.data.length) {
      //       setOptions(response.data)
      //     } else {
      //       setOptions([])
      //     }
      //   })
    } catch (err) {
      console.debug('axios error getting "/app-bar/search"')
    }
  }, [searchValue])
  useEffect(() => {
    setIsMounted(true)

    return () => setIsMounted(false)
  }, [])

  // Handle click event on a list item in search result
  const handleOptionClick = (obj) => {
    setSearchValue('')
    setOpenDialog(false)
    if (obj.url) {
      router.push(obj.url)
    }
  }

  // Handle ESC & shortcut keys keydown events
  const handleKeydown = useCallback(
    (event) => {
      // ** Shortcut keys to open searchbox (Ctrl + /)
      if (!openDialog && event.ctrlKey && event.which === 191) {
        setOpenDialog(true)
      }
    },
    [openDialog]
  )

  // Handle shortcut keys keyup events
  const handleKeyUp = useCallback(
    (event) => {
      // ** ESC key to close searchbox
      if (openDialog && event.keyCode === 27) {
        setOpenDialog(false)
      }
    },
    [openDialog]
  )
  useEffect(() => {
    document.addEventListener('keydown', handleKeydown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeydown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyUp, handleKeydown])
  if (!isMounted) {
    return null
  } else {
    return (
      <Box
        ref={wrapper}
        onClick={() => !openDialog && setOpenDialog(true)}
        sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}>
        {!hidden && layout === 'vertical' ? (
          <Typography sx={{ color: 'text.disabled' }}>Search (Ctrl+/)</Typography>
        ) : null}
        <IconButton color='inherit' sx={!hidden && layout === 'vertical' ? { ml: 1, mr: 1 } : {}}>
          <Magnify />
        </IconButton>
        <Dialog fullWidth open={openDialog} fullScreen={fullScreenDialog} onClose={() => setOpenDialog(false)}>
          <Box sx={{ top: 0, width: '100%', position: 'sticky' }}>
            <Autocomplete
              autoHighlight
              disablePortal
              options={options}
              id='appBar-search'
              isOptionEqualToValue={() => true}
              onInputChange={(event, value) => setSearchValue(value)}
              onChange={(event, obj) => handleOptionClick(obj)}
              noOptionsText={<NoResult value={searchValue} setOpenDialog={setOpenDialog} />}
              getOptionLabel={(option) => option.title}
              groupBy={(option) => (searchValue.length ? categoryTitle[option.category] : '')}
              sx={{
                '& + .MuiAutocomplete-popper': {
                  ...(searchValue.length && {
                    overflow: 'auto',
                    maxHeight: 'calc(100vh - 69px)',
                    height: fullScreenDialog ? 'calc(100vh - 69px)' : 481,
                  }),
                },
              }}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    inputRef={(input) => {
                      if (input) {
                        if (openDialog) {
                          input.focus()
                        } else {
                          input.blur()
                        }
                      }
                    }}
                    InputProps={{
                      ...params.InputProps,
                      sx: { p: `${theme.spacing(3.75, 6)} !important` },
                      startAdornment: (
                        <InputAdornment position='start' sx={{ color: 'text.primary' }}>
                          <Magnify />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment
                          position='end'
                          onClick={() => setOpenDialog(false)}
                          sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}>
                          {!hidden ? <Typography sx={{ mr: 2.5, color: 'text.disabled' }}>[esc]</Typography> : null}
                          <IconButton size='small' sx={{ p: 1 }}>
                            <Close fontSize='small' />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )
              }}
              renderOption={(props, option) => {
                const IconTag = autocompleteIconObj[option.icon] || themeConfig.navSubItemIcon

                return searchValue.length ? (
                  <ListItem
                    {...props}
                    key={option.title}
                    className={`suggestion ${props.className}`}
                    onClick={() => handleOptionClick(option)}
                    secondaryAction={
                      <SubdirectoryArrowLeft fontSize='small' sx={{ cursor: 'pointer', color: 'text.disabled' }} />
                    }>
                    <ListItemButton sx={{ py: 2.5, px: ` ${theme.spacing(6)} !important` }}>
                      <UserIcon
                        icon={IconTag}
                        componentType='search'
                        iconProps={{ fontSize: 'small', sx: { mr: 2.5, color: 'text.primary' } }}
                      />
                      <Typography variant='body2' sx={{ color: 'text.primary' }}>
                        {option.title}
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                ) : null
              }}
            />
          </Box>
          {searchValue.length === 0 ? (
            <Box
              sx={{
                p: 10,
                display: 'grid',
                overflow: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
                borderTop: `1px solid ${theme.palette.divider}`,
                height: fullScreenDialog ? 'calc(100vh - 69px)' : '100%',
              }}>
              <DefaultSuggestions setOpenDialog={setOpenDialog} />
            </Box>
          ) : null}
        </Dialog>
      </Box>
    )
  }
}

export default AutocompleteComponent
