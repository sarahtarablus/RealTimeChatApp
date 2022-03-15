using System;
using FluentNHibernate.Mapping;

namespace RealTimeChatApp
{
    public class MessagesMap : ClassMap<Messages>
    {
        public MessagesMap()
        {
            Id(x => x.Id);
            Map(x => x.userId);
            Map(x => x.text);
            Map(x => x.CreatedDate);
            Map(x => x.ChannelId);

            References(x => x.userId);
            References(x => x.ChannelId);
        }
    }
}
