# NJPW Match Randomizer

`/scraper` downloads matches from [MrLARIATO's spreadsheet](https://docs.google.com/spreadsheets/u/1/d/1ZsZCBTpKjHzdbCpKZ1No1KAdpmOd2OcgSMfC1-oa7pI/edit#gid=0) and puts em in a json file. `/static` is a static app that shows a random match from the json.

## Scraper Debugging

Run ```npm install``` to restore the necessary node.js packages.
Get a [Google Sheets API Key](https://console.developers.google.com/apis/credentials?pli=1). Set it in your environment variable GOOGLE_API_KEY and run ```node index.js```.

## Static Site Debugging

Ensure a valid matches.json file exists inside the `/static` folder. 

Do ```npm install http-server -g```, followed by ```http-server```, and the site will be running on port 8080 of your machine. 