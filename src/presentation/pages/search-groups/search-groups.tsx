import React, { Fragment, useContext, useState } from 'react'
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import GroupIcon from '@material-ui/icons/Group'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MoreIcon from '@material-ui/icons/MoreVert'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import { TextField, Select, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel } from '@material-ui/core'

import GroupCard from './components/group-card'
import { useHistory } from 'react-router-dom'
import { CommunityContext } from '@/presentation/contexts/'
import { CreateGroup, LoadGroups } from '@/domain/usecases'
import { GroupModel } from '@/domain/models'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: '#f1f1f1'
    },
    appBar: {
      backgroundColor: '#323232',
      display: 'flex',
      justifyContent: 'space-between',
      position: 'fixed',
      zIndex: 1000,
      width: '100%'
    },
    icons: {
      color: '#f1f1f1',
      marginRight: 10,
      fontSize: 100
    },
    ActiveIcon: {
      color: theme.palette.primary.main,
      marginRight: 10,
      fontSize: 100
    },
    title: {
      display: 'none',
      fontWeight: 'bold',
      color: '#f1f1f1',
      alignSelf: 'center',
      marginLeft: '10px',
      marginRight: '10px',
      [theme.breakpoints.up('sm')]: {
        display: 'block'
      }
    },
    search: {
      position: 'relative',
      margin: 10,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.5),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.6)
      },
      marginRight: theme.spacing(2),
      marginLeft: 10,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto'
      }
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputRoot: {
      color: 'inherit'
    },
    inputInput: {
      padding: theme.spacing(4),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(6)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch'
      }
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex'
      }
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 80
    },
    modal: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#323232',
      padding: 15
    },
    modalContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    modalFields: {
      margin: 10,
      width: '100%'
    },
    modalButton: {
      color: '#ffffff',
      textTransform: 'none',
      fontWeight: 'bold',
      fontSize: 16,
      margin: 10,
      alignSelf: 'center',
      width: '100%'
    },
    select: {
      backgroundColor: '#323232',
      padding: 10,
      color: '#f1f1f1'
    },
    button: {
      textTransform: 'none',
      color: '#fff',
      fontWeight: 'bold'
    }
  })
)

const PrimarySearchAppBar = (): any => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null)

  const history = useHistory()

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = (): void => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = (): void => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          className={classes.icons}
          onClick={() => history.replace('/profile')}
        >
          <AccountCircle fontSize='inherit' />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar className={classes.appBar}>
          <Typography className={classes.title} variant="h6" noWrap>
            checkpoint
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={() => history.replace('/community')}
              className={classes.ActiveIcon}
            >
              <GroupIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={() => history.replace('/profile')}
              className={classes.icons}
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  )
}

type Props = {
  createGroup: CreateGroup
  loadGroups: LoadGroups
}

const SearchGroups: React.FC<Props> = ({ createGroup, loadGroups }: Props) => {
  const example = [1, 2, 3, 4]
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [group, setGroup] = useState({
    name: '',
    description: ''
  })
  const [groups, setGroups] = useState<GroupModel[]>([])

  const handleCreate = async (): Promise<void> => {
    if (error) {
      setOpen(!open)
      return
    }

    try {
      if (loading) {
        return
      }

      setLoading(true)

      createGroup.create(group)
      setError('Your group has been created!')
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }

  const handleSearch = async (): Promise<void> => {
    try {
      if (loading) {
        return
      }

      setLoading(true)
      const groups = await loadGroups.load({ search })
      setGroups(groups)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }

  const modal = (
    <Dialog
      open={open}
      onClose={() => setOpen(!open)}
    >
      <div className={classes.modal}>
        { !error
          ? <>
              <DialogTitle>create group</DialogTitle>
              <DialogContent className={classes.modalContent}>
                <TextField onChange={e => setGroup({ ...group, name: e.target.value })} className={classes.modalFields} label='group name' />
              </DialogContent>
            </>
          : <span>{error}</span>
        }
        <DialogActions>
          <Button onClick={handleCreate} variant='contained' color='primary' className={classes.modalButton}>{error ? 'OK' : 'create group'}</Button>
        </DialogActions>
      </div>
    </Dialog>
  )

  return (
    <div>
      <CommunityContext.Provider value={{ open, setOpen, search, setSearch, groups, setGroups, error, setError }}>
      {PrimarySearchAppBar()}
        <div className={classes.content}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="search group…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={e => setSearch(e.target.value)}
            />
            { !!search.length && <Button variant='contained' color='primary' className={classes.button} onClick={handleSearch} >search</Button>}
          </div>
          <Button onClick={() => setOpen(!open) } type='button' variant='outlined' color='primary' startIcon={<AddIcon />} >Create Group</Button>
          {
            groups.map(group => (
              <div key={group.id}>
                <GroupCard group={group} />
              </div>
            ))
          }
          {modal}
        </div>
      </CommunityContext.Provider>
    </div>
  )
}

export default SearchGroups
