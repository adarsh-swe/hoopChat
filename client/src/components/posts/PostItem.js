import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({
	addLike,
	removeLike,
	deletePost,
	auth,
	post: {
		_id,
		text,
		name,
		avatar,
		user,
		likes,
		comments,
		date,
		longitude,
		latitude,
	},
}) => (
	<div className="post bg-white p-1 my-1">
		<div>
			<Link to={`/profile/${user}`}>
				<img className="round-img" src={avatar} alt="" />
				<h4>{name}</h4>
			</Link>
		</div>
		<div>
			<p className="my-1">{text}</p>
			<p className="post-date">
				Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
			</p>

			<button
				onClick={() => addLike(_id)}
				type="button"
				className="btn btn-light"
			>
				<i className="fas fa-thumbs-up" />{" "}
				<span>{likes.length > 0 && <span>{likes.length}</span>}</span>
			</button>
			<button
				onClick={() => removeLike(_id)}
				type="button"
				className="btn btn-light"
			>
				<i className="fas fa-thumbs-down" />
			</button>
			<Link to={`/posts/${_id}`} className="btn btn-primary">
				Discussion{" "}
				{comments.length > 0 && (
					<span className="comment-count">{comments.length}</span>
				)}
			</Link>
			{!auth.loading && user === auth.user._id && (
				<button
					onClick={() => deletePost(_id)}
					type="button"
					className="btn btn-danger"
				>
					<i className="fas fa-times" />
				</button>
			)}
		</div>
		<div className="map">
			<a
				href={`http://maps.google.com/maps?z=17&t=m&q=loc:${latitude}+${longitude}`}
			>
				<img
					alt="static Mapbox map of a post"
					src={`https://api.mapbox.com/styles/v1/adapat/clkdb9gth007301qw3fbucjgv/static/${longitude},${latitude},17,0.00,0.00/1000x600@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
					className="map-image"
				></img>
			</a>
		</div>
	</div>
);

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
	PostItem
);
