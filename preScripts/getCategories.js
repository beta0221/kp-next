const fs = require('fs')

const getCategories = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/landing/categories`)
    const cats = await res.json()
    let json = JSON.stringify(cats)
    

    fs.writeFile('./public/categories.json', json, function(error){
        if(error) {
            console.log(error)
            return
        }
        console.log(json)
    })




}

getCategories()


