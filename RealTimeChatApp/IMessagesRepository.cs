using System;
namespace RealTimeChatApp
{
    public interface IMessagesRepository
    {
        
        MessageFromUser SendMessage(Messages message, DateTime date);
        MessageFromUser GetMessages(ChannelId channelId);
        int GetLastRow();

    }
}
