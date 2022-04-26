using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;


namespace RealTimeChatApp
{
    public class ChatHub: Hub
    {
        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            return base.OnDisconnectedAsync(exception);
        }

        public void SendUser(string user)
        {
            Clients.All.SendAsync("ReceiveUser", user);
        }
    }
}




