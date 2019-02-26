const puppeteer = require('puppeteer')

void (async () => {
    try {
        const browser = await puppeteer.launch()

        const page = await browser.newPage()

        await page.goto('https://scrapethissite.com/pages/ajax-javascript')

        await page.click('#\\32 015')
        await page.waitForSelector('tr.film').then(() => console.log('got tr'))

        // await page.screenshot({
        //     path: 'page1.png',
        //     fullPage: true
        // })

        // // grab team data
        const films = await page.evaluate(() => {
            const grabFromRow = (row, classname) => row
                .querySelector(`td.${classname}`)
                .innerText
                .trim()

            const FILM_ROW_SELECTOR = 'tr.film'

            const data = []

            const filmRows = document.querySelectorAll(FILM_ROW_SELECTOR)

            for (const tr of filmRows) {
                data.push({
                    title: grabFromRow(tr, 'film-title'),
                    nominations: grabFromRow(tr, 'film-nominations'),
                    awards: grabFromRow(tr, 'film-awards')
                })
            }

            return data
        })

        // // log the data for testing purposes
        console.log(JSON.stringify(films, null, 2))

        // save the data as JSON
        const fs = require('fs')

        fs.writeFile(
            'films.json',
            JSON.stringify(films, null, 2), // optional params to format it nicely
            (err) => err ? console.error('Data not written!', err) : console.log('Data written!')
        )

        await browser.close()
    } catch (error) {
        console.error();
    }
})()