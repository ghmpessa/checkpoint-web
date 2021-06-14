import React, { useState, useEffect, useContext } from 'react'
import { Theme } from '@/presentation/styles/theme'
import { Button, CircularProgress, createStyles, Grid, Link, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
import { Validation } from '@/presentation/protocols/validation'
import { ApiContext } from '@/presentation/contexts'

const useStyles = makeStyles((theme = Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  header: {
    display: 'flex',
    borderTop: '40px solid'

  },
  paper: {
    width: theme.spacing(200),
    backgroundColor: '#202020',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 30

  },
  input: {
    color: theme.palette.text.primary,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#181818',
    borderRadius: 4,
    width: '100%'
  },
  button: {
    color: '#ffffff',
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: 16,
    margin: 15,
    width: '10vh'
  },
  text: {
    fontWeight: 'bold'
  },
  link: {
    cursor: 'pointer'
  }
}))

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const classes = useStyles()
  const history = useHistory()
  const [user, setUser] = useState<AuthenticationParams>({
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [formInvalid, setFormInvalid] = useState(false)
  const [error, setError] = useState({
    usernameError: '',
    passwordError: '',
    mainError: ''
  })
  const [touched, setTouched] = useState({
    username: false,
    password: false
  })

  useEffect(() => {
    const usernameError = validation.validate('username', user)
    const passwordError = validation.validate('password', user)
    console.log(usernameError)
    setError({
      ...error,
      usernameError,
      passwordError
    })
    setFormInvalid(!!usernameError || !!passwordError)
  }, [user])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (loading || formInvalid) {
        return
      }

      setLoading(true)

      const account = await authentication.auth(user)

      history.replace('/feed')

      setCurrentAccount(account)

      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError({
        ...error,
        mainError: error.message
      })
    }
  }

  return (
    <Grid className={classes.root}>
      <header><h1>checkpoint</h1></header>
      <form onSubmit={handleSubmit}>
        <Paper elevation={3} className={classes.paper}>
          <TextField inputProps={{ 'data-testid': 'username' }} onBlur={() => setTouched({ ...touched, username: true })} error={error.usernameError && touched.username} helperText={touched.username ? error.usernameError : ''} onChange={e => setUser({ ...user, username: e.target.value })} variant='outlined' className={classes.input} type='username' label='login' InputLabelProps={{ style: { color: '#f1f1f1' } }} ></TextField>
          <TextField inputProps={{ 'data-testid': 'password' }} onBlur={() => setTouched({ ...touched, password: true })} error={error.passwordError && touched.password} helperText={touched.password ? error.passwordError : ''} onChange={e => setUser({ ...user, password: e.target.value })} variant='outlined' className={classes.input} type='password' label='password' InputLabelProps={{ style: { color: '#f1f1f1' } }} ></TextField>
          <Button data-testid='submit' disabled={formInvalid} className={classes.button} type='submit' variant='contained' color='primary'>login</Button>
          <div data-testid='error-wrap'>
            <div>{loading && <CircularProgress size={24} />}</div>
            <div>{error.mainError && <span>{error.mainError}</span>}</div>
          </div>
          <Typography className={classes.text}>New here? {<Link className={classes.link} onClick={() => history.replace('signup')}>Sign up</Link>}</Typography>
        </Paper>
      </form>
    </Grid>
  )
}

export default Login
