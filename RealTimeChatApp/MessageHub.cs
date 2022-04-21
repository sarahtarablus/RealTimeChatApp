using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;


namespace RealTimeChatApp
{
    public class MessageHub: Hub
    {
        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            return base.OnDisconnectedAsync(exception);
        }
    }
}




