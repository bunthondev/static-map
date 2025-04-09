import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, LayersControl, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { toPng } from 'html-to-image';
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
	const [mapImage, setMapImage] = useState<string | null>(null);
	const [shouldRenderImage, setShouldRenderImage] = useState(false);
	const mapRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const lat = params.get('lat');
		const lng = params.get('lng');
		const render = params.get('render');

		if (lat && lng) {
			setPosition([parseFloat(lat), parseFloat(lng)]);
		}
		if (render === 'image') {
			setShouldRenderImage(true);
		}
	}, []);

	useEffect(() => {
		if (mapRef.current && shouldRenderImage) {
			// Wait for map to load
			setTimeout(() => {
				void toPng(mapRef.current!, {
					quality: 1,
					pixelRatio: 2,
					style: {
						transform: 'scale(1)',
					},
				})
					.then((dataUrl) => {
						setMapImage(dataUrl);
					})
					.catch((error) => {
						console.error('Error capturing map image:', error);
					});
			}, 1000);
		}
	}, [position, shouldRenderImage]);

	if (mapImage && shouldRenderImage) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<img src={mapImage} alt='Map' className='max-w-full max-h-full' />
			</div>
		);
	}

	return (
		<div className='h-screen w-screen' ref={mapRef}>
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
