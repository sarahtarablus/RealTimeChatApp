using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RealTimeChatApp
{
    public interface IChatHub
    {
        Task ReceiveMessage(Task<IEnumerable<Messages>> messages);
    }
}
