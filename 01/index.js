const puppeteer = require('puppeteer')

void (async () => {
    try {
        const browser = await puppeteer.launch()

        const page = await browser.newPage()

        await page.goto('https://scrapethissite.com/pages/simple')

        const countries = await page.evaluate(() => {

            const country_name = document.querySelectorAll('div.country')
            const data = []
            for (let i = 0; i < country_name.length; i++) {
                data.push({
                    Name: country_name[i].querySelector('h3.country-name').innerText.trim(),
                    Capital: country_name[i].querySelector('span.country-capital').innerText.trim(),
                    Population: country_name[i].querySelector('span.country-population').innerText.trim(),
                    Area: country_name[i].querySelector('span.country-area').innerText.trim(),
                });
            }

            return data
        })

        // log the data for testing purposes
        console.log(JSON.stringify(countries, null, 2))

        // // save the data as JSON
        const fs = require('fs')

        fs.writeFile(
            '../json/countries.json',
            JSON.stringify(countries, null, 2), // optional params to format it nicely
            (err) => err ? console.error('Data not written!', err) : console.log('Data written!')
        )

        await browser.close()
    } catch (error) {
        console.error();
    }
})()