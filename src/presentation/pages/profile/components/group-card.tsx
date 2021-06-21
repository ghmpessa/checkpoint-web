import React from 'react'
import { GroupModel } from '@/domain/models'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

type Props = {
  group: GroupModel
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      border: '1px solid #f1f1f1',
      padding: 10,
      borderRadius: 10,
      margin: 5
    },
    infos: {
      display: 'flex',
      flexDirection: 'column'
    },
    button: {
      color: '#ffffff',
      textTransform: 'none',
      fontWeight: 'bold',
      fontSize: 16,
      margin: 15,
      marginBottom: 5
    },
    link: {
      color: '#fff',
      textDecoration: 'none'
    }
  })
)

const GroupCard: React.FC<Props> = ({ group }: Props) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.infos}>
        <h3>{group.name}</h3>
        <h4>{`Tag: #${group.tag}`}</h4>
        <h4>{`Created at: ${new Date(group.createdAt).toLocaleDateString()}`}</h4>
      <Button className={classes.button} color='primary' variant='contained'>
        <Link className={classes.link} to={`/group/${group.id}`}>
          see group
        </Link>
      </Button>
      </div>
    </div>
  )
}

export default GroupCard
