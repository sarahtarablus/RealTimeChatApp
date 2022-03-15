using System;
using System.Collections;

namespace RealTimeChatApp
{
    public interface IUsersRepository
    {
        IEnumerable Get();
        User GetById(int id);
        void Add(int index, User entity);
    }
}
