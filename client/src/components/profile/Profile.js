import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "../profiles/ProfileTop";
import ProfileAbout from "../profiles/ProfileAbout";
import { getProfileById } from "../../actions/profile";

const Profile = ({ getProfileById, profile: { profile }, auth }) => {
	const { id } = useParams();
	useEffect(() => {
		getProfileById(id);
	}, [getProfileById, id]);

	return (
		<section className="container">
			{profile === null ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to="/profiles" className="btn btn-light">
						Back To Profiles
					</Link>
					{auth.isAuthenticated &&
						auth.loading === false &&
						auth.user._id === profile.user._id && (
							<Link to="/edit-profile" className="btn btn-dark">
								Edit Profile
							</Link>
						)}
					<div class="profile-grid my-1">
						<ProfileTop profile={profile} />
						<ProfileAbout profile={profile} />
					</div>
				</Fragment>
			)}
		</section>
	);
};

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

Profile.propTypes = {};
const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
