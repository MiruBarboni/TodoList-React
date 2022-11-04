import React from 'react';
import Logo from './Logo/Logo';

import cssStyle from './MainNavigation.module.css';
import Navigation from './Navigation/Navigation';

const MainNavigation = () => {
	return (
		<header className={cssStyle.header}>
			<Logo />
			<Navigation />
		</header>
	);
};

export default MainNavigation;
