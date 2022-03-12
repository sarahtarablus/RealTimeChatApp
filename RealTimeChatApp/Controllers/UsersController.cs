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


        static List<User> usersList = new List<User>();
        static IDictionary<int, User> users = new Dictionary<int, User>();


        [HttpGet]
        public IEnumerable<User> Get()
        {

            foreach (KeyValuePair<int, User> kvp in users)
            {
                var user = kvp.Value;
                usersList.Add(user);
                                
            }
            return usersList;
        }


        [HttpGet("id")]
        public IActionResult Get(int id)
        {

            foreach (KeyValuePair<int, User> kvp in users)
            {
                var user = kvp.Value;
                var userId = user.id;

                if(userId == id)
                {
                    return Ok(user);
                }
            }

           // var ret = users.Find(u => u.id == id);
            //if(ret != null)
            //{
               // return Ok(ret);
            //}
            return NotFound("User not found");
        }

        [HttpPost]
        public void Post([FromBody] User user)
        {
            var index = users.Count;
            users.Add(index, user);
        }
    }
}
