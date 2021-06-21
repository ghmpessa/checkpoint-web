import React, { useEffect, useContext, useState, Fragment } from 'react'
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { ApiContext } from '@/presentation/contexts'
import AppBar from '@material-ui/core/AppBar'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
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
import SettingsIcon from '@material-ui/icons/Settings'
import PersonIcon from '@material-ui/icons/Person'
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail'
import Badge from '@material-ui/core/Badge'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/styles'
import { EditAccount, LoadMe, LoadMyGroups } from '@/domain/usecases'
import { GroupModel, ProfileModel } from '@/domain/models'
import { Input, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import GroupCard from './components/group-card'
import InputLabel from '@material-ui/core/InputLabel'

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
    paper: {
      backgroundColor: '#323232',
      width: 500,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    profileHeader: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      backgroundColor: '#484848',
      borderBottomLeftRadius: 100,
      borderBottomRightRadius: 100,
      borderBottom: '2px',
      padding: 40,
      boxShadow: '50'
    },
    iconButton: {
      color: '#f1f1f1',
      position: 'absolute',
      top: 0,
      right: 10
    },
    avatar: {
      height: 150,
      width: 150,
      backgroundColor: theme.palette.primary.main
    },
    badgeText: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 20
    },
    anchorOriginBottomRightCircle: {
      right: '50%',
      bottom: '5%'
    },
    profileName: {
      margin: 15
    },
    aboutWrap: {
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    },
    infoWrap: {
      border: '1px solid #666666',
      padding: '5px 10px',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      marginTop: 10,
      marginBottom: 10,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""'
      }
    },
    infoText: {
      fontWeight: 'bold',
      fontSize: 20
    },
    infoIcon: {
      position: 'absolute',
      left: 15,
      width: 30,
      height: 30
    },
    twitch: {
      border: '1px solid #a970ff',
      padding: '5px 10px',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      marginTop: 10,
      marginBottom: 10,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid #a970ff',
        content: '""'
      }
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(1)',
        opacity: 1
      },
      '100%': {
        transform: 'scale(1)',
        opacity: 0
      }
    },
    input: {
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold'
    },
    inputWrap: {
      margin: 20
    },
    button: {
      color: '#ffffff',
      textTransform: 'none',
      fontWeight: 'bold',
      fontSize: 16,
      margin: 15,
      width: '10vh',
      alignSelf: 'center'
    },
    editWrap: {
      border: `1px solid ${theme.palette.primary.main}`,
      padding: '5px 10px',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      marginTop: 10,
      marginBottom: 10,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: `1px solid ${theme.palette.primary.main}`,
        content: '""'
      }
    },
    avatarLetter: {
      fontWeight: 'bold',
      color: '#000'
    }
  })
)

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: '#44b700',
      color: '#000',
      height: 30,
      width: 30,
      borderRadius: 15,
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""'
      }
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0
      }
    }
  })
)(Badge)

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
              className={classes.icons}
            >
              <GroupIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={() => history.replace('/profile')}
              className={classes.ActiveIcon}
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
  loadMe: LoadMe
  editAccount: EditAccount
  loadMyGroups: LoadMyGroups
}

