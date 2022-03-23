using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;


namespace RealTimeChatApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        //static IDictionary<int, User> _users;
        //private IUsersRepository _usersRepository;

        static List<IUser> users;

        //public UsersController(IList<IUser> users)
        //{
        //    _users = users;
        //}

      
       
     


        [HttpGet]
        public IEnumerable<IUser> Get()
        {




            return users;


            //foreach (KeyValuePair<int, User> kvp in _users)
            //{
            //    var user = kvp.Value;
            //    users.Add(user);

            //}
        }



        [HttpGet("id")]
        public IActionResult Get(int id)
        {
            var user = users.Find(u => u.Id == id);
            
            if (user == null)
            {
                return NotFound("User not found");
            }
            return Ok(user);
            //foreach (KeyValuePair<int, User> kvp in _users)
            //{
            //    var userValue = kvp.Value;
            //    var userId = user.id;

            //    if (userId == id)
            //    {
            //        return Ok(user);
            //    }
            //}

            //return NotFound("User not found");
        }



        [HttpPost]
        public IActionResult Post([FromBody] IUser user)
        {
            user.Id = users.Count;
            users.Add(user);
            return Ok(user);

            //return CreatedAtRoute("DefaultApi", new { name = user.Name, password = user.Password}, user);
        }

    }
}
