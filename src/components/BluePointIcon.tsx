import L from 'leaflet';

export const BluePointIcon = (size: number = 16) => {
	return L.divIcon({
		className:
			'flex justify-center items-center bg-blue-500 rounded-full border-2 border-white border-solid',
		html: `<div></div>`,
		iconSize: [size, size],
	});
};
