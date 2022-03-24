using System;
namespace RealTimeChatApp
{
    public class Messages
    {
        
        public virtual int UserId { get; set; }
        public virtual string Text { get; set; }
        public virtual DateTime CreatedDate { get; set; }
        public virtual int ChannelId { get; set; }
        
    }
}
