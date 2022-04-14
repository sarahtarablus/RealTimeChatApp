using System;
using WebSocketSharp;
using WebSocketSharp.Server;
namespace RealTimeChatApp
{
    public class ChatMessages : WebSocketBehavior
    {
        protected override void OnMessage(MessageEventArgs e)
        {
            Sessions.Broadcast(e.Data);
        }
    }
}
