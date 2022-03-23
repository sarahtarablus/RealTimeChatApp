using System;
using RealTimeChatApp;

namespace RealTimeChatAppUnitTests
{
    public class FakeUser : IUser
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual string Password { get; set; }
    }
}
