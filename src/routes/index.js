const express = require('express');
const router = express.Router();
const requestPromise = require('request-promise');
const $ = require('cheerio');
const mainUrl = "https://www.iceenterprise.com";
const url = `${mainUrl}/careers/jobs-results/?category=All&location=All`;
const jobsItems = []; 

//request
requestPromise(url)  
    .then(html => {
    ///success!
        const jobsTable = $('.job-search-results-container div', html);
        jobsTable.each((i, error) => {
            const title = $('div:nth-child(1):nth-child(1) h3', error).text();
            const location = $('div:nth-child(1):nth-child(1) p', error).text();
            const url = mainUrl.concat($('div:nth-child(2) a', error).attr("href"));

            if(title != "" && location != "" && url != 'https://www.iceenterprise.comundefined'){
                jobsItems.push(
                    {
                        title : title,
                        location: location,
                        url: url
                    }
                );
            };
            
            
        });

        
    
    })
    .catch(error => {
        ///handling error
        console.log(error);
    });

router.get('/', (req, res) => {
    res.render('index', {
        jobsItems
        
    });
});


module.exports = router;