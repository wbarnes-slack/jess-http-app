const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

//#region Events
app.message('hello', async ({ message, say }) => {
  await say(`hey there, <@${message.user}`)
});
//#endregion

//#region Commands
// The echo command simply echoes on command
app.command('/start', async ({ command, ack, respond, client }) => {
  // Acknowledge command request
  await ack();
  console.log(command)

  client.chat.postMessage({
    channel: "C02NCBQS1PV",
    text: "Click the buttons to open a modal or dialog!",
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Click the button to open a Modal!"
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Open Modal",
            "emoji": true
          },
          "value": "open_modal_0",
          "action_id": "button-action-modal-0"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Click the button to open a Dialog"
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Open Dialog",
            "emoji": true
          },
          "value": "open_dialog_0",
          "action_id": "button-action-dialog-0"
        }
      }
    ]
  });
});
//#endregion

//#region Actions
// Your listener function will be called every time an interactive component with the action_id "approve_button" is triggered
app.action('button-action-modal-0', async ({ trigger_id, ack, client }) => {
  await ack();

  // Open a modal
  client.views.open({
    trigger_id: trigger_id,
    view: {
      "type": "modal",
      "title": {
        "type": "plain_text",
        "text": "My App",
        "emoji": true
      },
      "submit": {
        "type": "plain_text",
        "text": "Submit",
        "emoji": true
      },
      "close": {
        "type": "plain_text",
        "text": "Cancel",
        "emoji": true
      },
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "plain_text",
            "text": "This is a modal, and it's payload: ",
            "emoji": true
          }
        }
      ]
    }
  });
});

// Your listener function will be called every time an interactive component with the action_id "approve_button" is triggered
app.action('button-action-dialog-0', async ({ ack }) => {
  await ack();
  // Update the message to reflect the action
});
//#endregion


(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();