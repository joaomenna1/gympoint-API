import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';


class WelcomeMail {
  get key() {
    return 'WelcomeMail';
  }

  async handle({ data }) {
    const { registration, student, plan } = data;

    console.log('A fila esta funcionando! agora vai!');

    await Mail.sendEmail({
      to: `${student.name} <${student.email}>`,
      subject: 'Sua matricula foi ativada',
      template: 'welcome',
      context: {
        student: student.name,
        plan: plan.title,
        price: plan.price,
        end_date: format(parseISO(registration.end_date), "'dia' dd 'de' MMMM 'de' yyyy", {
          locale: pt,
        }),
        start_date: format(parseISO(registration.start_date), "'dia' dd 'de' MMMM 'de' yyyy", {
          locale: pt,
        }),
      },
    })

    ;
  }
}

export default new WelcomeMail();
