import nodemailer from 'nodemailer';

export const useMailService = () => {
  const config = useRuntimeConfig();

  const transporter = nodemailer.createTransport({
    host: config.mailHost,
    port: parseInt(config.mailPort),
    auth: {
      user: config.mailUser,
      pass: config.mailPass,
    },
  });

  const sendEmail = async (to: string, subject: string, html: string) => {
    try {
      const info = await transporter.sendMail({
        from: `"${config.public.appName}" <${config.mailUser}>`,
        to,
        subject,
        html,
      });
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Mail Error:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to send email',
      });
    }
  };

  return { sendEmail };
};