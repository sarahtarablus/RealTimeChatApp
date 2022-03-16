using System;
using FluentNHibernate.Mapping;

namespace RealTimeChatApp
{
    public class ChannelsMap : ClassMap<Channels>
    {
        public ChannelsMap()
        {
            Id(x => x.Id);
            Map(x => x.Name);
        }
    }
}
