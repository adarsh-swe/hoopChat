import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";

import { addPost } from "../../actions/post";

const PostForm = ({ addPost, setAlert, post }) => {
	const { location } = post;
	const [text, setText] = useState("");

	return (
		<div className="post-form">
			<div className="bg-primary p">
				<h3>Post a run...</h3>
			</div>
			<form
				className="form my-1"
				onSubmit={(e) => {
					e.preventDefault();
					console.log(post);
					if (!location) {
						setAlert(
							"Please set a location for your post",
							"danger",
							3000
						);
					} else {
						addPost({ text, location });
					}
					setText("");
				}}
			>
				<textarea
					name="text"
					cols="30"
					rows="5"
					placeholder="Create a post"
					value={text}
					onChange={(e) => setText(e.target.value)}
					required
				/>

				<input
					type="submit"
					className="btn btn-dark my-1"
					value="Submit"
				/>
			</form>
		</div>
	);
};

PostForm.propTypes = {
	setAlert: PropTypes.func.isRequired,
	addPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { addPost })(PostForm);
