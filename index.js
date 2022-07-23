// index.js
const Mustache = require('mustache');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache';
const puppeteerService = require('./services/puppeteer.service');

/**
  * DATA is the object that contains all
  * the data to be provided to Mustache
  * Notice the "name" and "date" property.
*/
let DATA = {
  name: 'Novruz',
  date: new Date().toLocaleDateString('az-Latn', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
    timeZone: 'Asia/Baku',
  }),
};
/**
  * A - We open 'main.mustache'
  * B - We ask Mustache to render our file with the data
  * C - We create a README.md file with the generated output
  */
async function generateReadMe() {
  fs.readFile(MUSTACHE_MAIN_DIR, (err, data) =>  {
    if (err) throw err;
	
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync('README.md', output);
  });
}

const firstFunction2 = async () => {
	const instagramImages = await puppeteerService.getLatestInstagramPostsFromAccount('visitstockholm', 3);
	console.log(instagramImages);
}

async function setBehanceProjects() {
	const behanceProjects = await puppeteerService.getLatestBehanceProjects('RadeGraphic', 3);
	DATA.projects = behanceProjects;
  }

async function action() {

	// await firstFunction2();

	await setBehanceProjects();

  
	/**
	 * Generate README
	 */
	await generateReadMe();


	await puppeteerService.close();
  }

  action();

