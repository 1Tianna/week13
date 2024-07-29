const express = require("express")
const { LocalStorage } = require("node-localstorage")
const app = express();
const PORT = 3000;

const localStorage = new LocalStorage('./scratch')

app.use(express.json())

//store items
// localStorage.setItem("key", "thing im trying to save")
// //get items out of storage
// localStorage.getItem("key")

// create GET route (get the stuff we're storing) 
// a POST route (add an item to storage)

// GET ROUTE
app.get("/item/:key", (req, res) => {
    let key = req.params.key
    let value = localStorage.getItem(key)
    if (value) {
        res.json({key, value})
    } else {
        res.status(404).json({error: "item not found"})
    }
})

// POST ROUTE to store an item
app.post("/item", (req, res) => {
    let key = req.body.key
    let value = req.body.key
    localStorage.setItem(key, value)
    res.json({ message: `Item with key '${key}' store successfully` })
})

// DELETE POST
app.delete("/item/:key", (req, res) => {
    let key = req.params.key
    let storedItem = localStorage.removeItem(key)
    if (storedItem) {
        localStorage.removeItem(key)
        res.json({message: `Item with key '${key}' deleted successfully` })
    } else {
        res.status(404).json({ error: `Item with key '${key}' not found`})
    }
    }
})

// app.post()
app.listen(PORT, () => {
    console.log("it's working!")
})