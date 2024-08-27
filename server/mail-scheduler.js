import send_mail from "./mail-sender";

// send_mail("danukalakshan1019@gmail.com");

import { CronJob } from "cron";

const job = new CronJob(
  "0 9 * * *", // cronTime - Every day at 9 AM
  async function () {
    send_mail("danukalakshan1019@gmail.com");
  }, // onTick
  () => console.log("Mail was sent"), // onComplete
  true, // start
  "Asia/Colombo" // timeZone
);
