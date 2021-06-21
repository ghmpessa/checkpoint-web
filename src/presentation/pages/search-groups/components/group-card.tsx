import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { GroupModel } from '@/domain/models'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: 20,
    backgroundColor: '#323232'
  },
  media: {
    height: 140
  },
  titleWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonsWrap: {
    display: 'flex',
    justifyContent: 'center',
    margin: '0 20px 10px'
  },
  members: {
    fontSize: 16,
    color: '#666666'
  },
  buttonLabel: {
    color: '#ffffff',
    fontWeight: 'bold',
    textTransform: 'none'
  },
  link: {
    textDecoration: 'none',
    color: '#fff'
  }
})

type Props = {
  group: GroupModel
}

const GroupCard: React.FC<Props> = ({ group }: Props) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {group.name}
          </Typography>
          <Typography className={classes.members} gutterBottom variant="h5" component="h2">
            {`Tag: #${group.tag}`}
          </Typography>
          <Typography className={classes.members} variant="body1" color="textPrimary" component="p">
            {`Created at: ${new Date(group.createdAt).toLocaleDateString()}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.buttonsWrap}>
        <Button
        classes={{
          label: classes.buttonLabel
        }} size="small" color="primary" variant='contained'>
          <Link className={classes.link} to={`group/${group.id}`}>
            see group
          </Link>
        </Button>
      </CardActions>
    </Card>
  )
}

export default GroupCard
