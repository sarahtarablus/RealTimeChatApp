using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
namespace RealTimeChatApp
{
    public class UserHub : Hub
    {
        public void SendUser(string user)
        {
            Clients.All.SendAsync("ReceiveUser", user);
        }
    }
}
