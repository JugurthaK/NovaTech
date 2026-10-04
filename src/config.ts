export const config = {
  port: Number(process.env.PORT ?? 3000),
  // Vulnerable on purpose: never expose this server beyond localhost.
  host: '127.0.0.1',

  jwtSecret: 'novatech-super-secret-jwt-key-2024',

  aws: {
    region: 'eu-west-3',
    accessKeyId: 'AKIAZ7NOVATECH4DEMO2',
    secretAccessKey: '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',
    uploadsBucket: 'novatech-uploads',
  },
};
