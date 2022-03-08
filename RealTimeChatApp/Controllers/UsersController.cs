using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;


namespace RealTimeChatApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    { 

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return users;
        }

        static List<User> users = UsersList();

        private static List<User> UsersList()
        {
            var userList = new List<User>();
            userList.Add(new RealTimeChatApp.User { id = 10, name = "Jules" });
            return userList;
        }

        [HttpGet("id")]
        public IActionResult Get(int id)
        {
            var ret = users.Find(u => u.id == id);
            if(ret != null)
            {
                return Ok(ret);
            }
            return NotFound("User not found");
        }

        [HttpPost]
        public void Post([FromBody] User user)
        {
            user.id = users.Count;
            users.Add(user);
        }
    }
}