const Profile: React.FC<Props> = ({ loadMe, editAccount, loadMyGroups }: Props) => {
  const classes = useStyles()

  const { getCurrentAccount } = useContext(ApiContext)

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<ProfileModel>({
    username: '',
    name: '',
    email: ''
  })
  const [groups, setGroups] = useState<GroupModel[]>([])
  const [editedUser, setEditedUser] = useState<ProfileModel>()
  const [error, setError] = useState('')
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    loadMe.load()
      .then(profile => {
        setUser(profile)
        setLoading(false)
      })
      .catch(error => {
        setError(error.message)
      })
  }, [])

  useEffect(() => {
    loadMyGroups.load()
      .then(groups => {
        setGroups(groups)
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        setError(error.message)
      })
  }, [])

  const handleEdit = async (): Promise<void> => {
    try {
      if (loading) {
        return
      }

      setLoading(true)

      const profile = await editAccount.edit(editedUser)

      setUser(profile)
      setEditedUser(null)
      setEdit(false)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }

  return (
    <div>
      {PrimarySearchAppBar()}
      <div className={classes.content}>
        {
          loading
            ? <CircularProgress color='primary' size={100} />
            : error
              ? <span>{error}</span>
              : <Paper className={classes.paper} elevation={5}>
            <Paper className={classes.profileHeader} elevation={3}>
              <StyledBadge
                overlap='circle'
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                classes={{
                  badge: classes.badgeText,
                  anchorOriginBottomRightCircle: classes.anchorOriginBottomRightCircle
                }}
                badgeContent={user.level === 0 ? '0' : user.level}
              >
                <Avatar className={classes.avatar}>
                  <Typography variant='h1' className={classes.avatarLetter}>{user.username.slice(0,1)}</Typography>
                </Avatar>
              </StyledBadge>

              {
                edit
                  ? <Input
                      className={classes.inputWrap}
                      fullWidth
                      classes={{
                        input: classes.input
                      }}
                      defaultValue={user.username}
                      onChange={e => setEditedUser({ ...editedUser, username: e.target.value })}
                    />
                  : <Typography variant='h4' className={classes.profileName}>{user.username}</Typography>
              }
              <IconButton className={classes.iconButton} onClick={() => setEdit(!edit)}>
                <SettingsIcon />
              </IconButton>
            </Paper>
            <div className={classes.aboutWrap}>
              <div className={edit ? classes.editWrap : classes.infoWrap}>
                <PersonIcon className={classes.infoIcon} />
                {
                  edit
                    ? <Input
                        disableUnderline
                        className={classes.inputWrap}
                        fullWidth
                        classes={{
                          input: classes.input
                        }}
                        defaultValue={user.name}
                        onChange={e => setEditedUser({ ...editedUser, name: e.target.value })}
                      />
                    : <Typography variant='body1' className={classes.infoText} >{user.name}</Typography>
                    }
              </div>
              <div className={edit ? classes.editWrap : classes.infoWrap}>
                <AlternateEmailIcon className={classes.infoIcon} />
                {
                  edit
                    ? <Input
                        disableUnderline
                        className={classes.inputWrap}
                        fullWidth
                        classes={{
                          input: classes.input
                        }}
                        defaultValue={user.email}
                        onChange={e => setEditedUser({ ...editedUser, email: e.target.value })}
                      />
                    : <Typography variant='body1' className={classes.infoText} >{user.email}</Typography>}
              </div>
              { edit
                ? <div className={classes.twitch}>
                   <Input
                      disableUnderline
                      className={classes.inputWrap}
                      fullWidth
                      classes={{
                        input: classes.input
                      }}
                      defaultValue={user.twitch.length ? user.twitch : 'your twitch link'}
                      onChange={e => setEditedUser({ ...editedUser, twitch: e.target.value })}
                    />
                </div>
                : !!user.twitch.length &&
                <div className={classes.twitch}>
                  <Typography variant='body1' className={classes.infoText} >{user.twitch}</Typography>
                </div>
              }
              { edit
                ? <div className={edit ? classes.editWrap : classes.infoWrap}>
                   <Input
                      disableUnderline
                      className={classes.inputWrap}
                      fullWidth
                      classes={{
                        input: classes.input
                      }}
                      defaultValue={user.steam.length ? user.steam : 'your steam link'}
                      onChange={e => setEditedUser({ ...editedUser, steam: e.target.value })}
                    />
                </div>
                : !!user.steam.length &&
                <div className={edit ? classes.editWrap : classes.infoWrap}>
                  <Typography variant='body1' className={classes.infoText} >{user.steam}</Typography>
                </div>
              }
              { edit && <Button className={classes.button} variant='contained' color='primary' onClick={handleEdit}>save</Button>}
            </div>
            <h2>my groups</h2>
            <div style={{ width: '100%' }}>
              {
                groups.map(group => (
                  <Fragment key={group.id}>
                    <GroupCard group={group} />
                  </Fragment>
                ))
              }
            </div>
          </Paper>
        }
      </div>
    </div>
  )
}

export default Profile
