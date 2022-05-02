using System;
namespace RealTimeChatApp
{
    public interface IRepository<T> where T: class, IEntity
    {

    }
}
