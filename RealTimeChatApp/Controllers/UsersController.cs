using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Npgsql;

namespace RealTimeChatApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly IHubContext<ChatHub> _chatHub;

        public UsersController(IHubContext<ChatHub> chatHub)
        {

            _chatHub = chatHub;
        }

        [HttpGet]
        public async Task<IEnumerable<int>> GetLastRow()
        {
            var user = new User();
            var usersCount = await user.GetLastRow();
            return usersCount;
        }




        [HttpPost("CheckUser")]
        public async Task<IActionResult> CheckUser([FromBody] LoginUser user)
        {
            var userInstance = new User();
            var loggedUser = await userInstance.FindUser(user);
            if (loggedUser == null)
            {
                return Ok("User not found");
            }
            else return Ok(loggedUser);

        }




        [HttpPost("GetUser")]
        public async Task<IActionResult> GetUser([FromBody] NewLoginUser user)
        {
            var userInstance = new User();
            var newUser = userInstance.GetUser(user);
            await _chatHub.Clients.All.SendAsync("NewLogin", newUser);
            return Ok(newUser);
        }





        [HttpPost("PostUser")]
        public async Task<IActionResult> PostUser([FromBody] User user)
        {
            var passwordHasher = new PasswordHasher<string>();
            var hash = passwordHasher.HashPassword(user.Name, user.Password);
            var userInstance = new User();
            await userInstance.PostUser(user,hash);
            return Ok("User created");
        }

    }
}

