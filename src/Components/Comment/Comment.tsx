import { CommentDTO } from '../../Models/res/Comment';
import "./Comment.css"
interface CommentCardProps {
    comment: CommentDTO;
    onDelete: (id: number) => void; 
    isAdmin: boolean
}
function CommentCart(props: CommentCardProps) {
    const handleDelete = () => {
        props.onDelete(props.comment.id);
    };
    return (
        <div className="comment-card">
            {props.isAdmin && <button className="delete-button" onClick={handleDelete}>
                Видалити
            </button>}
            <div className="comment-user-info">
                <span className="comment-user-name">{props.comment.userName}</span>
            </div>
            <div className="comment-message">
                <p>{props.comment.message}</p>
            </div>
             
        </div>
    );
};

export default CommentCart;