const puppeteer = require('puppeteer');

describe('Buy Advertisement', () => {
	it('should fill the name of the advertisement and the content type', async function () {
		//1. LOGIN INTO THE APPLICATION
		const browser = await puppeteer.launch({
			headless: false,
			slowMo: 200,
		});
		const page = await browser.newPage();
		await page.goto('https://storiesgain.com/');

		const loginButton = (
			await page.$x('//*[@data-user-type="blogger"]')
		)[0];

		await page.evaluate((el) => {
			el.click();
		}, loginButton);

		//***Change the user type to "advertiser"***
		const switcher = await page.waitForSelector('.sg-switcher__control');
		switcher.click();

		//***Submit your email to log into the application***
		await page.waitForSelector('input[placeholder="Your email"]');
		await page.type(
			'input[placeholder="Your email"]',
			'lidiiany92@gmail.com'
		);

		const [button] = await page.$x(
			"//button[@type='button']/div[contains(., 'Log In')]"
		);
		if (button) {
			await button.click();
		}

		// 2. START FILLING THE "BUY ADVERTISEMENT" TAB

		//***Wait for the validation code to be entered***

		await page.waitFor(15000);

		const advertisementTab = await page.$x(
			"//a[contains(., 'Buy advertisement')]"
		);

		console.log(advertisementTab);

		if (advertisementTab) {
			await button.click();
		}
	});
});
