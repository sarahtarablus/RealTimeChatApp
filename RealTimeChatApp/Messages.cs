using System;
namespace RealTimeChatApp
{
    public class Messages
    {
        public virtual int Id { get; set; }
        public virtual User userId { get; set; }
        public virtual string text { get; set; }
        public virtual DateTime CreatedDate { get; set; }
        public virtual Channels ChannelId { get; set; }
        
    }
}
