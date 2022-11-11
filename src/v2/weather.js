import Umami from '../umami';
import { error } from 'itty-router-extras';


export const withWeatherLanguage = (req, env, ctx) => {
	const allowed = ['en', 'de', 'es', 'fr', 'nl', 'no', 'ru', 'zh_cn', 'id', 'tr'];
	const map = new Map([
		['de_DE', 'de'],
		['en_GB', 'en'],
		['en_US', 'en'],
		['zh_CN', 'zh_cn'],
	]);
	let { language } = req.query;
	if (!language) {
		language = 'en';
	} else if (map.has(language)) {
		language = map.get(language);
	} else if (!allowed.includes(language)) {
		ctx.waitUntil(Umami.error(req, env, 'unsupported-language'));
		return error(400, 'Unsupported language');
	}
	req.$language = language;
};