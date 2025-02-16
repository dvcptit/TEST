import { Queue } from 'bullmq';

const queue = new Queue("login", { connection: { host: "localhost", port: 6379 } });

async function checkJobs() {
  const waitingJobs = await queue.getWaiting();
  console.log("📌 Danh sách job đang chờ xử lý:", waitingJobs);
}

checkJobs();
