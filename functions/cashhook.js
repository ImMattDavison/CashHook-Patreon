// authenticates you with the API standard library (stdlib.com)
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let data = context.params.data;
console.log(context.params);

if (data.attributes.patron_status === 'active_patron') {
  let data = context.params.data;
  let amount = data.attributes.campaign_pledge_amount_cents / 100;
  await lib.discord.channels['@0.3.0'].messages.create({
    channel_id: process.env.DONATION_FLOW_CHANNEL,
    content: `**Pledge from: ${data.attributes.full_name}**`,
    tts: false,
    embeds: [
      {
        type: 'rich',
        // The title of the embed delivered to Discord
        title: `New Pledge from: ${data.attributes.full_name}! 💰`,
        // The description (content) of the embed delivered in Discord
        description: `${data.attributes.full_name} has just pledged ${amount} ${data.attributes.campaign_currency}`,
        color: 0x3EC300,
      },
    ],
  });
}