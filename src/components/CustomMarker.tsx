import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { LatLngExpression } from 'leaflet';

interface CustomMarkerProps {
	position: LatLngExpression;
	popupText?: string;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({
	position,
	popupText = 'Location',
}) => {
	// Create custom icon
	const customIcon = new L.Icon({
		iconUrl:
			'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
		shadowUrl:
			'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41],
	});

	return (
		<Marker position={position} icon={customIcon}>
			<Popup>
				<div className='text-sm font-medium'>{popupText}</div>
			</Popup>
		</Marker>
	);
};

export default CustomMarker;
