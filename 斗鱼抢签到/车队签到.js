const  CronJob = require('cron').CronJob;
new CronJob('00 00 00 * * *', _ => {
    console.log(new Date());
}, null, true);