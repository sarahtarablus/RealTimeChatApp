using System;
using FluentNHibernate.Mapping;

namespace RealTimeChatApp
{
    public class MessagesMap : ClassMap<Messages>
    {
        public MessagesMap()
        {
            Id(x => x.Id);
            References(x => x.userId).Cascade.All();
            Map(x => x.text);
            Map(x => x.CreatedDate);
            References(x => x.ChannelId).Cascade.All();

        }
    }
}
