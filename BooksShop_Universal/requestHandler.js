import axios from "axios";

function handleRender(req, res) {
    //Call from server (3001), not proxy(3000)
    axios.get("http://localhost:3001/book")
        .then(function(response) {
            var html = JSON.stringify(response.data);
            res.render("index", {html});
        })
        .catch(function(err){
            console.log("#Initial Server-side rendering error", err);
        });
}

module.exports = handleRender;