import React, { useState } from "react";
import "./form.css";
import {useNavigate} from "react-router-dom";

function BookingForm() {
 
    const [checkinDate, setCheckinDate] = useState("");
    const [checkoutDate, setCheckoutDate] = useState("");
    // const navigate = useNavigate();
    
    const fetchCustomer = async (targetData) => {
        fetch('http://localhost:8080/api/customer/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(targetData)
        })
        .then(response => response.json())
        .then(data => {
            
            console.log('Customer ID:', data.customerID);
        })
        .catch(error => {
            
            console.error('Error:', error);
        });

    }



    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        

        const targetData = {
            FirstName: data.firstname,
            LastName: data.lastname,
            NIC: data.NIC,
            Email: data.email,
            // CheckInDate: data.checkinDate,
            // CheckOutDate: data.checkoutDate,
            // Phones : [data.phone1, data.phone2]
        }
       
        console.log(targetData); 


        fetchCustomer(targetData);
        
        
        
        
        
        // navigate(`/selectroom/${targetData.Phones[0]}/${targetData.Phones[1]}`);
    };

    return (
        <div className="col-100">
            <div className="container">
                <form action="#" onSubmit={onSubmit}>
                <div className="divider">{'\u00a0\u00a0\u00a0Fill Your Details\u00a0\u00a0\u00a0'}</div>
                    <div className="row">
                        <div className="col-50">
                            <label htmlFor="fname">
                                <i className="fa fa-user"></i> First Name
                            </label>
                            <input
                                type="text"
                                id="fname"
                                name="firstname"
                                placeholder="Himindu"
                            />

                            <label htmlFor="email">
                                <i className="fa fa-envelope"></i> Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="himindukularathne@gmail.com"
                            />
                        </div>
                        <div className="col-50">
                            <label htmlFor="lname">
                                <i className="fa fa-user"></i> Last Name
                            </label>
                            <input
                                type="text"
                                id="lname"
                                name="lastname"
                                placeholder="Kularathne"
                            />
                            <label htmlFor="NIC">
                                <i className="fa fa-user"></i> NIC
                            </label>
                            <input
                                type="text"
                                id="NIC"
                                name="NIC"
                                placeholder="123456789V"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-50" >
                            <label htmlFor="checkinDate">
                                <i className="fa fa-calendar"></i> Check-in Date
                            </label>
                            <input
                              style = {{
                                width: "100%",
                                padding: "12px",
                                border: "1px solid #ccc",
                            }}
                                type="date"
                                id="checkinDate"
                                name="checkinDate"
                                value={checkinDate}
                                onChange={(e) => setCheckinDate(e.target.value)}
                            />
                              <label htmlFor="phone2">
                                    <i className="fa fa-phone"></i> Phone Number 2
                                </label>
                                <input
                                    type="text"
                                    id="phone2"
                                    name="phone2"
                                    placeholder="0712345679"
                                />
                        </div>
                        <div className="col-50">
                            <label htmlFor="checkoutDate">
                                <i className="fa fa-calendar"></i> Check-out Date
                            </label>
                            <input
                            style = {{
                                width: "100%",
                                padding: "12px",
                                border: "1px solid #ccc",
                            }}
                                type="date"
                                id="checkoutDate"
                                name="checkoutDate"
                                value={checkoutDate}
                                onChange={(e) => setCheckoutDate(e.target.value)}
                            />
                            <label htmlFor="phone1">
                                    <i className="fa fa-phone"></i> Phone Number 1
                                </label>
                                <input
                                    type="text"
                                    id="phone1"
                                    name="phone1"
                                    placeholder="0712345678"
                                />
                         
                        </div>
                        
                                
                    </div>
                
                    
                    <button type="submit" className="booking-form-button">
                            Continue to Book Room
                </button>
                        
                  
                </form>
               
            </div>
            
        </div>
    );
}

export default BookingForm;

// export function CheckoutPage() {
//     return (
//         <div className="row">
//             <BillingForm />
//         </div>
//     );
// }