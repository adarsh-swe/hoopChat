import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useControl } from "react-map-gl";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { updateLocation } from "../../actions/post";

import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const GeoCoder = ({ updateLocation }) => {
	const ctrl = new MapBoxGeocoder({
		accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
		marker: false,
		collapsed: false,
		position: "top-right",
	});

	useControl(() => ctrl);

	ctrl.on("result", (e) => {
		const coords = e.result.geometry.coordinates;
		updateLocation(coords[0], coords[1]);
	});

	return null;
};

GeoCoder.propTypes = {
	updateLocation: PropTypes.func.isRequired,
};

export default connect(null, { updateLocation })(GeoCoder);
