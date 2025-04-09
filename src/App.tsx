import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, LayersControl, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
// import { BluePointIcon } from './components/BluePointIcon';
import CustomMarker from './components/CustomMarker';

const MapLayer = {
	Roadmap: 'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
	Satellite: 'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
	Terrain: 'https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
	Hybrid: 'https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
};

function MapController({ position }: { position: LatLngExpression }) {
	const map = useMap();

	useEffect(() => {
		map.setView(position, map.getZoom());
	}, [position, map]);

	return null;
}

function App() {
	const [position, setPosition] = useState<LatLngExpression>([
		11.628984, 104.876086,
	]);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const lat = params.get('lat');
		const lng = params.get('lng');

		if (lat && lng) {
			setPosition([parseFloat(lat), parseFloat(lng)]);
		}
	}, []);

	return (
		<div className='h-screen w-screen'>
			<MapContainer
				center={position}
				zoom={18}
				style={{ height: '100%', width: '100%' }}>
				<MapController position={position} />
				{/* <TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/> */}
				<LayersControl position='bottomright' collapsed>
					<LayersControl.BaseLayer name='jawg light' checked>
						<TileLayer
							url='https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}.png?access-token=dwyDjrVBSs7Yhod2suQVmE6dj2uPwPe5FG4vIpmloSTqv8Jpd3jdDV4hMXkk2Tdv'
							attribution='&copy; <a href="https://jawg.io">Jawg</a> contributors'
							maxZoom={20}
						/>
					</LayersControl.BaseLayer>
					<LayersControl.BaseLayer name='Satellite'>
						<TileLayer
							url={`${MapLayer.Satellite}&size=256&scale=2`}
							subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
							maxZoom={20}
						/>
					</LayersControl.BaseLayer>
					<LayersControl.BaseLayer name='Hybrid'>
						<TileLayer
							url={`${MapLayer.Hybrid}&size=256&scale=2`}
							subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
							maxZoom={20}
						/>
					</LayersControl.BaseLayer>
				</LayersControl>
				{/* <Marker position={position} icon={BluePointIcon(15)} /> */}
				<CustomMarker position={position} popupText='Phnom Penh, Cambodia' />
			</MapContainer>
		</div>
	);
}

export default App;
