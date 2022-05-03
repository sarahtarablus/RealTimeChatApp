using System;
namespace RealTimeChatApp
{
    public class MessageFromUser
    {
      public string UserName { get; set; }
      public string Message { get; set; }
      public int ChannelId { get; set; }
      public int Id { get; set; }
      public DateTime Date { get; set; }
    }
}
