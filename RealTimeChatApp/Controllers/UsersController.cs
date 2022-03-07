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
        private List<User> users = new List<User>();
        


        [HttpGet("List")]
        public IActionResult List()
        {
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = users.Find(u => u._id == id);
            if(user != null)
            {
                return Ok(user);
            }
                return NotFound("user not found");
            
   
        }

        [HttpPost]
        public IActionResult PostUser([FromBody]User user)
        {
            users.Add(user);
            return Ok();
        }
    }
}
