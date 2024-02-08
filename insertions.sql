-- Insert customers
INSERT INTO Customer (Email, FirstName, LastName, NIC) 
VALUES 
('customer1@example.com', 'John', 'Doe', '123456789V'),
('customer2@example.com', 'Alice', 'Smith', '987654321V'),
('customer3@example.com', 'Bob', 'Johnson', '567890123V'),
('customer4@example.com', 'Emily', 'Brown', '456789012V'),
('customer5@example.com', 'David', 'Lee', '234567890V'),
('customer6@example.com', 'Sarah', 'Wilson', '345678901V'),
('customer7@example.com', 'Michael', 'Taylor', '678901234V'),
('customer8@example.com', 'Emma', 'Jones', '789012345V');

-- Insert phone numbers
INSERT INTO PhoneNumber (CustomerID, PhoneNumber) 
VALUES 
(1, '123-456-7890'),  -- Customer 1 with one phone number
(2, '987-654-3210'),  -- Customer 2 with one phone number
(3, '567-890-1234'),  -- Customer 3 with one phone number
(4, '456-789-0123'),  -- Customer 4 with one phone number
(5, '234-567-8901'),  -- Customer 5 with one phone number
(5, '555-555-5555'),  -- Customer 5 with another phone number
(6, '345-678-9012'),  -- Customer 6 with one phone number
(7, '678-901-2345'),  -- Customer 7 with one phone number
(8, '789-012-3456'),  -- Customer 8 with one phone number
(8, '111-222-3333');  -- Customer 8 with another phone number

-- Inserting data into the Room table
INSERT INTO Room (RoomID, IsCottage, MaxMembers, AC, Price, Description) 
VALUES 
(1, true, 4, true, 4000.00, 'Cozy cottage with air conditioning, Standard room with fan, Large cottage with air conditioning and garden view, cottage 1'),
(2, true, 2, true, 5000.00, 'Cozy cottage with air conditioning, Standard room with fan, Large cottage with air conditioning and garden view, cottage 2'),
(3, true, 6, true, 6000.00, 'Cozy cottage with air conditioning, Standard room with fan, Large cottage with air conditioning and garden view, cottage 3'),
(4, true, 3, true, 8000.00, 'Cozy cottage with air conditioning, Standard room with fan, Large cottage with air conditioning and garden view, cottage 4'),
(5, true, 8, true, 7500.00, 'Cozy cottage with air conditioning, Standard room with fan, Large cottage with air conditioning and garden view, cottage 5'),
(6, true, 8, true, 7500.00, 'Cozy cottage with air conditioning, Standard room with fan, Large cottage with air conditioning and garden view, cottage 6'),
(7, false, 2, false, 1500.00, 'Cozy cottage with air conditioning, Standard room with fan, Large cottage with air conditioning and garden view, room 1'),
(8, false, 3, false, 2500.00, 'Cozy cottage with air conditioning, Standard room with fan, Large cottage with air conditioning and garden view, room 2'),
(9, false, 2, false, 3500.00, 'Cozy cottage with air conditioning, Standard room with fan, Large cottage with air conditioning and garden view, room 3'),
(10, false, 2, false, 3000.00, 'Cozy cottage with air conditioning, Standard room with fan, Large cottage with air conditioning and garden view, room 4');

-- Inserting bookings
INSERT INTO Booking (CustomerID, CheckIn, CheckOut, Confirmed) 
VALUES 
(1, '2024-02-15', '2024-02-20', true), -- Booking for customer 1
(2, '2024-03-10', '2024-03-15', true), -- Booking for customer 2
(3, '2024-04-05', '2024-04-10', true), -- Booking for customer 3
(4, '2024-05-20', '2024-05-25', true), -- Booking for customer 4
(5, '2024-06-15', '2024-06-20', true), -- Booking for customer 5
(6, '2024-07-10', '2024-07-15', true), -- Booking for customer 6
(7, '2024-08-05', '2024-08-10', true), -- Booking for customer 7
(8, '2024-09-20', '2024-09-25', true); -- Booking for customer 8


-- Inserting room details
INSERT INTO RoomDetails (BookingRef, RoomID) 
VALUES 
(1, 1), -- Booking 1 is for Room 1
(1, 2), -- Booking 1 is for Room 1
(2, 2), -- Booking 2 is for Room 2
(3, 3), -- Booking 3 is for Room 3
(3, 4), -- Booking 3 is for Room 3
(3, 5), -- Booking 3 is for Room 3
(4, 4), -- Booking 4 is for Room 4
(5, 5), -- Booking 5 is for Room 5
(5, 7), -- Booking 5 is for Room 5
(5, 8), -- Booking 5 is for Room 5
(5, 9), -- Booking 5 is for Room 5
(6, 1), -- Booking 6 is for Room 1
(7, 2), -- Booking 7 is for Room 2
(8, 3); -- Booking 8 is for Room 3

-- Inserting reviews
INSERT INTO Review (BookingRef, Rating, Content) 
VALUES 
(1, 5, 'Excellent service and facilities. Would definitely recommend.'),  -- Review for booking 1
(2, 4.5, 'Good experience overall. Room was clean and comfortable.'),         -- Review for booking 2
(3, 3.5, 'Average stay. Room was okay, but nothing special.'),               -- Review for booking 3
(4, 5, 'Outstanding! Loved every moment of our stay.'),                    -- Review for booking 4
(7, 0.5, 'Wonderful service and amenities. Will definitely return.'),        -- Review for booking 7
(8, 4, 'Very satisfied with our stay. Room exceeded expectations.');      -- Review for booking 8

-- Inserting administrators
INSERT INTO Admin (Email, Password) 
VALUES 
('admin1@example.com', 'password1'), -- Admin 1
('admin2@example.com', 'password2'), -- Admin 2
('admin3@example.com', 'password3'); -- Admin 3



