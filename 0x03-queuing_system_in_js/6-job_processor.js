const kue = require('kue');
const queue = kue.createQueue();

// sendNotification function
 const sendNotification = (phoneNumber, message) => {
 console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
     };

     // Create a job processor
     queue.process('push_notification_code', (job, done) => {
         const { phoneNumber, message } = job.data;
             sendNotification(phoneNumber, message);
                 done();
                 });
