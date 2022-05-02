using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Npgsql;

namespace RealTimeChatApp
{
    public class Messages: IEntity
    {

        public virtual string UserName { get; set; }
        public virtual int UserId { get; set; }
        public virtual string Text { get; set; }
        public virtual int ChannelId { get; set; }
        public virtual int Id { get; set; }



    }
}
