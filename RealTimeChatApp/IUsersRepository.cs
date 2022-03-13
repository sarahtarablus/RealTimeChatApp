using System;
namespace RealTimeChatApp
{
    public interface IUsersRepository
    {
        void Get();
        User GetById(int id);
        void Add(int index, User entity);
    }
}
