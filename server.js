const CSVToJSON = require('csvtojson');
const fs = require('fs')
let clothes = './styles.json'
let images = './images.json'

async function trunToFileCsv() {
    try {
        const images = await CSVToJSON().fromFile('images.csv');

        fs.writeFile(images, JSON.stringify(images, null, 2), (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON array is saved.");
        });

    } catch (err) {
        console.log(err);
    }
};

function readAndParse(file) {
    const jsonArr = fs.readFileSync(file);
    const parsedJsonArr = JSON.parse(jsonArr);
    return parsedJsonArr
}

function joinJson() {
    var clothesJson = readAndParse(clothes)
    let newClothesArr = clothesJson.slice(0, 100)
   
    newClothesArr.forEach(item => {
        var itemId = item.id + ".jpg"
        const imagelink = getImageLink(itemId)        
        item['image'] = imagelink
    });

    fs.writeFile('clothes.json', JSON.stringify(newClothesArr, null, 2), (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON array is saved.");
    });

}

function getImageLink(styleId) {
    var imagesJson = readAndParse(images)

    var imageLink = imagesJson.find(image => {
        if (image.filename === styleId) {
            var imageLink = image.link
            return imageLink
        } 
    })
    return imageLink
}

joinJson()