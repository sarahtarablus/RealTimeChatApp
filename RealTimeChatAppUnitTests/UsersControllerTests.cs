using System.Collections;
using Microsoft.AspNetCore.Mvc;
using Moq;
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
            var mockRepository = new Mock<IUsersRepository>();
            var usersController = new UsersController(mockRepository.Object);

            //Action
            IActionResult actionResult = usersController.Post(new User { id = 2, name = "Ron" });
            //var createdResult = actionResult;


            //Assert
            //Assert.NotNull(result);
        }
    }
}
