using System;
using System.Collections.Generic;

namespace RealTimeChatApp
{
    public class MessageSender : IMessageSender {

        public MessageFromUser SendMessage(string user, string text)
        {
            var message = new MessageFromUser();
            message.UserName = user;
            message.Message = text;
         
            return message;
        }
    }




    public interface IMessageSender
    {
        MessageFromUser SendMessage(string user, string text);
    }
}
