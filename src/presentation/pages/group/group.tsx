/* eslint-disable no-useless-return */
import React, { Fragment, useState, useEffect } from 'react'
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
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useHistory } from 'react-router'
import Paper from '@material-ui/core/Paper'
import { AddPost, JoinGroup, LoadGroup, LoadMembers, LoadPosts } from '@/domain/usecases'
import { GroupModel, PostModel, ProfileShortModel } from '@/domain/models'
import FeedCard from './components/feed-card'
import MemberCard from './components/members-card'

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
    header: {
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
    paper: {
      backgroundColor: '#323232',
      width: 500,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    headerTitle: {
      fontSize: 28,
      color: '#f1f1f1',
      textAlign: 'center'
    },
    subtitle: {
      fontSize: 20,
      color: '#666666',
      textAlign: 'center'
    },
    button: {
      color: '#ffffff',
      textTransform: 'none',
      fontWeight: 'bold',
      fontSize: 16,
      margin: 15,
      width: '70%',
      alignSelf: 'center'
    },
    buttonsWrap: {
      display: 'flex'
    },
    feedButton: {
      textTransform: 'none',
      color: '#f1f1f1',
      fontWeight: 'bold'
    },
    addPostWrap: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      paddingRight: 50,
      paddingLeft: 50
    },
    addPostButton: {
      color: '#ffffff',
      textTransform: 'none',
      fontWeight: 'bold',
      fontSize: 16,
      margin: 15,
      alignSelf: 'center'
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
  joinGroup: JoinGroup
  loadGroup: LoadGroup
  loadPosts: LoadPosts
  loadMembers: LoadMembers
  addPost: AddPost
}

const Group: React.FC<Props> = ({ joinGroup, loadGroup, loadPosts, loadMembers, addPost }: Props) => {
  const classes = useStyles()

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [group, setGroup] = useState<GroupModel>({
    id: '',
    name: '',
    tag: '',
    adminId: '',
    bindingId: '',
    createdAt: '',
    updatedAt: ''
  })
  const [posts, setPosts] = useState<PostModel[]>([])
  const [selected, setSelected] = useState({
    feed: true,
    members: false
  })
  const [members, setMembers] = useState<ProfileShortModel[]>([])
  const [text, setText] = useState('')

  const handleJoin = async (): Promise<void> => {
    try {
      if (loading) {
        return
      }

      setLoading(true)

      joinGroup.join({
        bind: true,
        groupId: group.id
      })

      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }

  const handleMembers = async (): Promise<void> => {
    try {
      if (loading || selected.members) {
        return
      }
      setLoading(true)
      setSelected({ feed: false, members: true })
      const members = await loadMembers.load(group.id)
      setMembers(members)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }

  const fetchPosts = async (groupId?: string): Promise<void> => {
    try {
      const posts = await loadPosts.load(groupId || group.id)
      setPosts(posts.reverse())
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }

  const handleFeed = (): void => {
    setSelected({ members: false, feed: true })
    setLoading(true)
    fetchPosts()
  }

  const handlePost = async (): Promise<void> => {
    try {
      if (loading) {
        return
      }

      setLoading(true)
      await addPost.post({
        text,
        groupId: group.id
      })
      setLoading(true)
      fetchPosts()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }

  useEffect(() => {
    setLoading(true)
    loadGroup.load()
      .then(group => {
        setGroup(group)
        fetchPosts(group.id)
      })
      .catch(error => {
        setLoading(false)
        setError(error.message)
      })
  }, [])

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
            <Paper className={classes.header} elevation={3}>
              <Typography className={classes.headerTitle}>{group.name}</Typography>
              <Typography className={classes.subtitle}>{`#${group.tag}`}</Typography>
              <Typography className={classes.subtitle}>{`Created at: ${new Date(group.createdAt).toLocaleDateString()}`}</Typography>
              <Button onClick={handleJoin} className={classes.button} variant='contained' color='primary'>join group</Button>
            </Paper>
            <div className={classes.buttonsWrap}>
              <Button className={classes.feedButton} style={{ color: selected.feed ? '#61FF00' : '#f1f1f1' }} variant='text' onClick={handleFeed}>feed</Button>
              <Button className={classes.feedButton} style={{ color: selected.members ? '#61FF00' : '#f1f1f1' }} variant='text' onClick={handleMembers}>members</Button>
            </div>
            {
              selected.feed &&
              <div className={classes.addPostWrap}>
                <TextField multiline fullWidth variant='standard' label="whats's going on?" onChange={e => setText(e.target.value)} InputLabelProps={{ style: { color: '#f1f1f1' } }}></TextField>
                <Button className={classes.addPostButton} variant='contained' color='primary' onClick={handlePost}>add post</Button>
              </div>
            }
            <div style={{ width: '100%' }}>
              { selected.feed
                ? posts.map(post => (
                  <Fragment key={post.id}>
                    <FeedCard post={post} />
                  </Fragment>
                ))
                : members.map(member => (
                  <Fragment key={member.id}>
                    <MemberCard member={member} />
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

export default Group
