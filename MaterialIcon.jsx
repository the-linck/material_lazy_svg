import {
    useEffect,
    useState,
} from 'react';

import SvgIcon from '@mui/material/SvgIcon';



const MaterialIcon = (props) => {
	const [path, setPath] = useState(null);
	const [viewBox, setViewBox] = useState(null);

	const Style = 'data-style' in props
		? props['data-style']
		: 'filled'
	;
	const Name = props['data-icon'];
	useEffect(() => {
		const IconPath = `svg/${Style}/${Name}.svg`;

		const showIcon = (SvgText) => {
			const SvgDoc = new DOMParser().parseFromString(SvgText, "image/svg+xml");
	
			const SvgRoot = SvgDoc.querySelector('svg');
			const PathRoot = SvgRoot.querySelector('path')
			setPath(PathRoot.attributes['d'].value);

			if('viewBox' in SvgRoot.attributes) {
				setViewBox(SvgRoot.attributes['viewBox'].value);
			}
		};

		const LocalSvg = sessionStorage.getItem(IconPath);
		if (LocalSvg === null) {
			import(`@material-design-icons/${IconPath}`)
			.then(async Result => {
				const File = Result.default;
				const SvgText = await (await fetch(File, {
					cache: 'no-cache'
				})).text();
				sessionStorage.setItem(IconPath, SvgText);
				
				showIcon(SvgText);
			});
		} else {
			showIcon(LocalSvg);
		}
	}, [Name, Style]);

	// Respecting viewBox from props
	const Optional = {};
	if (!('viewBox' in props)) {
		Optional['viewBox'] = viewBox;
	}

	if (path !== null) {
		return <SvgIcon {...props} {...Optional}>
			<path d={path}/>
		</SvgIcon>;
	} else {
		return null;
	}
}

export default MaterialIcon;