using System;
namespace RealTimeChatApp
{
    public class LoginUser
    {
        
            public virtual string Name { get; set; }
            public virtual string Password { get; set; }

        public static implicit operator LoginUser(string v)
        {
            throw new NotImplementedException();
        }
    }
}
