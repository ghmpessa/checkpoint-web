/* eslint-disable no-useless-return */
import React, { useState, useEffect } from 'react'
import { Theme } from '@/presentation/styles/theme'
import { Button, createStyles, Grid, Link, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import { AddAccount, AddAccountParams } from '@/domain/usecases'
import { Validation } from '@/presentation/protocols/validation'
import { useHistory } from 'react-router-dom'

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
    padding: 40

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
  addAccount: AddAccount
}

const Login: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const classes = useStyles()

  const history = useHistory()

  const [user, setUser] = useState<AddAccountParams>({
    username: '',
    name: '',
    email: '',
    password: '',
    twitch: '',
    steam: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    mainError: '',
    usernameError: '',
    nameError: '',
    emailError: '',
    passwordError: ''
  })

  useEffect(() => {
    const usernameError = validation.validate('username', user)
    const nameError = validation.validate('name', user)
    const emailError = validation.validate('email', user)
    const passwordError = validation.validate('password', user)

    setError({
      ...error,
      usernameError,
      nameError,
      emailError,
      passwordError
    })
  }, [user])
  const [touched, setTouched] = useState({
    username: false,
    name: false,
    email: false,
    password: false
  })

  const formInvalid = !!error.usernameError || !!error.nameError || !!error.emailError || !!error.passwordError

  const handleSubmit = (): void => {
    try {
      if (loading) {
        return
      }

      setLoading(true)

      addAccount.add(user)

      setLoading(false)
      history.replace('/login')
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
          <TextField onBlur={() => setTouched({ ...touched, username: true })} error={error.usernameError && touched.username} helperText={touched.username ? error.usernameError : ''} onChange={e => setUser({ ...user, username: e.target.value })} variant='outlined' className={classes.input} label='username' InputLabelProps={{ style: { color: '#f1f1f1' } }} />
          <TextField onBlur={() => setTouched({ ...touched, name: true })} error={error.nameError && touched.name} helperText={touched.name ? error.nameError : ''} onChange={e => setUser({ ...user, name: e.target.value })} variant='outlined' className={classes.input} label='name' InputLabelProps={{ style: { color: '#f1f1f1' } }} />
          <TextField onBlur={() => setTouched({ ...touched, email: true })} error={error.emailError && touched.email} helperText={touched.email ? error.emailError : ''} onChange={e => setUser({ ...user, email: e.target.value })} variant='outlined' className={classes.input} type='email' label='email' InputLabelProps={{ style: { color: '#f1f1f1' } }} />
          <TextField onBlur={() => setTouched({ ...touched, password: true })} error={error.passwordError && touched.password} helperText={touched.password ? error.passwordError : ''} onChange={e => setUser({ ...user, password: e.target.value })} variant='outlined' className={classes.input} type='password' label='password' InputLabelProps={{ style: { color: '#f1f1f1' } }} />
          <TextField onBlur={() => setTouched({ ...touched, password: true })} error={error.passwordError && touched.password} helperText={touched.password ? error.passwordError : ''} onChange={e => setUser({ ...user, twitch: e.target.value })} variant='outlined' className={classes.input} label='twitch' InputLabelProps={{ style: { color: '#f1f1f1' } }} />
          <TextField onBlur={() => setTouched({ ...touched, password: true })} error={error.passwordError && touched.password} helperText={touched.password ? error.passwordError : ''} onChange={e => setUser({ ...user, steam: e.target.value })} variant='outlined' className={classes.input} label='steam' InputLabelProps={{ style: { color: '#f1f1f1' } }} />
          <Button disabled={formInvalid} className={classes.button} type='submit' variant='contained' color='primary'>sign in</Button>
        </Paper>
      </form>
    </Grid>
  )
}

export default Login
