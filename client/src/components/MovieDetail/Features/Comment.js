import React,{useState} from 'react'
import axios from 'axios'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'

const Comment = (props) => {
    const [Comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }
    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: Comment,
            writer:  localStorage.getItem('userId'),
            postId: props.postId
        }
        console.log(variables)

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setComment("")
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }
    return (
        <div>
       <h4  > Share your opinions about {props.movieTitle} </h4>

       {console.log(props.CommentLists)}

       {props.CommentLists && props.CommentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}



       {props.CommentLists && props.CommentLists.length === 0 &&
                <div style={{ display: 'flex', justifyContent:'center', alignItems:'center', height:'200px'}} >
                    Be the first one who shares your thought about this movie
                </div>
            }
       <form className="d-flex px-1 py-1" onSubmit={onSubmit} >
        <input 
        className="form-control me-2"
         type="search"
          aria-label="Search"
          onChange={handleChange}
          value={Comment}
          placeholder="write some comments"
           
          />
        <button class="btn btn-outline-primary " type="submit"  onClick={onSubmit}>Submit</button>
      </form>

        </div>
    )
}

export default Comment
