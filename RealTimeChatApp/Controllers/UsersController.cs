using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;


namespace RealTimeChatApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private IUsersRepository _usersRepository;


        public UsersController(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }


        static IList<User> _usersList;
        static IDictionary<int, User> _users;


        [HttpGet]
        public IEnumerable<User> Get()
        {


            foreach (KeyValuePair<int, User> kvp in _users)
            {
                var user = kvp.Value;
                _usersList.Add(user);

            }
            return _usersList;
        }



        [HttpGet("id")]
        public IActionResult Get(int id)
        {
            User user = _usersRepository.GetById(id);
            if(user == null)
            {
                return NotFound();
            }
            return Ok(user);
            //foreach (KeyValuePair<int, User> kvp in _users)
            //{
            //    var userValue = kvp.Value;
            //    var userId = user.id;

            //    if(userId == id)
            //    {
            //        return Ok(user);
            //    }
            //}

            //return NotFound("User not found");
        }



        [HttpPost]
        public IActionResult Post([FromBody] User user)
        {
            var index = _users.Count;
            _usersRepository.Add(index,user);

            return CreatedAtRoute("DefaultApi", new { id = user.id, name = user.name, date = user.createdDate }, user);
        }

    }
}
