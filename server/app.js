const express = require("express");
const cors = require("cors");
const app = express();


const cottageRouter = require("./api/cottage/cottage.router");
const bookingRouter = require("./api/booking/booking.router");
const roomRouter = require("./api/room/room.router");
const reviewRouter = require("./api/review/review.router");
const customerRouter = require("./api/customer/customer.router");


app.use(express.json());
app.use("/api/cottage", cottageRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/room", roomRouter);
app.use("/api/review", reviewRouter);
app.use("/api/customer", customerRouter);

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

app.listen(8080, () => {
    console.log("Server up and running");
}
);

