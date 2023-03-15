module.exports = {
    index: async(req, res) => {
        try {
            res.render("index", {
                title: "Mawar Laundry"
            })
        } catch (error) {
            console.log(error);
        }
    }
}