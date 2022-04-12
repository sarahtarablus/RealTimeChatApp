using System.Collections;
using Microsoft.AspNetCore.Mvc;

using NUnit.Framework;
using RealTimeChatApp;
using RealTimeChatApp.Controllers;


namespace RealTimeChatAppUnitTests
{
    public class UsersControllerTests
    {
        //[SetUp]
        //public void Setup()
        //{
        //}

        [Test]
        public void Post_always_isNotNull()
        {
            //Arrange
            //var mockRepository = new Mock<IUsersRepository>();
            var usersController = new UsersController();

            //Action
            IActionResult result = usersController.Post(new FakeUser { Id = 2, Name = "Ron", Password = "2323" });
            //Assert
           Assert.NotNull(result);
        }
    }
}
