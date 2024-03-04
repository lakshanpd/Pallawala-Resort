const {createCustomer} = require('./customer.services');



module.exports = {
    createCustomerController: (req, res) => {
        const body = req.body;
    
        createCustomer(body, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
}