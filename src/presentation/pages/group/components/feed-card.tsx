import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { PostModel } from '@/domain/models'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 10,
      backgroundColor: '#161616'
    },
    media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    },
    icons: {
      color: theme.palette.primary.main
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: 'rotate(180deg)'
    },
    avatar: {
      backgroundColor: theme.palette.primary.main
    },
    title: {
      fontSize: 20,
      fontWeight: 'normal',
      color: '#f1f1f1'
    },
    subheader: {
      fontSize: 14,
      fontWeight: 'normal',
      color: '#c2c2c2'
    }
  })
)

type Props = {
  post: PostModel
}

const FeedCard: React.FC<Props> = ({ post }: Props) => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = (): void => {
    setExpanded(!expanded)
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {post.account.username.slice(0, 1)}
          </Avatar>
        }
        classes={{
          title: classes.title,
          subheader: classes.subheader
        }}
        title={post.account.username}
        subheader={new Date(post.createdAt).toLocaleString()}
      />
      <CardContent>
        <Typography variant="body1" color="textPrimary" component="p">
          {post.text}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default FeedCard
