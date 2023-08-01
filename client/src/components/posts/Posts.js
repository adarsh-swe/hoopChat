import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import { getPosts, updateLocation } from "../../actions/post";
import { Link } from "react-router-dom";
import ReactMapGL, {
	GeolocateControl,
	NavigationControl,
	Marker,
} from "react-map-gl";
import GeoCoder from "./GeoCoder";
import "mapbox-gl/dist/mapbox-gl.css";

const Posts = ({ getPosts, updateLocation, post: { posts, location } }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);

	const mapRef = useRef();
	useEffect(() => {
		if (!location) {
			fetch("http://ipapi.co/json")
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					mapRef.current.flyTo({
						center: [data.longitude, data.latitude],
					});

					updateLocation(data.longitude, data.latitude);
				});
		}
	}, []);
	return (
		<section className="container">
			<h1 className="large text-primary">Posts</h1>
			<p className="lead">
				<i className="fas fa-user" /> Welcome to the community
			</p>
			<PostForm />
			<div className="mapbox-container">
				<ReactMapGL
					ref={mapRef}
					mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
					initialViewState={{
						longitude: -79.347015,
						latitude: 43.65107,
						zoom: 10,
					}}
					style={{ height: "90%" }}
					onViewportChange={(viewport) =>
						updateLocation(viewport.longitude, viewport.latitude)
					}
					mapStyle="mapbox://styles/adapat/clkdb9gth007301qw3fbucjgv"
				>
					<GeoCoder />

					{location && (
						<Marker
							latitude={location.latitude}
							longitude={location.longitude}
							draggable
							onDragEnd={(e) =>
								updateLocation(e.lngLat.lng, e.lngLat.lat)
							}
							color="#ec4e20"
						/>
					)}
					{posts.map((post) => (
						<Marker
							latitude={post.latitude}
							longitude={post.longitude}
							color="#ec4e20"
							anchor="bottom"
							key={post._id}
						>
							<div
								style={{
									width: "30px",
									height: "30px",
									borderRadius: "50%",
									backgroundColor: "white",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									color: "white",
								}}
							>
								<Link key={post._id} to={`/posts/${post._id}`}>
									<i
										style={{ fontSize: "30px" }}
										className="fas fa-basketball"
									></i>{" "}
								</Link>
							</div>
						</Marker>
					))}

					<NavigationControl position="bottom-right" />
					<GeolocateControl
						position="bottom-right"
						trackUserLocation
						onGeolocate={(e) => {
							console.log(e);
							updateLocation(e.coords.lng, e.coords.lat);
						}}
					/>
				</ReactMapGL>
			</div>
			<div className="posts">
				{posts.map((post) => (
					<PostItem key={post._id} post={post} />
				))}
			</div>
		</section>
	);
};

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	updateLocation: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { getPosts, updateLocation })(Posts);

// export default connect(mapStateToProps, { desired action })(Component)
