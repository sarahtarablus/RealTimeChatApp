using System;
namespace RealTimeChatApp
{
    public class MessagesUsername
    {
        public string UserName { get; set; }
        public int UserId { get; set; }
        public string Text { get; set; }
        public DateTime CreatedDate { get; set; }
        public int ChannelId { get; set; }
    }
}
