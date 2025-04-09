import React from 'react';
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	LayersControl,
} from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapLayer = {
	Roadmap: 'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
	Satellite: 'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
	Terrain: 'https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
	Hybrid: 'https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
};

function App() {
	const position: LatLngExpression = [11.628984, 104.876086];

	return (
		<div className='h-screen w-screen'>
			<MapContainer
				center={position}
				zoom={13}
				style={{ height: '100%', width: '100%' }}>
				{/* <TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/> */}
				<LayersControl position='bottomright' collapsed>
					<LayersControl.BaseLayer name='Satellite'>
						<TileLayer
							url={`${MapLayer.Satellite}&size=256&scale=2`}
							subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
							maxZoom={20}
						/>
					</LayersControl.BaseLayer>

					<LayersControl.BaseLayer name='Hybrid' checked>
						<TileLayer
							url={`${MapLayer.Hybrid}&size=256&scale=2`}
							subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
							maxZoom={20}
						/>
					</LayersControl.BaseLayer>

					<LayersControl.BaseLayer name='jawg light'>
						<TileLayer
							url='https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}.png?access-token=dwyDjrVBSs7Yhod2suQVmE6dj2uPwPe5FG4vIpmloSTqv8Jpd3jdDV4hMXkk2Tdv'
							attribution='&copy; <a href="https://jawg.io">Jawg</a> contributors'
							maxZoom={20}
						/>
					</LayersControl.BaseLayer>
				</LayersControl>
				<Marker position={position}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
}

export default App;
