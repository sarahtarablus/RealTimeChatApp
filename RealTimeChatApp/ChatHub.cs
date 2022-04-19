using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace RealTimeChatApp
{
    public class ChatHub: Hub
    {
        private readonly IMessageSender _messageSender;

        public ChatHub(IMessageSender messageSender)
        {
            _messageSender = messageSender;
        }

        public MessageFromUser SendMessage(string user, string text)
        {
            return _messageSender.SendMessage(user, text);
        }
    
    }
}
 