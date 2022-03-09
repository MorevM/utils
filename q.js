// const execAll = (regexp, string) => {
// 	const matches = [];
// 	let match = null;

// 	while ((match = regexp.exec(string))) {
// 		// const matchArray = Object.entries(match).reduce((acc, [key, value]) => {
// 		// 	if (isNaN(key)) return acc;
// 		// 	acc.push(value);
// 		// 	return acc;
// 		// }, []);

// 		// matches.push(matchArray);
// 		matches.push(match);
// 	}

// 	return matches;
// };

// const str = `<script type="js" src="some.js" async></script> <script type="js" src="some.js" async></script>`;

// console.log(execAll(/<script(.*?)src=["'](.*?)["'](.*?)>.*?<\/script>/g, str));

// console.log([...str.matchAll(/<script(.*?)src=["'](.*?)["'](.*?)>.*?<\/script>/g)]);

// import q from './package.json';


const { hash } = require('./dist/index.js');

console.log(hash('1223'));
