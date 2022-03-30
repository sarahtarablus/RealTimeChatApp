using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Npgsql;

namespace RealTimeChatApp
{
    public class LoginUser
    {
        
            public virtual string Name { get; set; }
            public virtual string Password { get; set; }
       
    }
}
