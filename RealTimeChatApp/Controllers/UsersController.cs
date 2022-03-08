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
        static List<User> users = new();

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return users;
        }

        [HttpGet("id")]
        public IActionResult Get(int id)
        {
            var userFound = users.Find(u => u._id == id);
            if(userFound != null)
            {
                return Ok(userFound);
            }
            return NotFound("User not found");
        }

        [HttpPost]
        public IActionResult Post([FromBody] User)
        {
            return Ok();
        }
    }
}
