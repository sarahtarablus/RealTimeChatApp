using System;
using System.Collections;
using System.Collections.Generic;

namespace RealTimeChatApp
{
    public class User
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual DateTime CreatedDate { get; set; }
       
        
    }
}
