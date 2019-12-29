import Bee from 'bee-queue';
import WelcomeMail from '../app/jobs/WelcomeMail';
import redisConfig from '../config/redis';

const jobs = [WelcomeMail];

class Queue {
  constructor(){
    this.queues = {};
    this.init();
  }

    init() {
      jobs.forEach(({ key, handle  }) => {
        this.queues[key] ={
          bee:  new Bee(key, {
            redis: redisConfig,
          }),
          handle,
        }
      })
    }

    add(queue, job) {
      return this.queues[queue].bee.createJob(job).save();
    }

    processQueue() {
      jobs.forEach( job => {
        const { bee, handle } = this.queues[job.key];

        bee.process(handle);
      })
    }
}

export default new Queue();

/*  Neste arquivo separa cada background job em uma fila   */
/*  Temos um array de jobs nesse caso so tem o welcomeMail */
/*  Handle é o carinha que processa a fila , Bee é a instancia onde vai connectar o nosso banco de dados com redis */
