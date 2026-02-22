export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email } = body;

  if (!email) {
    throw createError({ statusCode: 400, statusMessage: 'Email is required' });
  }

  const mailService = useMailService();

  // Send a confirmation email to the user
  await mailService.sendEmail(
    email,
    'Welcome to the Inner Circle',
    `<h1>Welcome to ${useRuntimeConfig().public.appName}</h1><p>Thanks for joining our waitlist!</p>`
  );

  return { status: 'success' };
});