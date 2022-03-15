using System;
using FluentNHibernate.Mapping;

namespace RealTimeChatApp
{
    public class UserMap : ClassMap<User>
    {
        public UserMap()
        {
            Id(x => x.Id);
            Map(x => x.Name);
            Map(x => x.CreatedDate);
        }
    }
}
