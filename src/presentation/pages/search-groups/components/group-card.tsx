import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

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
    justifyContent: 'flex-end',
    margin: '0 20px 10px'
  },
  members: {
    fontSize: 16
  },
  buttonLabel: {
    color: '#ffffff',
    fontWeight: 'bold',
    textTransform: 'none'
  }
})

const GroupCard: React.FC = () => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <div className={classes.titleWrap}>
            <Typography gutterBottom variant="h5" component="h2">
              CS:GO
            </Typography>
            <Typography className={classes.members} gutterBottom variant="h5" component="h2">
              3500 members
            </Typography>
          </div>
          <Typography variant="body1" color="textPrimary" component="p">
            The biggest CS:GO checkpoint community you will ever see, join us!
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.buttonsWrap}>
        <Button classes={{
          label: classes.buttonLabel
        }} size="small" color="primary" variant='contained'>
          See Group
        </Button>
      </CardActions>
    </Card>
  )
}

export default GroupCard
