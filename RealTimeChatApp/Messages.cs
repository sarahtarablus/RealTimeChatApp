using System;
namespace RealTimeChatApp
{
    public class Messages
    {
        public int Id { get; set; }
        public User userId { get; set; }
        public string text { get; set; }
        public DateTime CreatedDate { get; set; }
        public int ChannelId { get; set; }
        
    }
}
