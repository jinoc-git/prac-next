import axios from 'axios';

interface Message {
  title: string;
  body: string;
  click_action: string;
  token: string;
}

const useSendPushNotification = () => {
  const sendPush = async (args: Message) => {
    const { title, body, token, click_action } = args;
    const message = {
      data: {
        title,
        body,
        click_action,
      },
      token,
    };

    await axios.request({
      method: 'POST',
      url: window?.location?.origin + '/api/fcm',
      data: { message },
    });
  };

  return { sendPush };
};

export default useSendPushNotification;
