using System.Collections;
using Moq;
using NUnit.Framework;

namespace RealTimeChatAppUnitTests
{
    public class UsersControllerTests
    {
        //[SetUp]
        //public void Setup()
        //{
        //}

        [Test]
        public void PostMethodSetsLocationHeader()
        {
            var mockUsersDictionary = new Mock<IDictionary>();
            var mockUsersList = new Mock<IList>();
            var usersController = new (mockUsersList, mockUsersDictionary);
            
        }
    }
}
