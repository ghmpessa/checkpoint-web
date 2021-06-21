import React from 'react'

import { Avatar, Button } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { ProfileShortModel } from '@/domain/models'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      border: '2px solid #666666',
      borderRadius: 20,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
      position: 'relative',
      paddingTop: 0
    },
    info: {
      display: 'flex',
      flexDirection: 'column',
      margin: 10
    },
    title: {
      fontSize: 20
    },
    subtitle: {
      fontSize: 16
    },
    avatar: {
      backgroundColor: theme.palette.primary.main
    },
    button: {
      textTransform: 'none',
      fontWeight: 'bold',
      fontSize: 16,
      position: 'absolute',
      bottom: -10
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.primary.main
    }
  })
)

type Props = {
  member: ProfileShortModel
}

const MemberCard: React.FC<Props> = ({ member }: Props) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Avatar className={classes.avatar}>
        {member.username.slice(0, 1)}
      </Avatar>
      <div className={classes.info}>
        <h4 className={classes.title}>{member.username}</h4>
        <h4 className={classes.subtitle}>{member.name}</h4>
        <Button variant='text' color='primary' className={classes.button} >
          <Link className={classes.link} to={`/user/${member.id}`}>
            visit
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default MemberCard
