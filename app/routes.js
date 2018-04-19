import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App.js';
import HomePage from './commonComponents/home/index';
import AboutPage from './commonComponents/about/index';
import {getAsyncInjectors} from './helpers/asyncInjectors';

function getHomeRoutes() {
	return [
		{
			path: '/',
			name: 'Home',
			component: HomePage,
		}
	];
}
function getAboutRoutes() {
	return [
		{
			path: 'about',
			name: 'About',
			component: AboutPage,
		}
	];
}
function getAll() {
	return [
		{
			path: '/',
			name: 'Home',
			component: HomePage,
		},
		{
			path: 'about',
			name: 'About',
			component: AboutPage,
		}
	];
}

export default function getAllRoutes(store) {
	const {replaceReducers, runSagas} = getAsyncInjectors(store);

	const getRoutesForCurrentUserRole = (role) => {
		return function () {
			switch(role) {
				case "Admin": return getHomeRoutes();
				case "User": return getAboutRoutes();
				default: return [];
			}
		}
	};

	return [
		...getRoutesForCurrentUserRole("Admin")(),
		...getRoutesForCurrentUserRole("User")(),
	];
}