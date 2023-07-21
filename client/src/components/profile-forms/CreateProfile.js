import React, { Fragment, useState, useEffect } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const initialState = {
	position: "",
	location: "",
	status: "",
	skills: "",
	bio: "",
	twitter: "",
	facebook: "",
	tiktok: "",
	youtube: "",
	instagram: "",
};

const CreateProfile = ({
	profile: { profile, loading },
	createProfile,
	getCurrentProfile,
}) => {
	const [formData, setFormData] = useState(initialState);

	const creatingProfile = useMatch("/create-profile");

	const [displaySocialInputs, toggleSocialInputs] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		// if there is no profile, attempt to fetch one
		if (!profile) getCurrentProfile();

		// if we finished loading and we do have a profile
		// then build our profileData
		if (!loading && profile) {
			const profileData = { ...initialState };
			for (const key in profile) {
				if (key in profileData) profileData[key] = profile[key];
			}
			for (const key in profile.social) {
				if (key in profileData) profileData[key] = profile.social[key];
			}
			// the skills may be an array from our API response
			if (Array.isArray(profileData.skills))
				profileData.skills = profileData.skills.join(", ");
			// set local state with the profileData
			setFormData(profileData);
		}
	}, [loading, getCurrentProfile, profile]);

	const {
		position,
		location,
		status,
		skills,
		bio,
		twitter,
		facebook,
		tiktok,
		youtube,
		instagram,
	} = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		const editing = profile ? true : false;
		e.preventDefault();
		createProfile(formData, editing).then(() => {
			if (!editing) navigate("/dashboard");
		});
	};

	return (
		<section className="container">
			<h1 className="large text-primary">
				{creatingProfile ? "Create Your Profile" : "Edit Your Profile"}
			</h1>
			<p className="lead">
				<i className="fas fa-user" />
				{creatingProfile
					? ` Let's get some information to make your`
					: " Add some changes to your profile"}
			</p>
			<small>* = required field</small>
			<form className="form" onSubmit={onSubmit}>
				<div className="form-group">
					<select
						name="position"
						value={position}
						onChange={onChange}
					>
						<option>* Select preferred position</option>
						<option value="Point Guard">Point Guard</option>
						<option value="Shooting Guard">Shooting Guard</option>
						<option value="Small Forward">Small Forward</option>
						<option value="Power Forward">Power Forward</option>
						<option value="Center">Center</option>
					</select>
					<small className="form-text">
						Give others an idea of how you play
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Status"
						name="status"
						value={status}
						onChange={onChange}
					/>
					<small className="form-text">
						Could be the team you play or played for
					</small>
				</div>

				<div className="form-group">
					<input
						type="text"
						placeholder="Location"
						name="location"
						value={location}
						onChange={onChange}
					/>
					<small className="form-text">
						City & state suggested (eg. Boston, MA)
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Skills"
						name="skills"
						value={skills}
						onChange={onChange}
					/>
					<small className="form-text">
						Please use comma separated values (eg. Shooting,
						Defense, Rebounding)
					</small>
				</div>

				<div className="form-group">
					<textarea
						placeholder="A short bio of yourself"
						name="bio"
						value={bio}
						onChange={onChange}
					/>
					<small className="form-text">
						Tell us a little about yourself
					</small>
				</div>

				<div className="my-2">
					<button
						onClick={() => toggleSocialInputs(!displaySocialInputs)}
						type="button"
						className="btn btn-light"
					>
						Add Social Network Links
					</button>
					<span>Optional</span>
				</div>

				{displaySocialInputs && (
					<Fragment>
						<div className="form-group social-input">
							<i className="fab fa-twitter fa-2x" />
							<input
								type="text"
								placeholder="Twitter URL"
								name="twitter"
								value={twitter}
								onChange={onChange}
							/>
						</div>

						<div className="form-group social-input">
							<i className="fab fa-facebook fa-2x" />
							<input
								type="text"
								placeholder="Facebook URL"
								name="facebook"
								value={facebook}
								onChange={onChange}
							/>
						</div>

						<div className="form-group social-input">
							<i className="fab fa-youtube fa-2x" />
							<input
								type="text"
								placeholder="YouTube URL"
								name="youtube"
								value={youtube}
								onChange={onChange}
							/>
						</div>

						<div className="form-group social-input">
							<i className="fab fa-tiktok fa-2x" />
							<input
								type="text"
								placeholder="TikTok URL"
								name="tiktok"
								value={tiktok}
								onChange={onChange}
							/>
						</div>

						<div className="form-group social-input">
							<i className="fab fa-instagram fa-2x" />
							<input
								type="text"
								placeholder="Instagram URL"
								name="instagram"
								value={instagram}
								onChange={onChange}
							/>
						</div>
					</Fragment>
				)}

				<input type="submit" className="btn btn-primary my-1" />
				<Link className="btn btn-light my-1" to="/dashboard">
					Go Back
				</Link>
			</form>
		</section>
	);
};

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
	CreateProfile
);
