const pool = require("../../config/database");

module.exports = {
    createCustomer: (data, callBack) => {
        pool.query(
            `INSERT INTO customer(FirstName, LastName, Email, NIC) VALUES (?, ?, ?, ?)`,
            [
                data.FirstName,
                data.LastName,
                data.Email,
                data.NIC
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
    
                
                pool.query(
                    `SELECT customerID FROM customer WHERE Email = ? AND NIC = ?`,
                    [
                        data.Email,
                        data.NIC
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return callBack(error);
                        }
                        
                        return callBack(null, results);
                    }
                );
            }
        );
    },
    
    getCustomers: (callBack) => {
        pool.query(
        `select customerID, first_name, last_name, email from customer`,
        [],
        (error, results, fields) => {
            if (error) {
            return callBack(error);
            }
            return callBack(null, results);
        }
        );
    },
    
    
};