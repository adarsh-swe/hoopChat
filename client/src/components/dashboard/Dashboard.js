import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import DashboardActions from "./DashboardActions";
import Spinner from "../layout/Spinner";
import ProfileTop from "../profiles/ProfileTop";
import ProfileAbout from "../profiles/ProfileAbout";

const Dashboard = ({
	getCurrentProfile,
	auth: { user },
	profile: { profile, loading },
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<section className="container">
			<h1 className="large text-primary">Dashboard</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Welcome {user && user.name}
			</p>
			{profile != null ? (
				<Fragment>
					<DashboardActions />
					<ProfileTop profile={profile} />
					<ProfileAbout profile={profile} />
				</Fragment>
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
