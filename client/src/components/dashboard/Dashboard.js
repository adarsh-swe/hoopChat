import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";

const Dashboard = ({
	getCurrentProfile,
	auth: { user },
	profile: { profile, loading },
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, []);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<section className="container">
			<h1 class="large text-primary">Dashboard</h1>
			<p class="lead">
				<i class="fas fa-user"></i> Welcome {user && user.name}
			</p>
			{profile != null ? (
				<Fragment>has</Fragment>
			) : (
				<Fragment>
					<p>
						You have not yet setup a profile, please add some info
					</p>
					<Link to="/create-profile" className="btn btn-primary my-1">
						Create Profile
					</Link>
				</Fragment>
			)}
			<div class="dash-buttons">
				<a href="edit-profile.html" class="btn btn-light">
					<i class="fas fa-user-circle text-primary"></i> Edit Profile
				</a>
				<a href="add-experience.html" class="btn btn-light">
					<i class="fab fa-black-tie text-primary"></i> Post a run
				</a>
				<a href="add-education.html" class="btn btn-light">
					<i class="fas fa-graduation-cap text-primary"></i> Add
					Education
				</a>
			</div>
		</section>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
