const pdfParse = require("pdf-parse");

async function parser(buffer){
    console.log("buffer>>>>>>>>>>>" , buffer)
    const data = await pdfParse(buffer)
    // console.log("data inside parser>>>>>>>>>>>>>>>" , data.text)
    return data.text
}

module.exports.parser = parser