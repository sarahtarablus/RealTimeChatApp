using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RealTimeChatApp
{
    public class MessagesRepository: IMessagesRepository
    {
     
        public MessageFromUser GetMessages(ChannelId channelId)
        {
            throw new NotImplementedException();
        }

        public MessageFromUser SendMessage(Messages message, DateTime date)
        {
            throw new NotImplementedException();
        }

        int IMessagesRepository.GetLastRow()
        {
            throw new NotImplementedException();
        }
    }
}
