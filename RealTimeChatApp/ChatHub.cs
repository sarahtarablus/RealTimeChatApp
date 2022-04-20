using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Npgsql;

namespace RealTimeChatApp
{
    public class ChatHub: Hub<IChatHub>
    {

        public async Task SendMessage()//DateTime createdDate, int channelId)
        {
            var message = new Messages();
            var data = message.GetMessages();//createdDate, channelId);
            await Clients.All.ReceiveMessage(data);        
        }
    }
}



//private readonly IMessageSender _messageSender;

//public ChatHub(IMessageSender messageSender)
//{
//    _messageSender = messageSender;
//}

//public MessageFromUser SendMessage(string user, string text)
//{

//    Clients.All.SendAsync("ShowMessage", user, text);
//    return _messageSender.SendMessage(user, text);
//}
