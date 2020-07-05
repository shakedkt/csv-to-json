const CSVToJSON = require('csvtojson');
const fs = require('fs')

CsvToAlteredJSON('clothes.json')

async function CsvToAlteredJSON(fileName) {
    const stylesJson = await csvFileToJson('styles.csv')
    const imagesJson = await csvFileToJson('images.csv')

    const newJsonArray = joinJson(stylesJson, imagesJson)

    writeJsonFile(newJsonArray, fileName)
}

// step 1: using CSVToJSON library to turn the CSV to JSON, and return the new JSON
function csvFileToJson(csvName) {
    try {
        const jsonArr = CSVToJSON().fromFile(csvName);
        return jsonArr

    } catch (err) {
        console.log(err);
    }
};

// get information from another json array and add new parameters to the styles array  
function joinJson(stylesJson, imagesJson) {
    let newStylesArr = stylesJson.slice(0, 100)

    newStylesArr.forEach(item => {
        newStylesArr = newStylesArr.filter(function( item ) {
            return item.articleType !== 'Watches';
        });

        var itemId = item.id + ".jpg"
        const imagelink = getImageLink(itemId, imagesJson)
        const price = getPrice()
        item['image'] = imagelink
        item['price'] = price
    });
    return newStylesArr
}

// get the image link from the image Json array and return the image link
function getImageLink(styleId, Json) {
    const imageLink = Json.find(image => {
        if (image.filename === styleId) {
            const imageLink = image.link
            return imageLink
        }
    })
    return imageLink
}

// return random price up to 250
function getPrice() {
    const price = Math.floor(Math.random() * 250)
    return price
}

// create a new JSON file
function writeJsonFile(Json, name) {
    fs.writeFile(name, JSON.stringify(Json, null, 2), (err) => {
        if (err) console.log(err)
        else {
            console.log("JSON array is saved.");
        }
    });
}